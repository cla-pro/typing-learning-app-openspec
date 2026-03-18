import { Injectable } from '@angular/core';

import { ExerciseCategory, ExerciseConfig } from '../models/exercise-config.model';

@Injectable({ providedIn: 'root' })
export class ExerciseConfigService {
  private readonly exerciseCategories: ExerciseCategory[] = [
    {
      name: 'Core Drills',
      exercises: [
        {
          id: 'basic-typing',
          name: '🔤 Basic Typing',
          expectedChars: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
          impactedKeys: ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';']
        },
        {
          id: 'speed-test',
          name: '⚡ Speed Test',
          expectedChars: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
          impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
        },
        {
          id: 'accuracy-training',
          name: '🎯 Accuracy Training',
          expectedChars: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
          impactedKeys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        }
      ]
    },
    {
      name: 'Middle Line',
      exercises: [
        {
          id: 'middle-line-random-1',
          name: '⌨️ Middle Line Random 1',
          expectedChars: Array.from('asdfghjklé agjdls hfkéajg dslhfkaé jgdsl'),
          impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É', ' ']
        },
        {
          id: 'middle-line-random-2',
          name: '⌨️ Middle Line Random 2',
          expectedChars: Array.from('élkjhgfdsa shadgjkl fésalg hdjk ldfaésgh'),
          impactedKeys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É', ' ']
        }
      ]
    },
    {
      name: 'Upper Line',
      exercises: [
        {
          id: 'upper-line-random-1',
          name: '⬆️ Upper Line Random 1',
          expectedChars: Array.from('qwertzuiop èqztwruiopqe rtzuièowq rztep '),
          impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'È', ' ']
        },
        {
          id: 'upper-line-random-2',
          name: '⬆️ Upper Line Random 2',
          expectedChars: Array.from('èpoiuztrewq ztqeuiop rtwèzuiopqe tzruip '),
          impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'È', ' ']
        }
      ]
    },
    {
      name: 'Lower Line',
      exercises: [
        {
          id: 'lower-line-random-1',
          name: '⬇️ Lower Line Random 1',
          expectedChars: Array.from('yxcvbnm,. myx cvbn,. ymbxcnv,. yxvbm,nc.'),
          impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
        },
        {
          id: 'lower-line-random-2',
          name: '⬇️ Lower Line Random 2',
          expectedChars: Array.from('.,mnbvcxy yxm ,cvbn. nyxvcbm,. y,mxnbvc.'),
          impactedKeys: ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ' ']
        }
      ]
    }
  ];

  listExerciseCategories(): ExerciseCategory[] {
    return this.exerciseCategories
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
