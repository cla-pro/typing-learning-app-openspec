import { beforeEach, describe, expect, test } from 'vitest';

import { ExerciseProgressService } from '../../../src/app/services/exercise-progress.service';

describe('ExerciseProgressService Requirements', () => {
  let service: ExerciseProgressService;

  beforeEach(() => {
    globalThis.localStorage?.clear();
    service = new ExerciseProgressService();
  });

  test('isCompleted returns false and getStars returns 0 before any recordCompletion call', () => {
    expect(service.isCompleted('my-exercise')).toBe(false);
    expect(service.getStars('my-exercise')).toBe(0);
  });

  test('recordCompletion makes isCompleted return true', () => {
    service.recordCompletion('my-exercise', 0, 10);

    expect(service.isCompleted('my-exercise')).toBe(true);
  });

  test('grants 3 stars when errorCount is 0', () => {
    service.recordCompletion('ex', 0, 20);

    expect(service.getStars('ex')).toBe(3);
  });

  test('grants 2 stars when error ratio equals 0.05', () => {
    service.recordCompletion('ex', 1, 20);

    expect(service.getStars('ex')).toBe(2);
  });

  test('grants 1 star when error ratio equals 0.15', () => {
    service.recordCompletion('ex', 3, 20);

    expect(service.getStars('ex')).toBe(1);
  });

  test('grants 0 stars when error ratio equals 0.25', () => {
    service.recordCompletion('ex', 5, 20);

    expect(service.getStars('ex')).toBe(0);
  });

  test('grants 0 stars when error ratio is above 0.25', () => {
    service.recordCompletion('ex', 10, 20);

    expect(service.getStars('ex')).toBe(0);
  });

  test('grants 3 stars when totalChars is 0', () => {
    service.recordCompletion('ex', 0, 0);

    expect(service.getStars('ex')).toBe(3);
  });

  test('two different exercise ids are stored and retrieved independently', () => {
    service.recordCompletion('exercise-a', 0, 10);
    service.recordCompletion('exercise-b', 5, 10);

    expect(service.isCompleted('exercise-a')).toBe(true);
    expect(service.getStars('exercise-a')).toBe(3);

    expect(service.isCompleted('exercise-b')).toBe(true);
    expect(service.getStars('exercise-b')).toBe(0);
  });

  test('second recordCompletion call for the same id overwrites previous values', () => {
    service.recordCompletion('ex', 0, 10);
    expect(service.getStars('ex')).toBe(3);

    service.recordCompletion('ex', 5, 20);
    expect(service.getStars('ex')).toBe(0);
    expect(service.isCompleted('ex')).toBe(true);
  });

  test('getTotalStars sums star values across completed exercises', () => {
    service.recordCompletion('exercise-a', 0, 10);
    service.recordCompletion('exercise-b', 1, 10);
    service.recordCompletion('exercise-c', 5, 20);

    expect(service.getTotalStars()).toBe(5);
  });

  test('getTotalStars ignores unrelated keys and malformed stored values', () => {
    service.recordCompletion('exercise-a', 0, 10);
    globalThis.localStorage?.setItem('not-a-star-key', '99');
    globalThis.localStorage?.setItem('broken_stars', 'oops');

    expect(service.getTotalStars()).toBe(3);
  });
});
