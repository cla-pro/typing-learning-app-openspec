import { beforeEach, describe, expect, test, vi } from 'vitest';

import { RewardGameCompletionService } from '../../../src/app/services/reward-game-completion.service';

describe('RewardGameCompletionService Requirements', () => {
  let service: RewardGameCompletionService;

  beforeEach(() => {
    globalThis.localStorage?.clear();
    service = new RewardGameCompletionService();
  });

  test('markCompleted stores true at completion key and can be read with isCompleted', () => {
    service.markCompleted('forest-path');

    expect(globalThis.localStorage?.getItem('reward-game-forest-path-completion')).toBe('true');
    expect(service.isCompleted('forest-path')).toBe(true);
  });

  test('isCompleted returns false when completion key is missing or not true', () => {
    expect(service.isCompleted('unknown')).toBe(false);

    globalThis.localStorage?.setItem('reward-game-something-completion', 'false');
    expect(service.isCompleted('something')).toBe(false);
  });

  test('returns false and does not throw when localStorage access throws', () => {
    const storageSpy = vi.spyOn(globalThis, 'localStorage', 'get').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(() => service.markCompleted('blocked-game')).not.toThrow();
    expect(service.isCompleted('blocked-game')).toBe(false);

    storageSpy.mockRestore();
  });
});
