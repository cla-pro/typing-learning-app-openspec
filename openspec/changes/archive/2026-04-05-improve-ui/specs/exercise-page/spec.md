## MODIFIED Requirements

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
