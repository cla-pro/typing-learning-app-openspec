import { GridPosition } from './grid.model';

export interface TortoiseObstacle {
  position: GridPosition;
  clearCharacters: string[];
}

export interface TortoiseGameConfig {
  gameId: string;
  start: GridPosition;
  end: GridPosition;
  waypoints: GridPosition[];
  obstacles: TortoiseObstacle[];
}
