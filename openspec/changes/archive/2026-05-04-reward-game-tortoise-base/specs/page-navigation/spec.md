## MODIFIED Requirements

### Requirement: Angular application routing
The system SHALL implement Angular Router for client-side navigation between pages without full page reloads, including a dedicated route for the exercise-not-found page, a dedicated route for the Settings page, a dedicated route for the reward games page, and a typed parameterised route for reward game instances following the pattern `/reward-games/:gameType/:gameId`.

#### Scenario: Angular routing module configured
- **WHEN** the application initializes
- **THEN** Angular Router is configured with routes for welcome page, settings page, reward games page, reward game typed instance pages, exercise pages, dedicated exercise-not-found page, and wildcard redirect

#### Scenario: Navigation between pages without reload
- **WHEN** a user clicks a navigation link
- **THEN** the page content changes without a full browser page reload

### Requirement: Home navigation component
The system SHALL provide a reusable home button component that navigates to a configurable target route from any location where recovery navigation is required, with the default target being the root page.

#### Scenario: Home button on exercise pages
- **WHEN** viewing an exercise page
- **THEN** a home button is visible that navigates to the root URL when clicked

#### Scenario: Home button on invalid-exercise error page
- **WHEN** an invalid-exercise error page is shown
- **THEN** a home button is visible that navigates to the root URL when clicked

#### Scenario: Home button uses Angular routing
- **WHEN** the home button is clicked
- **THEN** navigation occurs via Angular Router without full page reload

#### Scenario: Home button with custom destination navigates to that destination
- **WHEN** the home button component is configured with a custom target route
- **THEN** activating the button navigates to the configured target route via Angular Router without a full page reload

#### Scenario: Home button default destination is root when no custom target is configured
- **WHEN** the home button component is rendered without a custom target route
- **THEN** activating the button navigates to the root URL

### Requirement: Automated test coverage for navigation integration
The system SHALL include automated tests for navigation behavior introduced or changed by service-driven exercise links, settings-page navigation entry, reward-games navigation entry, reward-games route rendering, reward-game typed instance route rendering, customised home button destination, and error-state recovery.

#### Scenario: Navigation test coverage
- **WHEN** test suites are executed
- **THEN** tests verify navigation from welcome-page service-driven links, welcome-page navigation to settings page, welcome-page navigation to the reward games page when available, dedicated reward-games route rendering, reward-game typed instance route rendering for a valid game type, dedicated exercise-not-found route rendering, home recovery navigation from the exercise-not-found page, and home button navigation to a custom configured destination
