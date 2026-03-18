import { ExerciseConfigService } from '../../../src/app/services/exercise-config.service';

import { beforeEach, expect, describe, test, vi } from 'vitest'

describe('ExerciseConfigService Requirements', () => {
  let service: ExerciseConfigService;

  beforeEach(() => {
    service = new ExerciseConfigService();
  });

  test('lists ordered exercise categories through public API', () => {
    const categories = service.listExerciseCategories();

    expect(categories.map(category => category.name)).toEqual([
      'Core Drills',
      'Middle Line',
      'Upper Line',
      'Lower Line'
    ]);
    expect(categories[0]?.exercises.map(exercise => exercise.id)).toEqual([
      'basic-typing',
      'speed-test',
      'accuracy-training'
    ]);
    expect(categories[1]?.exercises.map(exercise => exercise.id)).toEqual([
      'middle-line-fj',
      'middle-line-dk',
      'middle-line-sl',
      'middle-line-gh',
      'middle-line-random-1',
      'middle-line-random-2'
    ]);

    const flattenedExerciseIds = categories.flatMap(category =>
      category.exercises.map(exercise => exercise.id)
    );
    expect(flattenedExerciseIds).toContain('basic-typing');
    expect(flattenedExerciseIds).toContain('speed-test');
    expect(flattenedExerciseIds).toContain('accuracy-training');
    expect(new Set(flattenedExerciseIds).size).toBe(flattenedExerciseIds.length);
  });

  test('provides expectedChars and no empty expected-character configs in grouped data', () => {
    const categories = service.listExerciseCategories();

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
    const config = service.getExerciseById('basic-typing');

    expect(config).toBeDefined();
    expect(config?.id).toBe('basic-typing');
    expect(config?.name).toContain('Basic Typing');
    expect(config?.expectedChars.length).toBeGreaterThan(0);
  });

  test('returns undefined for unknown exercise id', () => {
    const config = service.getExerciseById('unknown-id');

    expect(config).toBeUndefined();
  });
});
