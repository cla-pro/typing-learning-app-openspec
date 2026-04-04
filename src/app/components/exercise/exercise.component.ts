import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { KeyboardDisplayComponent } from '../keyboard-display/keyboard-display.component';
import { ExerciseConfigService } from '../../services/exercise-config.service';
import { ExerciseProgressService } from '../../services/exercise-progress.service';
import { SettingsService } from '../../services/settings.service';

type ExerciseRuntimeState = 'opened' | 'running' | 'pending' | 'completed';
const ZOOM_OFFSETS: readonly number[] = [-2, -1, 0, 1, 2];
const STREAM_SIZE_MIN: number = 0;
const STREAM_SIZE_SCALE_SPAN: number = 0.6;

@Component({
    selector: 'app-exercise',
  imports: [HomeButtonComponent, KeyboardDisplayComponent],
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly exerciseConfigService = inject(ExerciseConfigService);
  private readonly exerciseProgressService = inject(ExerciseProgressService);
  private readonly settingsService = inject(SettingsService);
  @ViewChild('exerciseContent') private exerciseContentRef?: ElementRef<HTMLDivElement>;

  exerciseId: string = '';
  exerciseName: string = '';
  expectedCharsToDisplay: string[] = [];
  activeExpectedCharIndex: number = 0;
  impactedKeys: string[] = [];
  chosenLayout: string = 'fr-ch';
  exerciseRuntimeState: ExerciseRuntimeState = 'opened';
  lastPressedKey: string = '';
  errorCount: number = 0;
  isLastKeyWrong: boolean = false;
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
      this.chosenLayout = this.settingsService.getChosenLayout();
      this.exerciseRuntimeState = 'opened';
      this.lastPressedKey = '';
      this.errorCount = 0;
      this.isLastKeyWrong = false;
      this.streamSizeValue = this.settingsService.getStreamSizeValue();
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
      this.focusExerciseContent();
    }
  }

  handleExerciseKeydown(event: KeyboardEvent): void {
    if (!this.isExerciseRunning) {
      return;
    }

    this.lastPressedKey = event.key;

    if (event.key !== this.activeExpectedChar) {
      this.errorCount++;
      this.isLastKeyWrong = true;
      return;
    }

    this.isLastKeyWrong = false;

    if (this.activeExpectedCharIndex >= this.expectedCharsToDisplay.length - 1) {
      this.activeExpectedCharIndex = this.expectedCharsToDisplay.length;
      this.exerciseProgressService.recordCompletion(this.exerciseId, this.errorCount, this.expectedCharsToDisplay.length);
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
    this.chosenLayout = 'fr-ch';
    this.exerciseRuntimeState = 'opened';
    this.lastPressedKey = '';
    this.errorCount = 0;
    this.isLastKeyWrong = false;
    this.streamSizeValue = STREAM_SIZE_MIN;
  }

  private focusExerciseContent(): void {
    this.exerciseContentRef?.nativeElement.focus();
  }

  private redirectToNotFound(): void {
    this.router.navigate(['/exercices/not-found']);
  }
}

