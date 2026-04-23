## MODIFIED Requirements

### Requirement: Settings page presents centralized app preferences
The system SHALL provide a dedicated Settings page with a centered title resolved from the active UI language and SHALL render configurable app preferences as a labeled list.

#### Scenario: Settings title is centered
- **WHEN** a user navigates to the Settings page
- **THEN** the page displays the localized settings title in a centered position at the top

#### Scenario: Settings are rendered as labeled list items
- **WHEN** the Settings page is rendered
- **THEN** each setting appears as a list item with a visible label and control

### Requirement: Settings page includes keyboard layout, UI language, and stream size settings
The system SHALL allow users to configure keyboard layout, UI language, and expected-character stream size from the Settings page. The stream-size range input SHALL render with a visible, draggable thumb on all supported browsers, including Safari on iOS (iPad).

#### Scenario: Keyboard layout setting is available
- **WHEN** the Settings page is rendered
- **THEN** a labeled keyboard-layout setting is displayed with supported layout options

#### Scenario: UI language setting is available
- **WHEN** the Settings page is rendered
- **THEN** a labeled UI-language setting is displayed with the supported UI language options

#### Scenario: Stream size setting is available
- **WHEN** the Settings page is rendered
- **THEN** a labeled stream-size setting is displayed for adjusting expected-character stream font size

#### Scenario: Changing UI language updates the rendered page text
- **WHEN** the user selects a different supported UI language on the Settings page
- **THEN** the Settings page updates its in-scope visible text to the newly selected language and persists that choice for future visits

#### Scenario: Stream size range input thumb is visible on Safari iOS
- **WHEN** the Settings page is rendered in Safari on iOS (iPad)
- **THEN** the stream-size range input displays a visible, draggable thumb