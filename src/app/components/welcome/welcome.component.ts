import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ExerciseCategory } from '../../models/exercise-config.model';
import { ExerciseConfigService } from '../../services/exercise-config.service';
import { ExerciseProgressService } from '../../services/exercise-progress.service';
import { SettingsService } from '../../services/settings.service';

export interface ExerciseTile {
  id: string;
  name: string;
  completed: boolean;
  stars: number;
}

export interface ExerciseCategoryWithProgress {
  name: string;
  exercises: ExerciseTile[];
}

@Component({
    selector: 'app-welcome',
  imports: [RouterLink, TranslateModule],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  private readonly exerciseConfigService = inject(ExerciseConfigService);
  private readonly exerciseProgressService = inject(ExerciseProgressService);
  private readonly settingsService = inject(SettingsService);

  readonly settingsRoute: string = '/settings';
  exerciseCategories: ExerciseCategory[];
  exerciseCategoriesWithProgress: ExerciseCategoryWithProgress[];

  constructor() {
    this.exerciseCategories = [];
    this.exerciseCategoriesWithProgress = [];
    this.reloadCategories();
  }

  private reloadCategories(): void {
    const layout = this.settingsService.getChosenLayout();
    this.exerciseCategories = this.exerciseConfigService.listExerciseCategories(layout);
    this.exerciseCategoriesWithProgress = this.exerciseCategories.map(category => ({
      name: category.name,
      exercises: category.exercises.map(exercise => {
        return {
          id: exercise.id,
          name: exercise.name,
          completed: this.exerciseProgressService.isCompleted(exercise.id),
          stars: this.exerciseProgressService.getStars(exercise.id)
        };
      })
    }));
  }
}

