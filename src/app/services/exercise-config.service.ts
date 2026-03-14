import { Injectable } from '@angular/core';

import { ExerciseConfig } from '../models/exercise-config.model';

@Injectable({ providedIn: 'root' })
export class ExerciseConfigService {
  private readonly exercises: ExerciseConfig[] = [
    {
      id: 'basic-typing',
      name: '🔤 Basic Typing',
      letters: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
      impactedKeys: ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';']
    },
    {
      id: 'speed-test',
      name: '⚡ Speed Test',
      letters: 'qwertyuiop',
      impactedKeys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    },
    {
      id: 'accuracy-training',
      name: '🎯 Accuracy Training',
      letters: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
      impactedKeys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    }
  ];

  listExercises(): ExerciseConfig[] {
    return this.exercises;
  }

  getExerciseById(exerciseId: string): ExerciseConfig | undefined {
    return this.exercises.find(exercise => exercise.id === exerciseId);
  }
}
