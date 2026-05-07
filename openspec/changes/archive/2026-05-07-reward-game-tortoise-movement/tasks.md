## 1. Kernel Service

- [x] 1.1 Create the tortoise game kernel service and define its internal state for `gameState`, `movementState`, waypoint index, current grid position, and target grid position.
- [x] 1.2 Implement `initialize(config)` so the kernel loads stable configuration and resets state to the configured start position.
- [x] 1.3 Implement `start()` so the kernel transitions from `idle` to `running` and computes the first eligible movement step.
- [x] 1.4 Implement `getSnapshot()` so the host can read game state, movement state, current grid position, and target grid position.
- [x] 1.5 Implement `completeMovement()` so the kernel commits the finished move, evaluates the next waypoint, and switches to `blocked` or `completed` when appropriate.
- [x] 1.6 Implement exact next-cell obstacle checks so the kernel blocks progression before entering an occupied cell.

## 2. Host Integration

- [x] 2.1 Initialize the kernel from the loaded tortoise configuration in the tortoise game host component.
- [x] 2.2 Add host state refresh logic that reads `getSnapshot()` after initialization, start actions, and movement completion.
- [x] 2.3 Implement the host start-button click handler to invoke `start()` and refresh host state.
- [x] 2.4 Forward visualization `moveCompleted` events to `completeMovement()` and refresh host state after each acknowledged move.
- [x] 2.5 Keep the host aligned with completed-state behavior so no redirect, reset, or extra action occurs when the tortoise reaches the end.

## 3. Tortoise Game UI

- [x] 3.1 Add the start button under the game field in the tortoise game host template.
- [x] 3.2 Reuse the same start-button styling or component contract used by typing exercises.
- [x] 3.3 Bind the button disabled state so it is enabled only while `gameState === 'idle'` and remains disabled once the game is running or completed.
- [x] 3.4 Bind visualization movement inputs from the host snapshot so the tortoise animates toward the kernel target position without moving game logic into the visualization.

## 4. Visualization Coordination

- [x] 4.1 Update the visualization integration so it animates from host-provided target positions while preserving existing smooth movement behavior.
- [x] 4.2 Preserve the visualization completion signal so the host can notify the kernel when an animation finishes.
- [x] 4.3 Keep visualization responsibilities limited to rendering and animation, with no path progression or obstacle logic added to the component.

## 5. Tests and Verification

- [x] 5.1 Add unit tests for the kernel service covering `initialize(config)`, `start()`, `getSnapshot()`, and `completeMovement()` state transitions.
- [x] 5.2 Add kernel tests for exact next-cell blocking and completed-state stop behavior.
- [x] 5.3 Update host component tests to cover start-button placement, disabled-state behavior, snapshot refresh, and no extra action on completion.
- [x] 5.4 Update visualization integration tests to cover host-driven target movement and animation completion handoff.
- [x] 5.5 Run the full test suite and confirm the tortoise movement change passes all relevant automated tests.
