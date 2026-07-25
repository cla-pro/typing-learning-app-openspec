import { SimpleChange } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { CompletionCelebrationComponent } from '../../../../src/app/components/completion-celebration/completion-celebration.component';

describe('CompletionCelebrationComponent Requirements', () => {
  let component: CompletionCelebrationComponent;
  let routerStub: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    routerStub = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: routerStub
        }
      ]
    }).compileComponents();

    component = TestBed.runInInjectionContext(() => new CompletionCelebrationComponent());
  });

  test('keeps overlay hidden when visibility input is false', () => {
    component.visible = false;

    expect(component.overlayVisible).toBe(false);
  });

  test('selects first-phase GIF from the achieved star bucket and supports deterministic random choice', () => {
    component.achievedStars = 2;
    component.visible = true;
    component.randomValueProvider = () => 0;

    component.ngOnChanges({
      visible: new SimpleChange(false, true, true)
    });

    expect(component.phase).toBe('first');
    expect(component.currentGifSrc).toContain('assets/animation-completion/2/');
  });

  test('plays second-phase stars GIF immediately after first phase and emits completion at sequence end', () => {
    vi.useFakeTimers();

    component.achievedStars = 3;
    component.visible = true;
    component.firstPhaseDurationMs = 20;
    component.secondPhaseDurationMs = 30;

    component.ngOnChanges({
      visible: new SimpleChange(false, true, true)
    });

    expect(component.phase).toBe('first');

    vi.advanceTimersByTime(20);
    expect(component.phase).toBe('second');
    expect(component.currentGifSrc).toBe('assets/star-gifs/3-stars.gif');

    vi.advanceTimersByTime(30);
    expect(component.phase).toBe('done');
    expect(component.overlayVisible).toBe(true);
    expect(component.currentGifSrc).toBe('assets/star-gifs/3-stars.gif');

    vi.useRealTimers();
  });

  test('emits retry action when retry button handler is invoked', () => {
    const retrySpy = vi.spyOn(component.retryRequested, 'emit');

    component.onRetryClick();

    expect(retrySpy).toHaveBeenCalledOnce();
  });

  test('navigates to destination when ok button handler is invoked', () => {
    component.destination = '/exercise-home';

    component.onOkClick();

    expect(routerStub.navigate).toHaveBeenCalledWith(['/exercise-home']);
  });
});
