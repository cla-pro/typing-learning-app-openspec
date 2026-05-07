import { describe, expect, test } from 'vitest';

import {
  TortoiseGameKernelService,
  TortoiseGameKernelSnapshot
} from '../../../src/app/services/tortoise-game-kernel.service';
import { TortoiseGameConfig } from '../../../src/app/models/tortoise-game-config.model';

const BLOCKED_CONFIG: TortoiseGameConfig = {
  gameId: 'blocked-path',
  start: { col: 0, row: 0 },
  end: { col: 3, row: 0 },
  waypoints: [
    { col: 0, row: 0 },
    { col: 3, row: 0 }
  ],
  obstacles: [
    {
      position: { col: 1, row: 0 },
      clearCharacters: ['a']
    }
  ]
};

const CLEAR_CONFIG: TortoiseGameConfig = {
  gameId: 'clear-path',
  start: { col: 0, row: 0 },
  end: { col: 2, row: 0 },
  waypoints: [
    { col: 0, row: 0 },
    { col: 2, row: 0 }
  ],
  obstacles: []
};

function expectSnapshot(snapshot: TortoiseGameKernelSnapshot, expected: Partial<TortoiseGameKernelSnapshot>): void {
  expect(snapshot).toMatchObject(expected);
}

describe('TortoiseGameKernelService Requirements', () => {
  test('initialize(config) resets kernel state to the configured start position', () => {
    const service = new TortoiseGameKernelService();

    service.initialize(CLEAR_CONFIG);

    expectSnapshot(service.getSnapshot(), {
      gameState: 'idle',
      movementState: 'idle',
      currentPosition: { col: 0, row: 0 },
      targetPosition: null
    });
  });

  test('start() computes the first cell-sized movement step from the path', () => {
    const service = new TortoiseGameKernelService();

    service.initialize(CLEAR_CONFIG);
    service.start();

    expectSnapshot(service.getSnapshot(), {
      gameState: 'running',
      movementState: 'moving',
      currentPosition: { col: 0, row: 0 },
      targetPosition: { col: 1, row: 0 }
    });
  });

  test('start() blocks immediately when the next path cell contains an obstacle', () => {
    const service = new TortoiseGameKernelService();

    service.initialize(BLOCKED_CONFIG);
    service.start();

    expectSnapshot(service.getSnapshot(), {
      gameState: 'running',
      movementState: 'blocked',
      currentPosition: { col: 0, row: 0 },
      targetPosition: null
    });
  });

  test('completeMovement() commits the move and evaluates the next step', () => {
    const service = new TortoiseGameKernelService();

    service.initialize(CLEAR_CONFIG);
    service.start();

    service.completeMovement();

    expectSnapshot(service.getSnapshot(), {
      gameState: 'running',
      movementState: 'moving',
      currentPosition: { col: 1, row: 0 },
      targetPosition: { col: 2, row: 0 }
    });
  });

  test('completeMovement() switches the game to completed when the tortoise reaches the end', () => {
    const service = new TortoiseGameKernelService();

    service.initialize(CLEAR_CONFIG);
    service.start();
    service.completeMovement();

    service.completeMovement();

    expectSnapshot(service.getSnapshot(), {
      gameState: 'completed',
      movementState: 'idle',
      currentPosition: { col: 2, row: 0 },
      targetPosition: null
    });
  });
});