## ADDED Requirements

### Requirement: Exercise page reports completion to ExerciseProgressService
The system SHALL call `ExerciseProgressService.recordCompletion` exactly once when the exercise runtime state transitions to `completed`, passing the current exercise id, accumulated error count, and total expected character count.

#### Scenario: recordCompletion is called on the completed transition
- **WHEN** the last expected character is typed correctly and the runtime state transitions to `completed`
- **THEN** `ExerciseProgressService.recordCompletion` is invoked once with the exercise id, the accumulated error count, and the length of the expected character sequence

#### Scenario: recordCompletion is not called before completion
- **WHEN** the exercise is in `running` or `pending` state
- **THEN** `ExerciseProgressService.recordCompletion` has not yet been invoked for the current session

### Requirement: Automated test coverage for exercise-page completion reporting
The system SHALL include automated tests that verify the exercise page calls `ExerciseProgressService.recordCompletion` correctly when the exercise completes.

#### Scenario: Completion reporting is tested
- **WHEN** exercise component requirements tests are executed
- **THEN** a test verifies that `recordCompletion` is called with the correct exercise id, error count, and total char count when the exercise transitions to `completed`
