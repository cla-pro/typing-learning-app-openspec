## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Automated test coverage for navigation integration
The system SHALL include automated tests for navigation behavior introduced or changed by service-driven exercise links and error-state recovery.

#### Scenario: Navigation test coverage
- **WHEN** test suites are executed
- **THEN** tests verify navigation from welcome-page service-driven links and navigation from invalid-exercise error page home button
