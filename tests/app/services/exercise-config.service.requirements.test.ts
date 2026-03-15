import { ExerciseConfigService } from '../../../src/app/services/exercise-config.service';

import { beforeEach, expect, describe, test, vi } from 'vitest'

describe('ExerciseConfigService Requirements', () => {
  let service: ExerciseConfigService;

  beforeEach(() => {
    service = new ExerciseConfigService();
  });

  test('lists available exercises through public API', () => {
    const exercises = service.listExercises();

    expect(exercises.length).toBeGreaterThan(0);
    expect(exercises.some(exercise => exercise.id === 'basic-typing')).toBe(true);
    expect(exercises.some(exercise => exercise.id === 'speed-test')).toBe(true);
    expect(exercises.some(exercise => exercise.id === 'accuracy-training')).toBe(true);
  });

  test('returns exercise configuration by id', () => {
    const config = service.getExerciseById('basic-typing');

    expect(config).toBeDefined();
    expect(config?.id).toBe('basic-typing');
    expect(config?.name).toContain('Basic Typing');
    expect(config?.expectedChars.length).toBeGreaterThan(0);
  });

  test('provides expectedChars and no empty expected-character configs', () => {
    const exercises = service.listExercises();

    expect(exercises.length).toBeGreaterThan(0);
    for (const exercise of exercises) {
      expect(Array.isArray(exercise.expectedChars)).toBe(true);
      expect(exercise.expectedChars.length).toBeGreaterThan(0);
    }
  });

  test('returns undefined for unknown exercise id', () => {
    const config = service.getExerciseById('unknown-id');

    expect(config).toBeUndefined();
  });
});
