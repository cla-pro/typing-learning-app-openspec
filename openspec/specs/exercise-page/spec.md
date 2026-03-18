## Purpose

Exercise page behavior for loading configured exercises, handling invalid IDs, and providing recovery navigation.

## Requirements

### Requirement: Exercise configuration-driven page rendering
The system SHALL render exercise-page content based on configuration resolved from `ExerciseConfigService` using the exercise id from the route, SHALL use `expectedChars` as the expected-character source for runtime progression display, and SHALL present expected characters as a stream-focused typing UI with a centered feedback, size-control, and control stack.

#### Scenario: Valid exercise id loads configuration
- **WHEN** a user navigates to an exercise route with a valid exercise id
- **THEN** the page retrieves the matching exercise configuration from `ExerciseConfigService`

#### Scenario: Stream-focused exercise rendering
- **WHEN** a valid exercise configuration is resolved
- **THEN** the page renders expected characters as a continuous stream and does not display exercise id, exercise name, or impacted keys

#### Scenario: Center zoom window is rendered
- **WHEN** the exercise page is rendered with an active expected character
- **THEN** a center zoom area displays exactly two previous characters, the active character, and two following characters in larger typography

#### Scenario: Side segments are reduced-emphasis and clipped
- **WHEN** expected-character stream content exceeds the available width
- **THEN** left and right side segments render with reduced size and opacity, respect side margins, and hide overflow beyond their containers

#### Scenario: Stream-size slider is displayed between stream and key feedback
- **WHEN** the exercise page is rendered
- **THEN** a size slider is displayed between the stream visualization and the pressed-key feedback area

#### Scenario: Last pressed key is displayed as focused feedback beneath the stream visualization
- **WHEN** the exercise page is rendered
- **THEN** the last pressed key feedback is displayed beneath the stream and zoomed area as an unlabeled centered focus box

#### Scenario: Single primary runtime control is displayed beneath pressed-key feedback
- **WHEN** the exercise page is rendered
- **THEN** exactly one primary runtime control is displayed beneath the pressed-key feedback area

#### Scenario: Home button remains available on exercise page
- **WHEN** the exercise page is rendered
- **THEN** a home button is visible and provides navigation back to the root page

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
- **THEN** tests verify lifecycle state transitions, start/pause button-label switching, completed-state primary-control disabling, and running-state key capture/display via observable page behavior

#### Scenario: Exercise redirection test exists for invalid lookup
- **WHEN** exercise component requirements tests are executed
- **THEN** at least one test asserts Angular Router navigation is triggered when exercise lookup fails during initialization

#### Scenario: Exercise progression behavior is tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify active expected-character initialization, progression only on exact match, case-sensitive matching, and completion transition on the final expected character

#### Scenario: Exercise stream UX behavior is tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify slider placement, baseline default size behavior, restored size persistence, side-segment overflow behavior assumptions, and left-shift progression updates

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

### Requirement: Runtime control labels reflect execution state
The system SHALL present a single primary runtime control whose label reflects whether the exercise is actively running, and SHALL keep that control visible with a clearly recognizable disabled state after completion.

#### Scenario: Primary label is start when not running
- **WHEN** the runtime state is `opened` or `pending`
- **THEN** the primary control label is `start`

#### Scenario: Primary label is pause while running
- **WHEN** the runtime state is `running`
- **THEN** the primary control label is `pause`

#### Scenario: Primary control remains visible and disabled after completion
- **WHEN** the runtime state is `completed`
- **THEN** the primary control remains visible and is disabled with a visually recognizable disabled treatment

### Requirement: Running-state keyboard key capture
The system SHALL capture keyboard input during the `running` state and display the pressed key character on the exercise page.

#### Scenario: Pressed key is displayed while running
- **WHEN** the runtime state is `running` and the user presses a keyboard key
- **THEN** the pressed character is captured and rendered on the exercise page

#### Scenario: Keys are ignored when not running
- **WHEN** the runtime state is `opened`, `pending`, or `completed` and the user presses a keyboard key
- **THEN** key input does not update the displayed pressed character value
