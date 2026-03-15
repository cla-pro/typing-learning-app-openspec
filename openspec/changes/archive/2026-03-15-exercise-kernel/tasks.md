## 1. Exercise configuration contract migration

- [x] 1.1 Rename `ExerciseConfig` model field from `letters` to `expectedChars`.
- [x] 1.2 Update exercise configuration source data and service mappings to provide `expectedChars`.
- [x] 1.3 Update all compile-time and test references from `letters` to `expectedChars`.
- [x] 1.4 Add or enforce validation that exercise configurations must have non-empty `expectedChars`.

## 2. Runtime kernel progression implementation

- [x] 2.1 Add exercise runtime state for active expected-character index and initialize/reset it for valid exercise loads.
- [x] 2.2 Implement running-state key handling that advances only on exact active-character match.
- [x] 2.3 Keep active expected character unchanged on incorrect key presses while running.
- [x] 2.4 Transition runtime state to `completed` immediately after matching the last expected character.
- [x] 2.5 Keep progression matching case-sensitive using exact `KeyboardEvent.key` comparison.

## 3. Exercise page rendering updates

- [x] 3.1 Replace expected-character rendering usage from `letters` to `expectedChars` in the exercise page.
- [x] 3.2 Add a minimal active-character indicator while preserving all existing labels/components on the page.
- [x] 3.3 Ensure runtime controls and existing sections continue to render and behave as before outside progression changes.

## 4. Requirements tests and verification

- [x] 4.1 Update service requirements tests to validate `expectedChars` contract and non-empty expected-character behavior.
- [x] 4.2 Update exercise component requirements tests for active-character initialization and progression on exact match.
- [x] 4.3 Add exercise component requirements tests for mismatch no-op behavior and case-sensitive matching.
- [x] 4.4 Add exercise component requirements test for completion transition on final correct character.
- [x] 4.5 Run full requirements test suite and confirm passing results.
- [x] 4.6 Run Angular build and confirm successful compilation after contract and runtime changes.
