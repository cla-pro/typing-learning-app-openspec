import { beforeEach, describe, expect, test, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { WelcomeComponent } from '../../../../src/app/components/welcome/welcome.component';
import { ExerciseCategory, ExerciseConfig } from '../../../../src/app/models/exercise-config.model';
import { ExerciseConfigService } from '../../../../src/app/services/exercise-config.service';

const exercises: ExerciseConfig[] = [
  { id: 'a', name: 'A', expectedChars: ['a'], impactedKeys: ['A'] },
  { id: 'b', name: 'B', expectedChars: ['b'], impactedKeys: ['B'] },
  { id: 'c', name: 'C', expectedChars: ['c'], impactedKeys: ['C'] }
];

const exerciseCategories: ExerciseCategory[] = [
  {
    name: 'First Group',
    exercises: [exercises[0], exercises[1]]
  },
  {
    name: 'Second Group',
    exercises: [exercises[2]]
  }
];

const serviceStub = {
  listExerciseCategories: vi.fn(() => exerciseCategories)
};

describe('Welcome Component Requirements', () => {
  let component: WelcomeComponent;

  beforeEach(async () => {
    serviceStub.listExerciseCategories.mockClear();

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ExerciseConfigService,
          useValue: serviceStub
        }
      ]
    }).compileComponents();

    component = TestBed.runInInjectionContext(() => new WelcomeComponent());
  });

  test('loads grouped exercise links from ExerciseConfigService public API', () => {
    expect(serviceStub.listExerciseCategories).toHaveBeenCalledTimes(1);
    expect(component.exerciseCategories).toEqual(exerciseCategories);
  });

  test('exposes grouped exercise links in category and exercise order without duplication', () => {
    const categoryTitles = component.exerciseCategories.map(category => category.name);
    const groupedExerciseLabels = component.exerciseCategories.map(category =>
      category.exercises.map(exercise => exercise.name)
    );
    const allExerciseLinks = component.exerciseCategories.flatMap(category =>
      category.exercises.map(exercise => exercise.name)
    );

    expect(categoryTitles).toEqual(['First Group', 'Second Group']);
    expect(groupedExerciseLabels).toEqual([
      ['A', 'B'],
      ['C']
    ]);
    expect(allExerciseLinks).toEqual(['A', 'B', 'C']);
    expect(new Set(allExerciseLinks).size).toBe(allExerciseLinks.length);
  });
});
