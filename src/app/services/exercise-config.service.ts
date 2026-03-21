import { Injectable } from '@angular/core';

import { ExerciseCategory, ExerciseConfig } from '../models/exercise-config.model';

@Injectable({ providedIn: 'root' })
export class ExerciseConfigService {
  private readonly exerciseCategories: ExerciseCategory[] = [
    {
      name: 'Middle Line',
      keyboardLayouts: ['fr-ch'],
      exercises: [
        {
          id: 'middle-line-fj',
          name: 'F / J',
          expectedChars: ['f', 'j', 'j', 'f', 'j', 'j', 'f', 'j', 'f', 'j', 'j', 'f', 'f', 'j', 'f', 'f', 'j'],
          impactedKeys: ['F', 'J']
        },
        {
          id: 'middle-line-dk',
          name: 'D / K',
          expectedChars: ['k', 'd', 'k', 'k', 'd', 'k', 'd', 'd', 'k', 'k', 'd', 'd', 'k', 'd', 'k', 'k', 'd'],
          impactedKeys: ['D', 'K']
        },
        {
          id: 'middle-line-sl',
          name: 'S / L',
          expectedChars: ['l', 's', 'l', 'l', 's', 's', 'l', 's', 'l', 's', 's', 'l', 'l', 's', 'l', 's', 's'],
          impactedKeys: ['S', 'L']
        },
        {
          id: 'middle-line-gh',
          name: 'G / H',
          expectedChars: ['h', 'g', 'g', 'h', 'g', 'h', 'h', 'g', 'h', 'g', 'g', 'h', 'h', 'g', 'h', 'g', 'g'],
          impactedKeys: ['G', 'H']
        },
        {
          id: 'middle-line-all-1',
          name: 'All 1',
          expectedChars: Array.from('gfkdéls jah sdfjgklé dahfs jékgld saef jh'),
          impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É', ' ']
        },
        {
          id: 'middle-line-all-2',
          name: 'All 2',
          expectedChars: Array.from('ghfkdlés jfag édhsglkf jédals gfhkj éds'),
          impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É', ' ']
        }
      ]
    },
    {
      name: 'Upper Line',
      keyboardLayouts: ['fr-ch'],
      exercises: [
        {
          id: 'upper-line-tz',
          name: 'T / Z',
          expectedChars: ['t', 'z', 't', 't', 'z', 'z', 't', 'z', 't', 'z', 'z', 't', 't', 'z', 't', 'z', 'z'],
          impactedKeys: ['T', 'Z']
        },
        {
          id: 'upper-line-ru',
          name: 'R / U',
          expectedChars: ['u', 'r', 'r', 'u', 'r', 'u', 'u', 'r', 'u', 'r', 'r', 'u', 'u', 'r', 'u', 'r', 'r'],
          impactedKeys: ['R', 'U']
        },
        {
          id: 'upper-line-ei',
          name: 'E / I',
          expectedChars: ['e', 'i', 'i', 'e', 'i', 'i', 'e', 'i', 'e', 'i', 'i', 'e', 'e', 'i', 'e', 'e', 'i'],
          impactedKeys: ['E', 'I']
        },
        {
          id: 'upper-line-wo',
          name: 'W / O',
          expectedChars: ['o', 'w', 'w', 'o', 'w', 'o', 'o', 'w', 'o', 'w', 'w', 'o', 'o', 'w', 'o', 'w', 'w'],
          impactedKeys: ['W', 'O']
        },
        {
          id: 'upper-line-qp',
          name: 'Q / P',
          expectedChars: ['p', 'q', 'q', 'p', 'q', 'q', 'p', 'q', 'p', 'q', 'q', 'p', 'p', 'q', 'p', 'p', 'q'],
          impactedKeys: ['Q', 'P']
        },
        {
          id: 'upper-line-all-1',
          name: 'All 1',
          expectedChars: Array.from('tzuièowq trèuiopz èqwtzrui zpowèqrt eitz'),
          impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'È', ' ']
        },
        {
          id: 'upper-line-all-2',
          name: 'All 2',
          expectedChars: Array.from('upqwètzroi tuièzwopq trèzquipo ètpzuroi'),
          impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'È', ' ']
        }
      ]
    },
    {
      name: 'Lower Line',
      keyboardLayouts: ['fr-ch'],
      exercises: [
        {
          id: 'lower-line-vbn',
          name: 'V / B / N',
          expectedChars: ['b', 'v', 'n', 'v', 'b', 'n', 'n', 'b', 'v', 'n', 'v', 'b', 'v', 'n', 'b', 'b', 'n'],
          impactedKeys: ['V', 'B', 'N']
        },
        {
          id: 'lower-line-cm',
          name: 'C / M',
          expectedChars: ['m', 'c', 'c', 'm', 'c', 'c', 'm', 'c', 'm', 'c', 'c', 'm', 'm', 'c', 'm', 'c', 'c'],
          impactedKeys: ['C', 'M']
        },
        {
          id: 'lower-line-x-comma',
          name: 'X / ,',
          expectedChars: ['x', ',', ',', 'x', ',', 'x', 'x', ',', 'x', ',', ',', 'x', 'x', ',', 'x', ',', ','],
          impactedKeys: ['X', ',']
        },
        {
          id: 'lower-line-y-period',
          name: 'Y / .',
          expectedChars: ['y', '.', '.', 'y', '.', '.', 'y', '.', 'y', '.', '.', 'y', 'y', '.', 'y', 'y', '.'],
          impactedKeys: ['Y', '.']
        },
        {
          id: 'lower-line-all-1',
          name: 'All 1',
          expectedChars: Array.from('xcnmbvyé, xnbvmy,. cvbnamy,. mybxcnv,.'),
          impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
        },
        {
          id: 'lower-line-all-2',
          name: 'All 2',
          expectedChars: Array.from(',.mybcvxn ycnxmb,v. nmbvcx,y. y,xnmcbv'),
          impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
        }
      ]
    }
  ];

  listExerciseCategories(layout: string): ExerciseCategory[] {
    return this.exerciseCategories
      .filter((category: ExerciseCategory) => category.keyboardLayouts.includes(layout))
      .map((category: ExerciseCategory) => ({
        ...category,
        exercises: category.exercises.filter((exercise: ExerciseConfig) => this.hasValidExpectedChars(exercise))
      }))
      .filter((category: ExerciseCategory) => category.exercises.length > 0);
  }

  getExerciseById(exerciseId: string): ExerciseConfig | undefined {
    for (const category of this.exerciseCategories) {
      const exercise = category.exercises.find((candidate: ExerciseConfig) => candidate.id === exerciseId);

      if (exercise && this.hasValidExpectedChars(exercise)) {
        return exercise;
      }
    }

    return undefined;
  }

  private hasValidExpectedChars(exercise: ExerciseConfig): boolean {
    return Array.isArray(exercise.expectedChars) && exercise.expectedChars.length > 0;
  }
}
