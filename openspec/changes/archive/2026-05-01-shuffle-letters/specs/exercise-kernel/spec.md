## MODIFIED Requirements

### Requirement: Exercise configuration uses non-empty expectedChars
The system SHALL use `expectedChars` as the canonical exercise configuration field, and valid exercise configurations MUST include at least one expected character. Exercise configurations MAY include an optional `shufflable` boolean property. When `shufflable` is absent or `false`, the canonical sequence is always used as-is. When `shufflable` is `true`, the exercise supports pre-start randomization of the character sequence for the current play session.

#### Scenario: Valid exercise configuration has at least one expected character
- **WHEN** an exercise configuration is loaded
- **THEN** its `expectedChars` array contains at least one character

#### Scenario: shufflable property is optional
- **WHEN** an exercise configuration does not declare `shufflable`
- **THEN** the exercise behaves as non-shufflable and the canonical sequence is always used
