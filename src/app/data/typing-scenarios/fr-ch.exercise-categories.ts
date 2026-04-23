import { ExerciseCategory } from '../../models/exercise-config.model';

export const FR_CH_EXERCISE_CATEGORIES: ExerciseCategory[] = [
  {
    name: 'Rangée du milieu',
    keyboardLayouts: ['fr-ch'],
    exercises: [
      {
        id: 'fr-ch-middle-line-fj',
        name: 'F / J',
        expectedChars: ['f', 'j', 'j', 'f', 'f', 'j', 'f', 'j', 'f', 'f', 'f', 'j', 'j', 'f', 'j', 'j', 'j', 'j', 'f', 'f', 'j', 'j', 'f', 'j', 'j', 'f', 'f', 'j', 'j', 'j', 'j', 'f'],
        impactedKeys: ['F', 'J']
      },
      {
        id: 'fr-ch-middle-line-dk',
        name: 'D / K',
        expectedChars: ['d', 'd', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'k', 'd', 'd', 'k', 'k', 'd', 'k', 'd', 'd', 'k', 'd', 'k', 'k', 'd', 'k', 'd', 'k', 'k', 'd', 'd', 'k', 'k'],
        impactedKeys: ['D', 'K']
      },
      {
        id: 'fr-ch-middle-line-sl',
        name: 'S / L',
        expectedChars: ['l', 'l', 's', 'l', 's', 's', 's', 's', 'l', 's', 's', 's', 'l', 'l', 'l', 's', 's', 'l', 's', 's', 's', 'l', 's', 'l', 's', 's', 'l', 'l', 'l', 'l', 'l', 's'],
        impactedKeys: ['S', 'L']
      },
      {
        id: 'fr-ch-middle-line-gh',
        name: 'G / H',
        expectedChars: ['h', 'g', 'h', 'g', 'g', 'g', 'g', 'g', 'g', 'h', 'h', 'g', 'h', 'g', 'g', 'g', 'g', 'g', 'h', 'h', 'h', 'h', 'h', 'h', 'g', 'h', 'g', 'g', 'h', 'g', 'h', 'g'],
        impactedKeys: ['G', 'H']
      },
      {
        id: 'fr-ch-middle-line-all-1',
        name: 'Tous 1',
        expectedChars: ['l', ' ', 'h', 'j', 'd', 'a', 'h', 'f', 'k', 'k', 'l', 'j', 'é', 'l', 'd', 'f', 'd', 'j', 'l', ' ', 's', 's', 'a', 's', 'a', 'd', 'd', 'é', 'g', ' ', 'g', 'f', 'h', 's', 'j', 'g', 'j', 'g', 'é', 'f', 'd', 'é', 'f', 'd', ' ', 'h', 's', ' ', 'k', ' ', 'é', 'l', 'k', 'h'],
        impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É', ' ']
      },
      {
        id: 'fr-ch-middle-line-all-2',
        name: 'Tous 2',
        expectedChars: ['l', 's', 's', 'f', ' ', 'h', 'j', 'é', 'h', 'g', 'k', 'g', 'g', ' ', ' ', 'l', ' ', 'k', 'g', 'l', 'g', 'f', 'd', ' ', 'l', 'k', 'é', 'k', 'j', 'é', 'g', 'd', 'f', ' ', 's', ' ', 'd', 'j', 'f', 'a', 'l', 'é', 'l', 'h', 'é', 'k', 's', 'd', 's', 'a', 'f', 'f', 'd', 'a'],
        impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É', ' ']
      }
    ]
  },
  {
    name: 'Rangée du haut',
    keyboardLayouts: ['fr-ch'],
    exercises: [
      {
        id: 'fr-ch-upper-line-tz',
        name: 'T / Z',
        expectedChars: ['t', 't', 't', 'z', 't', 'z', 'z', 'z', 'z', 't', 'z', 't', 't', 'z', 't', 'z', 'z', 'z', 't', 't', 'z', 'z', 'z', 't', 'z', 't', 'z', 't', 'z', 't', 'z', 't'],
        impactedKeys: ['T', 'Z']
      },
      {
        id: 'fr-ch-upper-line-ru',
        name: 'R / U',
        expectedChars: ['u', 'r', 'u', 'u', 'u', 'r', 'u', 'r', 'r', 'u', 'r', 'u', 'r', 'r', 'u', 'u', 'r', 'u', 'u', 'r', 'r', 'u', 'u', 'r', 'u', 'r', 'u', 'r', 'r', 'u', 'r', 'r'],
        impactedKeys: ['R', 'U']
      },
      {
        id: 'fr-ch-upper-line-ei',
        name: 'E / I',
        expectedChars: ['i', 'i', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'i', 'i', 'e', 'i', 'i', 'e', 'i', 'e', 'e', 'i', 'e', 'i', 'i', 'e', 'i', 'e', 'i', 'e', 'i', 'i', 'i', 'e', 'e'],
        impactedKeys: ['E', 'I']
      },
      {
        id: 'fr-ch-upper-line-wo',
        name: 'W / O',
        expectedChars: ['o', 'o', 'w', 'o', 'o', 'o', 'o', 'w', 'o', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'o', 'o', 'o', 'o', 'w', 'o', 'w', 'o', 'o', 'w', 'w', 'o', 'o', 'w'],
        impactedKeys: ['W', 'O']
      },
      {
        id: 'fr-ch-upper-line-qp',
        name: 'Q / P',
        expectedChars: ['q', 'q', 'p', 'p', 'p', 'q', 'p', 'q', 'p', 'q', 'p', 'p', 'q', 'q', 'q', 'p', 'q', 'q', 'q', 'p', 'q', 'p', 'q', 'p', 'q', 'p', 'p', 'p', 'q', 'p', 'p', 'p'],
        impactedKeys: ['Q', 'P']
      },
      {
        id: 'fr-ch-upper-line-all-1',
        name: 'Tous 1',
        expectedChars: ['o', 't', 't', 'z', 'z', 'r', 'e', 'e', 'w', ' ', 'z', 'w', 'w', 'q', 'o', 'è', 'i', 'r', 't', 'i', 'q', ' ', 'p', 'o', 'q', 'w', 'è', 'z', 'u', 'p', 'q', 't', 'z', ' ', 'w', 'z', 'p', 'r', 'o', 'è', 'è', 'w', 'z', 'u', ' ', 'w', 'u', 'p', 'w', 'i', 't', 'i', 'q', 't', 'i'],
        impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'È', ' ']
      },
      {
        id: 'fr-ch-upper-line-all-2',
        name: 'Tous 2',
        expectedChars: ['q', 'z', 'p', ' ', 'o', 'è', 'r', 'è', 'q', 'w', 'i', 'w', 'p', 'z', 't', 'o', 'p', 'o', 'q', 'è', 'è', 'o', 'r', 'q', ' ', 'u', 't', 'i', 'r', 'è', 'z', 'o', 'i', 'z', 'u', ' ', 'z', 'è', 'q', 't', 'i', 'w', 'p', 'i', 'u', 'u', 'u', 't', 't', 'z', ' ', 't', 'r', 'o'],
        impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'È', ' ']
      }
    ]
  },
  {
    name: 'Rangée du bas',
    keyboardLayouts: ['fr-ch'],
    exercises: [
      {
        id: 'fr-ch-lower-line-vbn',
        name: 'V / B / N',
        expectedChars: ['n', 'b', 'v', 'n', 'n', 'v', 'n', 'b', 'v', 'v', 'b', 'v', 'b', 'n', 'v', 'b', 'v', 'b', 'n', 'b', 'n', 'v', 'b', 'b', 'v', 'v', 'b', 'n', 'n', 'n', 'b', 'n'],
        impactedKeys: ['V', 'B', 'N']
      },
      {
        id: 'fr-ch-lower-line-cm',
        name: 'C / M',
        expectedChars: ['c', 'm', 'm', 'c', 'm', 'c', 'c', 'c', 'c', 'm', 'c', 'c', 'c', 'm', 'm', 'c', 'm', 'm', 'c', 'm', 'm', 'm', 'c', 'm', 'c', 'm', 'm', 'c', 'm', 'm', 'm', 'c'],
        impactedKeys: ['C', 'M']
      },
      {
        id: 'fr-ch-lower-line-x-comma',
        name: 'X / ,',
        expectedChars: [',', ',', 'x', ',', 'x', ',', ',', ',', 'x', 'x', 'x', 'x', ',', ',', 'x', 'x', 'x', ',', ',', 'x', ',', 'x', 'x', 'x', 'x', ',', ',', ',', ',', 'x', ',', 'x'],
        impactedKeys: ['X', ',']
      },
      {
        id: 'fr-ch-lower-line-y-period',
        name: 'Y / .',
        expectedChars: ['.', '.', 'y', 'y', 'y', 'y', 'y', '.', 'y', '.', 'y', '.', '.', '.', '.', '.', 'y', 'y', 'y', 'y', '.', '.', '.', '.', '.', 'y', '.', '.', '.', 'y', 'y', 'y'],
        impactedKeys: ['Y', '.']
      },
      {
        id: 'fr-ch-lower-line-all-1',
        name: 'Tous 1',
        expectedChars: ['n', ',', '.', 'c', ',', 'a', 'm', 'm', 'y', ' ', 'x', 'n', ',', 'x', '.', ' ', 'x', 'c', 'n', 'n', ',', 'b', 'm', 'v', 'y', 'y', ' ', '.', '.', 'x', 'c', 'b', 'm', 'y', 'v', 'v', ' ', 'c', 'v', 'n', 'n', 'v', 'm', 'c', 'x', 'b', ' ', 'b', 'c', 'y', 'x'],
        impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
      },
      {
        id: 'fr-ch-lower-line-all-2',
        name: 'Tous 2',
        expectedChars: ['v', ',', 'y', 'c', 'y', 'v', ',', ' ', 'y', 'b', 'c', 'm', 'y', 'm', ',', 'c', 'x', 'x', 'x', 'b', 'c', 'v', 'n', 'm', 'n', 'x', 'y', 'n', ',', ' ', 'x', 'm', 'c', 'm', 'm', '.', 'n', ',', 'b', 'v', ',', 'b', 'm', '.', 'x', '.', 'y', ',', ',', ' ', 'n', ' ', 'b'],
        impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
      }
    ]
  },
  {
    name: 'Index',
    keyboardLayouts: ['fr-ch'],
    exercises: [
      {
        id: 'fr-ch-index-finger-fghj',
        name: 'F / G / H / J',
        expectedChars: ['g', 'f', 'h', 'g', 'g', 'g', 'g', 'j', 'f', 'j', 'f', 'h', 'h', 'g', 'j', 'h', 'h', 'j', 'h', 'f', 'f', 'j', 'f', 'j', 'f', 'h', 'f', 'g', 'g', 'h', 'g', 'h'],
        impactedKeys: ['F', 'G', 'H', 'J']
      },
      {
        id: 'fr-ch-index-finger-up-and-down',
        name: 'Haut et bas',
        expectedChars: ['n', 'u', 'm', 'n', 'm', 'v', 'u', 'n', 'r', 'c', 'r', 'b', 'z', 'v', 'b', 'r', 'u', 't', 'b', 'r', 'r', 'n', 't', 'b', 'r', 'z', 'b', 'v', 'n', 'b', 'u', 'z'],
        impactedKeys: ['R', 'T', 'Z', 'U', 'V', 'B', 'N', 'C', 'M']
      },
      {
        id: 'fr-ch-index-finger-all',
        name: 'Tous',
        expectedChars: ['t', 't', 'u', 'r', 'h', 'f', 'n', 'z', 'b', 'h', 'c', 'j', 'm', 'r', 'f', 'g', 't', 'm', 'n', 'g', 'r', 'g', 'j', 'j', 'v', 't', 'f', 'f', 't', 'g', 'h', 'n'],
        impactedKeys: ['R', 'T', 'Z', 'U', 'F', 'G', 'H', 'J', 'V', 'B', 'N', 'C', 'M']
      }
    ]
  },
  {
    name: 'Majeur',
    keyboardLayouts: ['fr-ch'],
    exercises: [
      {
        id: 'fr-ch-middle-finger-up-and-down',
        name: 'Haut et bas',
        expectedChars: ['x', ',', 'i', 'x', 'x', 'i', 'i', ',', 'e', 'i', 'e', ',', 'x', 'x', 'x', 'i', ',', 'e', 'i', ',', 'e', ',', 'x', 'x', 'e', 'x', 'x', 'e', ',', 'e', 'e', 'i'],
        impactedKeys: ['E', 'I', 'X', ',']
      },
      {
        id: 'fr-ch-middle-finger-all',
        name: 'Tous',
        expectedChars: ['k', 'i', 'x', 'd', 'e', 'd', 'e', ',', 'd', 'i', 'x', 'k', 'i', 'd', 'd', 'x', 'd', ',', 'e', 'i', ',', 'i', 'x', 'e', 'e', 'd', ',', 'x', 'x', 'e', 'x', 'k'],
        impactedKeys: ['E', 'I', 'D', 'K', 'X', ',']
      }
    ]
  },
  {
    name: 'Annulaire',
    keyboardLayouts: ['fr-ch'],
    exercises: [
      {
        id: 'fr-ch-ring-finger-up-and-down',
        name: 'Haut et bas',
        expectedChars: ['o', 'w', 'w', 'o', '.', '.', 'w', 'o', 'o', 'w', 'w', '.', '.', 'y', 'w', 'y', '.', 'w', '.', 'y', 'o', 'y', 'w', 'y', 'y', 'w', 'y', '.', 'y', 'o', 'y', 'w'],
        impactedKeys: ['W', 'O', 'Y', '.']
      },
      {
        id: 'fr-ch-ring-finger-all',
        name: 'Tous',
        expectedChars: ['y', 'l', '.', 'o', 'l', 's', 's', 'w', 'y', 'l', 'o', 'l', 'o', '.', 'w', 'y', 's', 'o', 'l', 'w', 's', 's', 'y', 'w', 'w', '.', 'l', 'l', 'y', 'o', 's', 'o'],
        impactedKeys: ['W', 'O', 'S', 'L', 'Y', '.']
      }
    ]
  },
  {
    name: 'Auriculaire',
    keyboardLayouts: ['fr-ch'],
    exercises: [
      {
        id: 'fr-ch-little-finger-all',
        name: 'Tous',
        expectedChars: ['è', 'q', 'q', 'è', 'é', 'a', 'é', 'è', 'è', 'a', 'é', 'q', 'é', 'é', 'a', 'é', 'q', 'q', 'è', 'a', 'é', 'a', 'è', 'è', 'q', 'è', 'è', 'q', 'é', 'a', 'a', 'é'],
        impactedKeys: ['Q', 'È', 'A', 'É']
      }
    ]
  },
  {
    name: 'Majuscules mixtes',
    keyboardLayouts: ['fr-ch'],
    exercises: [
      {
        id: 'fr-ch-mix-caps-fj',
        name: 'F / J',
        expectedChars: ['f', 'J', 'f', 'J', 'J', 'f', 'J', 'f', 'f', 'J', 'J', 'f', 'f', 'J', 'f', 'J', 'J', 'f', 'f', 'J', 'J', 'f', 'J', 'f', 'J', 'f', 'f', 'J', 'J', 'J', 'f', 'f'],
        impactedKeys: ['F', 'J']
      },
      {
        id: 'fr-ch-mix-caps-home-row',
        name: 'Rangée de base',
        expectedChars: ['A', 's', 'D', 'f', 'G', 'h', 'J', 'k', 'L', 'a', 'S', 'd', 'F', 'g', 'H', 'j', 'K', 'l', 'A', 'S', 'd', 'f', 'G', 'H', 'j', 'k', 'L', 'a', 'D', 'F', 'g', 'J'],
        impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
      },
      {
        id: 'fr-ch-mix-caps-all',
        name: 'Tous',
        expectedChars: ['A', 'b', 'C', 'd', 'E', 'f', 'G', 'h', 'I', 'j', 'K', 'l', 'M', 'n', 'O', 'p', 'Q', 'r', 'S', 't', 'U', 'v', 'W', 'x', 'Y', 'z', 'A', 'b', 'D', 'e', 'F', 'g'],
        impactedKeys: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      }
    ]
  },
  {
    name: 'Histoires',
    keyboardLayouts: ['fr-ch'],
    exercises: [
      {
        id: 'fr-ch-histoires-lina-se-presente',
        name: 'Lina se presente',
        expectedChars: ['B', 'o', 'n', 'j', 'o', 'u', 'r', ',', ' ', 'j', 'e', ' ', 'm', '\'', 'a', 'p', 'p', 'e', 'l', 'l', 'e', ' ', 'L', 'i', 'n', 'a', ' ', 'e', 't', ' ', 'j', '\'', 'a', 'i', ' ', 'h', 'u', 'i', 't', ' ', 'a', 'n', 's', '.', ' ', 'J', '\'', 'h', 'a', 'b', 'i', 't', 'e', ' ', 'à', ' ', 'L', 'a', 'u', 's', 'a', 'n', 'n', 'e', ' ', 'a', 'v', 'e', 'c', ' ', 'm', 'a', ' ', 'm', 'a', 'm', 'a', 'n', ' ', 'e', 't', ' ', 'm', 'o', 'n', ' ', 'p', 'a', 'p', 'a', '.', ' ', 'J', '\'', 'a', 'd', 'o', 'r', 'e', ' ', 'd', 'e', 's', 's', 'i', 'n', 'e', 'r', ' ', 'd', 'e', 's', ' ', 'a', 'n', 'i', 'm', 'a', 'u', 'x', ' ', 'c', 'o', 'l', 'o', 'r', 'é', 's', ' ', 'e', 't', ',', ' ', 'a', 'p', 'r', 'è', 's', ' ', 'l', '\'', 'é', 'c', 'o', 'l', 'e', ',', ' ', 'j', 'e', ' ', 'j', 'o', 'u', 'e', ' ', 's', 'o', 'u', 'v', 'e', 'n', 't', ' ', 'a', 'v', 'e', 'c', ' ', 'm', 'o', 'n', ' ', 'c', 'h', 'a', 't', ' ', 'N', 'i', 'n', 'o', '.'],
        impactedKeys: ['A', 'À', 'B', 'C', 'D', 'E', 'È', 'É', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'X', '\'', ' ', ',', '.']
      },
      {
        id: 'fr-ch-histoires-lune-et-noisette',
        name: 'Lune et Noisette',
        expectedChars: ['U', 'n', ' ', 'm', 'a', 't', 'i', 'n', ',', ' ', 'l', 'e', ' ', 'p', 'e', 't', 'i', 't', ' ', 'p', 'o', 'n', 'e', 'y', ' ', 'L', 'u', 'n', 'e', ' ', 't', 'r', 'o', 't', 't', 'a', 'i', 't', ' ', 'd', 'a', 'n', 's', ' ', 'l', 'e', ' ', 'p', 'r', 'é', ' ', 'd', 'e', 'r', 'r', 'i', 'è', 'r', 'e', ' ', 'l', 'a', ' ', 'f', 'e', 'r', 'm', 'e', '.', ' ', 'L', 'a', ' ', 'r', 'o', 's', 'é', 'e', ' ', 'b', 'r', 'i', 'l', 'l', 'a', 'i', 't', ' ', 's', 'u', 'r', ' ', 'l', '\'', 'h', 'e', 'r', 'b', 'e', ' ', 'e', 't', ' ', 'l', 'e', 's', ' ', 'o', 'i', 's', 'e', 'a', 'u', 'x', ' ', 'c', 'h', 'a', 'n', 't', 'a', 'i', 'e', 'n', 't', '.', ' ', 'P', 'r', 'è', 's', ' ', 'd', 'e', ' ', 'l', 'a', ' ', 'c', 'l', 'ô', 't', 'u', 'r', 'e', ',', ' ', 'u', 'n', ' ', 'é', 'c', 'u', 'r', 'e', 'u', 'i', 'l', ' ', 'c', 'u', 'r', 'i', 'e', 'u', 'x', ' ', 'n', 'o', 'm', 'm', 'é', ' ', 'N', 'o', 'i', 's', 'e', 't', 't', 'e', ' ', 't', 'r', 'e', 'm', 'b', 'l', 'a', 'i', 't', ' ', 'u', 'n', ' ', 'p', 'e', 'u', ',', ' ', 'c', 'a', 'r', ' ', 'i', 'l', ' ', 'c', 'h', 'e', 'r', 'c', 'h', 'a', 'i', 't', ' ', 's', 'o', 'n', ' ', 'g', 'r', 'a', 'n', 'd', ' ', 'c', 'h', 'ê', 'n', 'e', '.', ' ', 'L', 'u', 'n', 'e', ' ', 'l', '\'', 'a', ' ', 'g', 'u', 'i', 'd', 'é', ' ', 'a', 'v', 'e', 'c', ' ', 'p', 'a', 't', 'i', 'e', 'n', 'c', 'e', ',', ' ', 'a', ' ', 'p', 'a', 'r', 't', 'a', 'g', 'é', ' ', 's', 'o', 'n', ' ', 'f', 'o', 'i', 'n', ',', ' ', 'p', 'u', 'i', 's', ' ', 'i', 'l', 's', ' ', 'o', 'n', 't', ' ', 'j', 'o', 'u', 'é', ' ', 'e', 'n', 's', 'e', 'm', 'b', 'l', 'e', ' ', 'j', 'u', 's', 'q', 'u', '\'', 'a', 'u', ' ', 'c', 'o', 'u', 'c', 'h', 'e', 'r', ' ', 'd', 'u', ' ', 's', 'o', 'l', 'e', 'i', 'l', ' ', 'e', 'n', 't', 'r', 'e', ' ', 'l', 'e', 's', ' ', 'f', 'l', 'e', 'u', 'r', 's', '.'],
        impactedKeys: ['A', 'B', 'C', 'D', 'E', 'È', 'É', 'Ê', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'Ô', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', '\'', ' ', ',', '.']
      }
    ]
  }
];
