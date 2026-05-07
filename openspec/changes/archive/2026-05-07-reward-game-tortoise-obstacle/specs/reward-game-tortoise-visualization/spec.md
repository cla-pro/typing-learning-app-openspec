## MODIFIED Requirements

### Requirement: Tortoise visualization centers objects within grid cells
The system SHALL map every tortoise-game grid position to the visual center of its corresponding board cell and SHALL render path geometry, the tortoise, and uncleared obstacles centered within those cells.

#### Scenario: Tortoise start position is centered in its cell
- **WHEN** the visualization first renders a tortoise configuration
- **THEN** the tortoise appears centered within the grid cell represented by the configuration's start position

#### Scenario: Obstacle is centered in its cell
- **WHEN** the visualization renders an uncleared obstacle at a configured grid position
- **THEN** the obstacle appears centered within the corresponding grid cell as a circular disk on the path

#### Scenario: Cleared obstacle is not rendered
- **WHEN** an obstacle has been marked cleared by external game logic
- **THEN** the visualization does not render that obstacle disk on the object layer

#### Scenario: Polyline vertices align to cell centers
- **WHEN** the path polyline is derived from configured waypoints
- **THEN** each polyline vertex is placed at the center of the waypoint's grid cell

### Requirement: Automated test coverage for reward-game-tortoise-visualization
The system SHALL include automated tests that verify layered rendering, cell-centered placement, debug-grid rendering, smooth tortoise movement behavior, animation completion signaling, and cleared-obstacle hiding behavior.

#### Scenario: Layered rendering tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the path, object, and debug-grid layers are rendered as separate visualization layers

#### Scenario: Centered placement tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that configured path vertices, the tortoise, and uncleared obstacle disks are positioned at grid-cell centers

#### Scenario: Movement animation tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that tortoise movement updates displayed screen position continuously rather than snapping directly between grid cells

#### Scenario: Animation completion signal tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the visualization emits a completion signal when the tortoise reaches the target cell

#### Scenario: Cleared obstacle hiding tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that obstacles marked as cleared are not rendered on the visualization object layer