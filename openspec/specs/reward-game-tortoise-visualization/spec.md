## Purpose

Layered visualization for the tortoise reward game, including path and object rendering, optional debug grid display, and smooth animated tortoise movement between grid cells.

## Requirements

### Requirement: Tortoise visualization renders layered game board
The system SHALL provide a tortoise visualization component that renders the tortoise game board from a tortoise configuration using separate visual layers for the path, game objects, and debug grid.

#### Scenario: Visualization renders path and object layers for a valid configuration
- **WHEN** the tortoise visualization component receives a valid tortoise game configuration
- **THEN** it renders the configured path as a polyline layer and renders the tortoise and obstacles on a separate object layer

#### Scenario: Path is rendered without waypoint markers
- **WHEN** the visualization renders the configured route
- **THEN** it displays the route as a continuous polyline through the waypoint centers without special markers for the start, end, or intermediate waypoints

#### Scenario: Debug grid layer is independently controllable
- **WHEN** the tortoise visualization component is rendered with the debug-grid display enabled
- **THEN** it renders a separate debug grid layer without merging it into the path or object layers

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

### Requirement: Tortoise visualization can display a debug grid overlay
The system SHALL provide a debug-grid mode that overlays the board with visible cell boundaries and coordinate labels for each represented `(col,row)` position.

#### Scenario: Debug grid shows cell boundaries
- **WHEN** the visualization renders with debug-grid mode enabled
- **THEN** it draws visible horizontal and vertical grid lines for the represented board area

#### Scenario: Debug grid labels coordinates
- **WHEN** the visualization renders with debug-grid mode enabled
- **THEN** it displays each cell's `(col,row)` coordinate label within that cell

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
