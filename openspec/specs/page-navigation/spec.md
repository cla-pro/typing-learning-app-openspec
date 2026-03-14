## Purpose

Client-side navigation system for the typing learning application, including routed exercise pages, home navigation, and fallback redirects.

## Requirements

### Requirement: Angular application routing
The system SHALL implement Angular Router for client-side navigation between pages without full page reloads.

#### Scenario: Angular routing module configured
- **WHEN** the application initializes
- **THEN** Angular Router is configured with routes for welcome page, exercise pages, and wildcard redirect

#### Scenario: Navigation between pages without reload
- **WHEN** a user clicks a navigation link
- **THEN** the page content changes without a full browser page reload

### Requirement: Exercise page routing with dynamic parameters
The system SHALL support parameterized routes following the pattern `/exercices/<exercice-id>` where exercice-id is a string identifier.

#### Scenario: Navigate to exercise page by ID
- **WHEN** a user navigates to `/exercices/basic-typing`
- **THEN** the system renders the exercise page with the exercise ID available to the component

#### Scenario: Exercise ID extracted from URL
- **WHEN** an exercise page is loaded
- **THEN** the component receives the exercice-id parameter from the route

### Requirement: Unknown URL redirection
The system SHALL redirect any unrecognized URLs to the root page automatically.

#### Scenario: Invalid URL redirects to root
- **WHEN** a user navigates to an invalid URL like `/unknown/path`
- **THEN** the system redirects to the root URL `/` using client-side navigation

#### Scenario: Direct URL access with Angular host fallback
- **WHEN** a user directly enters `/exercices/some-id` in the browser address bar
- **THEN** the Angular host serves the app shell and Angular Router handles the route

### Requirement: Home navigation component
The system SHALL provide a reusable home button component that navigates back to the root page from any location where recovery to home is required.

#### Scenario: Home button on exercise pages
- **WHEN** viewing an exercise page
- **THEN** a home button is visible that navigates to the root URL when clicked

#### Scenario: Home button on invalid-exercise error page
- **WHEN** an invalid-exercise error page is shown
- **THEN** a home button is visible that navigates to the root URL when clicked

#### Scenario: Home button uses Angular routing
- **WHEN** the home button is clicked
- **THEN** navigation occurs via Angular Router without full page reload

### Requirement: Navigation links on welcome page
The system SHALL display navigation links on the welcome page that allow users to navigate to exercise pages and SHALL source those links from the shared exercise configuration service.

#### Scenario: Exercise links displayed on welcome page
- **WHEN** the welcome page loads
- **THEN** navigation links to available exercises from `ExerciseConfigService` are displayed

#### Scenario: Exercise link navigation
- **WHEN** a user clicks an exercise link on the welcome page
- **THEN** the browser navigates to the exercise page URL without full page reload

### Requirement: Automated test coverage for navigation integration
The system SHALL include automated tests for navigation behavior introduced or changed by service-driven exercise links and error-state recovery.

#### Scenario: Navigation test coverage
- **WHEN** test suites are executed
- **THEN** tests verify navigation from welcome-page service-driven links and navigation from invalid-exercise error page home button