import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { GridPosition } from '../../models/grid.model';
import { TortoiseGameConfig } from '../../models/tortoise-game-config.model';

const CELL_SIZE_PX = 64;
const MOVE_DURATION_MS = 400;

@Component({
  selector: 'app-tortoise-visualization',
  imports: [],
  templateUrl: './tortoise-visualization.component.html',
  styleUrls: ['./tortoise-visualization.component.css']
})
export class TortoiseVisualizationComponent implements OnChanges {
  @Input({ required: true }) config!: TortoiseGameConfig;
  @Input() clearedObstacleKeys: string[] = [];
  @Input() debugGrid = false;
  @Output() moveCompleted = new EventEmitter<void>();

  boardCols = 0;
  boardRows = 0;
  boardWidth = 0;
  boardHeight = 0;
  viewBox = '';
  pathPoints = '';

  tortoiseDisplayX = 0;
  tortoiseDisplayY = 0;
  moveDurationMs = MOVE_DURATION_MS;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.config) {
      this.computeBoardDimensions();
      this.computePathPoints();
      const startCenter = this.cellCenter(this.config.start);
      this.tortoiseDisplayX = startCenter.x;
      this.tortoiseDisplayY = startCenter.y;
    }
  }

  get tortoiseTransform(): string {
    return `translate(${this.tortoiseDisplayX}px, ${this.tortoiseDisplayY}px) translate(-50%, -50%)`;
  }

  get debugGridLines(): { x1: number; y1: number; x2: number; y2: number }[] {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let c = 0; c <= this.boardCols; c++) {
      lines.push({ x1: c * CELL_SIZE_PX, y1: 0, x2: c * CELL_SIZE_PX, y2: this.boardHeight });
    }
    for (let r = 0; r <= this.boardRows; r++) {
      lines.push({ x1: 0, y1: r * CELL_SIZE_PX, x2: this.boardWidth, y2: r * CELL_SIZE_PX });
    }
    return lines;
  }

  get debugCellLabels(): { x: number; y: number; label: string }[] {
    const labels: { x: number; y: number; label: string }[] = [];
    for (let r = 0; r < this.boardRows; r++) {
      for (let c = 0; c < this.boardCols; c++) {
        const center = this.cellCenter({ col: c, row: r });
        labels.push({ x: center.x, y: center.y, label: `(${c},${r})` });
      }
    }
    return labels;
  }

  cellCenter(pos: GridPosition): { x: number; y: number } {
    return {
      x: pos.col * CELL_SIZE_PX + CELL_SIZE_PX / 2,
      y: pos.row * CELL_SIZE_PX + CELL_SIZE_PX / 2
    };
  }

  obstacleTransform(position: GridPosition): string {
    const center = this.cellCenter(position);
    return `translate(${center.x}px, ${center.y}px) translate(-50%, -50%)`;
  }

  get visibleObstacles() {
    return this.config.obstacles.filter(obstacle => !this.isObstacleCleared(obstacle.position));
  }

  moveTortoiseTo(target: GridPosition): void {
    const center = this.cellCenter(target);
    this.tortoiseDisplayX = center.x;
    this.tortoiseDisplayY = center.y;
  }

  onTortoiseTransitionEnd(): void {
    this.moveCompleted.emit();
  }

  private computeBoardDimensions(): void {
    const allPositions: GridPosition[] = [
      this.config.start,
      this.config.end,
      ...this.config.waypoints,
      ...this.config.obstacles.map(o => o.position)
    ];
    const maxCol = Math.max(...allPositions.map(p => p.col));
    const maxRow = Math.max(...allPositions.map(p => p.row));
    this.boardCols = maxCol + 1;
    this.boardRows = maxRow + 1;
    this.boardWidth = this.boardCols * CELL_SIZE_PX;
    this.boardHeight = this.boardRows * CELL_SIZE_PX;
    this.viewBox = `0 0 ${this.boardWidth} ${this.boardHeight}`;
  }

  private computePathPoints(): void {
    this.pathPoints = this.config.waypoints
      .map(wp => {
        const center = this.cellCenter(wp);
        return `${center.x},${center.y}`;
      })
      .join(' ');
  }

  private isObstacleCleared(position: GridPosition): boolean {
    const key = `${position.col},${position.row}`;
    return this.clearedObstacleKeys.includes(key);
  }
}
