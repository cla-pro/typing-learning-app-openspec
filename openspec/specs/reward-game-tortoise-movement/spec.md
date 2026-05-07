## Purpose

Runtime movement kernel for the tortoise reward game, including user-triggered start, step-by-step progression, obstacle blocking, and completed-state handling.

## Requirements

### Requirement: Tortoise movement kernel exposes a minimal imperative API
The system SHALL provide a tortoise game kernel service that owns tortoise movement logic and exposes a minimal imperative API consisting of `initialize(config)`, `start()`, `getSnapshot()`, and `completeMovement()`.

#### Scenario: Kernel initializes stable game state from configuration
- **WHEN** the host initializes the tortoise game kernel with a tortoise game configuration
- **THEN** the kernel snapshot reports `gameState` as `idle`, `movementState` as `idle`, and the current tortoise grid position as the configured start position

#### Scenario: Kernel snapshot exposes current runtime state
- **WHEN** the host requests the current kernel snapshot
- **THEN** the returned snapshot includes the game state, movement state, current tortoise grid position, and current target grid position

### Requirement: Tortoise movement starts only from explicit user action
The system SHALL keep the tortoise game idle until the user activates the start control, and SHALL begin progression only after the host invokes the kernel start action.

#### Scenario: Game remains idle before start action
- **WHEN** the tortoise game is displayed and the user has not clicked the start button
- **THEN** the kernel keeps `gameState` as `idle` and does not advance the tortoise from the configured start position

#### Scenario: Start action begins progression
- **WHEN** the user clicks the start button and the host invokes `start()` while the kernel is idle
- **THEN** the kernel transitions `gameState` to `running` and computes the first eligible movement step

### Requirement: Tortoise movement progresses stepwise until blocked or completed
The system SHALL evaluate only the immediate next waypoint on each step, SHALL stop before entering a cell occupied by an obstacle, and SHALL mark the game as completed when the tortoise reaches the configured end position.

#### Scenario: Clear next cell schedules movement
- **WHEN** the kernel is running and the immediate next waypoint cell contains no obstacle
- **THEN** the kernel updates the target grid position to that waypoint and sets `movementState` to `moving`

#### Scenario: Obstacle in next cell blocks progression
- **WHEN** the kernel is running and an obstacle occupies the immediate next waypoint cell
- **THEN** the kernel keeps the tortoise in its current grid position, sets `movementState` to `blocked`, and does not schedule a move into the blocked cell

#### Scenario: Completed movement advances progression state
- **WHEN** the visualization reports that the current movement animation completed and the host invokes `completeMovement()`
- **THEN** the kernel commits the target grid position as the tortoise's current grid position and evaluates the next step from that new position

#### Scenario: Reaching the end completes the game
- **WHEN** the tortoise reaches the configured end position
- **THEN** the kernel sets `gameState` to `completed`, stops further progression, and requires no further action

### Requirement: Automated test coverage for reward-game-tortoise-movement
The system SHALL include automated tests that verify the kernel's imperative API, button-triggered start behavior, obstacle blocking, and completion handling.

#### Scenario: Kernel API tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that `initialize(config)`, `start()`, `getSnapshot()`, and `completeMovement()` produce the expected runtime state transitions

#### Scenario: Blocking and completion tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the kernel blocks on an occupied next cell and switches to `completed` without further action when the tortoise reaches the end