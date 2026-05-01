import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ExerciseComponent } from '../../../../src/app/components/exercise/exercise.component';
import { ExerciseConfigService } from '../../../../src/app/services/exercise-config.service';
import { ExerciseProgressService } from '../../../../src/app/services/exercise-progress.service';
import { SettingsService } from '../../../../src/app/services/settings.service';
import { TestBed } from '@angular/core/testing';

describe('Exercise Component Requirements', () => {
  let component: ExerciseComponent;
  let paramMap$: Subject<any>;
  let serviceStub: { getExerciseById: ReturnType<typeof vi.fn> };
  let routerStub: { navigate: ReturnType<typeof vi.fn> };
  let progressStub: { recordCompletion: ReturnType<typeof vi.fn> };
  let settingsStub: {
    getStreamSizeValue: ReturnType<typeof vi.fn>;
    getChosenLayout: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    globalThis.localStorage?.clear();
    paramMap$ = new Subject<any>();
    serviceStub = {
      getExerciseById: vi.fn((id: string) => {
        if (id === 'basic-typing') {
          return {
            id: 'basic-typing',
            name: 'Basic Typing',
            expectedChars: ['a', 'b', 'C', 'd', 'e', 'f'],
            impactedKeys: ['A', 'S']
          };
        }

        return undefined;
      })
    };

    routerStub = {
      navigate: vi.fn()
    };

    progressStub = {
      recordCompletion: vi.fn()
    };

    settingsStub = {
      getStreamSizeValue: vi.fn(() => 0),
      getChosenLayout: vi.fn(() => 'fr-ch')
    };

    const routeStub = {
      paramMap: paramMap$.asObservable()
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeStub
        },
        {
          provide: ExerciseConfigService,
          useValue: serviceStub
        },
        {
          provide: ExerciseProgressService,
          useValue: progressStub
        },
        {
          provide: Router,
          useValue: routerStub
        },
        {
          provide: SettingsService,
          useValue: settingsStub
        }
      ]
    }).compileComponents();

    component = TestBed.runInInjectionContext(() => new ExerciseComponent());
    component.ngOnInit();
  });

  test('loads exercise data for valid route id and starts in opened state', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(serviceStub.getExerciseById).toHaveBeenCalledWith('basic-typing');
    expect(component.exerciseName).toBe('Basic Typing');
    expect(component.activeExpectedCharIndex).toBe(0);
    expect(component.activeExpectedChar).toBe('a');
    expect(component.previousSideChars).toEqual([]);
    expect(component.zoomWindowChars).toEqual([null, null, 'a', 'b', 'C']);
    expect(component.followingSideChars).toEqual(['d', 'e', 'f']);
    expect(component.exerciseRuntimeState).toBe('opened');
    expect(component.streamSizeValue).toBe(0);
    expect(component.streamSizeScale).toBe(1);
    expect(component.runtimeActionLabel).toBe('start');
    expect(routerStub.navigate).not.toHaveBeenCalled();
  });

  test('loads stream size from settings service when exercise opens', () => {
    settingsStub.getStreamSizeValue.mockReturnValue(0.4);

    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.streamSizeValue).toBe(0.4);
    expect(component.streamSizeScale).toBe(1.24);
  });

  test('loads selected keyboard layout from settings service when exercise opens', () => {
    settingsStub.getChosenLayout.mockReturnValue('de-ch');

    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.chosenLayout).toBe('de-ch');
  });

  test('applies updated stream size value when next exercise is opened', () => {
    settingsStub.getStreamSizeValue.mockReturnValueOnce(0.2).mockReturnValueOnce(0.7);

    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    expect(component.streamSizeValue).toBe(0.2);

    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    expect(component.streamSizeValue).toBe(0.7);
    expect(component.streamSizeScale).toBe(1.42);
  });

  test('transitions runtime state and label on primary toggle', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    component.toggleRuntimeState();
    expect(component.exerciseRuntimeState).toBe('running');
    expect(component.runtimeActionLabel).toBe('pause');

    component.toggleRuntimeState();
    expect(component.exerciseRuntimeState).toBe('pending');
    expect(component.runtimeActionLabel).toBe('start');

    component.toggleRuntimeState();
    expect(component.exerciseRuntimeState).toBe('running');
  });

  test('moves focus from the runtime button to exercise content on start and resume', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    const runtimeButton = document.createElement('button');
    const exerciseContent = document.createElement('div');
    exerciseContent.tabIndex = 0;

    document.body.append(runtimeButton, exerciseContent);
    runtimeButton.focus();
    (component as any).exerciseContentRef = { nativeElement: exerciseContent };

    component.toggleRuntimeState();
    expect(component.exerciseRuntimeState).toBe('running');
    expect(document.activeElement).toBe(exerciseContent);

    component.toggleRuntimeState();
    expect(component.exerciseRuntimeState).toBe('pending');

    runtimeButton.focus();
    component.toggleRuntimeState();
    expect(component.exerciseRuntimeState).toBe('running');
    expect(document.activeElement).toBe(exerciseContent);

    runtimeButton.remove();
    exerciseContent.remove();
  });

  test('keeps the exercise running when Space is typed while running', () => {
    serviceStub.getExerciseById.mockReturnValue({
      id: 'space-drill',
      name: 'Space Drill',
      expectedChars: [' '],
      impactedKeys: ['SPACE']
    });
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    const exerciseContent = document.createElement('div');
    exerciseContent.tabIndex = 0;
    (component as any).exerciseContentRef = { nativeElement: exerciseContent };

    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: ' ' } as KeyboardEvent);

    expect(component.lastPressedKey).toBe(' ');
    expect(component.exerciseRuntimeState).toBe('completed');
    expect(component.isRuntimeControlDisabled).toBe(true);
  });

  test('keeps the primary control disabled and visible after completion', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'C' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'd' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'e' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'f' } as KeyboardEvent);

    expect(component.exerciseRuntimeState).toBe('completed');
    expect(component.isRuntimeControlDisabled).toBe(true);
    expect(component.runtimeActionLabel).toBe('start');

    component.toggleRuntimeState();
    expect(component.exerciseRuntimeState).toBe('completed');
  });

  test('captures key input only while running', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    expect(component.lastPressedKey).toBe('');

    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    expect(component.lastPressedKey).toBe('b');

    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'c' } as KeyboardEvent);
    expect(component.lastPressedKey).toBe('b');
  });

  test('advances only on exact active expected-character match and is case-sensitive', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'A' } as KeyboardEvent);
    expect(component.activeExpectedCharIndex).toBe(0);
    expect(component.activeExpectedChar).toBe('a');
    expect(component.exerciseRuntimeState).toBe('running');

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    expect(component.activeExpectedCharIndex).toBe(1);
    expect(component.activeExpectedChar).toBe('b');
    expect(component.exerciseRuntimeState).toBe('running');

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.activeExpectedCharIndex).toBe(1);
    expect(component.exerciseRuntimeState).toBe('running');

    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    expect(component.activeExpectedCharIndex).toBe(2);
    expect(component.activeExpectedChar).toBe('C');

    component.handleExerciseKeydown({ key: 'c' } as KeyboardEvent);
    expect(component.activeExpectedCharIndex).toBe(2);

    component.handleExerciseKeydown({ key: 'C' } as KeyboardEvent);
    expect(component.activeExpectedCharIndex).toBe(3);
    expect(component.activeExpectedChar).toBe('d');
  });

  test('updates zoom-window composition across start, middle, and end boundaries', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    expect(component.zoomWindowChars).toEqual([null, null, 'a', 'b', 'C']);

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    expect(component.zoomWindowChars).toEqual(['a', 'b', 'C', 'd', 'e']);

    component.handleExerciseKeydown({ key: 'C' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'd' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'e' } as KeyboardEvent);
    expect(component.zoomWindowChars).toEqual(['d', 'e', 'f', null, null]);
  });

  test('shifts stream left on correct key and does not shift on incorrect key', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    const initialZoom = [...component.zoomWindowChars];

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.zoomWindowChars).toEqual(initialZoom);
    expect(component.previousSideChars).toEqual([]);

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    expect(component.zoomWindowChars).toEqual([null, 'a', 'b', 'C', 'd']);

    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    expect(component.zoomWindowChars).toEqual(['a', 'b', 'C', 'd', 'e']);

    component.handleExerciseKeydown({ key: 'C' } as KeyboardEvent);
    expect(component.previousSideChars).toEqual(['a']);
    expect(component.zoomWindowChars).toEqual(['b', 'C', 'd', 'e', 'f']);
  });

  test('leaves no active center character after final correct key', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'C' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'd' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'e' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'f' } as KeyboardEvent);

    expect(component.exerciseRuntimeState).toBe('completed');
    expect(component.hasActiveExpectedChar).toBe(false);
    expect(component.activeExpectedChar).toBe('');
    expect(component.zoomWindowChars[2]).toBeNull();
    expect(component.previousSideChars).toEqual(['a', 'b', 'C', 'd']);
    expect(component.zoomWindowChars).toEqual(['e', 'f', null, null, null]);
  });

  test('redirects to dedicated not-found route on invalid id and resets runtime/key state', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);

    paramMap$.next(convertToParamMap({ id: 'does-not-exist' }));

    expect(routerStub.navigate).toHaveBeenCalledWith(['/exercices/not-found']);
    expect(component.exerciseRuntimeState).toBe('opened');
    expect(component.lastPressedKey).toBe('');
  });

  test('redirects to dedicated not-found route when id is missing', () => {
    paramMap$.next(convertToParamMap({ id: undefined }));

    expect(serviceStub.getExerciseById).not.toHaveBeenCalled();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/exercices/not-found']);
  });

  test('transitions to completed after last expected-character match', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'C' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'd' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'e' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'f' } as KeyboardEvent);

    expect(component.exerciseRuntimeState).toBe('completed');
  });

  test('correct key press sets isLastKeyWrong to false for green keyboard highlight', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.isLastKeyWrong).toBe(true);

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    expect(component.isLastKeyWrong).toBe(false);
    expect(component.lastPressedKey).toBe('a');
  });

  test('wrong key press sets isLastKeyWrong to true for red keyboard highlight', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.isLastKeyWrong).toBe(true);
    expect(component.lastPressedKey).toBe('x');
  });

  test('keeps the runtime control enabled until completion and then disables it', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.isRuntimeControlDisabled).toBe(false);

    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'C' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'd' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'e' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'f' } as KeyboardEvent);

    expect(component.exerciseRuntimeState).toBe('completed');
    expect(component.isRuntimeControlDisabled).toBe(true);
    expect(component.runtimeActionLabel).toBe('start');
  });

  test('error counter initializes to zero and is accessible when exercise is loaded', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.errorCount).toBe(0);
    expect(component.isLastKeyWrong).toBe(false);
  });

  test('wrong key press increments error count by one while running', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.errorCount).toBe(1);

    component.handleExerciseKeydown({ key: 'y' } as KeyboardEvent);
    expect(component.errorCount).toBe(2);
  });

  test('correct key press does not increment error count while running', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    expect(component.errorCount).toBe(0);
  });

  test('key press in opened, pending, and completed state does not increment error count', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.errorCount).toBe(0);

    component.toggleRuntimeState();
    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.errorCount).toBe(0);

    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'C' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'd' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'e' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'f' } as KeyboardEvent);
    expect(component.exerciseRuntimeState).toBe('completed');
    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.errorCount).toBe(0);
  });

  test('wrong key press marks pressed-key feedback as error state', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    expect(component.isLastKeyWrong).toBe(false);
    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.isLastKeyWrong).toBe(true);
  });

  test('correct key press clears pressed-key feedback error state', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.isLastKeyWrong).toBe(true);

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    expect(component.isLastKeyWrong).toBe(false);
  });

  test('error count persists across pause and resume without resetting', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'y' } as KeyboardEvent);
    expect(component.errorCount).toBe(2);

    component.toggleRuntimeState();
    expect(component.errorCount).toBe(2);

    component.toggleRuntimeState();
    expect(component.errorCount).toBe(2);

    component.handleExerciseKeydown({ key: 'z' } as KeyboardEvent);
    expect(component.errorCount).toBe(3);
  });

  test('error count resets to zero when a new exercise is opened', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    expect(component.errorCount).toBe(1);

    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    expect(component.errorCount).toBe(0);
  });

  test('recordCompletion is called with exercise id, error count, and total chars when exercise completes', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'C' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'd' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'e' } as KeyboardEvent);
    component.handleExerciseKeydown({ key: 'f' } as KeyboardEvent);

    expect(component.exerciseRuntimeState).toBe('completed');
    expect(progressStub.recordCompletion).toHaveBeenCalledOnce();
    expect(progressStub.recordCompletion).toHaveBeenCalledWith('basic-typing', 1, 6);
  });

  test('recordCompletion is not called while exercise is still running or pending', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);
    expect(progressStub.recordCompletion).not.toHaveBeenCalled();

    component.toggleRuntimeState();
    expect(progressStub.recordCompletion).not.toHaveBeenCalled();
  });

  test('modifier key press during running state does not increment error counter', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'Shift', shiftKey: true, getModifierState: () => false } as unknown as KeyboardEvent);
    expect(component.errorCount).toBe(0);

    component.handleExerciseKeydown({ key: 'Control', shiftKey: false, getModifierState: () => false } as unknown as KeyboardEvent);
    expect(component.errorCount).toBe(0);
  });

  test('modifier key press during running state does not update lastPressedKey', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);

    component.handleExerciseKeydown({ key: 'Shift', shiftKey: true, getModifierState: () => false } as unknown as KeyboardEvent);
    expect(component.lastPressedKey).toBe('a');
  });

  test('modifier key press during running state does not advance progression', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();

    component.handleExerciseKeydown({ key: 'Shift', shiftKey: true, getModifierState: () => false } as unknown as KeyboardEvent);
    expect(component.activeExpectedCharIndex).toBe(0);
    expect(component.activeExpectedChar).toBe('a');
  });

  test('isShiftActive becomes true on Shift keydown and false on Shift keyup', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    component.handleExerciseKeydown({ key: 'Shift', shiftKey: true, getModifierState: () => false } as unknown as KeyboardEvent);
    expect(component.isShiftActive).toBe(true);

    component.handleExerciseKeyup({ key: 'Shift', shiftKey: false, getModifierState: () => false } as unknown as KeyboardEvent);
    expect(component.isShiftActive).toBe(false);
  });

  test('isAltGrActive becomes true on AltGr keydown and false on AltGr keyup', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    component.handleExerciseKeydown({ key: 'AltGraph', shiftKey: false, getModifierState: (k: string) => k === 'AltGraph' } as unknown as KeyboardEvent);
    expect(component.isAltGrActive).toBe(true);

    component.handleExerciseKeyup({ key: 'AltGraph', shiftKey: false, getModifierState: () => false } as unknown as KeyboardEvent);
    expect(component.isAltGrActive).toBe(false);
  });

  test('isShuffleAvailable is true when exercise is shufflable and state is opened', () => {
    serviceStub.getExerciseById.mockReturnValue({
      id: 'basic-typing',
      name: 'Basic Typing',
      expectedChars: ['a', 'b', 'c'],
      impactedKeys: [],
      shufflable: true
    });
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.isShufflable).toBe(true);
    expect(component.exerciseRuntimeState).toBe('opened');
    expect(component.isShuffleAvailable).toBe(true);
  });

  test('isShuffleAvailable is false when exercise has no shufflable property', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.isShufflable).toBe(false);
    expect(component.isShuffleAvailable).toBe(false);
  });

  test('isShuffleAvailable is false when state is pending (paused)', () => {
    serviceStub.getExerciseById.mockReturnValue({
      id: 'basic-typing',
      name: 'Basic Typing',
      expectedChars: ['a', 'b', 'c'],
      impactedKeys: [],
      shufflable: true
    });
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    component.toggleRuntimeState(); // start
    component.toggleRuntimeState(); // pause

    expect(component.exerciseRuntimeState).toBe('pending');
    expect(component.isShuffleAvailable).toBe(false);
  });

  test('isShuffleAvailable is false when state is running', () => {
    serviceStub.getExerciseById.mockReturnValue({
      id: 'basic-typing',
      name: 'Basic Typing',
      expectedChars: ['a', 'b', 'c'],
      impactedKeys: [],
      shufflable: true
    });
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    component.toggleRuntimeState();

    expect(component.exerciseRuntimeState).toBe('running');
    expect(component.isShuffleAvailable).toBe(false);
  });

  test('isShuffleAvailable is false when state is completed', () => {
    serviceStub.getExerciseById.mockReturnValue({
      id: 'basic-typing',
      name: 'Basic Typing',
      expectedChars: ['a'],
      impactedKeys: [],
      shufflable: true
    });
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'a' } as KeyboardEvent);

    expect(component.exerciseRuntimeState).toBe('completed');
    expect(component.isShuffleAvailable).toBe(false);
  });

  test('shuffleExpectedChars reorders expectedCharsToDisplay', () => {
    serviceStub.getExerciseById.mockReturnValue({
      id: 'basic-typing',
      name: 'Basic Typing',
      expectedChars: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      impactedKeys: [],
      shufflable: true
    });
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    const originalSequence = [...component.expectedCharsToDisplay];
    let shuffled = false;
    for (let attempt = 0; attempt < 10; attempt++) {
      component.shuffleExpectedChars();
      if (component.expectedCharsToDisplay.join('') !== originalSequence.join('')) {
        shuffled = true;
        break;
      }
    }
    expect(shuffled).toBe(true);
    expect([...component.expectedCharsToDisplay].sort()).toEqual([...originalSequence].sort());
  });

  test('shuffleExpectedChars can be called multiple times before starting', () => {
    serviceStub.getExerciseById.mockReturnValue({
      id: 'basic-typing',
      name: 'Basic Typing',
      expectedChars: ['a', 'b', 'c', 'd'],
      impactedKeys: [],
      shufflable: true
    });
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.exerciseRuntimeState).toBe('opened');
    component.shuffleExpectedChars();
    component.shuffleExpectedChars();
    component.shuffleExpectedChars();

    expect(component.exerciseRuntimeState).toBe('opened');
    expect(component.expectedCharsToDisplay).toHaveLength(4);
  });

  test('expectedCharsToDisplay resets to canonical sequence on route re-activation', () => {
    serviceStub.getExerciseById.mockReturnValue({
      id: 'basic-typing',
      name: 'Basic Typing',
      expectedChars: ['a', 'b', 'c', 'd'],
      impactedKeys: [],
      shufflable: true
    });
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    const canonical = ['a', 'b', 'c', 'd'];
    component.shuffleExpectedChars();

    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.expectedCharsToDisplay).toEqual(canonical);
  });

});

