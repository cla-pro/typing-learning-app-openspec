import { describe, expect, test } from 'vitest';

import {
  getCompletionAnimationCandidates,
  getStarsCelebrationAnimationPath,
  normalizeStarCount,
  pickRandomCompletionAnimation
} from '../../../src/app/data/completion-animation-assets';

describe('Completion Animation Assets Requirements', () => {
  test('provides a completion bucket for each star count', () => {
    expect(getCompletionAnimationCandidates(0).length).toBeGreaterThan(0);
    expect(getCompletionAnimationCandidates(1).length).toBeGreaterThan(0);
    expect(getCompletionAnimationCandidates(2).length).toBeGreaterThan(0);
    expect(getCompletionAnimationCandidates(3).length).toBeGreaterThan(0);
  });

  test('normalizes out-of-range star values to supported buckets', () => {
    expect(normalizeStarCount(-2)).toBe(0);
    expect(normalizeStarCount(99)).toBe(3);
  });

  test('builds follow-up stars GIF path with <stars>-stars.gif convention', () => {
    expect(getStarsCelebrationAnimationPath(2)).toBe('assets/star-gifs/2-stars.gif');
  });

  test('allows deterministic random selection through a test double', () => {
    const selected = pickRandomCompletionAnimation(1, () => 0);
    expect(selected).toContain('assets/animation-completion/1/');
  });
});
