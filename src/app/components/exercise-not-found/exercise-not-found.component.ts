import { Component } from '@angular/core';

import { HomeButtonComponent } from '../home-button/home-button.component';

@Component({
    selector: 'app-exercise-not-found',
    imports: [HomeButtonComponent],
    templateUrl: './exercise-not-found.component.html',
    styleUrls: ['./exercise-not-found.component.css']
})
export class ExerciseNotFoundComponent {
  readonly message = 'No exercise is available for this request.';
}
