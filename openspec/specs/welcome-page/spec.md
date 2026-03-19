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

### Requirement: Welcome page exercise tiles reflect completion state and star count
The system SHALL display a green border on exercise tiles for completed exercises, and SHALL display a star-count indicator in the top-right corner of each completed tile, sourcing completion and star data from `ExerciseProgressService`.

#### Scenario: Completed exercise tile has a green border
- **WHEN** `ExerciseProgressService.isCompleted` returns `true` for an exercise
- **THEN** that exercise tile is rendered with a visible green border treatment

#### Scenario: Incomplete exercise tile has no green border
- **WHEN** `ExerciseProgressService.isCompleted` returns `false` for an exercise
- **THEN** that exercise tile is rendered without any completion border

#### Scenario: Star count indicator is shown on completed tile
- **WHEN** `ExerciseProgressService.isCompleted` returns `true` for an exercise
- **THEN** the tile displays a star count indicator positioned at the top-right corner reflecting the value returned by `ExerciseProgressService.getStars`

#### Scenario: Star count indicator is not shown on incomplete tile
- **WHEN** `ExerciseProgressService.isCompleted` returns `false` for an exercise
- **THEN** the tile does not display a star count indicator

#### Scenario: Three stars is distinguishable from zero stars visually
- **WHEN** one completed tile has 3 stars and another has 0 stars
- **THEN** the star indicators on the two tiles display different content

### Requirement: Automated test coverage for welcome-page completion tile behavior
The system SHALL include automated tests that verify welcome-page tile completion styling and star indicator rendering through observable component behavior.

#### Scenario: Completed tile styling is tested
- **WHEN** welcome component requirements tests are executed
- **THEN** a test verifies that a tile for an exercise with `isCompleted = true` receives the completed CSS class

#### Scenario: Star indicator rendering is tested
- **WHEN** welcome component requirements tests are executed
- **THEN** a test verifies that the star count indicator reflects the value provided by `ExerciseProgressService.getStars`
