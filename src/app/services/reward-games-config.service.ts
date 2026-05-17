import { Injectable } from '@angular/core';

import { TortoiseGameConfig } from '../models/tortoise-game-config.model';
import { RewardGameSetup } from '../models/reward-game-setup.model';
import { TORTOISE_GAME_CONFIGS } from '../data/tortoise-game-configs';
import { REWARD_GAME_SETUPS } from '../data/reward-game-setups';

@Injectable({ providedIn: 'root' })
export class RewardGamesConfigService {
  private readonly tortoiseConfigs: TortoiseGameConfig[] = TORTOISE_GAME_CONFIGS;
  private readonly rewardGameSetups: RewardGameSetup[] = REWARD_GAME_SETUPS;

  listRewardGameSetups(): RewardGameSetup[] {
    return this.rewardGameSetups;
  }

  getRoutePath(setup: RewardGameSetup): string | undefined {
    if (setup.gameType !== 'tortoise') {
      return undefined;
    }

    return this.getTortoiseConfig(setup.id) ? `/reward-games/tortoise/${setup.id}` : undefined;
  }

  getTortoiseConfig(gameId: string): TortoiseGameConfig | undefined {
    return this.tortoiseConfigs.find(config => config.gameId === gameId);
  }
}
