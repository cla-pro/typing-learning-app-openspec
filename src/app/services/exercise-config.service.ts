import { Injectable } from '@angular/core';

import { ExerciseConfig } from '../models/exercise-config.model';

@Injectable({ providedIn: 'root' })
export class ExerciseConfigService {
  private readonly exercises: ExerciseConfig[] = [
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
    },
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
    },
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
    },
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
  ];

  listExercises(): ExerciseConfig[] {
    return this.exercises.filter(exercise => this.hasValidExpectedChars(exercise));
  }

  getExerciseById(exerciseId: string): ExerciseConfig | undefined {
    const exercise = this.exercises.find(candidate => candidate.id === exerciseId);

    if (!exercise || !this.hasValidExpectedChars(exercise)) {
      return undefined;
    }

    return exercise;
  }

  private hasValidExpectedChars(exercise: ExerciseConfig): boolean {
    return Array.isArray(exercise.expectedChars) && exercise.expectedChars.length > 0;
  }
}
