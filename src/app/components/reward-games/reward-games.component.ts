import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HomeButtonComponent } from '../home-button/home-button.component';

interface RewardGameItem {
  id: string;
  nameKey: string;
  icon: string;
  locked: boolean;
}

@Component({
  selector: 'app-reward-games',
  imports: [HomeButtonComponent, TranslateModule],
  templateUrl: './reward-games.component.html',
  styleUrls: ['./reward-games.component.css']
})
export class RewardGamesComponent {
  readonly rewardGames: RewardGameItem[] = [
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