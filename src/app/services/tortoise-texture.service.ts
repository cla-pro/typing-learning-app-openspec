import { Injectable } from '@angular/core';

const TORTOISE_ASSET_URL = 'assets/reward-game/tortoise/tortoise.png';
const DEFAULT_OBSTACLE_TYPE = 'rock';
const OBSTACLE_ASSET_URLS: Readonly<Record<string, string>> = {
  rock: 'assets/reward-game/tortoise/rock.png'
};

@Injectable({ providedIn: 'root' })
export class TortoiseTextureService {
  private readonly preloadedAssets = new Set<string>();

  constructor() {
    this.preloadAllKnownAssets();
  }

  getTortoiseAssetUrl(): string {
    this.ensurePreloaded(TORTOISE_ASSET_URL);
    return TORTOISE_ASSET_URL;
  }

  getObstacleAssetUrl(type: string): string {
    const normalizedType = type.trim().toLowerCase();
    const assetUrl = OBSTACLE_ASSET_URLS[normalizedType] ?? OBSTACLE_ASSET_URLS[DEFAULT_OBSTACLE_TYPE];
    this.ensurePreloaded(assetUrl);
    return assetUrl;
  }

  isAssetPreloaded(assetUrl: string): boolean {
    return this.preloadedAssets.has(assetUrl);
  }

  private preloadAllKnownAssets(): void {
    this.ensurePreloaded(TORTOISE_ASSET_URL);
    for (const assetUrl of Object.values(OBSTACLE_ASSET_URLS)) {
      this.ensurePreloaded(assetUrl);
    }
  }

  private ensurePreloaded(assetUrl: string): void {
    if (this.preloadedAssets.has(assetUrl)) {
      return;
    }

    // Track preloaded URLs so repeated calls are constant-time no-ops.
    this.preloadedAssets.add(assetUrl);

    if (typeof Image !== 'undefined') {
      const image = new Image();
      image.src = assetUrl;
    }
  }
}
