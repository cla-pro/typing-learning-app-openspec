import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { TORTOISE_GAME_CONFIGS } from '../../data/tortoise-game-configs';

interface RewardGameItem {
  id: string;
  nameKey: string;
  icon: string;
  locked: boolean;
  routePath?: string;
}

@Component({
  selector: 'app-reward-games',
  imports: [HomeButtonComponent, RouterLink, TranslateModule],
  templateUrl: './reward-games.component.html',
  styleUrls: ['./reward-games.component.css']
})
export class RewardGamesComponent {
  readonly rewardGames: RewardGameItem[] = [
    {
      id: TORTOISE_GAME_CONFIGS[0].gameId,
      nameKey: 'rewardGames.games.tortoiseForestPath',
      icon: '🐢',
      locked: false,
      routePath: `/reward-games/tortoise/${TORTOISE_GAME_CONFIGS[0].gameId}`
    },
    {
      id: 'meteor-dash',
      nameKey: 'rewardGames.games.meteorDash',
      icon: '☄️',
      locked: true
    },
    {
      id: 'bubble-sorter',
      nameKey: 'rewardGames.games.bubbleSorter',
      icon: '🫧',
      locked: true
    },
    {
      id: 'key-garden',
      nameKey: 'rewardGames.games.keyGarden',
      icon: '🌱',
      locked: true
    }
  ];
}