## ADDED Requirements

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