## Purpose

Exercise page behavior for loading configured exercises, handling invalid IDs, and providing recovery navigation.

## Requirements

### Requirement: Exercise configuration-driven page rendering
The system SHALL render exercise-page content based on configuration resolved from `ExerciseConfigService` using the exercise id from the route, and SHALL use `expectedChars` as the expected-character source for runtime progression display.

#### Scenario: Valid exercise id loads configuration
- **WHEN** a user navigates to an exercise route with a valid exercise id
- **THEN** the page retrieves the matching exercise configuration from `ExerciseConfigService`

#### Scenario: Exercise metadata is rendered
- **WHEN** a valid exercise configuration is resolved
- **THEN** the page displays the exercise name at the top, renders expected characters from `expectedChars`, and renders configured impacted keys

### Requirement: Invalid or missing exercise id error page
The system SHALL redirect to a dedicated exercise-not-found page when the exercise id is missing or does not match any configuration, and this validation MUST occur during `ExerciseComponent` initialization.

#### Scenario: Missing exercise id redirects to dedicated page
- **WHEN** the exercise page initializes without a usable exercise id parameter
- **THEN** the page triggers Angular Router navigation to the exercise-not-found route

#### Scenario: Invalid exercise id redirects to dedicated page
- **WHEN** a user navigates to an exercise id that is not present in `ExerciseConfigService`
- **THEN** the page triggers Angular Router navigation to the exercise-not-found route

### Requirement: Automated test coverage for introduced exercise-page changes
The system SHALL include automated tests for service behavior and page integration introduced by this change, and those tests MUST validate behavior through public APIs and observable outcomes rather than source-file text inspection.

#### Scenario: ExerciseConfigService is tested
- **WHEN** test suites are executed
- **THEN** tests verify listing exercises and resolving exercise configuration by id, including not-found outcomes, through public service API calls

#### Scenario: Exercise page integration is tested
- **WHEN** test suites are executed
- **THEN** tests verify valid-id rendering and invalid/missing-id redirection behavior through component interaction and observable outcomes

#### Scenario: Exercise runtime lifecycle and key capture are tested
- **WHEN** test suites are executed
- **THEN** tests verify lifecycle state transitions, start/pause button-label switching, temporary completion transition, and running-state key capture/display via observable page behavior

#### Scenario: Exercise redirection test exists for invalid lookup
- **WHEN** exercise component requirements tests are executed
- **THEN** at least one test asserts Angular Router navigation is triggered when exercise lookup fails during initialization

#### Scenario: Exercise progression behavior is tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify active expected-character initialization, progression only on exact match, case-sensitive matching, and completion transition on the final expected character

#### Scenario: Exercise tests avoid implementation-text assertions
- **WHEN** exercise-page requirements tests are authored or maintained
- **THEN** they do not load source files to assert the presence of specific code fragments

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
