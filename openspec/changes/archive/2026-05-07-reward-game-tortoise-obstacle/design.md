## Context

The tortoise game currently has a movement kernel with explicit game and movement states, but any obstacle on the next cell blocks progression indefinitely. There is no obstacle-typing runtime, no obstacle clear state, and no gameplay UI for entering or tracking obstacle sequences.

This change introduces obstacle clearing through ordered character typing so the game can continue after blocking points. It must reuse exercise typing fundamentals (case-sensitive key matching and keyboard-layout-sensitive behavior), keep the virtual keyboard hidden, and render a bottom character box styled like exercise character display. The box must always show the next obstacle on the path, even while the tortoise is currently moving.

Key constraints from current implementation:
- Kernel API is minimal and imperative (`initialize`, `start`, `getSnapshot`, `completeMovement`).
- Host drives visualization movement through snapshot polling and completion handoff.
- Tortoise path is expanded to cell-by-cell route for movement and blocking checks.
- Stream size preference already exists in `SettingsService` and is used by exercise UI.
- Current obstacle model contains a single `clearCharacters` array and must be extended to store per-layout sequences.

## Goals / Non-Goals

**Goals:**
- Add obstacle clear state and typed-sequence progress so blocked movement can resume.
- Extend obstacle model so each obstacle contains a character sequence for every supported keyboard layout.
- Allow clearing an obstacle before the tortoise reaches it; when reached later, movement must continue without stopping.
- Preserve existing movement contract and completion behavior (completed state stops progression with no extra action).
- Add a bottom obstacle-character box styled similarly to exercise stream display and driven by the same stream-size setting.
- Keep typing semantics aligned with exercises: exact, case-sensitive comparison of typed key values.
- Keep virtual keyboard hidden during tortoise gameplay.
- Keep kernel as source of truth for movement, obstacle state, and next-obstacle selection.

**Non-Goals:**
- Introducing pause/restart controls for tortoise gameplay.
- Introducing partial obstacle scoring or forgiving matching.
- Introducing keyboard-display rendering inside the tortoise game.
- Changing settings page controls beyond reuse of existing stream-size value.
- Altering obstacle configuration format beyond what is required for runtime clear progress.

## Decisions

### D1 - Extend kernel state with obstacle-clear progress and next-obstacle targeting

**Decision:** Expand `TortoiseGameKernelService` internal state to track:
- Cleared obstacles (by obstacle index or position key).
- Active typing progress for the currently targeted obstacle (typed index).
- Next obstacle on path (first uncleared obstacle encountered along remaining expanded route from current route index).

`getSnapshot()` is extended to expose obstacle gameplay state required by the host UI:
- `nextObstacle`: obstacle metadata for display (position + remaining/expected chars).
- `nextObstacleChars`: ordered expected character list.
- `typedObstacleChars`: currently matched prefix.
- `clearedObstacleKeys` (or equivalent) for visualization filtering.

**Rationale:** Kernel already owns movement truth; obstacle clear status directly affects blocking behavior and must remain in one source of truth.

**Alternatives considered:**
- Track obstacle typing state in host component: rejected because it would split movement and obstacle logic and create race risks.
- Track obstacle clear state in visualization: rejected because visualization must remain render-only.

### D1b - Extend obstacle model to layout-keyed character sequences

**Decision:** Change obstacle configuration from a single sequence field to a layout-keyed map, for example:
- from: `clearCharacters: string[]`
- to: `clearCharactersByLayout: Record<string, string[]>`

Each obstacle must provide a sequence for every supported layout ID from keyboard-layout configuration.

Layout coverage is strict: if any obstacle is missing a sequence for any supported layout, config validation fails and the game must not start.

At runtime, kernel selects expected sequence using the chosen layout (`SettingsService.getChosenLayout()`) and uses that sequence for:
- next-obstacle display
- typing validation
- clear completion

**Rationale:** Keyboard-layout-sensitive gameplay requires layout-specific expected characters; a single shared sequence cannot represent layout-dependent key outputs.

**Alternatives considered:**
- Keep one sequence and transform at runtime: rejected because character output semantics vary by layout and are not reliably derivable from one canonical sequence.
- Store only key codes and derive characters per layout: rejected for this phase due to higher complexity and mismatch with current `event.key`-based exercise semantics.

### D2 - Add imperative typing entrypoint while keeping minimal API style

**Decision:** Add one new imperative kernel method for key input (for example `typeObstacleChar(char: string)`), keeping API style minimal and explicit.

Behavior:
- If no next obstacle exists, ignore input.
- Resolve expected obstacle sequence from selected keyboard layout before validating input.
- If input matches next expected char exactly (case-sensitive), advance typed progress.
- If mismatch, ignore the input and keep current typed progress unchanged.
- When full sequence is matched, mark obstacle cleared, remove blocking effect, clear typed progress, recompute next obstacle.
- If game is running and movement is currently blocked by that obstacle, immediately re-evaluate movement so tortoise resumes.

**Rationale:** A dedicated imperative method keeps keyboard handling deterministic and testable while preserving the existing host→kernel command pattern.

