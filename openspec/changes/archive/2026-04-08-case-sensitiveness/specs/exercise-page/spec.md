## ADDED Requirements

### Requirement: Exercise component tracks active modifier state via keydown and keyup
The system SHALL maintain `isShiftActive` and `isAltGrActive` boolean properties on `ExerciseComponent` and SHALL update them on every keyboard `keydown` and `keyup` event received by the exercise content area:
- `isShiftActive = event.shiftKey` (pure Shift key only; CapsLock does NOT activate the shift layer on the keyboard display)
- `isAltGrActive = event.getModifierState('AltGraph')`

A `handleExerciseKeyup` handler SHALL be wired to the `(keyup)` event on the exercise content element and SHALL update both flags. Both properties default to `false`.

Note: CapsLock only capitalises letters — it does not activate the shift layer for symbol keys. Letter key caps already display uppercase labels, so no display change is needed for CapsLock. `isKeyPressed` already handles CapsLock-typed characters via case-insensitive comparison.

#### Scenario: isShiftActive is true while Shift is physically held
- **WHEN** the user holds the Shift key during an exercise
- **THEN** `isShiftActive` is `true`

#### Scenario: isShiftActive is false after Shift is released
- **WHEN** the user releases the Shift key during an exercise
- **THEN** `isShiftActive` is `false`

#### Scenario: isAltGrActive is true while AltGr is physically held
- **WHEN** the user holds the AltGr key during an exercise
- **THEN** `isAltGrActive` is `true`

#### Scenario: isAltGrActive is false after AltGr is released
- **WHEN** the user releases the AltGr key during an exercise
- **THEN** `isAltGrActive` is `false`

#### Scenario: CapsLock does not set isShiftActive
- **WHEN** CapsLock is active (toggled on) during an exercise
- **THEN** `isShiftActive` remains `false`

### Requirement: Exercise component passes modifier state to keyboard display
The system SHALL bind `isShiftActive` and `isAltGrActive` from `ExerciseComponent` to the corresponding `@Input()` properties of `<app-keyboard-display>`.

#### Scenario: isShiftActive is bound to keyboard display
- **WHEN** the exercise page is rendered
- **THEN** `<app-keyboard-display>` receives the current `isShiftActive` value from `ExerciseComponent`

#### Scenario: isAltGrActive is bound to keyboard display
- **WHEN** the exercise page is rendered
- **THEN** `<app-keyboard-display>` receives the current `isAltGrActive` value from `ExerciseComponent`

#### Scenario: Modifier state changes cause keyboard display to update
- **WHEN** the user presses or releases a modifier key during an exercise
- **THEN** the keyboard display updates its rendered layer labels to reflect the new modifier state

### Requirement: Automated tests cover modifier state tracking on the exercise page
The system SHALL include automated tests verifying that modifier state is correctly tracked and that modifier key presses do not cause errors or progression on the exercise page.

#### Scenario: Modifier tracking behavior is tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify that pressing a modifier key does not increment the error counter, does not advance progression, and does not update the displayed pressed key
