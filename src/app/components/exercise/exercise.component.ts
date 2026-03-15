import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ExerciseConfigService } from '../../services/exercise-config.service';

type ExerciseRuntimeState = 'opened' | 'running' | 'pending' | 'completed';

@Component({
    selector: 'app-exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly exerciseConfigService = inject(ExerciseConfigService);

  exerciseId: string = '';
  exerciseName: string = '';
  expectedCharsToDisplay: string[] = [];
  activeExpectedCharIndex: number = 0;
  impactedKeys: string[] = [];
  exerciseRuntimeState: ExerciseRuntimeState = 'opened';
  lastPressedKey: string = '';
  private hasValidExercise: boolean = false;

  get activeExpectedChar(): string {
    return this.expectedCharsToDisplay[this.activeExpectedCharIndex] ?? '';
  }

  get isExerciseRunning(): boolean {
    return this.exerciseRuntimeState === 'running';
  }

  get runtimeActionLabel(): string {
    return this.isExerciseRunning ? 'pause' : 'start';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.exerciseId = (paramMap.get('id') ?? '').trim();

      if (!this.exerciseId) {
        this.resetExerciseState();
        this.redirectToNotFound();
        return;
      }

      const exerciseConfig = this.exerciseConfigService.getExerciseById(this.exerciseId);

      if (!exerciseConfig) {
        this.resetExerciseState();
        this.redirectToNotFound();
        return;
      }

      this.hasValidExercise = true;
      this.exerciseName = exerciseConfig.name;

      if (!this.hasValidExpectedChars(exerciseConfig.expectedChars)) {
        this.resetExerciseState();
        this.redirectToNotFound();
        return;
      }

      this.expectedCharsToDisplay = exerciseConfig.expectedChars;
      this.activeExpectedCharIndex = 0;
      this.impactedKeys = exerciseConfig.impactedKeys;
      this.exerciseRuntimeState = 'opened';
      this.lastPressedKey = '';
    });
  }

  toggleRuntimeState(): void {
    if (!this.hasValidExercise || this.exerciseRuntimeState === 'completed') {
      return;
    }

    if (this.exerciseRuntimeState === 'running') {
      this.exerciseRuntimeState = 'pending';
    } else {
      this.exerciseRuntimeState = 'running';
    }
  }

  completeExerciseTemporarily(): void {
    if (this.hasValidExercise) {
      this.exerciseRuntimeState = 'completed';
    }
  }

  handleExerciseKeydown(event: KeyboardEvent): void {
    if (!this.isExerciseRunning) {
      return;
    }

    this.lastPressedKey = event.key;

    if (event.key !== this.activeExpectedChar) {
      return;
    }

    if (this.activeExpectedCharIndex >= this.expectedCharsToDisplay.length - 1) {
      this.exerciseRuntimeState = 'completed';
      return;
    }

    this.activeExpectedCharIndex += 1;
  }

  private hasValidExpectedChars(expectedChars: string[]): boolean {
    return Array.isArray(expectedChars) && expectedChars.length > 0;
  }

  private resetExerciseState(): void {
    this.hasValidExercise = false;
    this.exerciseName = '';
    this.expectedCharsToDisplay = [];
    this.activeExpectedCharIndex = 0;
    this.impactedKeys = [];
    this.exerciseRuntimeState = 'opened';
    this.lastPressedKey = '';
  }

  private redirectToNotFound(): void {
    this.router.navigate(['/exercices/not-found']);
  }
}

