## MODIFIED Requirements

### Requirement: Welcome landing page display
The system SHALL display a welcome page with navigation to exercise pages when a user navigates to the root URL.

#### Scenario: Loading the welcome page
- **WHEN** a user navigates to `http://localhost:3000/`
- **THEN** the page displays a welcome message and navigation links to exercises sourced from `ExerciseConfigService`

#### Scenario: Correct content type
- **WHEN** a user navigates to the home page
- **THEN** the response has content-type `text/html` and renders properly in a web browser

#### Scenario: Welcome page as Angular component
- **WHEN** the welcome page loads
- **THEN** it is rendered as an Angular component with proper routing integration

## ADDED Requirements

### Requirement: Automated test coverage for welcome-page service integration
The system SHALL include automated tests for welcome-page exercise-link integration with `ExerciseConfigService`.

#### Scenario: Welcome-page link data source is tested
- **WHEN** test suites are executed
- **THEN** tests verify that displayed exercise navigation entries are generated from `ExerciseConfigService` data rather than local hard-coded values
