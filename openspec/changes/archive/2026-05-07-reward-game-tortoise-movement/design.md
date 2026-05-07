## Context

The tortoise visualization currently renders path, obstacles, debug grid, and tortoise position, but movement only occurs when `moveTortoiseTo(...)` is called externally. There is no shared game progression state or user start mechanism yet.

This change introduces a dedicated tortoise game kernel service that owns game logic, grid positions, and runtime state. A start button initiates the game; the kernel then progresses the tortoise step-by-step along the path when cells are clear, and blocks progression when an obstacle occupies the immediate next cell. The kernel manages **two parallel state machines**: (1) game state (idle / running / completed), separate from (2) movement state (idle / moving / blocked), which can diverge (e.g., game running but tortoise blocked). The visualization does not own this logic; it reads kernel state through a minimal imperative API and animates the tortoise toward grid positions emitted by the kernel. Visual feedback for blocking is passive: the tortoise simply does not progress further.

## Goals / Non-Goals

**Goals:**
- Add a start button under the game field to trigger game progression from the configured start position.
- Progress step-by-step along configured waypoints in path order after button click.
- Manage two parallel state machines in a kernel service: game state (idle / running / completed) and movement state (idle / moving / blocked).
- Allow game state and movement state to diverge (e.g., game running but tortoise blocked or idle).
- Block progression when the next path cell contains an obstacle; visual feedback is static (tortoise does not move).
- Preserve existing smooth movement animation between cell centers.
- Guarantee config stability during game session (config does not change while game is displayed/running).
- Keep behavior deterministic and testable.

**Non-Goals:**
- Obstacle-clearing mechanics (typing input, partial progress, obstacle removal).
- Pause, speed controls, or restart within a session.
- Path recomputation or dynamic rerouting around obstacles.
- Pausing mid-game UI (all games finish to completion in this phase).

## Decisions

### D1 - Dual parallel state machines live in a kernel service

**Decision:** A dedicated kernel service manages two independent state machines and the tortoise's current grid position:

1. **Game State** (managed by kernel service):
   - `idle` → `running` (on button click) → `completed` (when tortoise reaches end)
   - Models the user-visible game lifecycle

2. **Movement State** (managed by kernel service, separate tracking):
   - `idle` → `moving` (animation in progress) → `blocked` (obstacle ahead) → `idle` (when move completes or when the kernel settles after a move)
   - Models the tortoise's current activity independent of game state
   - Can differ from game state: e.g., game running but tortoise blocked or idle

3. **Grid Position State** (managed by kernel service):
   - Current waypoint index and current tortoise grid cell
   - Exposed so multiple parts of the visualization can react consistently to state changes

**Rationale:** Separating game state from movement state allows the UI to track both the user's game session and the tortoise's animation independently. This supports:
- Distinguishing between "game is active" and "tortoise is currently animating"
- Blocking progression mid-game without ending the game
- Allowing multiple view parts to react to one shared source of truth
- Future extensibility (pause, obstacle-clearing, etc.)

**Alternatives considered:**
- *Single unified state*: simpler initially, but doesn't support state divergence needed for flexible game pausing and blocking feedback.
- *State in visualization component*: visualization should remain focused on rendering; orchestration and grid-state ownership belong in the kernel.
- *Host-managed orchestration without a kernel*: workable for this phase, but weakens the shared-state model needed for multiple reactive view parts.

### D2 - Button-triggered start, kernel-driven progression, and animation completion handoff

**Decision:**
- Game progression begins only when the user clicks the start button; no autonomous start on render.
- The kernel starts progression logic when the user clicks the start button.
- Once game is running, the kernel schedules the next move only after the previous animation completes (`transitionend`), not with a timer loop.
- Button is placed in the host component template, positioned under the game field (below the visualization).
- Button styling matches the start button used in typing exercises (reuse same component and CSS).
- Button state management: enabled when `gameState === idle`, disabled when `gameState === running` or `gameState === completed` to prevent multiple clicks during gameplay.

**Game Start Flow:**
1. User clicks button (enabled, `gameState === idle`) → host component calls the kernel start action.
2. Kernel transitions `gameState` to `running`, computes the first move if available, and exposes the target grid position.
3. Visualization reacts to the new target position and calls its own animation routine.
4. Button remains disabled throughout game progression and after completion.

**Progression Flow (repeats on animation completion):**
1. Kernel checks if next waypoint cell is clear (no obstacle at that position).
2. If clear, kernel advances target grid position and sets `movementState = moving`.
3. Visualization animates toward that target position.
4. On visualization's `moveCompleted` event, host notifies the kernel that the movement finished.
5. Kernel commits the new grid position, evaluates the next step, and either remains blocked, schedules another move, or switches `gameState` to `completed` when tortoise reaches `config.end`.
6. When `gameState` becomes `completed`, progression stops. No message, redirect, or additional action is triggered.

**Alternatives considered:**
- *Automatic start on render*: conflicts with user-driven progression requirement.
- *Fixed interval timer*: can desynchronize with CSS transition duration and create overlaps.
- *Host-level auto-progression with timer*: button click sets `gameState = running`, then a timer ticks independent of animation.

### D3 - Obstacle-front blocking rule uses exact grid equality

