import { TortoiseGameConfig } from '../models/tortoise-game-config.model';

export const TORTOISE_GAME_CONFIGS: TortoiseGameConfig[] = [
  {
    gameId: 'tortoise-path-1',
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
          'fr-ch': ['l', 'a', 'c'],
          'de-ch': ['s', 'e', 'e'],
          'en-us': ['l', 'a', 'k', 'e']
        }
      },
      {
        position: { col: 4, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['c', 'h', 'a', 't'],
          'de-ch': ['h', 'a', 'u', 's'],
          'en-us': ['h', 'o', 'm', 'e']
        }
      },
      {
        position: { col: 6, row: 0 },
        clearCharactersByLayout: {
          'fr-ch': ['b', 'l', 'e', 'u'],
          'de-ch': ['b', 'l', 'a', 'u'],
          'en-us': ['b', 'l', 'u', 'e']
        }
      }
    ]
  },
  {
    gameId: 'tortoise-path-2',
    start: { col: 0, row: 4 },
    end: { col: 8, row: 0 },
    waypoints: [
      { col: 0, row: 4 },
      { col: 2, row: 4 },
      { col: 2, row: 2 },
      { col: 5, row: 2 },
      { col: 5, row: 0 },
      { col: 8, row: 0 }
    ],
    obstacles: [
      {
        position: { col: 1, row: 4 },
        clearCharactersByLayout: {
          'fr-ch': ['r', 'u', 'e'],
          'de-ch': ['w', 'e', 'g'],
          'en-us': ['r', 'o', 'a', 'd']
        }
      },
      {
        position: { col: 2, row: 3 },
        clearCharactersByLayout: {
          'fr-ch': ['l', 'u', 'n', 'e'],
          'de-ch': ['m', 'o', 'n', 'd'],
          'en-us': ['m', 'o', 'o', 'n']
        }
      },
      {
        position: { col: 4, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['e', 'a', 'u'],
          'de-ch': ['s', 'e', 'e'],
          'en-us': ['l', 'a', 'k', 'e']
        }
      },
      {
        position: { col: 6, row: 0 },
        clearCharactersByLayout: {
          'fr-ch': ['a', 'm', 'i'],
          'de-ch': ['g', 'a', 's', 't'],
          'en-us': ['a', 'l', 'l', 'y']
        }
      }
    ]
  },
  {
    gameId: 'tortoise-path-3',
    start: { col: 0, row: 4 },
    end: { col: 8, row: 0 },
    waypoints: [
      { col: 0, row: 4 },
      { col: 0, row: 1 },
      { col: 3, row: 1 },
      { col: 3, row: 3 },
      { col: 6, row: 3 },
      { col: 6, row: 0 },
      { col: 8, row: 0 }
    ],
    obstacles: [
      {
        position: { col: 0, row: 3 },
        clearCharactersByLayout: {
          'fr-ch': ['p', 'o', 'r', 't'],
          'de-ch': ['t', 'o', 'r'],
          'en-us': ['g', 'a', 't', 'e']
        }
      },
      {
        position: { col: 1, row: 1 },
        clearCharactersByLayout: {
          'fr-ch': ['r', 'o', 's', 'e'],
          'de-ch': ['r', 'o', 's', 'e'],
          'en-us': ['r', 'o', 's', 'e']
        }
      },
      {
        position: { col: 3, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['n', 'u', 'i', 't'],
          'de-ch': ['m', 'o', 'n', 'd'],
          'en-us': ['m', 'o', 'o', 'n']
        }
      },
      {
        position: { col: 5, row: 3 },
        clearCharactersByLayout: {
          'fr-ch': ['v', 'e', 'n', 't'],
          'de-ch': ['w', 'i', 'n', 'd'],
          'en-us': ['w', 'i', 'n', 'd']
        }
      },
      {
        position: { col: 7, row: 0 },
        clearCharactersByLayout: {
          'fr-ch': ['e', 't', 'e'],
          'de-ch': ['s', 'o', 'm', 'm'],
          'en-us': ['w', 'a', 'r', 'm']
        }
      }
    ]
  },
  {
    gameId: 'tortoise-path-4',
    start: { col: 0, row: 4 },
    end: { col: 8, row: 0 },
    waypoints: [
      { col: 0, row: 4 },
      { col: 2, row: 4 },
      { col: 2, row: 0 },
      { col: 4, row: 0 },
      { col: 4, row: 3 },
      { col: 7, row: 3 },
      { col: 7, row: 1 },
      { col: 8, row: 1 },
      { col: 8, row: 0 }
    ],
    obstacles: [
      {
        position: { col: 1, row: 4 },
        clearCharactersByLayout: {
          'fr-ch': ['p', 'o', 'n', 't'],
          'de-ch': ['s', 't', 'e', 'g'],
          'en-us': ['a', 'r', 'c', 'h']
        }
      },
      {
        position: { col: 2, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['c', 'l', 'e'],
          'de-ch': ['t', 'o', 'r'],
          'en-us': ['k', 'e', 'y']
        }
      },
      {
        position: { col: 3, row: 0 },
        clearCharactersByLayout: {
          'fr-ch': ['s', 'o', 'l'],
          'de-ch': ['e', 'r', 'd', 'e'],
          'en-us': ['s', 'o', 'i', 'l']
        }
      },
      {
        position: { col: 4, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['f', 'e', 'u'],
          'de-ch': ['l', 'a', 'u', 'b'],
          'en-us': ['l', 'e', 'a', 'f']
        }
      },
      {
        position: { col: 6, row: 3 },
        clearCharactersByLayout: {
          'fr-ch': ['p', 'i', 'e', 'r'],
          'de-ch': ['f', 'e', 'l', 's'],
          'en-us': ['r', 'o', 'c', 'k']
        }
      },
      {
        position: { col: 8, row: 1 },
        clearCharactersByLayout: {
          'fr-ch': ['n', 'i', 'd'],
          'de-ch': ['n', 'e', 's', 't'],
          'en-us': ['n', 'e', 's', 't']
        }
      }
    ]
  },
  {
    gameId: 'tortoise-path-5',
    start: { col: 0, row: 4 },
    end: { col: 8, row: 0 },
    waypoints: [
      { col: 0, row: 4 },
      { col: 1, row: 4 },
      { col: 1, row: 1 },
      { col: 5, row: 1 },
      { col: 5, row: 4 },
      { col: 7, row: 4 },
      { col: 7, row: 0 },
      { col: 8, row: 0 }
    ],
    obstacles: [
      {
        position: { col: 1, row: 3 },
        clearCharactersByLayout: {
          'fr-ch': ['b', 'o', 'i', 's'],
          'de-ch': ['b', 'a', 'u', 'm'],
          'en-us': ['t', 'r', 'e', 'e']
        }
      },
      {
        position: { col: 2, row: 1 },
        clearCharactersByLayout: {
          'fr-ch': ['l', 'u', 'p', 'e'],
          'de-ch': ['l', 'u', 'p', 'e'],
          'en-us': ['l', 'e', 'n', 's']
        }
      },
      {
        position: { col: 4, row: 1 },
        clearCharactersByLayout: {
          'fr-ch': ['t', 'a', 's'],
          'de-ch': ['s', 'a', 't', 'z'],
          'en-us': ['p', 'i', 'l', 'e']
        }
      },
      {
        position: { col: 5, row: 3 },
        clearCharactersByLayout: {
          'fr-ch': ['m', 'u', 'r'],
          'de-ch': ['w', 'a', 'n', 'd'],
          'en-us': ['w', 'a', 'l', 'l']
        }
      },
      {
        position: { col: 6, row: 4 },
        clearCharactersByLayout: {
          'fr-ch': ['d', 'u', 'n', 'e'],
          'de-ch': ['d', 'u', 'e', 'n'],
          'en-us': ['d', 'u', 'n', 'e']
        }
      },
      {
        position: { col: 7, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['v', 'i', 'e'],
          'de-ch': ['l', 'e', 'b', 'e'],
          'en-us': ['l', 'i', 'f', 'e']
        }
      },
      {
        position: { col: 7, row: 0 },
        clearCharactersByLayout: {
          'fr-ch': ['m', 'e', 'r'],
          'de-ch': ['m', 'e', 'e', 'r'],
          'en-us': ['s', 'e', 'a']
        }
      }
    ]
  },
  {
    gameId: 'tortoise-path-6',
    start: { col: 0, row: 4 },
    end: { col: 8, row: 0 },
    waypoints: [
      { col: 0, row: 4 },
      { col: 0, row: 0 },
      { col: 2, row: 0 },
      { col: 2, row: 3 },
      { col: 4, row: 3 },
      { col: 4, row: 1 },
      { col: 6, row: 1 },
      { col: 6, row: 4 },
      { col: 8, row: 4 },
      { col: 8, row: 0 }
    ],
    obstacles: [
      {
        position: { col: 0, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['i', 'l', 'e'],
          'de-ch': ['u', 'f', 'e', 'r'],
          'en-us': ['i', 's', 'l', 'e']
        }
      },
      {
        position: { col: 1, row: 0 },
        clearCharactersByLayout: {
          'fr-ch': ['f', 'e', 'u'],
          'de-ch': ['g', 'l', 'u', 't'],
          'en-us': ['f', 'i', 'r', 'e']
        }
      },
      {
        position: { col: 2, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['e', 'a', 'u'],
          'de-ch': ['n', 'a', 's', 's'],
          'en-us': ['r', 'a', 'i', 'n']
        }
      },
      {
        position: { col: 3, row: 3 },
        clearCharactersByLayout: {
          'fr-ch': ['c', 'i', 'e', 'l'],
          'de-ch': ['w', 'i', 'n', 'd'],
          'en-us': ['s', 'k', 'y']
        }
      },
      {
        position: { col: 4, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['p', 'r', 'e'],
          'de-ch': ['f', 'e', 'l', 'd'],
          'en-us': ['l', 'a', 'n', 'd']
        }
      },
      {
        position: { col: 5, row: 1 },
        clearCharactersByLayout: {
          'fr-ch': ['p', 'a', 'i', 'n'],
          'de-ch': ['b', 'r', 'o', 't'],
          'en-us': ['l', 'o', 'a', 'f']
        }
      },
      {
        position: { col: 6, row: 3 },
        clearCharactersByLayout: {
          'fr-ch': ['p', 'a', 'g', 'e'],
          'de-ch': ['b', 'u', 'c', 'h'],
          'en-us': ['b', 'o', 'o', 'k']
        }
      },
      {
        position: { col: 8, row: 2 },
        clearCharactersByLayout: {
          'fr-ch': ['p', 'o', 'r', 't'],
          'de-ch': ['k', 'a', 'i'],
          'en-us': ['p', 'o', 'r', 't']
        }
      }
    ]
  }
];
