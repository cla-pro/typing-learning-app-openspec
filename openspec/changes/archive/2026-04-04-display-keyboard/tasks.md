## 1. Keyboard Layout Domain

- [x] 1.1 Add keyboard layout models for raw keymap data (layout id, rows, keys, optional size/role metadata).
- [x] 1.2 Implement `KeyboardLayoutService` with raw keymap definitions for `fr-ch` and `de-ch`, including visible non-typing keys (for example Tab, Shift, Enter).
- [x] 1.3 Expose service API for supported layouts and raw keymap lookup, and define behavior for unsupported layout requests.

## 2. Settings and Integration Wiring

- [x] 2.1 Update settings layout validation to use the keyboard layout registry as the authoritative source instead of duplicated hardcoded lists.
- [x] 2.2 Add unit tests for `KeyboardLayoutService` covering supported layouts, raw keymap shape, and presence of non-typing keys.

## 3. Reusable Keyboard Display Component

- [x] 3.1 Create a pluggable `KeyboardDisplayComponent` that accepts selected layout and impacted-key inputs.
- [x] 3.2 Implement keyboard rendering in `KeyboardDisplayComponent` from raw keymap data using primary visible key legends only.
- [x] 3.3 Implement enabled/disabled key-state rendering in `KeyboardDisplayComponent` so impacted keys are normal and all others are greyed out.
- [x] 3.4 Add component tests verifying layout rendering, impacted-key enablement, and disabled-state styling hooks.

## 4. Exercise Page Composition

- [x] 4.1 Compose `KeyboardDisplayComponent` into the exercise page below stream, feedback, and primary runtime control.
- [x] 4.2 Pass selected layout and exercise `impactedKeys` from `ExerciseComponent` to `KeyboardDisplayComponent` without duplicating keymap markup in `ExerciseComponent`.
- [x] 4.3 Add/extend exercise-page requirements tests to verify keyboard placement, selected-layout rendering, and impacted-key enabled-state behavior.

## 5. Validation and Regression Safety

- [x] 5.1 Run and fix affected tests until green (`npm test`).
- [x] 5.2 Run production build validation and address regressions (`npm run build:angular`).
- [x] 5.3 Perform a final spec-to-implementation sanity check for keyboard-display and exercise-page delta requirements.
