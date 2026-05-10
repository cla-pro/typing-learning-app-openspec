import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
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
import { SettingsService } from '../../services/settings.service';
import { RewardGameCompletionService } from '../../services/reward-game-completion.service';

const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'AltGraph', 'CapsLock', 'Meta', 'OS']);
const STREAM_SIZE_SCALE_SPAN = 0.6;

@Component({
  selector: 'app-tortoise-game-host',
  imports: [HomeButtonComponent, TortoiseVisualizationComponent, TranslateModule],
  templateUrl: './tortoise-game-host.component.html',
  styleUrls: ['./tortoise-game-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TortoiseGameHostComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly rewardGamesConfigService = inject(RewardGamesConfigService);
  private readonly tortoiseGameKernelService = inject(TortoiseGameKernelService);
  private readonly settingsService = inject(SettingsService);
  private readonly rewardGameCompletionService = inject(RewardGameCompletionService);

  @ViewChild('tortoiseGameContent')
  private tortoiseGameContentRef?: ElementRef<HTMLElement>;

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
  nextObstacleChars: string[] = [];
  typedObstacleChars: string[] = [];
  clearedObstacleKeys: string[] = [];
  obstacleCharItems: Array<{ char: string; typed: boolean; index: number }> = [];
  streamSizeScale = 1;

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
    queueMicrotask(() => this.focusGameContent());
  }

  onGameKeydown(event: KeyboardEvent): void {
    if (this.gameState !== 'running') {
      return;
    }

    if (MODIFIER_KEYS.has(event.key)) {
      return;
    }

    this.tortoiseGameKernelService.typeObstacleChar(event.key);
    this.refreshKernelSnapshot();
  }

  onMoveCompleted(): void {
    queueMicrotask(() => {
      this.tortoiseGameKernelService.completeMovement();
      this.refreshKernelSnapshot();
    });
  }

  private refreshKernelSnapshot(): void {
    const previousGameState = this.gameState;
    const snapshot = this.tortoiseGameKernelService.getSnapshot();
    this.gameState = snapshot.gameState;
    this.movementState = snapshot.movementState;
    this.currentPosition = snapshot.currentPosition;
    this.targetPosition = snapshot.targetPosition;
    this.nextObstacleChars = snapshot.nextObstacleChars;
    this.typedObstacleChars = snapshot.typedObstacleChars;
    this.clearedObstacleKeys = snapshot.clearedObstacleKeys;
    this.obstacleCharItems = snapshot.nextObstacleChars.map((char, i) => ({
      char,
      typed: i < snapshot.typedObstacleChars.length,
      index: i
    }));
    this.streamSizeScale = 1 + (this.settingsService.getStreamSizeValue() * STREAM_SIZE_SCALE_SPAN);

    if (previousGameState !== 'completed' && this.gameState === 'completed' && this.config) {
      this.rewardGameCompletionService.markCompleted(this.config.gameId);
    }

    if (!this.targetPosition) {
      this.lastAnimatedTargetKey = null;
      this.cdr.markForCheck();
    } else {
      this.cdr.markForCheck();
      this.syncVisualizationTarget();
    }
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
      if (this.visualizationComponent && this.lastAnimatedTargetKey === targetKey) {
        this.visualizationComponent.moveTortoiseTo(nextTarget);
      }
    });
  }

  private positionKey(position: GridPosition): string {
    return `${position.col},${position.row}`;
  }

  private focusGameContent(): void {
    this.tortoiseGameContentRef?.nativeElement.focus();
  }
}
