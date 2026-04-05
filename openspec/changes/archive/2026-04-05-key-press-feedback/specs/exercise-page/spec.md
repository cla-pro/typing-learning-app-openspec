## ADDED Requirements

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

## REMOVED Requirements

### Requirement: Last pressed key is displayed as focused feedback beneath the stream visualization
**Reason**: Replaced by keyboard highlighting in `KeyboardDisplayComponent`. The standalone key-press label is redundant once the keyboard renders this feedback directly on the corresponding key.
**Migration**: Key-press feedback is now visible on the `KeyboardDisplayComponent` as a highlighted key. The `key-display-box` label, `.key-feedback-row` container, `.key-display-box` CSS, and `.key-display-error` CSS are removed from `ExerciseComponent`. The `displayedPressedKey` getter is also removed; `lastPressedKey` and `isLastKeyWrong` are retained as component state and passed to `KeyboardDisplayComponent`.
