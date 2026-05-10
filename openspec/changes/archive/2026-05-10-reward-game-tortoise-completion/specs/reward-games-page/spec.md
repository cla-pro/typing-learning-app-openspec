## MODIFIED Requirements

### Requirement: Reward games page displays locked reward game entries
The system SHALL provide a reward games page that displays a localized title, SHALL render the shared home navigation control, and SHALL list the available reward games using a static in-app definition. Reward game entries that do not yet have an implemented game route SHALL be presented as locked and non-interactive. Reward game entries that have an implemented and available game route SHALL be presented as launchable and SHALL navigate to that game route when activated. Reward game entries marked completed in localStorage as key `reward-game-<gameId>-completion` with value `true` SHALL display a crown marker on the corresponding game tile.

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

#### Scenario: Completed game entry shows crown marker
- **WHEN** the reward games page renders a reward game entry whose localStorage completion key `reward-game-<gameId>-completion` has value `true`
- **THEN** the entry displays a visible crown marker on that game tile

#### Scenario: Completion marker persists after reload
- **WHEN** a user reloads the reward games page after completing a game
- **THEN** the entry for that completed `gameId` still displays the crown marker from persisted localStorage state

#### Scenario: Home button returns to welcome page
- **WHEN** a user activates the home button on the reward games page
- **THEN** the application navigates to the welcome page without a full browser reload

### Requirement: Automated test coverage for reward games page behavior
The system SHALL include automated tests that verify reward games page rendering, locked-entry presentation, launchable-entry presentation, game launch navigation, completion crown rendering from persisted state, and home-button recovery behavior.

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

#### Scenario: Crown rendering from completion state is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** tests verify that a game tile with localStorage completion key `reward-game-<gameId>-completion` value `true` renders a visible crown marker

#### Scenario: Automated test coverage for reward-game routing and back navigation
The system SHALL include automated tests that verify typed reward-game route resolution and back navigation from the tortoise game host to the reward-games page.

#### Scenario: Typed route tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that a valid game-type URL renders the tortoise host component and that an unknown game-type URL redirects to not-found

#### Scenario: Back navigation tests are executed
- **WHEN** the test suite runs
- **THEN** a test verifies that activating the back control on the tortoise game host navigates to the reward-games page via Angular Router

#### Scenario: Home-button behavior is tested
- **WHEN** reward games page requirements tests are executed
- **THEN** a test verifies that activating the home button navigates back to the welcome page
