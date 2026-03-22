import { beforeEach, describe, expect, test, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { WelcomeComponent } from '../../../../src/app/components/welcome/welcome.component';
import { ExerciseCategory, ExerciseConfig } from '../../../../src/app/models/exercise-config.model';
import { ExerciseConfigService } from '../../../../src/app/services/exercise-config.service';
import { ExerciseProgressService } from '../../../../src/app/services/exercise-progress.service';
import { SettingsService } from '../../../../src/app/services/settings.service';

const exercises: ExerciseConfig[] = [
  { id: 'a', name: 'A', expectedChars: ['a'], impactedKeys: ['A'] },
  { id: 'b', name: 'B', expectedChars: ['b'], impactedKeys: ['B'] },
  { id: 'c', name: 'C', expectedChars: ['c'], impactedKeys: ['C'] }
];

const exerciseCategories: ExerciseCategory[] = [
  {
    name: 'First Group',
    keyboardLayouts: ['fr-ch', 'de-ch'],
    exercises: [exercises[0], exercises[1]]
  },
  {
    name: 'Second Group',
    keyboardLayouts: ['fr-ch', 'de-ch'],
    exercises: [exercises[2]]
  }
];

const serviceStub = {
  listExerciseCategories: vi.fn((layout: string) => exerciseCategories)
};

const layoutServiceStub = {
  getChosenLayout: vi.fn(() => 'fr-ch'),
  getSupportedLayouts: vi.fn(() => ['fr-ch', 'de-ch'])
};

let progressStub: {
  isCompleted: ReturnType<typeof vi.fn>;
  getStars: ReturnType<typeof vi.fn>;
};

describe('Welcome Component Requirements', () => {
  let component: WelcomeComponent;

  beforeEach(async () => {
    serviceStub.listExerciseCategories.mockClear();
    layoutServiceStub.getChosenLayout.mockClear();
    layoutServiceStub.getSupportedLayouts.mockClear();
    layoutServiceStub.getChosenLayout.mockReturnValue('fr-ch');
    serviceStub.listExerciseCategories.mockImplementation((layout: string) => {
      if (layout === 'de-ch') {
        return [
          {
            name: 'German Group',
            keyboardLayouts: ['de-ch'],
            exercises: [exercises[2]]
          }
        ];
      }

      return exerciseCategories;
    });

    progressStub = {
      isCompleted: vi.fn(() => false),
      getStars: vi.fn(() => 0)
    };

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ExerciseConfigService,
          useValue: serviceStub
        },
        {
          provide: ExerciseProgressService,
          useValue: progressStub
        },
        {
          provide: SettingsService,
          useValue: layoutServiceStub
        }
      ]
    }).compileComponents();

    component = TestBed.runInInjectionContext(() => new WelcomeComponent());
  });

  test('loads grouped exercise links from ExerciseConfigService public API', () => {
    expect(serviceStub.listExerciseCategories).toHaveBeenCalledTimes(1);
    expect(component.exerciseCategories).toEqual(exerciseCategories);
  });

  test('exposes settings route for gear-button navigation', () => {
    expect(component.settingsRoute).toBe('/settings');
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

  test('exercise tile has completed flag set to true when progress service reports it as completed', () => {
    progressStub.isCompleted.mockReturnValue(true);
    const enrichedComponent = TestBed.runInInjectionContext(() => new WelcomeComponent());
    const firstTile = enrichedComponent.exerciseCategoriesWithProgress[0].exercises[0];
    expect(firstTile.completed).toBe(true);
  });

  test('exercise tile has completed flag set to false when progress service reports it as not completed', () => {
    const firstTile = component.exerciseCategoriesWithProgress[0].exercises[0];
    expect(firstTile.completed).toBe(false);
  });

  test('exercise tile has star count from progress service when exercise is completed', () => {
    progressStub.isCompleted.mockReturnValue(true);
    progressStub.getStars.mockReturnValue(2);
    const enrichedComponent = TestBed.runInInjectionContext(() => new WelcomeComponent());
    const firstTile = enrichedComponent.exerciseCategoriesWithProgress[0].exercises[0];
    expect(firstTile.stars).toBe(2);
  });

  test('exercise tile has zero stars when exercise is not completed', () => {
    const firstTile = component.exerciseCategoriesWithProgress[0].exercises[0];
    expect(firstTile.stars).toBe(0);
  });

  test('loads exercise categories using the chosen keyboard layout from SettingsService', () => {
    expect(layoutServiceStub.getChosenLayout).toHaveBeenCalledTimes(1);
    expect(serviceStub.listExerciseCategories).toHaveBeenCalledWith('fr-ch');
  });

  test('loads categories for current chosen layout from settings service', () => {
    layoutServiceStub.getChosenLayout.mockReturnValue('de-ch');

    const deChComponent = TestBed.runInInjectionContext(() => new WelcomeComponent());

    expect(serviceStub.listExerciseCategories).toHaveBeenLastCalledWith('de-ch');
    expect(deChComponent.exerciseCategories.map(category => category.name)).toEqual(['German Group']);
    expect(deChComponent.exerciseCategoriesWithProgress[0]?.exercises.map(exercise => exercise.name)).toEqual(['C']);
  });
});
