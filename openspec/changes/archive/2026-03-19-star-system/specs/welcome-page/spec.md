## ADDED Requirements

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
