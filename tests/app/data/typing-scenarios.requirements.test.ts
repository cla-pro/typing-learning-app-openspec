import { describe, expect, test } from 'vitest';

import { EXERCISE_CATEGORIES_BY_LAYOUT } from '../../../src/app/data/typing-scenarios';

describe('Typing Scenarios Requirements', () => {
  test('each layout category includes a stable id', () => {
    for (const categories of Object.values(EXERCISE_CATEGORIES_BY_LAYOUT)) {
      for (const category of categories) {
        expect(typeof category.id).toBe('string');
        expect(category.id.length).toBeGreaterThan(0);
      }
    }
  });

  test('category ids are unique within each layout', () => {
    for (const categories of Object.values(EXERCISE_CATEGORIES_BY_LAYOUT)) {
      const ids = categories.map(category => category.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  test('equivalent categories share stable ids across layouts', () => {
    const frChIds = EXERCISE_CATEGORIES_BY_LAYOUT['fr-ch'].map(category => category.id);
    const deChIds = EXERCISE_CATEGORIES_BY_LAYOUT['de-ch'].map(category => category.id);
    const enUsIds = EXERCISE_CATEGORIES_BY_LAYOUT['en-us'].map(category => category.id);

    expect(new Set(frChIds)).toEqual(new Set(deChIds));
    expect(new Set(frChIds)).toEqual(new Set(enUsIds));
  });
});