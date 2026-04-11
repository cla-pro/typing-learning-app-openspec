import { ExerciseCategory } from '../../models/exercise-config.model';

export const EN_US_EXERCISE_CATEGORIES: ExerciseCategory[] = [
  {
    name: 'Middle Line',
    keyboardLayouts: ['en-us'],
    exercises: [
      {
        id: 'en-us-middle-line-fj',
        name: 'F / J',
        expectedChars: ['f', 'j', 'j', 'f', 'f', 'j', 'f', 'j', 'f', 'f', 'f', 'j', 'j', 'f', 'j', 'j', 'j', 'j', 'f', 'f', 'j', 'j', 'f', 'j', 'j', 'f', 'f', 'j', 'j', 'j', 'j', 'f'],
        impactedKeys: ['F', 'J']
      },
      {
        id: 'en-us-middle-line-dk',
        name: 'D / K',
        expectedChars: ['d', 'd', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'd', 'd', 'k', 'k', 'd', 'k', 'd', 'd', 'k', 'd', 'k', 'k', 'd', 'k', 'd', 'k', 'k', 'd', 'd', 'k', 'k'],
        impactedKeys: ['D', 'K']
      },
      {
        id: 'en-us-middle-line-sl',
        name: 'S / L',
        expectedChars: ['l', 'l', 's', 'l', 's', 's', 's', 's', 'l', 's', 's', 's', 'l', 'l', 'l', 's', 's', 'l', 's', 's', 's', 'l', 's', 'l', 's', 's', 'l', 'l', 'l', 'l', 'l', 's'],
        impactedKeys: ['S', 'L']
      },
      {
        id: 'en-us-middle-line-gh',
        name: 'G / H',
        expectedChars: ['h', 'g', 'h', 'g', 'g', 'g', 'g', 'g', 'g', 'h', 'h', 'g', 'h', 'g', 'g', 'g', 'g', 'g', 'h', 'h', 'h', 'h', 'h', 'h', 'g', 'h', 'g', 'g', 'h', 'g', 'h', 'g'],
        impactedKeys: ['G', 'H']
      },
      {
        id: 'en-us-middle-line-all-1',
        name: 'All 1',
        expectedChars: ['l', ' ', 'h', 'j', 'd', 'a', 'h', 'f', 'e', 'k', 'k', 'l', 'j', 'é', 'l', 'd', 'f', 'd', 'j', 'l', ' ', 's', 's', 'a', 'e', 's', 'a', 'd', 'd', 'é', 'g', ' ', 'g', 'f', 'h', 's', 'j', 'g', 'j', 'g', 'é', 'f', 'd', 'é', 'f', 'd', ' ', 'h', 's', ' ', 'k', ' ', 'é', 'l', 'k', 'h'],
        impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É', ' ']
      },
      {
        id: 'en-us-middle-line-all-2',
        name: 'All 2',
        expectedChars: ['l', 's', 's', 'f', ' ', 'h', 'j', 'é', 'h', 'g', 'k', 'g', 'g', ' ', ' ', 'l', ' ', 'k', 'g', 'l', 'g', 'f', 'd', ' ', 'l', 'k', 'é', 'k', 'j', 'é', 'g', 'd', 'f', ' ', 's', ' ', 'd', 'j', 'f', 'a', 'l', 'é', 'l', 'h', 'é', 'k', 's', 'd', 's', 'a', 'f', 'f', 'd', 'a'],
        impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É', ' ']
      }
    ]
  },
  {
    name: 'Upper Line',
    keyboardLayouts: ['en-us'],
    exercises: [
      {
        id: 'en-us-upper-line-tz',
        name: 'T / Z',
        expectedChars: ['t', 't', 't', 'z', 't', 'z', 'z', 'z', 'z', 't', 'z', 't', 't', 'z', 't', 'z', 'z', 'z', 't', 't', 'z', 'z', 'z', 't', 'z', 't', 'z', 't', 'z', 't', 'z', 't'],
        impactedKeys: ['T', 'Z']
      },
      {
        id: 'en-us-upper-line-ru',
        name: 'R / U',
        expectedChars: ['u', 'r', 'u', 'u', 'u', 'r', 'u', 'r', 'r', 'u', 'r', 'u', 'r', 'r', 'u', 'u', 'r', 'u', 'u', 'r', 'r', 'u', 'u', 'r', 'u', 'r', 'u', 'r', 'r', 'u', 'r', 'r'],
        impactedKeys: ['R', 'U']
      },
      {
        id: 'en-us-upper-line-ei',
        name: 'E / I',
        expectedChars: ['i', 'i', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'i', 'i', 'e', 'i', 'i', 'e', 'i', 'e', 'e', 'i', 'e', 'i', 'i', 'e', 'i', 'e', 'i', 'e', 'i', 'i', 'i', 'e', 'e'],
        impactedKeys: ['E', 'I']
      },
      {
        id: 'en-us-upper-line-wo',
        name: 'W / O',
        expectedChars: ['o', 'o', 'w', 'o', 'o', 'o', 'o', 'w', 'o', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'o', 'o', 'o', 'o', 'w', 'o', 'w', 'o', 'o', 'w', 'w', 'o', 'o', 'w'],
        impactedKeys: ['W', 'O']
      },
      {
        id: 'en-us-upper-line-qp',
        name: 'Q / P',
        expectedChars: ['q', 'q', 'p', 'p', 'p', 'q', 'p', 'q', 'p', 'q', 'p', 'p', 'q', 'q', 'q', 'p', 'q', 'q', 'q', 'p', 'q', 'p', 'q', 'p', 'q', 'p', 'p', 'p', 'q', 'p', 'p', 'p'],
        impactedKeys: ['Q', 'P']
      },
      {
        id: 'en-us-upper-line-all-1',
        name: 'All 1',
        expectedChars: ['o', 't', 't', 'z', 'z', 'r', 'e', 'e', 'w', ' ', 'z', 'w', 'w', 'q', 'o', 'è', 'i', 'r', 't', 'i', 'q', ' ', 'p', 'o', 'q', 'w', 'è', 'z', 'u', 'p', 'q', 't', 'z', ' ', 'w', 'z', 'p', 'r', 'o', 'è', 'è', 'w', 'z', 'u', ' ', 'w', 'u', 'p', 'w', 'i', 't', 'i', 'q', 't', 'i'],
        impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'È', ' ']
      },
      {
        id: 'en-us-upper-line-all-2',
        name: 'All 2',
        expectedChars: ['q', 'z', 'p', ' ', 'o', 'è', 'r', 'è', 'q', 'w', 'i', 'w', 'p', 'z', 't', 'o', 'p', 'o', 'q', 'è', 'è', 'o', 'r', 'q', ' ', 'u', 't', 'i', 'r', 'è', 'z', 'o', 'i', 'z', 'u', ' ', 'z', 'è', 'q', 't', 'i', 'w', 'p', 'i', 'u', 'u', 'u', 't', 't', 'z', ' ', 't', 'r', 'o'],
        impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'È', ' ']
      }
    ]
  },
  {
    name: 'Lower Line',
    keyboardLayouts: ['en-us'],
    exercises: [
      {
        id: 'en-us-lower-line-vbn',
        name: 'V / B / N',
        expectedChars: ['n', 'b', 'v', 'n', 'n', 'v', 'n', 'b', 'v', 'v', 'b', 'v', 'b', 'n', 'v', 'b', 'v', 'b', 'n', 'b', 'n', 'v', 'b', 'b', 'v', 'v', 'b', 'n', 'n', 'n', 'b', 'n'],
        impactedKeys: ['V', 'B', 'N']
      },
      {
        id: 'en-us-lower-line-cm',
        name: 'C / M',
        expectedChars: ['c', 'm', 'm', 'c', 'm', 'c', 'c', 'c', 'c', 'm', 'c', 'c', 'c', 'm', 'm', 'c', 'm', 'm', 'c', 'm', 'm', 'm', 'c', 'm', 'c', 'm', 'm', 'c', 'm', 'm', 'm', 'c'],
        impactedKeys: ['C', 'M']
      },
      {
        id: 'en-us-lower-line-x-comma',
        name: 'X / ,',
        expectedChars: [',', ',', 'x', ',', 'x', ',', ',', ',', 'x', 'x', 'x', 'x', ',', ',', 'x', 'x', 'x', ',', ',', 'x', ',', 'x', 'x', 'x', 'x', ',', ',', ',', ',', 'x', ',', 'x'],
        impactedKeys: ['X', ',']
      },
      {
        id: 'en-us-lower-line-y-period',
        name: 'Y / .',
        expectedChars: ['.', '.', 'y', 'y', 'y', 'y', 'y', '.', 'y', '.', 'y', '.', '.', '.', '.', '.', 'y', 'y', 'y', 'y', '.', '.', '.', '.', '.', 'y', '.', '.', '.', 'y', 'y', 'y'],
        impactedKeys: ['Y', '.']
      },
      {
        id: 'en-us-lower-line-all-1',
        name: 'All 1',
        expectedChars: ['n', ',', '.', 'c', ',', 'a', 'm', 'm', 'y', ' ', 'x', 'n', ',', 'x', 'é', '.', ' ', 'x', 'c', 'n', 'n', ',', 'b', 'm', 'v', 'y', 'y', ' ', '.', '.', 'x', 'c', 'b', 'm', 'y', 'v', 'v', ' ', 'c', 'v', 'é', 'n', 'n', 'v', 'm', 'c', 'x', 'b', ' ', 'b', 'c', 'y', 'x'],
        impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
      },
      {
        id: 'en-us-lower-line-all-2',
        name: 'All 2',
        expectedChars: ['v', ',', 'y', 'c', 'y', 'v', ',', ' ', 'y', 'b', 'c', 'm', 'y', 'm', ',', 'c', 'x', 'x', 'x', 'b', 'c', 'v', 'n', 'm', 'n', 'x', 'y', 'n', ',', ' ', 'x', 'm', 'c', 'm', 'm', '.', 'n', ',', 'b', 'v', ',', 'b', 'm', '.', 'x', '.', 'y', ',', ',', ' ', 'n', ' ', 'b'],
        impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
      }
    ]
  },
  {
    name: 'Index Finger',
    keyboardLayouts: ['en-us'],
    exercises: [
      {
        id: 'en-us-index-finger-fghj',
        name: 'F / G / H / J',
        expectedChars: ['g', 'f', 'h', 'g', 'g', 'g', 'g', 'j', 'f', 'j', 'f', 'h', 'h', 'g', 'j', 'h', 'h', 'j', 'h', 'f', 'f', 'j', 'f', 'j', 'f', 'h', 'f', 'g', 'g', 'h', 'g', 'h'],
        impactedKeys: ['F', 'G', 'H', 'J']
      },
      {
        id: 'en-us-index-finger-up-and-down',
        name: 'Up and Down',
        expectedChars: ['n', 'u', 'm', 'n', 'm', 'v', 'u', 'n', 'r', 'c', 'r', 'b', 'z', 'v', 'b', 'r', 'u', 't', 'b', 'r', 'r', 'n', 't', 'b', 'r', 'z', 'b', 'v', 'n', 'b', 'u', 'z'],
        impactedKeys: ['R', 'T', 'Z', 'U', 'V', 'B', 'N', 'C', 'M']
      },
      {
        id: 'en-us-index-finger-all',
        name: 'All',
        expectedChars: ['t', 't', 'u', 'r', 'h', 'f', 'n', 'z', 'b', 'h', 'c', 'j', 'm', 'r', 'f', 'g', 't', 'm', 'n', 'g', 'r', 'g', 'j', 'j', 'v', 't', 'f', 'f', 't', 'g', 'h', 'n'],
        impactedKeys: ['R', 'T', 'Z', 'U', 'F', 'G', 'H', 'J', 'V', 'B', 'N', 'C', 'M']
      }
    ]
  },
  {
    name: 'Middle Finger',
    keyboardLayouts: ['en-us'],
    exercises: [
      {
        id: 'en-us-middle-finger-up-and-down',
        name: 'Up and Down',
        expectedChars: ['x', ',', 'i', 'x', 'x', 'i', 'i', ',', 'e', 'i', 'e', ',', 'x', 'x', 'x', 'i', ',', 'e', 'i', ',', 'e', ',', 'x', 'x', 'e', 'x', 'x', 'e', ',', 'e', 'e', 'i'],
        impactedKeys: ['E', 'I', 'X', ',']
      },
      {
        id: 'en-us-middle-finger-all',
        name: 'All',
        expectedChars: ['k', 'i', 'x', 'd', 'e', 'd', 'e', ',', 'd', 'i', 'x', 'k', 'i', 'd', 'd', 'x', 'd', ',', 'e', 'i', ',', 'i', 'x', 'e', 'e', 'd', ',', 'x', 'x', 'e', 'x', 'k'],
        impactedKeys: ['E', 'I', 'D', 'K', 'X', ',']
      }
    ]
  },
  {
    name: 'Ring Finger',
    keyboardLayouts: ['en-us'],
    exercises: [
      {
        id: 'en-us-ring-finger-up-and-down',
        name: 'Up and Down',
        expectedChars: ['o', 'w', 'w', 'o', '.', '.', 'w', 'o', 'o', 'w', 'w', '.', '.', 'y', 'w', 'y', '.', 'w', '.', 'y', 'o', 'y', 'w', 'y', 'y', 'w', 'y', '.', 'y', 'o', 'y', 'w'],
        impactedKeys: ['W', 'O', 'Y', '.']
      },
      {
        id: 'en-us-ring-finger-all',
        name: 'All',
        expectedChars: ['y', 'l', '.', 'o', 'l', 's', 's', 'w', 'y', 'l', 'o', 'l', 'o', '.', 'w', 'y', 's', 'o', 'l', 'w', 's', 's', 'y', 'w', 'w', '.', 'l', 'l', 'y', 'o', 's', 'o'],
        impactedKeys: ['W', 'O', 'S', 'L', 'Y', '.']
      }
    ]
  },
  {
    name: 'Little Finger',
    keyboardLayouts: ['en-us'],
    exercises: [
      {
        id: 'en-us-little-finger-all',
        name: 'All',
        expectedChars: ['è', 'q', 'q', 'è', 'é', 'a', 'é', 'è', 'è', 'a', 'é', 'q', 'é', 'é', 'a', 'é', 'q', 'q', 'è', 'a', 'é', 'a', 'è', 'è', 'q', 'è', 'è', 'q', 'é', 'a', 'a', 'é'],
        impactedKeys: ['Q', 'È', 'A', 'É']
      }
    ]
  },
  {
    name: 'Mix Caps',
    keyboardLayouts: ['en-us'],
    exercises: [
      {
        id: 'en-us-mix-caps-fj',
        name: 'F / J',
        expectedChars: ['f', 'J', 'f', 'J', 'J', 'f', 'J', 'f', 'f', 'J', 'J', 'f', 'f', 'J', 'f', 'J', 'J', 'f', 'f', 'J', 'J', 'f', 'J', 'f', 'J', 'f', 'f', 'J', 'J', 'J', 'f', 'f'],
        impactedKeys: ['F', 'J']
      },
      {
        id: 'en-us-mix-caps-home-row',
        name: 'Home Row',
        expectedChars: ['A', 's', 'D', 'f', 'G', 'h', 'J', 'k', 'L', 'a', 'S', 'd', 'F', 'g', 'H', 'j', 'K', 'l', 'A', 'S', 'd', 'f', 'G', 'H', 'j', 'k', 'L', 'a', 'D', 'F', 'g', 'J'],
        impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
      },
      {
        id: 'en-us-mix-caps-all',
        name: 'All',
        expectedChars: ['A', 'b', 'C', 'd', 'E', 'f', 'G', 'h', 'I', 'j', 'K', 'l', 'M', 'n', 'O', 'p', 'Q', 'r', 'S', 't', 'U', 'v', 'W', 'x', 'Y', 'z', 'A', 'b', 'D', 'e', 'F', 'g'],
        impactedKeys: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      }
    ]
  }
];
