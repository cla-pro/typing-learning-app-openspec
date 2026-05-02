## ADDED Requirements

### Requirement: Reward games page displays locked reward game entries
The system SHALL provide a reward games page that displays a localized title, SHALL render the shared home navigation control, and SHALL list the available reward games as visible but locked entries using a static in-app definition for this initial release.

#### Scenario: Reward games page loads with locked entries
- **WHEN** a user navigates to the reward games page
- **THEN** the page displays a localized reward games heading, the shared home button, and a list of reward game entries

#### Scenario: Each reward game appears locked
- **WHEN** the reward games page renders a reward game entry
- **THEN** the entry shows its game icon with a visible lock overlay and is presented as unavailable for selection

#### Scenario: Locked reward games are not interactive
- **WHEN** a user attempts to activate a locked reward game entry
- **THEN** no game starts and the current page remains the reward games page

#### Scenario: Home button returns to welcome page
- **WHEN** a user activates the home button on the reward games page
- **THEN** the application navigates to the welcome page without a full browser reload

### Requirement: Automated test coverage for reward games page behavior
The system SHALL include automated tests that verify reward games page rendering, locked-entry presentation, and home-button recovery behavior.

#### Scenario: Reward games page rendering is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** a test verifies that the page renders the heading and the configured locked reward game entries

#### Scenario: Locked state presentation is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** a test verifies that each rendered reward game entry is presented with a visible locked state and is not selectable

#### Scenario: Home-button behavior is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** a test verifies that activating the home button navigates back to the welcome page