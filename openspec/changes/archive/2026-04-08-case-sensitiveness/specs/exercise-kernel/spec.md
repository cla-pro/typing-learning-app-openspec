## ADDED Requirements

### Requirement: Modifier key presses are silently ignored during exercise runtime
The system SHALL ignore any keyboard event whose `event.key` value is a standalone modifier key during `running` state. A silently ignored modifier press SHALL NOT update `lastPressedKey`, SHALL NOT increment the error counter, and SHALL NOT affect expected-character progression.

The set of recognised modifier key values is: `Shift`, `Control`, `Alt`, `AltGraph`, `CapsLock`, `Meta`, `OS`.

#### Scenario: Modifier key press does not increment error counter
- **WHEN** runtime state is `running` and the user presses a modifier key (e.g. Shift)
- **THEN** the error counter value does not increase

#### Scenario: Modifier key press does not update lastPressedKey
- **WHEN** runtime state is `running` and the user presses a modifier key (e.g. Shift)
- **THEN** the last pressed key value remains unchanged

#### Scenario: Modifier key press does not advance progression
- **WHEN** runtime state is `running` and the user presses a modifier key (e.g. Shift)
- **THEN** the active expected character remains unchanged

#### Scenario: Non-modifier key after modifier is processed normally
- **WHEN** runtime state is `running`, the user presses a modifier key followed by a non-modifier key
- **THEN** only the non-modifier key is evaluated for progression and error-counting
