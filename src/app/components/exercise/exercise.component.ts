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
  lettersToDisplay: string[] = [];
  impactedKeys: string[] = [];
  exerciseRuntimeState: ExerciseRuntimeState = 'opened';
  lastPressedKey: string = '';
  private hasValidExercise: boolean = false;

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
      this.lettersToDisplay = this.normalizeLetters(exerciseConfig.letters);
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

  private resetExerciseState(): void {
    this.hasValidExercise = false;
    this.exerciseName = '';
    this.lettersToDisplay = [];
    this.impactedKeys = [];
    this.exerciseRuntimeState = 'opened';
    this.lastPressedKey = '';
  }

  private redirectToNotFound(): void {
    this.router.navigate(['/exercices/not-found']);
  }
}

