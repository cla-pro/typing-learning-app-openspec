## MODIFIED Requirements

### Requirement: Angular application routing
The system SHALL implement Angular Router for client-side navigation between pages without full page reloads, including a dedicated route for the exercise-not-found page, a dedicated route for the Settings page, and a dedicated route for the reward games page.

#### Scenario: Angular routing module configured
- **WHEN** the application initializes
- **THEN** Angular Router is configured with routes for welcome page, settings page, reward games page, exercise pages, dedicated exercise-not-found page, and wildcard redirect

#### Scenario: Navigation between pages without reload
- **WHEN** a user clicks a navigation link
- **THEN** the page content changes without a full browser page reload

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
The system SHALL include automated tests for navigation behavior introduced or changed by service-driven exercise links, settings-page navigation entry, reward-games navigation entry, reward-games route rendering, and error-state recovery.

#### Scenario: Navigation test coverage
- **WHEN** test suites are executed
- **THEN** tests verify navigation from welcome-page service-driven links, welcome-page navigation to settings page, welcome-page navigation to the reward games page when available, dedicated reward-games route rendering, dedicated exercise-not-found route rendering, and home recovery navigation from the exercise-not-found page