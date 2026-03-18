## Purpose

Landing page interface displaying a welcome message as proof of concept for the typing learning application.

## Requirements

### Requirement: Welcome landing page display
The system SHALL display a welcome page with navigation to exercise pages when a user navigates to the root URL, and SHALL source that navigation from ordered exercise categories provided by `ExerciseConfigService`.

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

#### Scenario: Correct content type
- **WHEN** a user navigates to the home page
- **THEN** the response has content-type `text/html` and renders properly in a web browser

#### Scenario: Welcome page as Angular component
- **WHEN** the welcome page loads
- **THEN** it is rendered as an Angular component with proper routing integration

### Requirement: Automated test coverage for welcome-page service integration
The system SHALL include automated tests for welcome-page exercise-link integration with `ExerciseConfigService`, including grouped data and ordering behavior.

#### Scenario: Welcome-page link data source is tested
- **WHEN** test suites are executed
- **THEN** tests verify that displayed exercise navigation entries are generated from `ExerciseConfigService` data rather than local hard-coded values

#### Scenario: Welcome-page grouped ordering is tested
- **WHEN** test suites are executed
- **THEN** tests verify that category order and within-category exercise order match the grouped data returned by `ExerciseConfigService`

### Requirement: Page structure and styling
The system SHALL provide a properly structured welcome page with navigation elements and basic styling using a compact, dense layout with smaller exercise tiles arranged in responsive multi-column rows.

#### Scenario: Welcome page title is concise
- **WHEN** the welcome page loads
- **THEN** the heading displays "Typing Learning" (not "Welcome to Typing Learning")

#### Scenario: Content is visually dense and compact
- **WHEN** viewing the welcome page in a browser
- **THEN** horizontal padding/margins are reduced so content sits closer to window borders, improving information density

#### Scenario: Exercise tiles are smaller and square-like
- **WHEN** viewing exercise navigation on the welcome page
- **THEN** each exercise link tile is sized as a compact card (roughly square proportions) rather than a full-width block

#### Scenario: Multiple exercise tiles appear per row with wrapping
- **WHEN** viewing a category section with multiple exercises
- **THEN** exercise tiles are arranged horizontally in multiple columns, automatically wrapping to new rows as needed based on available viewport width

#### Scenario: A minimal visual presentation
- **WHEN** viewing the welcome page in a browser
- **THEN** the page displays cleanly with readable typography, compact spacing, and tile-based navigation (no broken styling)

#### Scenario: Navigation links are styled and responsive
- **WHEN** viewing the welcome page
- **THEN** navigation links to exercises are clearly visible as compact cards with proper styling and responsive behavior
