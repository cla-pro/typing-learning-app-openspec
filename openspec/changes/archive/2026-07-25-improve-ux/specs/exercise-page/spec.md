## ADDED Requirements

### Requirement: Exercise page triggers completion celebration overlay on completed transition
The system SHALL trigger the completion celebration overlay component when the exercise runtime state transitions to `completed`, SHALL pass the achieved star count to that component, SHALL pass a destination input matching the existing exercise back-button target, and SHALL keep the completed exercise page visible beneath the overlay until the user chooses a completion action.

#### Scenario: Completed transition opens celebration overlay
- **WHEN** the last expected character is typed correctly and runtime transitions to `completed`
- **THEN** the exercise page renders the completion celebration overlay component

#### Scenario: Achieved stars are passed to overlay component
- **WHEN** the completion overlay is opened for a completed exercise
- **THEN** the exercise page passes the completed exercise star count used for completion feedback

#### Scenario: Back-button-equivalent destination is passed to overlay
- **WHEN** the completion overlay is opened for a completed exercise
- **THEN** the exercise page passes the same route destination used by the exercise back button as the overlay destination input

#### Scenario: Completed page remains visible behind overlay
- **WHEN** the completion celebration overlay is visible
- **THEN** the exercise page content remains rendered beneath the overlay instead of navigating away

#### Scenario: Overlay remains visible until user action
- **WHEN** celebration animation playback has finished
- **THEN** the exercise page continues to render the completion overlay
- **AND** it is dismissed only by user action from the overlay buttons

### Requirement: Exercise page handles completion overlay action outcomes
The system SHALL handle completion overlay actions so that retry restarts the exercise flow and OK navigates to the destination provided to the overlay.

#### Scenario: Retry action restarts the current exercise
- **WHEN** the user clicks the completion overlay retry button
- **THEN** the exercise page restarts the current exercise flow without leaving the exercise context

#### Scenario: OK action navigates to provided destination
- **WHEN** the user clicks the completion overlay OK button
- **THEN** the exercise page navigates to the destination provided to the overlay input

### Requirement: Automated test coverage for exercise-page completion overlay trigger
The system SHALL include automated tests that verify the exercise page opens the completion overlay only on completion transition, passes the correct star count and destination input, keeps the overlay visible until user action, and applies the expected retry/OK outcomes.

#### Scenario: Overlay trigger timing is tested
- **WHEN** exercise-page requirements tests are executed
- **THEN** tests verify the overlay is not shown in `opened`, `running`, or `pending`, and is shown when state transitions to `completed`

#### Scenario: Star propagation to overlay is tested
- **WHEN** exercise-page requirements tests are executed
- **THEN** tests verify that the star value passed to the overlay matches the stored completion star count for the completed exercise

#### Scenario: Destination propagation and action outcomes are tested
- **WHEN** exercise-page requirements tests are executed
- **THEN** tests verify that the overlay receives the same destination as the exercise back button
- **AND** tests verify retry restarts the exercise flow while OK navigates to that destination
