## MODIFIED Requirements

### Requirement: Automated test coverage for introduced exercise-page changes
The system SHALL include automated tests for service behavior and page integration introduced by this change.

#### Scenario: ExerciseConfigService is tested
- **WHEN** test suites are executed
- **THEN** unit tests verify listing exercises and resolving exercise configuration by id, including not-found outcomes

#### Scenario: Exercise page integration is tested
- **WHEN** test suites are executed
- **THEN** integration tests verify valid-id rendering and invalid/missing-id error-page behavior

#### Scenario: Exercise runtime lifecycle and key capture are tested
- **WHEN** test suites are executed
- **THEN** integration tests verify lifecycle state transitions, start/pause button-label switching, temporary completion transition, and running-state key capture/display

## ADDED Requirements

### Requirement: Exercise runtime lifecycle state machine
The system SHALL model exercise runtime with four states: `opened`, `running`, `pending`, and `completed`.

#### Scenario: Initial state is opened
- **WHEN** a valid exercise page is rendered for the first time
- **THEN** the runtime state is `opened` and the exercise is not running

#### Scenario: Start transitions to running
- **WHEN** the runtime state is `opened` and the user activates the primary control
- **THEN** the state transitions to `running`

#### Scenario: Pause transitions to pending
- **WHEN** the runtime state is `running` and the user activates the primary control
- **THEN** the state transitions to `pending`

#### Scenario: Resume transitions pending to running
- **WHEN** the runtime state is `pending` and the user activates the primary control
- **THEN** the state transitions to `running`

#### Scenario: Temporary completion control transitions to completed
- **WHEN** the user activates the temporary completion control
- **THEN** the state transitions to `completed`

### Requirement: Runtime control labels reflect execution state
The system SHALL present a single primary runtime control whose label reflects whether the exercise is actively running.

#### Scenario: Primary label is start when not running
- **WHEN** the runtime state is `opened` or `pending`
- **THEN** the primary control label is `start`

#### Scenario: Primary label is pause while running
- **WHEN** the runtime state is `running`
- **THEN** the primary control label is `pause`

### Requirement: Running-state keyboard key capture
The system SHALL capture keyboard input during the `running` state and display the pressed key character on the exercise page.

#### Scenario: Pressed key is displayed while running
- **WHEN** the runtime state is `running` and the user presses a keyboard key
- **THEN** the pressed character is captured and rendered on the exercise page

#### Scenario: Keys are ignored when not running
- **WHEN** the runtime state is `opened`, `pending`, or `completed` and the user presses a keyboard key
- **THEN** key input does not update the displayed pressed character value
