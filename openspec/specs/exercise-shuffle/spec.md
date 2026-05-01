## Purpose

Optional pre-start shuffle capability for exercise character sequences, allowing users to randomize the order of expected characters before beginning an exercise.

## Requirements

### Requirement: Exercise configuration declares shufflability
The system SHALL support an optional `shufflable` boolean property on `ExerciseConfig`. When absent or `false`, shuffle behavior SHALL NOT be available for that exercise. When `true`, the shuffle button MAY be presented to the user before the exercise starts.

#### Scenario: Non-shufflable exercise has no shuffle affordance
- **WHEN** an exercise with no `shufflable` property (or `shufflable: false`) is loaded
- **THEN** no shuffle button is displayed at any point during the exercise session

#### Scenario: Shufflable exercise exposes shuffle capability
- **WHEN** an exercise with `shufflable: true` is loaded and the runtime state is `opened`
- **THEN** a shuffle button is displayed to the user

### Requirement: Shuffle button is visible only in the opened state
The system SHALL display the shuffle button exclusively when the runtime state is `opened`. The button SHALL NOT appear in `running`, `pending`, or `completed` states — including when the exercise is paused.

#### Scenario: Shuffle button is visible before start
- **WHEN** a shufflable exercise is loaded and the runtime state is `opened`
- **THEN** the shuffle button is visible

#### Scenario: Shuffle button disappears when exercise starts
- **WHEN** the runtime state transitions from `opened` to `running`
- **THEN** the shuffle button is no longer visible

#### Scenario: Shuffle button does not reappear when exercise is paused
- **WHEN** the runtime state is `pending` (paused)
- **THEN** the shuffle button is not visible even if the exercise is shufflable

#### Scenario: Shuffle button is not visible after completion
- **WHEN** the runtime state is `completed`
- **THEN** the shuffle button is not visible

### Requirement: Shuffle randomizes the session-local character sequence
The system SHALL shuffle only the session-local copy of `expectedChars` when the user presses the shuffle button. The canonical exercise configuration SHALL remain unchanged. The shuffled sequence SHALL be used for the current play session.

#### Scenario: Pressing shuffle reorders the expected characters
- **WHEN** the user presses the shuffle button on a shufflable exercise in `opened` state
- **THEN** the displayed sequence of expected characters is reordered randomly

#### Scenario: Shuffle can be applied multiple times before starting
- **WHEN** the user presses the shuffle button more than once before starting
- **THEN** each press produces a (potentially different) random ordering of the expected characters

#### Scenario: Canonical sequence is restored on page re-open
- **WHEN** the user navigates away from the exercise and returns
- **THEN** the original canonical `expectedChars` sequence is used as the starting point, regardless of any previous shuffle

### Requirement: Non-story exercises are configured as shufflable
The system SHALL mark all exercises as `shufflable: true` except those belonging to story/narrative categories (`Histoires` for `fr-ch` and `Geschichten` for `de-ch`), where the fixed character sequence is part of the narrative content.

#### Scenario: Story exercises are not shufflable
- **WHEN** an exercise from the `Histoires` (fr-ch) or `Geschichten` (de-ch) category is loaded
- **THEN** the exercise does not have `shufflable: true` and no shuffle button is displayed

#### Scenario: Non-story exercises are shufflable
- **WHEN** an exercise from any non-story category is loaded
- **THEN** the exercise has `shufflable: true` and the shuffle button is available before the exercise starts
