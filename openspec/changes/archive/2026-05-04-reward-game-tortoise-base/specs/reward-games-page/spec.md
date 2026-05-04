## ADDED Requirements

### Requirement: Typed reward-game route resolution
The system SHALL register a parameterized client-side route following the pattern `/reward-games/:gameType/:gameId` and SHALL resolve the `gameType` segment to a game-type-specific host component.

#### Scenario: Valid game type route renders host component
- **WHEN** a user navigates to a URL matching `/reward-games/:gameType/:gameId` with a recognised game type
- **THEN** the application renders the host component registered for that game type without a full page reload

#### Scenario: Unknown game type redirects to not-found
- **WHEN** a user navigates to a URL matching `/reward-games/:gameType/:gameId` with an unrecognised game type
- **THEN** the application redirects to the exercise-not-found page

### Requirement: Back navigation from tortoise game host to reward-games page
The system SHALL render a back navigation control on the tortoise game host that is implemented by reusing the shared home-button component with a customised destination, and SHALL navigate to the reward-games page when activated.

#### Scenario: Back control is visible on tortoise game host
- **WHEN** the tortoise game host component is rendered
- **THEN** a back navigation control derived from the shared home-button component is visible

#### Scenario: Back control navigates to reward-games page
- **WHEN** a user activates the back navigation control on the tortoise game host
- **THEN** the application navigates to the reward-games page via Angular Router without a full page reload

### Requirement: Automated test coverage for reward-game routing and back navigation
The system SHALL include automated tests that verify typed reward-game route resolution and back navigation from the tortoise game host to the reward-games page.

#### Scenario: Typed route tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that a valid game-type URL renders the tortoise host component and that an unknown game-type URL redirects to not-found

#### Scenario: Back navigation tests are executed
- **WHEN** the test suite runs
- **THEN** a test verifies that activating the back control on the tortoise game host navigates to the reward-games page via Angular Router

## MODIFIED Requirements

### Requirement: Reward games page displays locked reward game entries
The system SHALL provide a reward games page that displays a localized title, SHALL render the shared home navigation control, and SHALL list the available reward games using a static in-app definition. Reward game entries that do not yet have an implemented game route SHALL be presented as locked and non-interactive. Reward game entries that have an implemented and available game route SHALL be presented as launchable and SHALL navigate to that game route when activated.

#### Scenario: Reward games page loads with entries
- **WHEN** a user navigates to the reward games page
- **THEN** the page displays a localized reward games heading, the shared home button, and a list of reward game entries

#### Scenario: Each unimplemented reward game appears locked
- **WHEN** the reward games page renders a reward game entry that has no available game route
- **THEN** the entry shows its game icon with a visible lock overlay and is presented as unavailable for selection

#### Scenario: Locked reward games are not interactive
- **WHEN** a user attempts to activate a locked reward game entry
- **THEN** no game starts and the current page remains the reward games page

#### Scenario: Implemented reward game entry is launchable
- **WHEN** the reward games page renders a reward game entry that has an available game route
- **THEN** the entry is presented without a lock overlay and is available for activation

#### Scenario: Activating an implemented reward game navigates to its route
- **WHEN** a user activates a reward game entry that has an available game route
- **THEN** the application navigates to the game route via Angular Router without a full page reload

#### Scenario: Home button returns to welcome page
- **WHEN** a user activates the home button on the reward games page
- **THEN** the application navigates to the welcome page without a full browser reload

### Requirement: Automated test coverage for reward games page behavior
The system SHALL include automated tests that verify reward games page rendering, locked-entry presentation, launchable-entry presentation, game launch navigation, and home-button recovery behavior.

#### Scenario: Reward games page rendering is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** a test verifies that the page renders the heading and the configured reward game entries

#### Scenario: Locked state presentation is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** a test verifies that each rendered reward game entry without an available route is presented with a visible locked state and is not selectable

#### Scenario: Launchable entry presentation is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** a test verifies that a reward game entry with an available route is rendered without a lock overlay and is available for activation

#### Scenario: Game launch navigation is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** a test verifies that activating a launchable reward game entry navigates to the corresponding game route via Angular Router

#### Scenario: Home-button behavior is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** a test verifies that activating the home button navigates back to the welcome page
