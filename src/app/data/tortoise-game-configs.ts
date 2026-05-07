import { TortoiseGameConfig } from '../models/tortoise-game-config.model';

export const TORTOISE_GAME_CONFIGS: TortoiseGameConfig[] = [
  {
    gameId: 'tortoise-forest-path',
    start: { col: 0, row: 4 },
    end: { col: 8, row: 0 },
    waypoints: [
      { col: 0, row: 4 },
      { col: 4, row: 4 },
      { col: 4, row: 0 },
      { col: 8, row: 0 }
    ],
    obstacles: [
      {
        position: { col: 2, row: 4 },
        clearCharactersByLayout: {
          'fr-ch': ['a', 's', 'd'],
          'de-ch': ['a', 's', 'd'],
          'en-us': ['a', 's', 'd']
        }
      },
      {
        position: { col: 4, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['f', 'g'],
          'de-ch': ['f', 'g'],
          'en-us': ['f', 'g']
        }
      },
      {
        position: { col: 6, row: 0 },
        clearCharactersByLayout: {
          'fr-ch': ['j', 'k', 'l'],
          'de-ch': ['j', 'k', 'l'],
          'en-us': ['j', 'k', 'l']
        }
      }
    ]
  }
];
