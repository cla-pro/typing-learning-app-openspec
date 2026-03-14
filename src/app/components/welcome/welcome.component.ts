import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ExerciseConfig } from '../../models/exercise-config.model';
import { ExerciseConfigService } from '../../services/exercise-config.service';

@Component({
    selector: 'app-welcome',
    imports: [RouterLink],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  exercises: ExerciseConfig[];

  constructor(private exerciseConfigService: ExerciseConfigService) {
    this.exercises = this.exerciseConfigService.listExercises();
  }
}

