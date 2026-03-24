## MODIFIED Requirements

### Requirement: Settings page includes keyboard layout and stream size settings
The system SHALL allow users to configure keyboard layout and expected-character stream size from the Settings page. The stream-size range input SHALL render with a visible, draggable thumb on all supported browsers, including Safari on iOS (iPad).

#### Scenario: Keyboard layout setting is available
- **WHEN** the Settings page is rendered
- **THEN** a labeled keyboard-layout setting is displayed with supported layout options

#### Scenario: Stream size setting is available
- **WHEN** the Settings page is rendered
- **THEN** a labeled stream-size setting is displayed for adjusting expected-character stream font size

#### Scenario: Stream size range input thumb is visible on Safari iOS
- **WHEN** the Settings page is rendered in Safari on iOS (iPad)
- **THEN** the stream-size range input displays a visible, draggable thumb
