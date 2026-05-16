import { beforeEach, describe, expect, test } from 'vitest';

import { TortoiseTextureService } from '../../../src/app/services/tortoise-texture.service';

describe('TortoiseTextureService Requirements', () => {
  let service: TortoiseTextureService;

  beforeEach(() => {
    service = new TortoiseTextureService();
  });

  test('returns the tortoise asset URL and keeps it in preload cache', () => {
    const url = service.getTortoiseAssetUrl();

    expect(url).toBe('assets/reward-game/tortoise/tortoise.png');
    expect(service.isAssetPreloaded(url)).toBe(true);
  });

  test('returns default obstacle asset URL for unknown obstacle types', () => {
    const fallbackUrl = service.getObstacleAssetUrl('unknown-obstacle');

    expect(fallbackUrl).toBe('assets/reward-game/obstacles/rock.png');
    expect(service.isAssetPreloaded(fallbackUrl)).toBe(true);
  });

  test('returns obstacle asset URL for known obstacle type', () => {
    const url = service.getObstacleAssetUrl('rock');

    expect(url).toBe('assets/reward-game/tortoise/rock.png');
  });
});
