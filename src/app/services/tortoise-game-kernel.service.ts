import { Injectable, inject } from '@angular/core';

import { SUPPORTED_KEYBOARD_LAYOUT_IDS } from '../data/keyboard-layouts';
import { GridPosition } from '../models/grid.model';
import { TortoiseGameConfig, TortoiseObstacle } from '../models/tortoise-game-config.model';
import { SettingsService } from './settings.service';

export type TortoiseGameState = 'idle' | 'running' | 'completed';
export type TortoiseMovementState = 'idle' | 'moving' | 'blocked';

export interface TortoiseGameKernelSnapshot {
  gameState: TortoiseGameState;
  movementState: TortoiseMovementState;
  currentPosition: GridPosition;
  targetPosition: GridPosition | null;
  nextObstacleChars: string[];
  typedObstacleChars: string[];
  clearedObstacleKeys: string[];
}

@Injectable({ providedIn: 'root' })
export class TortoiseGameKernelService {
  settingsService: Pick<SettingsService, 'getChosenLayout'> = inject(SettingsService);

  private config!: TortoiseGameConfig;
  private route: GridPosition[] = [];
  private routeIndex = 0;
  private gameState: TortoiseGameState = 'idle';
  private movementState: TortoiseMovementState = 'idle';
  private currentPosition: GridPosition = { col: 0, row: 0 };
  private targetPosition: GridPosition | null = null;
  private readonly clearedObstacleKeys = new Set<string>();
  private typedObstacleIndex = 0;

  initialize(config: TortoiseGameConfig): void {
    if (!this.hasFullLayoutCoverage(config)) {
      throw new Error('Every obstacle must define character sequences for all supported keyboard layouts.');
    }

    this.config = config;
    this.route = this.expandRoute(config.waypoints);
    this.routeIndex = 0;
    this.gameState = 'idle';
    this.movementState = 'idle';
    this.currentPosition = this.clonePosition(config.start);
    this.targetPosition = null;
    this.clearedObstacleKeys.clear();
    this.typedObstacleIndex = 0;
  }

  start(): void {
    if (this.gameState === 'idle') {
      this.gameState = 'running';
      this.scheduleNextMove();
    }
  }

  getSnapshot(): TortoiseGameKernelSnapshot {
    const nextObstacle = this.gameState === 'running' ? this.getNextObstacle() : undefined;
    const nextObstacleChars = nextObstacle ? this.getObstacleCharsForCurrentLayout(nextObstacle) : [];

    return {
      gameState: this.gameState,
      movementState: this.movementState,
      currentPosition: this.clonePosition(this.currentPosition),
      targetPosition: this.targetPosition ? this.clonePosition(this.targetPosition) : null,
      nextObstacleChars,
      typedObstacleChars: nextObstacleChars.slice(0, this.typedObstacleIndex),
      clearedObstacleKeys: [...this.clearedObstacleKeys]
    };
  }

  typeObstacleChar(char: string): void {
    if (this.gameState !== 'running') {
      return;
    }

    const nextObstacle = this.getNextObstacle();
    if (!nextObstacle) {
      return;
    }

    const chars = this.getObstacleCharsForCurrentLayout(nextObstacle);
    if (chars.length === 0 || this.typedObstacleIndex >= chars.length) {
      return;
    }

    if (char !== chars[this.typedObstacleIndex]) {
      return;
    }

    this.typedObstacleIndex += 1;

    if (this.typedObstacleIndex >= chars.length) {
      this.clearedObstacleKeys.add(this.obstacleKey(nextObstacle));
      this.typedObstacleIndex = 0;

      if (this.movementState === 'blocked') {
        this.scheduleNextMove();
      }
    }
  }

  completeMovement(): void {
    if (this.gameState !== 'running' || this.movementState !== 'moving' || !this.targetPosition) {
      return;
    }

    this.currentPosition = this.clonePosition(this.targetPosition);
    this.targetPosition = null;
    this.routeIndex = Math.min(this.routeIndex + 1, Math.max(this.route.length - 1, 0));
    this.movementState = 'idle';

    if (this.positionsEqual(this.currentPosition, this.config.end)) {
      this.gameState = 'completed';
    } else {
      this.scheduleNextMove();
    }
  }

  private scheduleNextMove(): void {
    const nextPosition = this.route[this.routeIndex + 1];

    if (!nextPosition) {
      if (this.positionsEqual(this.currentPosition, this.config.end)) {
        this.gameState = 'completed';
      }
      this.movementState = 'idle';
      this.targetPosition = null;
      return;
    }

    if (this.isBlocked(nextPosition)) {
      this.movementState = 'blocked';
      this.targetPosition = null;
    } else {
      this.targetPosition = this.clonePosition(nextPosition);
      this.movementState = 'moving';
    }
  }

  private isBlocked(position: GridPosition): boolean {
    const blockingObstacle = this.findObstacleAt(position);

    if (!blockingObstacle) {
      return false;
    }

    return !this.clearedObstacleKeys.has(this.obstacleKey(blockingObstacle));
  }

  private findObstacleAt(position: GridPosition): TortoiseObstacle | undefined {
    return this.config.obstacles.find(obstacle => this.positionsEqual(obstacle.position, position));
  }

  private getNextObstacle(): TortoiseObstacle | undefined {
    for (let index = this.routeIndex + 1; index < this.route.length; index++) {
      const obstacle = this.findObstacleAt(this.route[index]);
      if (!obstacle) {
        continue;
      }

      if (!this.clearedObstacleKeys.has(this.obstacleKey(obstacle))) {
        return obstacle;
      }
    }

    return undefined;
  }

  private getObstacleCharsForCurrentLayout(obstacle: TortoiseObstacle): string[] {
    const layout = this.settingsService.getChosenLayout();
    return [...(obstacle.clearCharactersByLayout[layout] ?? [])];
  }

  private obstacleKey(obstacle: TortoiseObstacle): string {
    return this.positionKey(obstacle.position);
  }

  private positionKey(position: GridPosition): string {
    return `${position.col},${position.row}`;
  }

  private expandRoute(waypoints: GridPosition[]): GridPosition[] {
    if (waypoints.length === 0) {
      return [];
    }

    const expanded: GridPosition[] = [this.clonePosition(waypoints[0])];

    for (let index = 1; index < waypoints.length; index++) {
      const previous = waypoints[index - 1];
      const current = waypoints[index];

      if (previous.col !== current.col && previous.row !== current.row) {
        throw new Error('Tortoise path segments must be orthogonal.');
      }

      if (previous.col === current.col) {
        const step = previous.row < current.row ? 1 : -1;
        for (let row = previous.row + step; row !== current.row + step; row += step) {
          expanded.push({ col: current.col, row });
        }
        continue;
      }

      const step = previous.col < current.col ? 1 : -1;
      for (let col = previous.col + step; col !== current.col + step; col += step) {
        expanded.push({ col, row: current.row });
      }
    }

    return expanded;
  }

  private hasFullLayoutCoverage(config: TortoiseGameConfig): boolean {
    return config.obstacles.every(obstacle => {
      return SUPPORTED_KEYBOARD_LAYOUT_IDS.every(layout => {
        const chars = obstacle.clearCharactersByLayout[layout];
        return Array.isArray(chars) && chars.length > 0;
      });
    });
  }

  private positionsEqual(left: GridPosition, right: GridPosition): boolean {
    return left.col === right.col && left.row === right.row;
  }

  private clonePosition(position: GridPosition): GridPosition {
    return { col: position.col, row: position.row };
  }
}
