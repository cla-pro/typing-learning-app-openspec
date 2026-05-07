## MODIFIED Requirements

### Requirement: Tortoise visualization supports animated movement between grid positions
The system SHALL support smooth animated tortoise movement between consecutive grid positions such that the tortoise's displayed screen position changes continuously in pixels and does not jump directly from one cell center to the next. The visualization SHALL remain responsible only for rendering and animation, while external game logic determines the next target grid position.

#### Scenario: Animated move interpolates screen position
- **WHEN** the tortoise is instructed to move from one grid position to the next adjacent position on the path
- **THEN** the displayed tortoise position transitions continuously between the source cell center and the target cell center

#### Scenario: Display position can differ from discrete grid position during movement
- **WHEN** a tortoise movement animation is in progress
- **THEN** the tortoise's displayed pixel position may lie between grid-cell centers while the underlying discrete grid position remains unchanged until the move completes

#### Scenario: Visualization signals animation completion to game logic
- **WHEN** the tortoise finishes animating to the current target grid position
- **THEN** the visualization emits a completion signal so external game logic can commit the new position and decide the next step

### Requirement: Automated test coverage for reward-game-tortoise-visualization
The system SHALL include automated tests that verify layered rendering, cell-centered placement, debug-grid rendering, smooth tortoise movement behavior, and animation completion signaling.

#### Scenario: Layered rendering tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the path, object, and debug-grid layers are rendered as separate visualization layers

#### Scenario: Centered placement tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that configured path vertices, the tortoise, and obstacle disks are positioned at grid-cell centers

#### Scenario: Movement animation tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that tortoise movement updates displayed screen position continuously rather than snapping directly between grid cells

#### Scenario: Animation completion signal tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the visualization emits a completion signal when the tortoise reaches the target cell