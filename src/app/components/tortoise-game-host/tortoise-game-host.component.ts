import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { RewardGamesConfigService } from '../../services/reward-games-config.service';
import { TortoiseGameConfig } from '../../models/tortoise-game-config.model';

@Component({
  selector: 'app-tortoise-game-host',
  imports: [HomeButtonComponent],
  templateUrl: './tortoise-game-host.component.html',
  styleUrls: ['./tortoise-game-host.component.css']
})
export class TortoiseGameHostComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly rewardGamesConfigService = inject(RewardGamesConfigService);

  config: TortoiseGameConfig | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const gameId = params.get('gameId') ?? '';
      this.config = this.rewardGamesConfigService.getTortoiseConfig(gameId);
      if (!this.config) {
        this.router.navigateByUrl('/exercices/not-found');
      }
    });
  }
}
