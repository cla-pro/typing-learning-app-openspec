## ADDED Requirements

### Requirement: Settings page presents centralized app preferences
The system SHALL provide a dedicated Settings page with a centered title "Settings" and SHALL render configurable app preferences as a labeled list.

#### Scenario: Settings title is centered
- **WHEN** a user navigates to the Settings page
- **THEN** the page displays the title "Settings" in a centered position at the top

#### Scenario: Settings are rendered as labeled list items
- **WHEN** the Settings page is rendered
- **THEN** each setting appears as a list item with a visible label and control

### Requirement: Settings page includes keyboard layout and stream size settings
The system SHALL allow users to configure keyboard layout and expected-character stream size from the Settings page.

#### Scenario: Keyboard layout setting is available
- **WHEN** the Settings page is rendered
- **THEN** a labeled keyboard-layout setting is displayed with supported layout options

#### Scenario: Stream size setting is available
- **WHEN** the Settings page is rendered
- **THEN** a labeled stream-size setting is displayed for adjusting expected-character stream font size

### Requirement: Settings page follows welcome-page visual style direction
The system SHALL style the Settings page consistently with the welcome page visual language.

#### Scenario: Settings page styling is consistent
- **WHEN** the Settings page is viewed in a browser
- **THEN** spacing, card/container treatment, and typography style are visually consistent with the welcome page
