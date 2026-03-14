import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { ExerciseConfigService } from '../../services/exercise-config.service';

@Component({
    selector: 'app-exercise',
    imports: [HomeButtonComponent],
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exerciseId: string = '';
  exerciseName: string = '';
  lettersToDisplay: string[] = [];
  impactedKeys: string[] = [];
  isExerciseFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private exerciseConfigService: ExerciseConfigService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.exerciseId = (paramMap.get('id') ?? '').trim();
      const exerciseConfig = this.exerciseConfigService.getExerciseById(this.exerciseId);

      if (!exerciseConfig) {
        this.isExerciseFound = false;
        this.exerciseName = '';
        this.lettersToDisplay = [];
        this.impactedKeys = [];
        return;
      }

      this.isExerciseFound = true;
      this.exerciseName = exerciseConfig.name;
      this.lettersToDisplay = this.normalizeLetters(exerciseConfig.letters);
      this.impactedKeys = exerciseConfig.impactedKeys;
    });
  }

  private normalizeLetters(letters: string[] | string): string[] {
    if (Array.isArray(letters)) {
      return letters;
    }

    return letters.split('');
  }
}

