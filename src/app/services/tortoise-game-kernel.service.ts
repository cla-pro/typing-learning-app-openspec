import { Injectable } from '@angular/core';

import { GridPosition } from '../models/grid.model';
import { TortoiseGameConfig } from '../models/tortoise-game-config.model';

export type TortoiseGameState = 'idle' | 'running' | 'completed';
export type TortoiseMovementState = 'idle' | 'moving' | 'blocked';

export interface TortoiseGameKernelSnapshot {
  gameState: TortoiseGameState;
  movementState: TortoiseMovementState;
  currentPosition: GridPosition;
  targetPosition: GridPosition | null;
}

@Injectable({ providedIn: 'root' })
export class TortoiseGameKernelService {
  private config: TortoiseGameConfig | null = null;
  private route: GridPosition[] = [];
  private routeIndex = 0;
  private gameState: TortoiseGameState = 'idle';
  private movementState: TortoiseMovementState = 'idle';
  private currentPosition: GridPosition = { col: 0, row: 0 };
  private targetPosition: GridPosition | null = null;

  initialize(config: TortoiseGameConfig): void {
    this.config = config;
    this.route = this.expandRoute(config.waypoints);
    this.routeIndex = this.findStartIndex(config.start);
    this.gameState = 'idle';
    this.movementState = 'idle';
    this.currentPosition = this.clonePosition(config.start);
    this.targetPosition = null;
  }

  start(): void {
    if (!this.config || this.gameState !== 'idle') {
      return;
    }

    this.gameState = 'running';
    this.scheduleNextMove();
  }

  getSnapshot(): TortoiseGameKernelSnapshot {
    return {
      gameState: this.gameState,
      movementState: this.movementState,
      currentPosition: this.clonePosition(this.currentPosition),
      targetPosition: this.targetPosition ? this.clonePosition(this.targetPosition) : null
    };
  }

  completeMovement(): void {
    if (this.gameState !== 'running' || this.movementState !== 'moving' || !this.targetPosition) {
      return;
    }

    this.currentPosition = this.clonePosition(this.targetPosition);
    this.targetPosition = null;
    this.routeIndex = Math.min(this.routeIndex + 1, Math.max(this.route.length - 1, 0));

    if (this.config && this.positionsEqual(this.currentPosition, this.config.end)) {
      this.gameState = 'completed';
      this.movementState = 'idle';
      return;
    }

    this.movementState = 'idle';
    this.scheduleNextMove();
  }

  private scheduleNextMove(): void {
    const nextPosition = this.route[this.routeIndex + 1];

    if (!this.config || !nextPosition) {
      if (this.config && this.positionsEqual(this.currentPosition, this.config.end)) {
        this.gameState = 'completed';
      }
      this.movementState = 'idle';
      this.targetPosition = null;
      return;
    }

    if (this.isBlocked(nextPosition)) {
      this.movementState = 'blocked';
      this.targetPosition = null;
      return;
    }

    this.targetPosition = this.clonePosition(nextPosition);
    this.movementState = 'moving';
  }

  private isBlocked(position: GridPosition): boolean {
    if (!this.config) {
      return false;
    }

    return this.config.obstacles.some(obstacle => this.positionsEqual(obstacle.position, position));
  }

  private findStartIndex(start: GridPosition): number {
    const matchedIndex = this.route.findIndex(position => this.positionsEqual(position, start));
    return matchedIndex >= 0 ? matchedIndex : 0;
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

  private positionsEqual(left: GridPosition, right: GridPosition): boolean {
    return left.col === right.col && left.row === right.row;
  }

  private clonePosition(position: GridPosition): GridPosition {
    return { col: position.col, row: position.row };
  }
}