import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ExerciseComponent } from '../../../../src/app/components/exercise/exercise.component';
import { ExerciseConfigService } from '../../../../src/app/services/exercise-config.service';
import { TestBed } from '@angular/core/testing';

const STREAM_SIZE_STORAGE_KEY = 'exercise.streamSizeValue';

describe('Exercise Component Requirements', () => {
  let component: ExerciseComponent;
  let paramMap$: Subject<any>;
  let serviceStub: { getExerciseById: ReturnType<typeof vi.fn> };
  let routerStub: { navigate: ReturnType<typeof vi.fn> };

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
          provide: Router,
          useValue: routerStub
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

  test('updates stream size linearly and persists the chosen value', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    component.handleStreamSizeInput({
      target: {
        value: '0.5'
      }
    } as unknown as Event);

    expect(component.streamSizeValue).toBe(0.5);
    expect(component.streamSizeScale).toBe(1.3);
    expect(globalThis.localStorage?.getItem(STREAM_SIZE_STORAGE_KEY)).toBe('0.5');
  });

  test('restores persisted stream size and falls back to baseline for invalid values', () => {
    globalThis.localStorage?.setItem(STREAM_SIZE_STORAGE_KEY, '0.4');

    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.streamSizeValue).toBe(0.4);
    expect(component.streamSizeScale).toBe(1.24);

    globalThis.localStorage?.setItem(STREAM_SIZE_STORAGE_KEY, 'invalid');
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.streamSizeValue).toBe(0);
    expect(component.streamSizeScale).toBe(1);
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

  test('exposes a blank pressed-key display until a running key press is captured', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(component.displayedPressedKey).toBe('\u00A0');

    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'b' } as KeyboardEvent);

    expect(component.displayedPressedKey).toBe('b');
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
});
