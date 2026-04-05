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

### Requirement: Exercise page displays runtime error count and error-state feedback
The system SHALL display a running-state error counter on the exercise page in the control panel row alongside the start/pause button, SHALL render that counter in red text, and SHALL visually mark pressed-key feedback as an error state after wrong input until the next correct input.

#### Scenario: Error counter is displayed in the control panel row beside the start/pause button
- **WHEN** a valid exercise page is rendered
- **THEN** an error counter is visible in the same row as the start/pause button

#### Scenario: Error counter uses red text styling
- **WHEN** the error counter is displayed
- **THEN** the counter text is rendered with a red visual style

#### Scenario: Wrong key press marks pressed-key feedback as error
- **WHEN** runtime state is `running` and the user presses a key that does not match the active expected character
- **THEN** the pressed-key feedback section switches to an error style with red treatment

#### Scenario: Correct key press clears pressed-key error style
- **WHEN** pressed-key feedback is in error style and runtime state is `running` and the user presses the matching active expected character
- **THEN** the pressed-key feedback section returns to its normal non-error style

#### Scenario: Error counter is preserved across pause and resume
- **WHEN** runtime state transitions from `running` to `pending` and then back to `running`
- **THEN** the displayed error counter value remains unchanged from the value before pause

#### Scenario: Error counter resets for each opened exercise
- **WHEN** a valid exercise is opened
- **THEN** the displayed error counter value starts at `0`, regardless of any errors made in previously opened exercises

### Requirement: Automated test coverage for runtime error-count UI behavior
The system SHALL include automated tests that verify observable UI and runtime behavior for error counting, counter placement/styling, and error feedback style transitions.

#### Scenario: Counter placement and styling are tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify the error counter is rendered in the control panel row beside the start/pause button and uses red text styling

#### Scenario: Error feedback style transition is tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify wrong key input applies error styling and the next correct key clears it

#### Scenario: Pause/resume persistence and reset semantics are tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify error count persists across pause/resume and resets to zero when a new exercise is opened

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

### Requirement: Exercise page displays keyboard beneath runtime controls
The system SHALL render a keyboard display on the exercise page beneath the expected-character stream, pressed-key feedback area, and primary runtime control.

#### Scenario: Keyboard is shown in the lower exercise stack
- **WHEN** a valid exercise page is rendered
- **THEN** a keyboard display is visible beneath the stream and runtime control stack

### Requirement: Exercise page keyboard uses selected layout and impacted-key state
The system SHALL render the exercise-page keyboard according to the currently selected keyboard layout and SHALL pass the current exercise `impactedKeys` so key enabled-state can be derived for display.

#### Scenario: Selected layout drives rendered keyboard
- **WHEN** the chosen keyboard layout is `de-ch`
- **THEN** the exercise-page keyboard renders keys from the `de-ch` keymap

#### Scenario: Impacted key state is reflected on the rendered keyboard
- **WHEN** an exercise configuration is loaded with `impactedKeys`
- **THEN** the exercise-page keyboard renders impacted keys enabled and non-impacted keys disabled

### Requirement: Exercise page composes keyboard rendering via dedicated component
The system SHALL render keyboard content on the exercise page by composing `KeyboardDisplayComponent`, and SHALL NOT duplicate layout rendering markup in `ExerciseComponent`.

#### Scenario: Exercise page uses dedicated keyboard component
- **WHEN** a valid exercise page is rendered
- **THEN** the page composes `KeyboardDisplayComponent` to display the layout-aware keyboard beneath the runtime controls

### Requirement: Exercise page passes key-press feedback to keyboard display
The system SHALL pass the last pressed key value and its correctness state from `ExerciseComponent` to `KeyboardDisplayComponent`, so the keyboard can render the highlight without `ExerciseComponent` duplicating display logic.

#### Scenario: Last pressed key and correctness state are bound to keyboard inputs
- **WHEN** the exercise page is rendered
- **THEN** `<app-keyboard-display>` receives `lastPressedKey` and `isLastKeyWrong` bound from `ExerciseComponent` state

### Requirement: Exercise page stream size maximum is increased
The system SHALL allow the exercise stream to be scaled up to a larger maximum, made possible by the vertical space reclaimed from removing the key-press feedback label.

#### Scenario: Stream size maximum is raised
- **WHEN** `SettingsService.getStreamSizeMax()` is called
- **THEN** the returned value is `1.5`
