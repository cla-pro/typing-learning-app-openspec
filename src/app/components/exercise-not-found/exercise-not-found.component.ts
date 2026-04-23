import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HomeButtonComponent } from '../home-button/home-button.component';

@Component({
    selector: 'app-exercise-not-found',
    imports: [HomeButtonComponent, TranslateModule],
    templateUrl: './exercise-not-found.component.html',
    styleUrls: ['./exercise-not-found.component.css']
})
export class ExerciseNotFoundComponent {}
