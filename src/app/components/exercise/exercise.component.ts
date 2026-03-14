import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { ExerciseConfigService } from '../../services/exercise-config.service';

type ExerciseRuntimeState = 'opened' | 'running' | 'pending' | 'completed';

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
  exerciseRuntimeState: ExerciseRuntimeState = 'opened';
  lastPressedKey: string = '';

  get isExerciseRunning(): boolean {
    return this.exerciseRuntimeState === 'running';
  }

  get runtimeActionLabel(): string {
    return this.isExerciseRunning ? 'pause' : 'start';
  }

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
        this.exerciseRuntimeState = 'opened';
        this.lastPressedKey = '';
        return;
      }

      this.isExerciseFound = true;
      this.exerciseName = exerciseConfig.name;
      this.lettersToDisplay = this.normalizeLetters(exerciseConfig.letters);
      this.impactedKeys = exerciseConfig.impactedKeys;
      this.exerciseRuntimeState = 'opened';
      this.lastPressedKey = '';
    });
  }

  toggleRuntimeState(): void {
    if (!this.isExerciseFound || this.exerciseRuntimeState === 'completed') {
      return;
    }

    if (this.exerciseRuntimeState === 'running') {
      this.exerciseRuntimeState = 'pending';
    } else {
      this.exerciseRuntimeState = 'running';
    }
  }

  completeExerciseTemporarily(): void {
    if (this.isExerciseFound) {
      this.exerciseRuntimeState = 'completed';
    }
  }

  handleExerciseKeydown(event: KeyboardEvent): void {
    if (this.isExerciseRunning) {
      this.lastPressedKey = event.key;
    }
  }

  private normalizeLetters(letters: string[] | string): string[] {
    if (Array.isArray(letters)) {
      return letters;
    }

    return letters.split('');
  }
}

