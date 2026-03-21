import { ExerciseConfigService } from '../../../src/app/services/exercise-config.service';

import { beforeEach, expect, describe, test, vi } from 'vitest'

describe('ExerciseConfigService Requirements', () => {
  let service: ExerciseConfigService;

  beforeEach(() => {
    service = new ExerciseConfigService();
  });

  test('lists ordered exercise categories through public API', () => {
    const categories = service.listExerciseCategories('fr-ch');

    expect(categories.map(category => category.name)).toEqual([
      'Middle Line',
      'Upper Line',
      'Lower Line'
    ]);
    expect(categories[0]?.exercises.map(exercise => exercise.id)).toEqual([
      'middle-line-fj',
      'middle-line-dk',
      'middle-line-sl',
      'middle-line-gh',
      'middle-line-all-1',
      'middle-line-all-2'
    ]);
    expect(categories[1]?.exercises.map(exercise => exercise.id)).toEqual([
      'upper-line-tz',
      'upper-line-ru',
      'upper-line-ei',
      'upper-line-wo',
      'upper-line-qp',
      'upper-line-all-1',
      'upper-line-all-2'
    ]);

    const flattenedExerciseIds = categories.flatMap(category =>
      category.exercises.map(exercise => exercise.id)
    );
    expect(flattenedExerciseIds).toContain('middle-line-fj');
    expect(flattenedExerciseIds).toContain('upper-line-all-1');
    expect(flattenedExerciseIds).toContain('lower-line-vbn');
    expect(new Set(flattenedExerciseIds).size).toBe(flattenedExerciseIds.length);
  });

  test('provides expectedChars and no empty expected-character configs in grouped data', () => {
    const categories = service.listExerciseCategories('fr-ch');

    expect(categories.length).toBeGreaterThan(0);
    for (const category of categories) {
      expect(category.exercises.length).toBeGreaterThan(0);
      for (const exercise of category.exercises) {
        expect(Array.isArray(exercise.expectedChars)).toBe(true);
        expect(exercise.expectedChars.length).toBeGreaterThan(0);
      }
    }
  });

  test('returns exercise configuration by id', () => {
    const config = service.getExerciseById('middle-line-fj');

    expect(config).toBeDefined();
    expect(config?.id).toBe('middle-line-fj');
    expect(config?.name).toContain('F / J');
    expect(config?.expectedChars.length).toBeGreaterThan(0);
  });

  test('returns undefined for unknown exercise id', () => {
    const config = service.getExerciseById('unknown-id');

    expect(config).toBeUndefined();
  });

  test('returns categories that include the requested layout', () => {
    const categories = service.listExerciseCategories('fr-ch');

    expect(categories.length).toBeGreaterThan(0);
    for (const category of categories) {
      expect(category.keyboardLayouts).toContain('fr-ch');
    }
  });

  test('excludes categories that do not include the requested layout', () => {
    const categoriesForUnknown = service.listExerciseCategories('unknown-layout');
    expect(categoriesForUnknown).toEqual([]);

    const categoriesForDeCh = service.listExerciseCategories('de-ch');
    expect(categoriesForDeCh).toEqual([]);
  });
});
