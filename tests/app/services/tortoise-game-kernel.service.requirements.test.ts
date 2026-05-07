import { describe, expect, test } from 'vitest';
import { TestBed } from '@angular/core/testing';

import {
  TortoiseGameKernelService,
  TortoiseGameKernelSnapshot
} from '../../../src/app/services/tortoise-game-kernel.service';
import { TortoiseGameConfig } from '../../../src/app/models/tortoise-game-config.model';
import { SettingsService } from '../../../src/app/services/settings.service';

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
      clearCharactersByLayout: {
        'fr-ch': ['a'],
        'de-ch': ['a']
      }
    }
  ]
};

const INVALID_LAYOUT_CONFIG: TortoiseGameConfig = {
  gameId: 'invalid-layout-path',
  start: { col: 0, row: 0 },
  end: { col: 1, row: 0 },
  waypoints: [
    { col: 0, row: 0 },
    { col: 1, row: 0 }
  ],
  obstacles: [
    {
      position: { col: 1, row: 0 },
      clearCharactersByLayout: {
        'fr-ch': ['a']
      }
    }
  ]
};

function createService(layout: string = 'fr-ch'): TortoiseGameKernelService {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [
      TortoiseGameKernelService,
      {
        provide: SettingsService,
        useValue: {
          getChosenLayout: () => layout
        }
      }
    ]
  });

  return TestBed.inject(TortoiseGameKernelService);
}

function expectSnapshot(snapshot: TortoiseGameKernelSnapshot, expected: Partial<TortoiseGameKernelSnapshot>): void {
  expect(snapshot).toMatchObject(expected);
}

describe('TortoiseGameKernelService Requirements', () => {
  test('initialize(config) resets kernel state to the configured start position', () => {
    const service = createService();

    service.initialize(CLEAR_CONFIG);

    expectSnapshot(service.getSnapshot(), {
      gameState: 'idle',
      movementState: 'idle',
      currentPosition: { col: 0, row: 0 },
      targetPosition: null,
      nextObstacleChars: [],
      typedObstacleChars: [],
      clearedObstacleKeys: []
    });
  });

  test('initialize(config) fails when an obstacle is missing layout sequences', () => {
    const service = createService();

    expect(() => service.initialize(INVALID_LAYOUT_CONFIG)).toThrow(
      'Every obstacle must define character sequences for all supported keyboard layouts.'
    );
  });

  test('start() computes the first cell-sized movement step from the path', () => {
    const service = createService();

    service.initialize(CLEAR_CONFIG);
    service.start();

    expectSnapshot(service.getSnapshot(), {
      gameState: 'running',
      movementState: 'moving',
      currentPosition: { col: 0, row: 0 },
      targetPosition: { col: 1, row: 0 }
    });
  });

  test('start() blocks when the next path cell contains an uncleared obstacle', () => {
    const service = createService();

    service.initialize(BLOCKED_CONFIG);
    service.start();

    expectSnapshot(service.getSnapshot(), {
      gameState: 'running',
      movementState: 'blocked',
      currentPosition: { col: 0, row: 0 },
      targetPosition: null,
      nextObstacleChars: ['a'],
      typedObstacleChars: []
    });
  });

  test('mismatching obstacle input is ignored and does not reset progress', () => {
    const service = createService();

    service.initialize(BLOCKED_CONFIG);
    service.start();

    service.typeObstacleChar('x');
    expect(service.getSnapshot().typedObstacleChars).toEqual([]);

    service.typeObstacleChar('a');
    expect(service.getSnapshot().typedObstacleChars).toEqual([]);
  });

  test('clearing a blocking obstacle resumes movement through that cell', () => {
    const service = createService();

    service.initialize(BLOCKED_CONFIG);
    service.start();

    service.typeObstacleChar('a');

    expectSnapshot(service.getSnapshot(), {
      gameState: 'running',
      movementState: 'moving',
      targetPosition: { col: 1, row: 0 },
      clearedObstacleKeys: ['1,0']
    });
  });

  test('typing uses the selected keyboard layout sequence', () => {
    const layoutConfig: TortoiseGameConfig = {
      ...BLOCKED_CONFIG,
      obstacles: [
        {
          position: { col: 1, row: 0 },
          clearCharactersByLayout: {
            'fr-ch': ['a'],
            'de-ch': ['z']
          }
        }
      ]
    };

    const service = createService('de-ch');
    service.initialize(layoutConfig);
    service.start();

    service.typeObstacleChar('a');
    expect(service.getSnapshot().movementState).toBe('blocked');

    service.typeObstacleChar('z');
    expect(service.getSnapshot().movementState).toBe('moving');
  });

  test('completeMovement() switches the game to completed when the tortoise reaches the end', () => {
    const service = createService();

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
