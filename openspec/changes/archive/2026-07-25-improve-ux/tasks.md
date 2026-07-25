## 1. Asset Structure And Selection Inputs

- [ ] 1.1 Create `assets/animation-completion/0`, `1`, `2`, and `3` folders with at least one GIF in each folder.
- [ ] 1.2 Add star-follow-up GIF assets in `assets/start-gifs/` using `<stars>-stars.gif` naming for `0` to `3`.
- [ ] 1.3 Add and validate a static completion-animation asset manifest that maps star buckets to available first-phase GIF paths.

## 2. Completion Celebration Component

- [ ] 2.1 Create `CompletionCelebrationComponent` with inputs for achieved stars and visibility state.
- [ ] 2.2 Implement centered overlay layout styles so the component renders over the exercise page at roughly half-page size.
- [ ] 2.3 Implement first-phase random GIF selection from `assets/animation-completion/<stars>/` via the manifest.
- [ ] 2.4 Implement second-phase star GIF playback using `assets/star-gifs/<stars>-stars.gif` immediately after phase one.
- [ ] 2.5 Implement deterministic component sequencing/timing logic that is testable without relying on GIF intrinsic end events.

## 3. Exercise Page Integration

- [ ] 3.1 Wire completion transition handling to open the celebration overlay only when runtime state changes to `completed`.
- [ ] 3.2 Pass the achieved completion star count from exercise progress flow into `CompletionCelebrationComponent`.
- [ ] 3.3 Ensure the completed exercise page remains visible beneath the overlay and no route/navigation change is introduced.

## 4. Automated Test Coverage

- [ ] 4.1 Add component tests for centered half-page overlay rendering and star-bucket asset resolution behavior.
- [ ] 4.2 Add tests verifying random first-phase GIF selection logic is stable and controllable under test doubles.
- [ ] 4.3 Add tests verifying two-phase sequencing (completion GIF first, `<stars>-stars.gif` second) for each star value.
- [ ] 4.4 Add exercise-page tests verifying overlay trigger timing (only on completed transition) and star propagation to the overlay.

## 5. Verification

- [ ] 5.1 Run and update affected unit/behavior tests until the full test suite passes.
- [ ] 5.2 Perform manual browser verification of overlay centering, half-page sizing, and sequence continuity across representative viewport sizes.
