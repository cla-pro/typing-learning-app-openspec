## Purpose

Exercise runtime kernel behavior for sequential expected-character progression during running state and deterministic completion.

## Requirements

### Requirement: Sequential expected-character progression kernel
The system SHALL process expected characters in sequence during exercise `running` state, with exactly one active character at a time, and SHALL keep the active character centered in the zoom slot while active.

#### Scenario: First expected character is active at start of running
- **WHEN** a valid exercise enters `running` state
- **THEN** the first value in `expectedChars` is the active expected character

#### Scenario: Correct key advances active expected character
- **WHEN** runtime state is `running` and the user presses the exact active expected character key
- **THEN** the active expected character advances to the next item in `expectedChars`

#### Scenario: Incorrect key does not advance progression
- **WHEN** runtime state is `running` and the user presses a key that does not match the active expected character
- **THEN** the active expected character remains unchanged

#### Scenario: Correct-key progression shifts stream left
- **WHEN** runtime state is `running` and the active expected character advances after a correct key press
- **THEN** previously zoomed characters shift left into the left segment and the next following character enters the zoomed window when available

### Requirement: Completion on last expected-character match
The system SHALL transition runtime state to `completed` when the last expected character is typed correctly.

#### Scenario: Last expected character completes exercise
- **WHEN** runtime state is `running`, the active expected character is the last item, and the user presses the matching key
- **THEN** the runtime state transitions to `completed`

#### Scenario: No active character remains after terminal shift
- **WHEN** the final expected character is typed correctly and completion occurs
- **THEN** the final character shifts out of the active center slot and no active character remains to be recognized

### Requirement: Case-sensitive expected-character matching
The system SHALL compare keyboard input and active expected character values using case-sensitive equality.

#### Scenario: Case mismatch does not advance progression
- **WHEN** runtime state is `running`, the active expected character is `A`, and the user presses `a`
- **THEN** progression does not advance

#### Scenario: Exact case match advances progression
- **WHEN** runtime state is `running`, the active expected character is `A`, and the user presses `A`
- **THEN** progression advances to the next expected character or completes if it is the last one

### Requirement: Exercise configuration uses non-empty expectedChars
The system SHALL use `expectedChars` as the canonical exercise configuration field, and valid exercise configurations MUST include at least one expected character.

#### Scenario: Config exposes expectedChars field
- **WHEN** exercise configurations are loaded through the shared configuration service
- **THEN** each configuration uses `expectedChars` instead of `letters`

#### Scenario: Empty expectedChars is invalid
- **WHEN** an exercise configuration has an empty `expectedChars` collection
- **THEN** that configuration is treated as invalid for runtime progression

### Requirement: Running-state wrong-key presses are counted
The system SHALL maintain an error counter for each opened exercise session and SHALL increment that counter by exactly one for each wrong key press received during `running` state.

#### Scenario: Wrong key increments counter in running state
- **WHEN** runtime state is `running` and the user presses a key that does not match the active expected character
- **THEN** the error counter increases by exactly `1`

#### Scenario: Correct key does not increment counter
- **WHEN** runtime state is `running` and the user presses the matching active expected character
- **THEN** the error counter value does not increase

#### Scenario: Non-running key input does not increment counter
- **WHEN** runtime state is `opened`, `pending`, or `completed` and a key is pressed
- **THEN** the error counter value remains unchanged

#### Scenario: Counter persists while session remains active
- **WHEN** an exercise session is paused and resumed without opening another exercise
- **THEN** the error counter keeps its prior value

#### Scenario: Counter initializes to zero for each opened exercise
- **WHEN** a valid exercise is opened
- **THEN** the error counter is initialized to `0` for that exercise session

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
