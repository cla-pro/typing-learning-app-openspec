import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { RewardGameSetup } from '../../models/reward-game-setup.model';
import { RewardGamesConfigService } from '../../services/reward-games-config.service';
import { RewardGameCompletionService } from '../../services/reward-game-completion.service';
import { RewardGameUnlockService } from '../../services/reward-game-unlock.service';

interface RewardGameItem {
  id: string;
  nameKey: string;
  icon: string;
  locked: boolean;
  routePath?: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-reward-games',
  imports: [HomeButtonComponent, RouterLink, TranslateModule],
  templateUrl: './reward-games.component.html',
  styleUrls: ['./reward-games.component.css']
})
export class RewardGamesComponent {
  private readonly rewardGamesConfigService = inject(RewardGamesConfigService);
  private readonly rewardGameUnlockService = inject(RewardGameUnlockService);
  private readonly rewardGameCompletionService = inject(RewardGameCompletionService);

  readonly rewardGames: RewardGameItem[] = this.rewardGamesConfigService
    .listRewardGameSetups()
    .map((setup: RewardGameSetup) => {
      const routePath = this.rewardGamesConfigService.getRoutePath(setup);
      const isImplemented = typeof routePath === 'string';
      const isUnlocked = this.rewardGameUnlockService.isUnlocked(setup);
      const launchable = isImplemented && isUnlocked;

      return {
        id: setup.id,
        nameKey: setup.nameKey,
        icon: setup.icon,
        locked: !launchable,
        routePath: launchable ? routePath : undefined,
        isCompleted: this.rewardGameCompletionService.isCompleted(setup.id)
      };
    });
}