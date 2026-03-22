## MODIFIED Requirements

### Requirement: Exercise stream size is user-adjustable
The system SHALL provide stream-size configuration through the Settings page instead of a slider on the exercise page, and SHALL apply the selected size when an exercise page is opened.

#### Scenario: Stream-size control is not shown on exercise page
- **WHEN** the exercise page is rendered
- **THEN** no stream-size slider control is displayed on the exercise page

#### Scenario: Stream size is adjusted from Settings page
- **WHEN** the user changes stream size on the Settings page
- **THEN** the selected value is stored as the active stream-size preference

#### Scenario: Updated size applies on next exercise open
- **WHEN** the user changes stream size in Settings and then opens an exercise page
- **THEN** the expected-character stream renders using the updated size

### Requirement: Exercise stream size preference persists across sessions
The system SHALL persist stream-size preference using the existing storage key names and SHALL restore that value on later visits.

#### Scenario: Changed size is stored after settings interaction
- **WHEN** the user changes stream size from the Settings page
- **THEN** the selected value is written to browser localStorage

#### Scenario: Saved size is restored on later visit
- **WHEN** a previously saved stream-size value exists in localStorage and an exercise page is opened later
- **THEN** the page restores that saved value and applies the corresponding stream size

#### Scenario: Invalid stored value falls back to baseline
- **WHEN** localStorage contains a missing, malformed, or out-of-range stream-size value
- **THEN** the page falls back to the minimum baseline size