**Decision:** A next cell is blocked when any obstacle position equals the next waypoint grid position (`col` and `row` both equal). Blocking is evaluated only for the immediate next step.

**Rationale:** This directly matches the requested behavior: stop when obstacle is directly in front of the tortoise's next move.

**Alternatives considered:**
- *Line-segment collision along movement vector*: unnecessary because movement occurs on discrete adjacent path points.
- *Blocking by obstacle radius in pixels*: fragile and not aligned with grid semantics.

### D4 - Visualization reacts to kernel state; kernel owns logic and positions

**Decision:** The visualization component (`TortoiseVisualizationComponent`) remains a pure renderer:
- Keep existing `config` and `debugGrid` inputs unchanged.
- Keep `moveCompleted` output for animation completion signal.
- Read current grid position and target movement state from kernel-backed host state.
- Do NOT move game logic or path progression into visualization.

The kernel service owns game state and movement logic:
- Manages the start action and transitions `gameState` / `movementState`.
- Stores current waypoint index and tortoise grid position.
- Evaluates obstacle blocking and completion conditions.
- Exposes state through a minimal imperative API rather than signals or observables.

The kernel public surface is intentionally small:
- `initialize(config)` loads stable game configuration and resets kernel state.
- `start()` transitions the game from `idle` to `running` and computes the first move.
- `getSnapshot()` returns the current game state, movement state, current grid position, and target grid position.
- `completeMovement()` acknowledges that the current animation finished so the kernel can commit position and evaluate the next step.

The host component (`TortoiseGameHostComponent`) wires UI and kernel together:
- Renders the start button and forwards user actions to the kernel.
- Passes config into the kernel during setup.
- Forwards visualization `moveCompleted` events back to the kernel.
- Reads kernel snapshots after user actions and movement completion, then binds visualization inputs from those snapshots.

**Alternatives considered:**
- *Add game-state inputs to visualization*: separates concerns poorly; visualization should not know about game state.
- *Add public start/stop methods to visualization*: conflates rendering with orchestration.

### D5 - Config stability and reset behavior

**Decision:** The kernel assumes `config` is stable during a game session (does not change while the game is active). When a game reaches the end:
- Set `gameState = completed`.
- Stop progression and do not trigger any further action.
- Keep the final tortoise position and final kernel state available to the UI.
- Keep the start button disabled for the completed session.
- Config will not change mid-session; future changes (obstacle clearing, etc.) will affect config between sessions but not during active gameplay.

**Rationale:** Stable config allows deterministic progression logic without worrying about mid-game interruptions. Future game features (pause, restart, obstacle updates) will be introduced in separate changes.

**On Component Init or Config Change:**
- Initialize kernel `gameState = idle`, `movementState = idle`, and position state from config.
- Compute path and board geometry from config once; do not re-trigger progression.
- Do not assume config changes during an active game session.

## Risks / Trade-offs

- **[Transitionend reliability]** CSS transition events can fire for unrelated property changes. -> Mitigation: guard handler to react only while `movementState == moving`.
- **[Start not found in waypoints]** Bad config could desync index initialization. -> Mitigation: fallback to index 0 and keep current config validation assumptions; add defensive test.
- **[No obstacle-clearing yet]** Tortoise may remain permanently blocked by design. -> Mitigation: document as expected for this phase; next change introduces unblocking.
- **[Kernel/view synchronization]** Kernel state and animation callbacks can drift if events are handled out of order. -> Mitigation: keep a single movement-completed handoff path from visualization to kernel and guard it with `movementState == moving`.

## Migration Plan

1. **Kernel Service Setup**: Add a tortoise game kernel service that stores `gameState` (idle/running/completed), `movementState` (idle/moving/blocked), current waypoint index, and current grid position.
2. **Kernel API**: Implement a minimal imperative public surface: `initialize(config)`, `start()`, `getSnapshot()`, and `completeMovement()`.
3. **Host Wiring**: Initialize the kernel from config, read kernel snapshots for template state, and forward visualization completion events back to the kernel.
4. **Button UI**: Add start button under game field using the same component and styling as the typing exercise start button. Bind button's disabled state to the kernel game state: `[disabled]="gameState !== 'idle'"`.
5. **Button Handler**: Implement click handler to invoke the kernel start action, then refresh host state from `getSnapshot()`.
6. **Progression Logic**: Implement kernel-driven stepping:
   - Check if next waypoint cell is clear (no obstacle match).
   - If clear and `gameState === running`, update target position and set `movementState = moving`.
   - If blocked, set `movementState = blocked`.
   - If tortoise reaches `config.end`, set `gameState = completed` and stop progression.
7. **Component Tests**: Verify game state transitions (idle → running → completed), movement state divergence, obstacle blocking, button integration, completed-state stop behavior, and imperative kernel API behavior.
8. **Visualization Integration Tests**: Confirm existing rendering, animation, and completion signal still work.
9. **Run full behavior tests** (`npm test`) and validate 100% test coverage maintained.

Rollback strategy:
- Remove kernel service and button UI; visualization remains a pure renderer.
- Host component reverts to passive config loading (existing behavior).

## Open Questions

- None for this phase.
