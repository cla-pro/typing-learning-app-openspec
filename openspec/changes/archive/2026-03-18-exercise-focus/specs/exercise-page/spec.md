## ADDED Requirements

### Requirement: Focus is moved to the exercise content area when the exercise starts running
The system SHALL programmatically move keyboard focus to the exercise content area when the exercise transitions to `running` state, so that Space key presses reach the exercise keystroke handler rather than activating the start/pause button.

#### Scenario: Focus moves to exercise content on start
- **WHEN** the runtime state transitions from `opened` to `running`
- **THEN** keyboard focus is on the exercise content area and not on the start/pause button

#### Scenario: Focus moves to exercise content on resume
- **WHEN** the runtime state transitions from `pending` to `running`
- **THEN** keyboard focus is on the exercise content area and not on the start/pause button

#### Scenario: Space key does not trigger the start/pause button while running
- **WHEN** the exercise is in `running` state and the user presses the Space key
- **THEN** the Space key is processed as a typed character and does not pause the exercise
