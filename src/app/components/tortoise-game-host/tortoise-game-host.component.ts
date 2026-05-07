import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { TortoiseVisualizationComponent } from '../tortoise-visualization/tortoise-visualization.component';
import { RewardGamesConfigService } from '../../services/reward-games-config.service';
import { TortoiseGameConfig } from '../../models/tortoise-game-config.model';
import {
  TortoiseGameKernelService,
  TortoiseGameState,
  TortoiseMovementState
} from '../../services/tortoise-game-kernel.service';
import { GridPosition } from '../../models/grid.model';

@Component({
  selector: 'app-tortoise-game-host',
  imports: [HomeButtonComponent, TortoiseVisualizationComponent, TranslateModule],
  templateUrl: './tortoise-game-host.component.html',
  styleUrls: ['./tortoise-game-host.component.css']
})
export class TortoiseGameHostComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly rewardGamesConfigService = inject(RewardGamesConfigService);
  private readonly tortoiseGameKernelService = inject(TortoiseGameKernelService);

  @ViewChild(TortoiseVisualizationComponent)
  set tortoiseVisualizationComponent(component: TortoiseVisualizationComponent | undefined) {
    this.visualizationComponent = component;
    this.syncVisualizationTarget();
  }

  config: TortoiseGameConfig | undefined;
  gameState: TortoiseGameState = 'idle';
  movementState: TortoiseMovementState = 'idle';
  currentPosition: GridPosition | null = null;
  targetPosition: GridPosition | null = null;

  private visualizationComponent?: TortoiseVisualizationComponent;
  private lastAnimatedTargetKey: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const gameId = params.get('gameId') ?? '';
      this.config = this.rewardGamesConfigService.getTortoiseConfig(gameId);
      if (!this.config) {
        this.router.navigateByUrl('/exercices/not-found');
        return;
      }

      this.tortoiseGameKernelService.initialize(this.config);
      this.refreshKernelSnapshot();
    });
  }

  get isStartDisabled(): boolean {
    return this.gameState !== 'idle';
  }

  startGame(): void {
    this.tortoiseGameKernelService.start();
    this.refreshKernelSnapshot();
  }

  onMoveCompleted(): void {
    queueMicrotask(() => {
      this.tortoiseGameKernelService.completeMovement();
      this.refreshKernelSnapshot();
    });
  }

  private refreshKernelSnapshot(): void {
    const snapshot = this.tortoiseGameKernelService.getSnapshot();
    this.gameState = snapshot.gameState;
    this.movementState = snapshot.movementState;
    this.currentPosition = snapshot.currentPosition;
    this.targetPosition = snapshot.targetPosition;

    if (!this.targetPosition) {
      this.lastAnimatedTargetKey = null;
      return;
    }

    this.syncVisualizationTarget();
  }

  private syncVisualizationTarget(): void {
    if (!this.visualizationComponent || !this.targetPosition) {
      return;
    }

    const targetKey = this.positionKey(this.targetPosition);
    if (targetKey === this.lastAnimatedTargetKey) {
      return;
    }

    this.lastAnimatedTargetKey = targetKey;
    const nextTarget = { ...this.targetPosition };

    queueMicrotask(() => {
      if (!this.visualizationComponent || this.lastAnimatedTargetKey !== targetKey) {
        return;
      }

      this.visualizationComponent.moveTortoiseTo(nextTarget);
    });
  }

  private positionKey(position: GridPosition): string {
    return `${position.col},${position.row}`;
  }
}
