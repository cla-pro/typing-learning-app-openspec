import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  getStarsCelebrationAnimationPath,
  pickRandomCompletionAnimation
} from '../../data/completion-animation-assets';

type CompletionCelebrationPhase = 'first' | 'second' | 'done';

const DEFAULT_FIRST_PHASE_DURATION_MS = 1800;
const DEFAULT_SECOND_PHASE_DURATION_MS = 1100;

@Component({
  selector: 'app-completion-celebration',
  templateUrl: './completion-celebration.component.html',
  styleUrls: ['./completion-celebration.component.css']
})
export class CompletionCelebrationComponent implements OnChanges, OnDestroy {
  private readonly router = inject(Router);

  @Input() visible: boolean = false;
  @Input() achievedStars: number = 0;
  @Input() destination: string = '/';
  @Input() firstPhaseDurationMs: number = DEFAULT_FIRST_PHASE_DURATION_MS;
  @Input() secondPhaseDurationMs: number = DEFAULT_SECOND_PHASE_DURATION_MS;
  @Input() randomValueProvider: () => number = Math.random;

  @Output() retryRequested = new EventEmitter<void>();

  phase: CompletionCelebrationPhase = 'done';
  firstPhaseGifSrc: string = '';
  secondPhaseGifSrc: string = '';

  private pendingTimer: ReturnType<typeof setTimeout> | null = null;

  get overlayVisible(): boolean {
    return this.visible;
  }

  get currentGifSrc(): string {
    return this.phase === 'first' ? this.firstPhaseGifSrc : this.secondPhaseGifSrc;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.visible) {
      this.clearTimer();
      this.phase = 'done';
      return;
    }

    if (changes['visible']?.currentValue === true || changes['achievedStars']) {
      this.startSequence();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private startSequence(): void {
    this.clearTimer();
    this.firstPhaseGifSrc = pickRandomCompletionAnimation(this.achievedStars, this.randomValueProvider);
    this.secondPhaseGifSrc = getStarsCelebrationAnimationPath(this.achievedStars);
    this.phase = 'first';

    this.pendingTimer = setTimeout(() => {
      this.phase = 'second';

      this.pendingTimer = setTimeout(() => {
        this.phase = 'done';
      }, this.secondPhaseDurationMs);
    }, this.firstPhaseDurationMs);
  }

  onRetryClick(): void {
    this.retryRequested.emit();
  }

  onOkClick(): void {
    this.router.navigate([this.destination]);
  }

  private clearTimer(): void {
    if (this.pendingTimer) {
      clearTimeout(this.pendingTimer);
      this.pendingTimer = null;
    }
  }
}
