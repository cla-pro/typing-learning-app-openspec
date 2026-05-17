import { Injectable, inject } from '@angular/core';

import { RewardGameSetup } from '../models/reward-game-setup.model';
import { ExerciseProgressService } from './exercise-progress.service';

@Injectable({ providedIn: 'root' })
export class RewardGameUnlockService {
  private readonly exerciseProgressService = inject(ExerciseProgressService);

  isUnlocked(setup: RewardGameSetup): boolean {
    if (this.exerciseProgressService.getTotalStars() < setup.unlockCriteria.TotalNbStarsRequired) {
      return false;
    }

    const categoryRequirements = setup.unlockCriteria.NbStarsByCategoryRequired ?? new Map<string, number>();
    return Array.from(categoryRequirements.entries())
      .filter(([categoryId, requiredStars]) => this.exerciseProgressService.getStarsForCategory(categoryId) < requiredStars)
      .length == 0;
  }
}