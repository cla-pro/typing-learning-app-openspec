## MODIFIED Requirements

### Requirement: Welcome landing page display
The system SHALL display a welcome page with navigation to exercise pages when a user navigates to the root URL, SHALL obtain the currently chosen keyboard layout, and SHALL source grouped navigation from ordered exercise categories returned by `ExerciseConfigService` for that chosen layout.

#### Scenario: Loading the welcome page
- **WHEN** a user navigates to `http://localhost:3000/`
- **THEN** the page displays a welcome message and grouped exercise navigation sourced from `ExerciseConfigService`

#### Scenario: Categories are displayed in configured order
- **WHEN** the welcome page renders exercise navigation
- **THEN** category sections appear in the same order provided by `ExerciseConfigService`

#### Scenario: Exercises are displayed in category order
- **WHEN** the welcome page renders a category section
- **THEN** the exercises within that category appear in the same order provided by `ExerciseConfigService`

#### Scenario: Each exercise appears in exactly one category section
- **WHEN** the welcome page renders grouped exercise navigation
- **THEN** each exercise link is displayed under exactly one category and is not duplicated across sections

#### Scenario: Chosen keyboard layout is used for category loading
- **WHEN** the welcome page loads grouped exercise navigation
- **THEN** it requests categories from `ExerciseConfigService` using the current chosen layout

#### Scenario: Layout chooser is not displayed on welcome page
- **WHEN** the welcome page loads
- **THEN** no keyboard-layout chooser control is rendered in the welcome-page content

#### Scenario: Settings entry action is displayed on top-right
- **WHEN** the welcome page loads
- **THEN** a top-right gear-icon button is displayed to open Settings

#### Scenario: Correct content type
- **WHEN** a user navigates to the home page
- **THEN** the response has content-type `text/html` and renders properly in a web browser

#### Scenario: Welcome page as Angular component
- **WHEN** the welcome page loads
- **THEN** it is rendered as an Angular component with proper routing integration

### Requirement: Automated test coverage for welcome-page service integration
The system SHALL include automated tests for welcome-page exercise-link integration with `ExerciseConfigService`, including grouped data and ordering behavior, SHALL verify chosen-layout propagation, and SHALL verify gear-button rendering and navigation behavior.

#### Scenario: Welcome-page link data source is tested
- **WHEN** test suites are executed
- **THEN** tests verify that displayed exercise navigation entries are generated from `ExerciseConfigService` data rather than local hard-coded values

#### Scenario: Welcome-page grouped ordering is tested
- **WHEN** test suites are executed
- **THEN** tests verify that category order and within-category exercise order match the grouped data returned by `ExerciseConfigService`

#### Scenario: Welcome-page chosen layout propagation is tested
- **WHEN** test suites are executed
- **THEN** tests verify that the chosen layout is passed to `ExerciseConfigService` when loading categories

#### Scenario: Welcome-page gear-button behavior is tested
- **WHEN** test suites are executed
- **THEN** tests verify that the welcome page renders a gear button and routes to Settings when clicked
