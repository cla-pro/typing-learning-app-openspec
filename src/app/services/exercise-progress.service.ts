import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExerciseProgressService {
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
