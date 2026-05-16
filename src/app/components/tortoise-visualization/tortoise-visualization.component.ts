import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';

import { GridPosition } from '../../models/grid.model';
import { TortoiseGameConfig } from '../../models/tortoise-game-config.model';
import { TortoiseTextureService } from '../../services/tortoise-texture.service';

const CELL_SIZE_PX = 64;
const MOVE_DURATION_MS = 800;

type TortoiseDirection = 'right' | 'down' | 'left' | 'up';

@Component({
  selector: 'app-tortoise-visualization',
  imports: [],
  templateUrl: './tortoise-visualization.component.html',
  styleUrls: ['./tortoise-visualization.component.css']
})
export class TortoiseVisualizationComponent implements OnChanges {
  private readonly tortoiseTextureService = inject(TortoiseTextureService);

  @Input({ required: true }) config!: TortoiseGameConfig;
  @Input() clearedObstacleKeys: string[] = [];
  @Input() debugGrid = false;
  @Output() moveCompleted = new EventEmitter<void>();

  boardCols = 0;
  boardRows = 0;
  boardWidth = 0;
  boardHeight = 0;
  viewBox = '';
  pathData = '';

  tortoiseDisplayX = 0;
  tortoiseDisplayY = 0;
  tortoiseDirection: TortoiseDirection = 'right';
  moveDurationMs = MOVE_DURATION_MS;
  private tortoiseGridPosition: GridPosition | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.config) {
      this.computeBoardDimensions();
      this.computePathPoints();
      const startCenter = this.cellCenter(this.config.start);
      this.tortoiseDisplayX = startCenter.x;
      this.tortoiseDisplayY = startCenter.y;
      this.tortoiseGridPosition = { ...this.config.start };
      this.tortoiseDirection = 'right';
    }
  }

  get tortoiseTransform(): string {
    return `translate(${this.tortoiseDisplayX}px, ${this.tortoiseDisplayY}px) translate(-50%, -50%)`;
  }

  get tortoiseRotationAngle(): number {
    if (this.tortoiseDirection === 'down') {
      return 90;
    }
    if (this.tortoiseDirection === 'left') {
      return 180;
    }
    if (this.tortoiseDirection === 'up') {
      return 270;
    }
    return 0;
  }

  get tortoiseAssetUrl(): string {
    return this.tortoiseTextureService.getTortoiseAssetUrl();
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

  getObstacleAssetUrl(type: string): string {
    return this.tortoiseTextureService.getObstacleAssetUrl(type);
  }

  moveTortoiseTo(target: GridPosition): void {
    this.updateDirectionForTarget(target);
    const center = this.cellCenter(target);
    this.tortoiseDisplayX = center.x;
    this.tortoiseDisplayY = center.y;
    this.tortoiseGridPosition = { ...target };
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
    const points = this.config.waypoints
      .map(wp => {
        const center = this.cellCenter(wp);
        return `${center.x},${center.y}`;
      });

    if (points.length === 0) {
      this.pathData = '';
      return;
    }

    this.pathData = `M ${points[0]}${points.slice(1).map(point => ` L ${point}`).join('')}`;
  }

  private isObstacleCleared(position: GridPosition): boolean {
    const key = `${position.col},${position.row}`;
    return this.clearedObstacleKeys.includes(key);
  }

  private updateDirectionForTarget(target: GridPosition): void {
    if (!this.tortoiseGridPosition) {
      return;
    }

    // Movement route is orthogonal, so one axis delta determines heading.
    if (target.col > this.tortoiseGridPosition.col) {
      this.tortoiseDirection = 'right';
    } else if (target.col < this.tortoiseGridPosition.col) {
      this.tortoiseDirection = 'left';
    } else if (target.row > this.tortoiseGridPosition.row) {
      this.tortoiseDirection = 'down';
    } else if (target.row < this.tortoiseGridPosition.row) {
      this.tortoiseDirection = 'up';
    }
  }
}
