## ADDED Requirements

### Requirement: Exercise stream size is user-adjustable
The system SHALL provide a linear slider on the exercise page that allows the user to increase the expected-character stream font size from the baseline default size.

#### Scenario: Slider starts at baseline minimum
- **WHEN** the exercise page is rendered without a previously saved size preference
- **THEN** the slider is positioned at its minimum value and the stream uses the current baseline font size

#### Scenario: Moving slider right increases stream size
- **WHEN** the user moves the slider to the right
- **THEN** the expected-character stream renders with a larger font size than the baseline

### Requirement: Exercise stream size preference persists across sessions
The system SHALL persist the selected stream size in browser localStorage as a global preference and SHALL restore that value on later visits.

#### Scenario: Changed size is stored after slider interaction
- **WHEN** the user changes the stream-size slider value
- **THEN** the selected value is written to browser localStorage

#### Scenario: Saved size is restored on later visit
- **WHEN** a previously saved stream-size value exists in localStorage and the exercise page is opened later
- **THEN** the page restores that saved value and applies the corresponding stream size

#### Scenario: Invalid stored value falls back to baseline
- **WHEN** localStorage contains a missing, malformed, or out-of-range stream-size value
- **THEN** the page falls back to the minimum baseline size
