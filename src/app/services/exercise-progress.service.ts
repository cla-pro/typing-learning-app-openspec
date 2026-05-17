import { Injectable, inject } from '@angular/core';

import { ExerciseConfigService } from './exercise-config.service';
import { SettingsService } from './settings.service';

@Injectable({ providedIn: 'root' })
export class ExerciseProgressService {
  private readonly exerciseConfigService = inject(ExerciseConfigService);
  private readonly settingsService = inject(SettingsService);

  recordCompletion(exerciseId: string, errorCount: number, totalChars: number): void {
    const stars = this.computeStars(errorCount, totalChars);

    try {
      globalThis.localStorage?.setItem(`${exerciseId}_completed`, 'true');
      globalThis.localStorage?.setItem(`${exerciseId}_stars`, stars.toString());
    } catch {
      // Ignore storage failures.
    }
  }

  isCompleted(exerciseId: string): boolean {
    try {
      return globalThis.localStorage?.getItem(`${exerciseId}_completed`) === 'true';
    } catch {
      return false;
    }
  }

  getStars(exerciseId: string): number {
    try {
      const stored = globalThis.localStorage?.getItem(`${exerciseId}_stars`);
      const value = Number(stored);
      return Number.isFinite(value) ? value : 0;
    } catch {
      return 0;
    }
  }

  getTotalStars(): number {
    try {
      const storage = globalThis.localStorage;

      if (!storage) {
        return 0;
      }

      let total = 0;

      for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);

        if (!key || !key.endsWith('_stars')) {
          continue;
        }

        const value = Number(storage.getItem(key));

        if (Number.isFinite(value)) {
          total += value;
        }
      }

      return total;
    } catch {
      return 0;
    }
  }

  getStarsByCategory(): Map<string, number> {
    const layout = this.settingsService.getChosenLayout();
    const categories = this.exerciseConfigService.listExerciseCategories(layout);
    const starsByCategory = new Map<string, number>();

    for (const category of categories) {
      const categoryTotal = category.exercises.reduce((total, exercise) => total + this.getStars(exercise.id), 0);
      starsByCategory.set(category.id, categoryTotal);
    }

    return starsByCategory;
  }

  getStarsForCategory(categoryId: string): number {
    return this.getStarsByCategory().get(categoryId) ?? 0;
  }

  private computeStars(errorCount: number, totalChars: number): number {
    if (totalChars === 0) {
      return 3;
    }

    const ratio = errorCount / totalChars;

    if (ratio < 0.05) {
      return 3;
    } else if (ratio < 0.15) {
      return 2;
    } else if (ratio < 0.25) {
      return 1;
    } else {
      return 0;
    }
  }
}
