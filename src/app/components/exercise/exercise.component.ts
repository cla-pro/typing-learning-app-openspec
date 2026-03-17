import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { ExerciseConfigService } from '../../services/exercise-config.service';

type ExerciseRuntimeState = 'opened' | 'running' | 'pending' | 'completed';
const ZOOM_OFFSETS: readonly number[] = [-2, -1, 0, 1, 2];
const STREAM_SIZE_STORAGE_KEY: string = 'exercise.streamSizeValue';
const STREAM_SIZE_MIN: number = 0;
const STREAM_SIZE_MAX: number = 1;
const STREAM_SIZE_SCALE_SPAN: number = 0.6;

@Component({
    selector: 'app-exercise',
  imports: [HomeButtonComponent],
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
  streamSizeValue: number = STREAM_SIZE_MIN;
  private hasValidExercise: boolean = false;

  get activeExpectedChar(): string {
    return this.expectedCharsToDisplay[this.activeExpectedCharIndex] ?? '';
  }

  get hasActiveExpectedChar(): boolean {
    return this.activeExpectedCharIndex >= 0
      && this.activeExpectedCharIndex < this.expectedCharsToDisplay.length;
  }

  get previousSideChars(): string[] {
    const endExclusive = Math.max(0, this.activeExpectedCharIndex - 2);
    return this.expectedCharsToDisplay.slice(0, endExclusive);
  }

  get followingSideChars(): string[] {
    const start = Math.min(this.expectedCharsToDisplay.length, this.activeExpectedCharIndex + 3);
    return this.expectedCharsToDisplay.slice(start);
  }

  get zoomWindowChars(): Array<string | null> {
    return ZOOM_OFFSETS.map((offset: number): string | null => {
      if (!this.hasActiveExpectedChar && offset === 0) {
        return null;
      }

      return this.expectedCharsToDisplay[this.activeExpectedCharIndex + offset] ?? null;
    });
  }

  get isExerciseRunning(): boolean {
    return this.exerciseRuntimeState === 'running';
  }

  get isRuntimeControlDisabled(): boolean {
    return this.exerciseRuntimeState === 'completed';
  }

  get displayedPressedKey(): string {
    return this.lastPressedKey || '\u00A0';
  }

  get streamSizeMin(): number {
    return STREAM_SIZE_MIN;
  }

  get streamSizeMax(): number {
    return STREAM_SIZE_MAX;
  }

  get streamSizeScale(): number {
    return 1 + (this.streamSizeValue * STREAM_SIZE_SCALE_SPAN);
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
      this.streamSizeValue = this.loadPersistedStreamSize();
    });
  }

  handleStreamSizeInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const nextValue = Number(target?.value);

    this.streamSizeValue = this.coerceStreamSizeValue(nextValue);
    this.persistStreamSize();
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

  handleExerciseKeydown(event: KeyboardEvent): void {
    if (!this.isExerciseRunning) {
      return;
    }

    this.lastPressedKey = event.key;

    if (event.key !== this.activeExpectedChar) {
      return;
    }

    if (this.activeExpectedCharIndex >= this.expectedCharsToDisplay.length - 1) {
      this.activeExpectedCharIndex = this.expectedCharsToDisplay.length;
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
    this.streamSizeValue = STREAM_SIZE_MIN;
  }

  private loadPersistedStreamSize(): number {
    try {
      const storedValue = globalThis.localStorage?.getItem(STREAM_SIZE_STORAGE_KEY);
      return this.coerceStreamSizeValue(Number(storedValue));
    } catch {
      return STREAM_SIZE_MIN;
    }
  }

  private persistStreamSize(): void {
    try {
      globalThis.localStorage?.setItem(STREAM_SIZE_STORAGE_KEY, this.streamSizeValue.toString());
    } catch {
      // Ignore storage failures and keep the in-memory value.
    }
  }

  private coerceStreamSizeValue(value: number): number {
    if (!Number.isFinite(value)) {
      return STREAM_SIZE_MIN;
    }

    return Math.min(STREAM_SIZE_MAX, Math.max(STREAM_SIZE_MIN, value));
  }

  private redirectToNotFound(): void {
    this.router.navigate(['/exercices/not-found']);
  }
}

