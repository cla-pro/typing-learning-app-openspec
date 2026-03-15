import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ExerciseComponent } from '../../../../src/app/components/exercise/exercise.component';
import { ExerciseConfigService } from '../../../../src/app/services/exercise-config.service';
import { TestBed } from '@angular/core/testing';

describe('Exercise Component Requirements', () => {
  let component: ExerciseComponent;
  let paramMap$: Subject<any>;
  let serviceStub: { getExerciseById: ReturnType<typeof vi.fn> };
  let routerStub: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    paramMap$ = new Subject<any>();
    serviceStub = {
      getExerciseById: vi.fn((id: string) => {
        if (id === 'basic-typing') {
          return {
            id: 'basic-typing',
            name: 'Basic Typing',
            expectedChars: ['a', 'S'],
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
    expect(component.exerciseRuntimeState).toBe('opened');
    expect(component.runtimeActionLabel).toBe('start');
    expect(routerStub.navigate).not.toHaveBeenCalled();
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

  test('transitions to completed via temporary completion action', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.completeExerciseTemporarily();

    expect(component.exerciseRuntimeState).toBe('completed');

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
    expect(component.activeExpectedChar).toBe('S');
    expect(component.exerciseRuntimeState).toBe('running');

    component.handleExerciseKeydown({ key: 's' } as KeyboardEvent);
    expect(component.activeExpectedCharIndex).toBe(1);
    expect(component.exerciseRuntimeState).toBe('running');

    component.handleExerciseKeydown({ key: 'S' } as KeyboardEvent);
    expect(component.exerciseRuntimeState).toBe('completed');
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
});
