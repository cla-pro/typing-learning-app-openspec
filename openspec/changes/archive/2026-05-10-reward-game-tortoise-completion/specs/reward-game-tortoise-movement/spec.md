## MODIFIED Requirements

### Requirement: Tortoise movement progresses stepwise until blocked or completed
The system SHALL evaluate only the immediate next waypoint on each step, SHALL stop before entering a cell occupied by an uncleared obstacle, SHALL mark the game as completed when the tortoise reaches the configured end position, and SHALL persist completion state for the current `gameId` as localStorage key `reward-game-<gameId>-completion` with value `true`.

#### Scenario: Clear next cell schedules movement
- **WHEN** the kernel is running and the immediate next waypoint cell contains no uncleared obstacle
- **THEN** the kernel updates the target grid position to that waypoint and sets `movementState` to `moving`

#### Scenario: Uncleared obstacle in next cell blocks progression
- **WHEN** the kernel is running and an uncleared obstacle occupies the immediate next waypoint cell
- **THEN** the kernel keeps the tortoise in its current grid position, sets `movementState` to `blocked`, and does not schedule a move into the blocked cell

#### Scenario: Cleared obstacle in next cell does not block progression
- **WHEN** the kernel is running and the immediate next waypoint cell contains an obstacle already marked as cleared
- **THEN** the kernel schedules movement through that cell and does not enter blocked state

#### Scenario: Completed movement advances progression state
- **WHEN** the visualization reports that the current movement animation completed and the host invokes `completeMovement()`
- **THEN** the kernel commits the target grid position as the tortoise's current grid position and evaluates the next step from that new position

#### Scenario: Reaching the end completes the game
- **WHEN** the tortoise reaches the configured end position
- **THEN** the kernel sets `gameState` to `completed`, stops further progression, and requires no further action

#### Scenario: Completed game persists completion by game id
- **WHEN** tortoise game runtime reaches `completed` for a specific `gameId`
- **THEN** the system writes localStorage key `reward-game-<gameId>-completion` with value `true`

### Requirement: Automated test coverage for reward-game-tortoise-movement
The system SHALL include automated tests that verify the kernel's imperative API, button-triggered start behavior, obstacle blocking and unblocking behavior, completion handling, and completion persistence key/value behavior.

#### Scenario: Kernel API tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that `initialize(config)`, `start()`, `getSnapshot()`, `typeObstacleChar(char)`, and `completeMovement()` produce the expected runtime state transitions

#### Scenario: Blocking and completion tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the kernel blocks on an occupied uncleared next cell, resumes after clear conditions are met, and switches to `completed` without further action when the tortoise reaches the end

#### Scenario: Completion persistence tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that completion writes localStorage key `reward-game-<gameId>-completion` with value `true` for the finished game id
