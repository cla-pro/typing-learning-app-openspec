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
