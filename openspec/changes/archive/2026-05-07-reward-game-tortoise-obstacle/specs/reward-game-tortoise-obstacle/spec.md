## ADDED Requirements

### Requirement: Tortoise obstacles define layout-specific typing sequences
The system SHALL represent each tortoise obstacle with a layout-keyed sequence map such that every supported keyboard layout has a corresponding ordered character sequence for that obstacle.

#### Scenario: Obstacle model includes sequence per supported layout
- **WHEN** a tortoise game configuration is loaded
- **THEN** each obstacle includes a sequence entry for every supported keyboard layout

#### Scenario: Missing layout sequence fails validation
- **WHEN** an obstacle is missing a sequence for any supported keyboard layout
- **THEN** game initialization fails and tortoise gameplay does not start

### Requirement: Obstacle typing progress uses active keyboard layout sequence
The system SHALL validate typed input against the obstacle sequence selected by the currently chosen keyboard layout.

#### Scenario: Active layout selects obstacle sequence
- **WHEN** the user has selected a keyboard layout and a next obstacle exists
- **THEN** obstacle typing compares input against that obstacle's sequence for the selected layout

#### Scenario: Matching input advances obstacle progress
- **WHEN** the user types the expected next character for the selected-layout obstacle sequence
- **THEN** obstacle typing progress advances by one character

#### Scenario: Mismatching input is ignored
- **WHEN** the user types a character that does not match the expected next character
- **THEN** obstacle typing progress remains unchanged

### Requirement: Clearing an obstacle removes it and resumes progression
The system SHALL clear an obstacle when its full selected-layout sequence is completed, SHALL stop rendering the cleared obstacle, and SHALL allow movement progression through that cell.

#### Scenario: Completing sequence clears obstacle
- **WHEN** the final character of an obstacle sequence is typed in order
- **THEN** the obstacle is marked cleared and removed from obstacle rendering

#### Scenario: Cleared obstacle no longer blocks movement
- **WHEN** tortoise progression evaluates a next cell containing a previously cleared obstacle
- **THEN** movement proceeds without entering blocked state

#### Scenario: Pre-cleared obstacle is passed without stopping
- **WHEN** an obstacle is cleared before the tortoise reaches its position
- **THEN** the tortoise continues through that position without stopping

### Requirement: Obstacle character display follows running-state rules
The system SHALL show a bottom obstacle-character display box while the game is running, SHALL show characters for the next uncleared obstacle along the path, and SHALL not render status text.

#### Scenario: Character box is shown only while running
- **WHEN** game state is `running`
- **THEN** the obstacle character box is visible

#### Scenario: Character box is hidden outside running state
- **WHEN** game state is not `running`
- **THEN** the obstacle character box is not displayed

#### Scenario: Character box tracks next obstacle while moving
- **WHEN** the tortoise is progressing between cells and the next uncleared obstacle remains ahead
- **THEN** the box displays that next obstacle's character sequence

#### Scenario: Character box omits status text
- **WHEN** the obstacle character box is rendered
- **THEN** it displays characters only and does not show status labels

### Requirement: Automated test coverage for reward-game-tortoise-obstacle
The system SHALL include automated tests for layout-sequence validation, mismatch-ignore behavior, obstacle clearing/removal, pre-clear pass-through, and running-state character display behavior.

#### Scenario: Layout sequence validation tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify strict layout coverage and initialization failure for missing layout sequences

#### Scenario: Typing behavior tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify selected-layout matching, mismatch-ignore behavior, and clear-on-complete transitions

#### Scenario: Display behavior tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify running-only display visibility, next-obstacle sequence selection, and no-status-text rendering