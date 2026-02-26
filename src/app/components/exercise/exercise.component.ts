import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeButtonComponent } from '../home-button/home-button.component';

@Component({
    selector: 'app-exercise',
    imports: [HomeButtonComponent],
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exerciseId: string = '';
  exerciseName: string = 'Exercise';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.exerciseId = params['id'] || 'unknown';
      this.exerciseName = this.formatExerciseName(this.exerciseId);
    });
  }

  private formatExerciseName(id: string): string {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

