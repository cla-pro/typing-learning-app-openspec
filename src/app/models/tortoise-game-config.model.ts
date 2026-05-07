import { GridPosition } from './grid.model';

export interface TortoiseObstacle {
  position: GridPosition;
  clearCharactersByLayout: Record<string, string[]>;
}

export interface TortoiseGameConfig {
  gameId: string;
  start: GridPosition;
  end: GridPosition;
  waypoints: GridPosition[];
  obstacles: TortoiseObstacle[];
}
