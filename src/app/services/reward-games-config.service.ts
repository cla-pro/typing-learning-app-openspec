import { Injectable } from '@angular/core';

import { TortoiseGameConfig } from '../models/tortoise-game-config.model';
import { TORTOISE_GAME_CONFIGS } from '../data/tortoise-game-configs';

@Injectable({ providedIn: 'root' })
export class RewardGamesConfigService {
  private readonly tortoiseConfigs: TortoiseGameConfig[] = TORTOISE_GAME_CONFIGS;

  getTortoiseConfig(gameId: string): TortoiseGameConfig | undefined {
    return this.tortoiseConfigs.find(config => config.gameId === gameId);
  }
}
