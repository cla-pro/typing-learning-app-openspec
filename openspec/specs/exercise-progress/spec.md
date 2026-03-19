## Purpose

Service for persisting and retrieving per-exercise completion state and star counts.

## Requirements

### Requirement: ExerciseProgressService stores and retrieves per-exercise completion and star state
The system SHALL provide an `ExerciseProgressService` that persists per-exercise completion flags and star counts in `localStorage` using keys `<exercise-id>_completed` and `<exercise-id>_stars`, and SHALL expose public methods for recording completion and reading back stored state.

#### Scenario: recordCompletion stores completed flag
- **WHEN** `recordCompletion` is called with a valid exercise id, error count, and total char count
- **THEN** `isCompleted` returns `true` for that exercise id

#### Scenario: recordCompletion stores star count
- **WHEN** `recordCompletion` is called with a valid exercise id, error count, and total char count
- **THEN** `getStars` returns the correct star count for that exercise id

#### Scenario: isCompleted returns false for an exercise that has not been completed
- **WHEN** `isCompleted` is called for an exercise id that has never been passed to `recordCompletion`
- **THEN** it returns `false`

#### Scenario: getStars returns zero for an exercise that has not been completed
- **WHEN** `getStars` is called for an exercise id that has never been passed to `recordCompletion`
- **THEN** it returns `0`

#### Scenario: localStorage keys are prefixed with the exercise id
- **WHEN** `recordCompletion` is called for a given exercise id
- **THEN** the completion flag is stored under the key `<exercise-id>_completed` and the star count under `<exercise-id>_stars`

#### Scenario: A second completion call overwrites the previous stored values
- **WHEN** `recordCompletion` is called twice for the same exercise id with different error counts
- **THEN** `isCompleted` and `getStars` reflect the second call's values

### Requirement: Star count is determined by the error ratio at completion
The system SHALL compute a star count from the ratio `errorCount / totalChars` and apply fixed thresholds: ratio `< 0.05` grants 3 stars, `[0.05, 0.15)` grants 2 stars, `[0.15, 0.25)` grants 1 star, and `>= 0.25` grants 0 stars.

#### Scenario: Zero errors grants three stars
- **WHEN** `recordCompletion` is called with `errorCount = 0` and `totalChars = 20`
- **THEN** `getStars` returns `3`

#### Scenario: Error ratio just below 0.05 grants three stars
- **WHEN** `recordCompletion` is called with `errorCount = 0` and `totalChars = 21` yielding ratio `0` (or any ratio `< 0.05`)
- **THEN** `getStars` returns `3`

#### Scenario: Error ratio at 0.05 grants two stars
- **WHEN** `recordCompletion` is called with `errorCount = 1` and `totalChars = 20` yielding ratio `0.05`
- **THEN** `getStars` returns `2`

#### Scenario: Error ratio at 0.15 grants one star
- **WHEN** `recordCompletion` is called with `errorCount = 3` and `totalChars = 20` yielding ratio `0.15`
- **THEN** `getStars` returns `1`

#### Scenario: Error ratio at 0.25 grants zero stars
- **WHEN** `recordCompletion` is called with `errorCount = 5` and `totalChars = 20` yielding ratio `0.25`
- **THEN** `getStars` returns `0`

#### Scenario: Zero total chars defaults to three stars
- **WHEN** `recordCompletion` is called with `totalChars = 0`
- **THEN** `getStars` returns `3`

### Requirement: Automated test coverage for ExerciseProgressService
The system SHALL include automated tests that verify `ExerciseProgressService` persistence, retrieval, and star-count computation through the public API.

#### Scenario: All star-threshold boundaries are tested
- **WHEN** exercise progress requirements tests are executed
- **THEN** tests verify at least one case for each star level (0, 1, 2, 3) including boundary values

#### Scenario: Storage key format is tested
- **WHEN** exercise progress requirements tests are executed
- **THEN** tests verify that completion and star data for two different exercise ids are stored and retrieved independently without cross-contamination
