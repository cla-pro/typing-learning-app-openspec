## ADDED Requirements

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
