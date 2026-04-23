import { ExerciseCategory } from '../../models/exercise-config.model';

export const DE_CH_EXERCISE_CATEGORIES: ExerciseCategory[] = [
  {
    name: 'Mittlere Reihe',
    keyboardLayouts: ['de-ch'],
    exercises: [
      {
        id: 'de-ch-middle-line-fj',
        name: 'F / J',
        expectedChars: ['f', 'j', 'j', 'f', 'f', 'j', 'f', 'j', 'f', 'f', 'f', 'j', 'j', 'f', 'j', 'j', 'j', 'j', 'f', 'f', 'j', 'j', 'f', 'j', 'j', 'f', 'f', 'j', 'j', 'j', 'j', 'f'],
        impactedKeys: ['F', 'J']
      },
      {
        id: 'de-ch-middle-line-dk',
        name: 'D / K',
        expectedChars: ['d', 'd', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'd', 'd', 'k', 'k', 'd', 'k', 'd', 'd', 'k', 'd', 'k', 'k', 'd', 'k', 'd', 'k', 'k', 'd', 'd', 'k', 'k'],
        impactedKeys: ['D', 'K']
      },
      {
        id: 'de-ch-middle-line-sl',
        name: 'S / L',
        expectedChars: ['l', 'l', 's', 'l', 's', 's', 's', 's', 'l', 's', 's', 's', 'l', 'l', 'l', 's', 's', 'l', 's', 's', 's', 'l', 's', 'l', 's', 's', 'l', 'l', 'l', 'l', 'l', 's'],
        impactedKeys: ['S', 'L']
      },
      {
        id: 'de-ch-middle-line-gh',
        name: 'G / H',
        expectedChars: ['h', 'g', 'h', 'g', 'g', 'g', 'g', 'g', 'g', 'h', 'h', 'g', 'h', 'g', 'g', 'g', 'g', 'g', 'h', 'h', 'h', 'h', 'h', 'h', 'g', 'h', 'g', 'g', 'h', 'g', 'h', 'g'],
        impactedKeys: ['G', 'H']
      },
      {
        id: 'de-ch-middle-line-all-1',
        name: 'Alle 1',
        expectedChars: ['l', ' ', 'h', 'j', 'd', 'a', 'h', 'f', 'k', 'k', 'l', 'j', 'ö', 'l', 'd', 'f', 'd', 'j', 'l', ' ', 's', 's', 'a', 's', 'a', 'd', 'd', 'ö', 'g', ' ', 'g', 'f', 'h', 's', 'j', 'g', 'j', 'g', 'ö', 'f', 'd', 'ö', 'f', 'd', ' ', 'h', 's', ' ', 'k', ' ', 'ö', 'l', 'k', 'h'],
        impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', ' ']
      },
      {
        id: 'de-ch-middle-line-all-2',
        name: 'Alle 2',
        expectedChars: ['l', 's', 's', 'f', ' ', 'h', 'j', 'ö', 'h', 'g', 'k', 'g', 'g', ' ', ' ', 'l', ' ', 'k', 'g', 'l', 'g', 'f', 'd', ' ', 'l', 'k', 'ö', 'k', 'j', 'ö', 'g', 'd', 'f', ' ', 's', ' ', 'd', 'j', 'f', 'a', 'l', 'ö', 'l', 'h', 'ö', 'k', 's', 'd', 's', 'a', 'f', 'f', 'd', 'a'],
        impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', ' ']
      }
    ]
  },
  {
    name: 'Obere Reihe',
    keyboardLayouts: ['de-ch'],
    exercises: [
      {
        id: 'de-ch-upper-line-tz',
        name: 'T / Z',
        expectedChars: ['t', 't', 't', 'z', 't', 'z', 'z', 'z', 'z', 't', 'z', 't', 't', 'z', 't', 'z', 'z', 'z', 't', 't', 'z', 'z', 'z', 't', 'z', 't', 'z', 't', 'z', 't', 'z', 't'],
        impactedKeys: ['T', 'Z']
      },
      {
        id: 'de-ch-upper-line-ru',
        name: 'R / U',
        expectedChars: ['u', 'r', 'u', 'u', 'u', 'r', 'u', 'r', 'r', 'u', 'r', 'u', 'r', 'r', 'u', 'u', 'r', 'u', 'u', 'r', 'r', 'u', 'u', 'r', 'u', 'r', 'u', 'r', 'r', 'u', 'r', 'r'],
        impactedKeys: ['R', 'U']
      },
      {
        id: 'de-ch-upper-line-ei',
        name: 'E / I',
        expectedChars: ['i', 'i', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'i', 'i', 'e', 'i', 'i', 'e', 'i', 'e', 'e', 'i', 'e', 'i', 'i', 'e', 'i', 'e', 'i', 'e', 'i', 'i', 'i', 'e', 'e'],
        impactedKeys: ['E', 'I']
      },
      {
        id: 'de-ch-upper-line-wo',
        name: 'W / O',
        expectedChars: ['o', 'o', 'w', 'o', 'o', 'o', 'o', 'w', 'o', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'o', 'o', 'o', 'o', 'w', 'o', 'w', 'o', 'o', 'w', 'w', 'o', 'o', 'w'],
        impactedKeys: ['W', 'O']
      },
      {
        id: 'de-ch-upper-line-qp',
        name: 'Q / P',
        expectedChars: ['q', 'q', 'p', 'p', 'p', 'q', 'p', 'q', 'p', 'q', 'p', 'p', 'q', 'q', 'q', 'p', 'q', 'q', 'q', 'p', 'q', 'p', 'q', 'p', 'q', 'p', 'p', 'p', 'q', 'p', 'p', 'p'],
        impactedKeys: ['Q', 'P']
      },
      {
        id: 'de-ch-upper-line-all-1',
        name: 'Alle 1',
        expectedChars: ['o', 't', 't', 'z', 'z', 'r', 'e', 'e', 'w', ' ', 'z', 'w', 'w', 'q', 'o', 'ü', 'i', 'r', 't', 'i', 'q', ' ', 'p', 'o', 'q', 'w', 'ü', 'z', 'u', 'p', 'q', 't', 'z', ' ', 'w', 'z', 'p', 'r', 'o', 'ü', 'ü', 'w', 'z', 'u', ' ', 'w', 'u', 'p', 'w', 'i', 't', 'i', 'q', 't', 'i'],
        impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü', ' ']
      },
      {
        id: 'de-ch-upper-line-all-2',
        name: 'Alle 2',
        expectedChars: ['q', 'z', 'p', ' ', 'o', 'ü', 'r', 'ü', 'q', 'w', 'i', 'w', 'p', 'z', 't', 'o', 'p', 'o', 'q', 'ü', 'ü', 'o', 'r', 'q', ' ', 'u', 't', 'i', 'r', 'ü', 'z', 'o', 'i', 'z', 'u', ' ', 'z', 'ü', 'q', 't', 'i', 'w', 'p', 'i', 'u', 'u', 'u', 't', 't', 'z', ' ', 't', 'r', 'o'],
        impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü', ' ']
      }
    ]
  },
  {
    name: 'Untere Reihe',
    keyboardLayouts: ['de-ch'],
    exercises: [
      {
        id: 'de-ch-lower-line-vbn',
        name: 'V / B / N',
        expectedChars: ['n', 'b', 'v', 'n', 'n', 'v', 'n', 'b', 'v', 'v', 'b', 'v', 'b', 'n', 'v', 'b', 'v', 'b', 'n', 'b', 'n', 'v', 'b', 'b', 'v', 'v', 'b', 'n', 'n', 'n', 'b', 'n'],
        impactedKeys: ['V', 'B', 'N']
      },
      {
        id: 'de-ch-lower-line-cm',
        name: 'C / M',
        expectedChars: ['c', 'm', 'm', 'c', 'm', 'c', 'c', 'c', 'c', 'm', 'c', 'c', 'c', 'm', 'm', 'c', 'm', 'm', 'c', 'm', 'm', 'm', 'c', 'm', 'c', 'm', 'm', 'c', 'm', 'm', 'm', 'c'],
        impactedKeys: ['C', 'M']
      },
      {
        id: 'de-ch-lower-line-x-comma',
        name: 'X / ,',
        expectedChars: [',', ',', 'x', ',', 'x', ',', ',', ',', 'x', 'x', 'x', 'x', ',', ',', 'x', 'x', 'x', ',', ',', 'x', ',', 'x', 'x', 'x', 'x', ',', ',', ',', ',', 'x', ',', 'x'],
        impactedKeys: ['X', ',']
      },
      {
        id: 'de-ch-lower-line-y-period',
        name: 'Y / .',
        expectedChars: ['.', '.', 'y', 'y', 'y', 'y', 'y', '.', 'y', '.', 'y', '.', '.', '.', '.', '.', 'y', 'y', 'y', 'y', '.', '.', '.', '.', '.', 'y', '.', '.', '.', 'y', 'y', 'y'],
        impactedKeys: ['Y', '.']
      },
      {
        id: 'de-ch-lower-line-all-1',
        name: 'Alle 1',
        expectedChars: ['n', ',', '.', 'c', ',', 'a', 'm', 'm', 'y', ' ', 'x', 'n', ',', 'x', '.', ' ', 'x', 'c', 'n', 'n', ',', 'b', 'm', 'v', 'y', 'y', ' ', '.', '.', 'x', 'c', 'b', 'm', 'y', 'v', 'v', ' ', 'c', 'v', 'n', 'n', 'v', 'm', 'c', 'x', 'b', ' ', 'b', 'c', 'y', 'x'],
        impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
      },
      {
        id: 'de-ch-lower-line-all-2',
        name: 'Alle 2',
        expectedChars: ['v', ',', 'y', 'c', 'y', 'v', ',', ' ', 'y', 'b', 'c', 'm', 'y', 'm', ',', 'c', 'x', 'x', 'x', 'b', 'c', 'v', 'n', 'm', 'n', 'x', 'y', 'n', ',', ' ', 'x', 'm', 'c', 'm', 'm', '.', 'n', ',', 'b', 'v', ',', 'b', 'm', '.', 'x', '.', 'y', ',', ',', ' ', 'n', ' ', 'b'],
        impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
      }
    ]
  },
  {
    name: 'Zeigefinger',
    keyboardLayouts: ['de-ch'],
    exercises: [
      {
        id: 'de-ch-index-finger-fghj',
        name: 'F / G / H / J',
        expectedChars: ['g', 'f', 'h', 'g', 'g', 'g', 'g', 'j', 'f', 'j', 'f', 'h', 'h', 'g', 'j', 'h', 'h', 'j', 'h', 'f', 'f', 'j', 'f', 'j', 'f', 'h', 'f', 'g', 'g', 'h', 'g', 'h'],
        impactedKeys: ['F', 'G', 'H', 'J']
      },
      {
        id: 'de-ch-index-finger-up-and-down',
        name: 'Rauf und Runter',
        expectedChars: ['n', 'u', 'm', 'n', 'm', 'v', 'u', 'n', 'r', 'c', 'r', 'b', 'z', 'v', 'b', 'r', 'u', 't', 'b', 'r', 'r', 'n', 't', 'b', 'r', 'z', 'b', 'v', 'n', 'b', 'u', 'z'],
        impactedKeys: ['R', 'T', 'Z', 'U', 'V', 'B', 'N', 'C', 'M']
      },
      {
        id: 'de-ch-index-finger-all',
        name: 'Alle',
        expectedChars: ['t', 't', 'u', 'r', 'h', 'f', 'n', 'z', 'b', 'h', 'c', 'j', 'm', 'r', 'f', 'g', 't', 'm', 'n', 'g', 'r', 'g', 'j', 'j', 'v', 't', 'f', 'f', 't', 'g', 'h', 'n'],
        impactedKeys: ['R', 'T', 'Z', 'U', 'F', 'G', 'H', 'J', 'V', 'B', 'N', 'C', 'M']
      }
    ]
  },
  {
    name: 'Mittelfinger',
    keyboardLayouts: ['de-ch'],
    exercises: [
      {
        id: 'de-ch-middle-finger-up-and-down',
        name: 'Rauf und Runter',
        expectedChars: ['x', ',', 'i', 'x', 'x', 'i', 'i', ',', 'e', 'i', 'e', ',', 'x', 'x', 'x', 'i', ',', 'e', 'i', ',', 'e', ',', 'x', 'x', 'e', 'x', 'x', 'e', ',', 'e', 'e', 'i'],
        impactedKeys: ['E', 'I', 'X', ',']
      },
      {
        id: 'de-ch-middle-finger-all',
        name: 'Alle',
        expectedChars: ['k', 'i', 'x', 'd', 'e', 'd', 'e', ',', 'd', 'i', 'x', 'k', 'i', 'd', 'd', 'x', 'd', ',', 'e', 'i', ',', 'i', 'x', 'e', 'e', 'd', ',', 'x', 'x', 'e', 'x', 'k'],
        impactedKeys: ['E', 'I', 'D', 'K', 'X', ',']
      }
    ]
  },
  {
    name: 'Ringfinger',
    keyboardLayouts: ['de-ch'],
    exercises: [
      {
        id: 'de-ch-ring-finger-up-and-down',
        name: 'Rauf und Runter',
        expectedChars: ['o', 'w', 'w', 'o', '.', '.', 'w', 'o', 'o', 'w', 'w', '.', '.', 'y', 'w', 'y', '.', 'w', '.', 'y', 'o', 'y', 'w', 'y', 'y', 'w', 'y', '.', 'y', 'o', 'y', 'w'],
        impactedKeys: ['W', 'O', 'Y', '.']
      },
      {
        id: 'de-ch-ring-finger-all',
        name: 'Alle',
        expectedChars: ['y', 'l', '.', 'o', 'l', 's', 's', 'w', 'y', 'l', 'o', 'l', 'o', '.', 'w', 'y', 's', 'o', 'l', 'w', 's', 's', 'y', 'w', 'w', '.', 'l', 'l', 'y', 'o', 's', 'o'],
        impactedKeys: ['W', 'O', 'S', 'L', 'Y', '.']
      }
    ]
  },
  {
    name: 'Kleiner Finger',
    keyboardLayouts: ['de-ch'],
    exercises: [
      {
        id: 'de-ch-little-finger-all',
        name: 'Alle',
        expectedChars: ['ü', 'q', 'q', 'ü', 'ö', 'a', 'ö', 'ü', 'ü', 'a', 'ö', 'q', 'ö', 'ö', 'a', 'ö', 'q', 'q', 'ü', 'a', 'ö', 'a', 'ü', 'ü', 'q', 'ü', 'ü', 'q', 'ö', 'a', 'a', 'ö'],
        impactedKeys: ['Q', 'Ü', 'A', 'Ö']
      }
    ]
  },
  {
    name: 'Gross und Klein',
    keyboardLayouts: ['de-ch'],
    exercises: [
      {
        id: 'de-ch-mix-caps-fj',
        name: 'F / J',
        expectedChars: ['f', 'J', 'f', 'J', 'J', 'f', 'J', 'f', 'f', 'J', 'J', 'f', 'f', 'J', 'f', 'J', 'J', 'f', 'f', 'J', 'J', 'f', 'J', 'f', 'J', 'f', 'f', 'J', 'J', 'J', 'f', 'f'],
        impactedKeys: ['F', 'J']
      },
      {
        id: 'de-ch-mix-caps-home-row',
        name: 'Grundreihe',
        expectedChars: ['A', 's', 'D', 'f', 'G', 'h', 'J', 'k', 'L', 'a', 'S', 'd', 'F', 'g', 'H', 'j', 'K', 'l', 'A', 'S', 'd', 'f', 'G', 'H', 'j', 'k', 'L', 'a', 'D', 'F', 'g', 'J'],
        impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
      },
      {
        id: 'de-ch-mix-caps-all',
        name: 'Alle',
        expectedChars: ['A', 'b', 'C', 'd', 'E', 'f', 'G', 'h', 'I', 'j', 'K', 'l', 'M', 'n', 'O', 'p', 'Q', 'r', 'S', 't', 'U', 'v', 'W', 'x', 'Y', 'z', 'A', 'b', 'D', 'e', 'F', 'g'],
        impactedKeys: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      }
    ]
  },
  {
    name: 'Geschichten',
    keyboardLayouts: ['de-ch'],
    exercises: [
      {
        id: 'de-ch-stories-mia-stellt-sich-vor',
        name: 'Mia stellt sich vor',
        expectedChars: ['H', 'a', 'l', 'l', 'o', ' ', 'i', 'c', 'h', ' ', 'h', 'e', 'i', 's', 's', 'e', ' ', 'M', 'i', 'a', ' ', 'u', 'n', 'd', ' ', 'i', 'c', 'h', ' ', 'b', 'i', 'n', ' ', 'a', 'c', 'h', 't', ' ', 'J', 'a', 'h', 'r', 'e', ' ', 'a', 'l', 't', '.', ' ', 'I', 'c', 'h', ' ', 'w', 'o', 'h', 'n', 'e', ' ', 'm', 'i', 't', ' ', 'm', 'e', 'i', 'n', 'e', 'r', ' ', 'M', 'a', 'm', 'a', ' ', 'u', 'n', 'd', ' ', 'm', 'e', 'i', 'n', 'e', 'm', ' ', 'P', 'a', 'p', 'a', ' ', 'i', 'n', ' ', 'B', 'e', 'r', 'n', '.', ' ', 'I', 'c', 'h', ' ', 'm', 'a', 'l', 'e', ' ', 'g', 'e', 'r', 'n', ' ', 'b', 'u', 'n', 't', 'e', ' ', 'T', 'i', 'e', 'r', 'e', ' ', 'u', 'n', 'd', ' ', 's', 'p', 'i', 'e', 'l', 'e', ' ', 'n', 'a', 'c', 'h', ' ', 'd', 'e', 'r', ' ', 'S', 'c', 'h', 'u', 'l', 'e', ' ', 'o', 'f', 't', ' ', 'm', 'i', 't', ' ', 'm', 'e', 'i', 'n', 'e', 'r', ' ', 'K', 'a', 't', 'z', 'e', ' ', 'L', 'i', 'l', 'i', '.'],
        impactedKeys: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Z', ' ', '.']
      },
      {
        id: 'de-ch-stories-lotte-und-fips',
        name: 'Lotte und Fips',
        expectedChars: ['E', 'i', 'n', 'e', 's', ' ', 'M', 'o', 'r', 'g', 'e', 'n', 's', ' ', 't', 'r', 'a', 'b', 't', 'e', ' ', 'd', 'a', 's', ' ', 'k', 'l', 'e', 'i', 'n', 'e', ' ', 'P', 'o', 'n', 'y', ' ', 'L', 'o', 't', 't', 'e', ' ', 'ü', 'b', 'e', 'r', ' ', 'd', 'i', 'e', ' ', 'W', 'i', 'e', 's', 'e', ' ', 'h', 'i', 'n', 't', 'e', 'r', ' ', 'd', 'e', 'm', ' ', 'B', 'a', 'u', 'e', 'r', 'n', 'h', 'o', 'f', '.', ' ', 'D', 'e', 'r', ' ', 'T', 'a', 'u', ' ', 'g', 'l', 'i', 't', 'z', 'e', 'r', 't', 'e', ' ', 'i', 'm', ' ', 'G', 'r', 'a', 's', ' ', 'u', 'n', 'd', ' ', 'd', 'i', 'e', ' ', 'V', 'ö', 'g', 'e', 'l', ' ', 's', 'a', 'n', 'g', 'e', 'n', ' ', 'l', 'a', 'u', 't', '.', ' ', 'A', 'm', ' ', 'Z', 'a', 'u', 'n', ' ', 's', 'a', 's', 's', ' ', 'e', 'i', 'n', ' ', 'n', 'e', 'u', 'g', 'i', 'e', 'r', 'i', 'g', 'e', 's', ' ', 'E', 'i', 'c', 'h', 'h', 'ö', 'r', 'n', 'c', 'h', 'e', 'n', ' ', 'n', 'a', 'm', 'e', 'n', 's', ' ', 'F', 'i', 'p', 's', '.', ' ', 'E', 's', ' ', 'h', 'a', 't', 't', 'e', ' ', 's', 'i', 'c', 'h', ' ', 'v', 'e', 'r', 'l', 'a', 'u', 'f', 'e', 'n', ' ', 'u', 'n', 'd', ' ', 's', 'u', 'c', 'h', 't', 'e', ' ', 'd', 'e', 'n', ' ', 'g', 'r', 'o', 's', 's', 'e', 'n', ' ', 'N', 'u', 's', 's', 'b', 'a', 'u', 'm', '.', ' ', 'L', 'o', 't', 't', 'e', ' ', 'z', 'e', 'i', 'g', 't', 'e', ' ', 'F', 'i', 'p', 's', ' ', 'd', 'e', 'n', ' ', 'W', 'e', 'g', ',', ' ', 't', 'e', 'i', 'l', 't', 'e', ' ', 'i', 'h', 'r', ' ', 'H', 'e', 'u', ' ', 'u', 'n', 'd', ' ', 'b', 'e', 'i', 'd', 'e', ' ', 's', 'p', 'i', 'e', 'l', 't', 'e', 'n', ' ', 'b', 'i', 's', ' ', 'z', 'u', 'm', ' ', 'S', 'o', 'n', 'n', 'e', 'n', 'u', 'n', 't', 'e', 'r', 'g', 'a', 'n', 'g', ' ', 'F', 'a', 'n', 'g', 'e', 'n', ' ', 'z', 'w', 'i', 's', 'c', 'h', 'e', 'n', ' ', 'd', 'e', 'n', ' ', 'B', 'l', 'u', 'm', 'e', 'n', '.', ' ', 'A', 'm', ' ', 'A', 'b', 'e', 'n', 'd', ' ', 'l', 'i', 'e', 'f', 'e', 'n', ' ', 's', 'i', 'e', ' ', 'z', 'u', 'f', 'r', 'i', 'e', 'd', 'e', 'n', ' ', 'n', 'a', 'c', 'h', ' ', 'H', 'a', 'u', 's', 'e', '.'],
        impactedKeys: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z', 'Ö', 'Ü', ' ', ',', '.']
      }
    ]
  }
];
