## ADDED Requirements

### Requirement: Shuffle button is rendered in the pre-start controls area
The system SHALL render a shuffle button in the exercise page when the loaded exercise has `shufflable: true` and the runtime state is `opened`. The button SHALL be absent in all other states and for non-shufflable exercises.

#### Scenario: Shuffle button is present before start on shufflable exercise
- **WHEN** the exercise page is rendered with a shufflable exercise in `opened` state
- **THEN** a shuffle button is visible in the pre-start controls area

#### Scenario: Shuffle button is absent for non-shufflable exercise
- **WHEN** the exercise page is rendered with a non-shufflable exercise
- **THEN** no shuffle button is displayed at any point

#### Scenario: Shuffle button is absent once exercise has started
- **WHEN** the exercise has transitioned to `running` state
- **THEN** the shuffle button is no longer rendered

#### Scenario: Shuffle button is absent while exercise is paused
- **WHEN** the runtime state is `pending`
- **THEN** the shuffle button is not rendered

### Requirement: Shuffle button behavior tests are included
The system SHALL include automated tests covering shuffle button visibility rules and the shuffle interaction.

#### Scenario: Shuffle button visibility is tested
- **WHEN** exercise-page requirements tests are executed
- **THEN** tests verify that the shuffle button appears only when `shufflable` is true and state is `opened`, and is absent in `pending`, `running`, and `completed` states

#### Scenario: Shuffle interaction is tested
- **WHEN** exercise-page requirements tests are executed
- **THEN** tests verify that pressing the shuffle button reorders `expectedCharsToDisplay` and that multiple presses are each allowed before the exercise starts
