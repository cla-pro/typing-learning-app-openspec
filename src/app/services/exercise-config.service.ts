import { Injectable } from '@angular/core';

import { EXERCISE_CATEGORIES, EXERCISE_CATEGORIES_BY_LAYOUT } from '../data/typing-scenarios';
import { ExerciseCategory, ExerciseConfig } from '../models/exercise-config.model';

@Injectable({ providedIn: 'root' })
export class ExerciseConfigService {
  private readonly exerciseCategories: ExerciseCategory[] = EXERCISE_CATEGORIES;

  listExerciseCategories(layout: string): ExerciseCategory[] {
    const categoriesForLayout = EXERCISE_CATEGORIES_BY_LAYOUT[layout] ?? [];

    return categoriesForLayout
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