**Alternatives considered:**
- Observable stream input API: rejected to keep API surface small and aligned with current kernel style.
- Buffer free-form input in host and submit full string: rejected because obstacle UI requires progressive character feedback.

### D3 - Blocking logic ignores cleared obstacles

**Decision:** Update kernel `isBlocked(nextCell)` to treat an obstacle as blocking only when:
- Obstacle position equals next cell, and
- Obstacle is not cleared.

If an obstacle is cleared before tortoise arrival, the tortoise moves through that cell normally when reached.

**Rationale:** This directly implements the requested pre-clear behavior and prevents stale blocking.

**Alternatives considered:**
- Require physical adjacency to clear: rejected; user requirement allows pre-clearing before arrival.

### D4 - Host keyboard capture mirrors exercise semantics without keyboard component

**Decision:** `TortoiseGameHostComponent` captures `keydown` during active game sessions and forwards non-modifier keys to kernel typing API using `event.key` exactly, mirroring exercise behavior.

Rules:
- Ignore modifier-only keys (`Shift`, `Control`, `Alt`, `AltGraph`, `Meta`, etc.).
- Use exact char comparison (case-sensitive) in kernel against the sequence for the currently selected keyboard layout.
- Do not render `KeyboardDisplayComponent` in tortoise game.

**Rationale:** Exercise currently defines strict key equality (`event.key === expectedChar`) and this change must behave the same.

**Alternatives considered:**
- Normalize to lowercase or locale transforms: rejected because it breaks case-sensitive parity with exercise.
- Render virtual keyboard for hints: rejected by requirement.

### D5 - Obstacle character box is a dedicated bottom panel with shared size scaling

**Decision:** Add a display box below the render area and above the start button, with exercise-like typography and spacing. The box shows:
- Full sequence for the next obstacle.
- Visual differentiation for matched prefix vs remaining characters.
- Character content only while `gameState === running`.
- No explicit status text.

The host computes a scale from `SettingsService.getStreamSizeValue()` using the same scale rule used by exercise stream, and applies it to obstacle-character display size.

The selected obstacle for display is always the next uncleared obstacle along the path, independent of current movement animation state.

**Rationale:** Keeps user attention on upcoming obstacle and ensures consistent typography behavior with exercise settings.

**Alternatives considered:**
- Display current blocking obstacle only: rejected because requirement demands next obstacle display even while moving.
- Put character box above render area: rejected because requirement specifies bottom-of-field placement and button pushed downward.

### D6 - Visualization filters obstacles by kernel-cleared state

**Decision:** Keep visualization render-only by accepting obstacle visibility input from host (filtered config or cleared-obstacle metadata). Cleared obstacles are not rendered.

**Rationale:** Visual disappearance of cleared obstacles must happen immediately, while progression logic remains in kernel.

**Alternatives considered:**
- Mutate source config to remove obstacles: rejected because config should remain stable and immutable during session.

## Risks / Trade-offs

- **[Input routing drift]** Tortoise host key handling could diverge from exercise semantics over time. -> **Mitigation:** share key filtering rules and add behavior tests for case-sensitive exact matching.
- **[State coupling growth]** Kernel snapshot may expand with UI-centric fields. -> **Mitigation:** expose only obstacle fields needed for rendering; keep derivations centralized.
- **[Race on unblock]** Clearing an obstacle while movement transitions could create duplicate scheduling. -> **Mitigation:** gate scheduling through existing movement state checks and keep one movement-completion handoff path.
- **[Display-selection ambiguity]** "Next obstacle" could be interpreted differently across path branches. -> **Mitigation:** define next obstacle strictly by first uncleared obstacle on remaining expanded route sequence.
- **[Config stability assumptions]** Runtime clear state might tempt mutation of config obstacles. -> **Mitigation:** store clear/progress runtime state separately from immutable config.

## Migration Plan

1. Extend kernel state model and snapshot contract to include obstacle-clear progress and next-obstacle data.
2. Extend tortoise obstacle model and config data to provide `clearCharactersByLayout` for all supported layouts.
3. Add kernel typing command and integrate layout-selected sequence validation + mismatch-ignore handling + clear transition.
4. Update blocking checks to ignore cleared obstacles and resume movement when a blocking obstacle gets cleared.
5. Update host keyboard handling to forward key input to kernel while preserving modifier filtering and case-sensitive behavior.
6. Add obstacle-character display box in host layout below game field; move start button downward.
7. Apply stream-size scaling from existing settings value to obstacle-character display.
8. Update visualization integration so cleared obstacles are hidden while path/tortoise rendering stays unchanged.
9. Add/adjust tests for layout-sequence selection, kernel sequence clearing, pre-clear pass-through behavior, resume-on-clear, host key handling, display selection, and keyboard-hidden constraints.
10. Run full behavior tests and verify no regression in exercise typing semantics.

Rollback strategy:
- Revert kernel obstacle typing additions and host obstacle box wiring.
- Restore prior permanent-block behavior and original host layout.
- Keep movement kernel baseline unchanged.

## Open Questions

- None for this phase.
