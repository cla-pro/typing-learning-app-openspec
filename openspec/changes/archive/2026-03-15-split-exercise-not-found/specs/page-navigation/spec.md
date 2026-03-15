## MODIFIED Requirements

### Requirement: Angular application routing
The system SHALL implement Angular Router for client-side navigation between pages without full page reloads, including a dedicated route for the exercise-not-found page.

#### Scenario: Angular routing module configured
- **WHEN** the application initializes
- **THEN** Angular Router is configured with routes for welcome page, exercise pages, dedicated exercise-not-found page, and wildcard redirect

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

### Requirement: Automated test coverage for navigation integration
The system SHALL include automated tests for navigation behavior introduced or changed by service-driven exercise links and error-state recovery.

#### Scenario: Navigation test coverage
- **WHEN** test suites are executed
- **THEN** tests verify navigation from welcome-page service-driven links, dedicated exercise-not-found route rendering, and home recovery navigation from the exercise-not-found page
