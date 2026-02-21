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
The system SHALL provide a reusable home button component that navigates back to the root page from any location.

#### Scenario: Home button on exercise pages
- **WHEN** viewing an exercise page
- **THEN** a home button is visible that navigates to the root URL when clicked

#### Scenario: Home button uses Angular routing
- **WHEN** the home button is clicked
- **THEN** navigation occurs via Angular Router without full page reload

### Requirement: Navigation links on welcome page
The system SHALL display navigation links on the welcome page that allow users to navigate to exercise pages.

#### Scenario: Exercise links displayed on welcome page
- **WHEN** the welcome page loads
- **THEN** navigation links to available exercises are displayed

#### Scenario: Exercise link navigation
- **WHEN** a user clicks an exercise link on the welcome page
- **THEN** the browser navigates to the exercise page URL without full page reload