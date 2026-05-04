## Purpose

Client-side navigation system for the typing learning application, including routed exercise pages, home navigation, and fallback redirects.

## Requirements

### Requirement: Angular application routing
The system SHALL implement Angular Router for client-side navigation between pages without full page reloads, including a dedicated route for the exercise-not-found page, a dedicated route for the Settings page, a dedicated route for the reward games page, and a typed parameterised route for reward game instances following the pattern `/reward-games/:gameType/:gameId`.

#### Scenario: Angular routing module configured
- **WHEN** the application initializes
- **THEN** Angular Router is configured with routes for welcome page, settings page, reward games page, reward game typed instance pages, exercise pages, dedicated exercise-not-found page, and wildcard redirect

#### Scenario: Navigation between pages without reload
- **WHEN** a user clicks a navigation link
- **THEN** the page content changes without a full browser page reload

### Requirement: Exercise page routing with dynamic parameters
The system SHALL support parameterized routes following the pattern `/exercices/<exercice-id>` where exercice-id is a string identifier, and SHALL also support a dedicated static route for exercise-not-found.

#### Scenario: Navigate to exercise page by ID
- **WHEN** a user navigates to `/exercices/basic-typing`
- **THEN** the system renders the exercise page with the exercise ID available to the component

#### Scenario: Exercise ID extracted from URL
- **WHEN** an exercise page is loaded
- **THEN** the component receives the exercice-id parameter from the route

#### Scenario: Dedicated not-found route is supported
- **WHEN** a user navigates to the exercise-not-found route
- **THEN** the system renders the dedicated exercise-not-found page

### Requirement: Unknown URL redirection
The system SHALL redirect any unrecognized URLs to the root page automatically.

#### Scenario: Invalid URL redirects to root
- **WHEN** a user navigates to an invalid URL like `/unknown/path`
- **THEN** the system redirects to the root URL `/` using client-side navigation

#### Scenario: Direct URL access with Angular host fallback
- **WHEN** a user directly enters `/exercices/some-id` in the browser address bar
- **THEN** the Angular host serves the app shell and Angular Router handles the route

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

### Requirement: Navigation links on welcome page
The system SHALL display navigation links on the welcome page that allow users to navigate to exercise pages, SHALL source those links from the shared exercise configuration service, SHALL expose a settings navigation action from the welcome page top-right area, and SHALL expose a reward-games navigation action from the welcome page only after the user has earned at least one total star.

#### Scenario: Exercise links displayed on welcome page
- **WHEN** the welcome page loads
- **THEN** navigation links to available exercises from `ExerciseConfigService` are displayed

#### Scenario: Exercise link navigation
- **WHEN** a user clicks an exercise link on the welcome page
- **THEN** the browser navigates to the exercise page URL without full page reload

#### Scenario: Settings page navigation from welcome page
- **WHEN** a user clicks the welcome-page gear button
- **THEN** the browser navigates to the Settings page URL without full page reload

#### Scenario: Reward games navigation from welcome page
- **WHEN** a user who has earned at least one total star clicks the welcome-page reward-games action
- **THEN** the browser navigates to the reward games page URL without full page reload

### Requirement: Automated test coverage for navigation integration
The system SHALL include automated tests for navigation behavior introduced or changed by service-driven exercise links, settings-page navigation entry, reward-games navigation entry, reward-games route rendering, reward-game typed instance route rendering, customised home button destination, and error-state recovery.

#### Scenario: Navigation test coverage
- **WHEN** test suites are executed
- **THEN** tests verify navigation from welcome-page service-driven links, welcome-page navigation to settings page, welcome-page navigation to the reward games page when available, dedicated reward-games route rendering, reward-game typed instance route rendering for a valid game type, dedicated exercise-not-found route rendering, home recovery navigation from the exercise-not-found page, and home button navigation to a custom configured destination