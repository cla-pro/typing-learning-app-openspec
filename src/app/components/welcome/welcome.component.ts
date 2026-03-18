import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ExerciseCategory } from '../../models/exercise-config.model';
import { ExerciseConfigService } from '../../services/exercise-config.service';

@Component({
    selector: 'app-welcome',
    imports: [RouterLink],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  private readonly exerciseConfigService = inject(ExerciseConfigService);

  exerciseCategories: ExerciseCategory[];

  constructor() {
    this.exerciseCategories = this.exerciseConfigService.listExerciseCategories();
  }
}

