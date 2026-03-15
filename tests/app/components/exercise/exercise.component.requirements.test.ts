import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ExerciseComponent } from '../../../../src/app/components/exercise/exercise.component';
import { ExerciseConfigService } from '../../../../src/app/services/exercise-config.service';
import { TestBed } from '@angular/core/testing';

describe('Exercise Component Requirements', () => {
  let component: ExerciseComponent;
  let paramMap$: Subject<any>;
  let serviceStub: { getExerciseById: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    paramMap$ = new Subject<any>();
    serviceStub = {
      getExerciseById: vi.fn((id: string) => {
        if (id === 'basic-typing') {
          return {
            id: 'basic-typing',
            name: 'Basic Typing',
            letters: ['a', 's'],
            impactedKeys: ['A', 'S']
          };
        }

        return undefined;
      })
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
        }
      ]
    }).compileComponents();

    component = TestBed.runInInjectionContext(() => new ExerciseComponent());
    component.ngOnInit();
  });

  test('loads exercise data for valid route id and starts in opened state', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));

    expect(serviceStub.getExerciseById).toHaveBeenCalledWith('basic-typing');
    expect(component.isExerciseFound).toBe(true);
    expect(component.exerciseName).toBe('Basic Typing');
    expect(component.exerciseRuntimeState).toBe('opened');
    expect(component.runtimeActionLabel).toBe('start');
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

  test('shows not-found state and resets runtime/key state on invalid id', () => {
    paramMap$.next(convertToParamMap({ id: 'basic-typing' }));
    component.toggleRuntimeState();
    component.handleExerciseKeydown({ key: 'x' } as KeyboardEvent);

    paramMap$.next(convertToParamMap({ id: 'does-not-exist' }));

    expect(component.isExerciseFound).toBe(false);
    expect(component.exerciseRuntimeState).toBe('opened');
    expect(component.lastPressedKey).toBe('');
  });
});
