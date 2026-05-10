## Context

The tortoise reward game now has start, movement, obstacle clearing, and completed runtime states, but completion currently has no persistence side effect and no visible representation on the reward-games overview page. The change spans gameplay flow (where completion is detected) and overview rendering (where tile state is shown), so a small cross-module design is needed.

Constraints:
- Completion state must be stored in browser localStorage.
- Storage key contract must be `reward-game-<gameId>-completion`.
- Stored completion value must represent `true`.
- Crown marker must be shown on the matching reward-game tile in the overview list.

## Goals / Non-Goals

**Goals:**
- Persist completion exactly when a tortoise game reaches completed state.
- Centralize key construction so read/write paths use the same naming contract.
- Reflect persisted completion in reward-games overview tile rendering, including after page reload.
- Keep behavior additive without changing existing lock/launch routing behavior.

**Non-Goals:**
- No backend sync or user-account-based persistence.
- No generalized achievements framework for all game types.
- No migration of old localStorage formats beyond tolerant read behavior.

## Decisions

1. Introduce a dedicated completion persistence service for reward games.
- Decision: Add a focused service (for example, reward-game-completion storage service) with methods to compute key by `gameId`, set completion, and read completion.
- Rationale: Avoid duplicating key-string logic across host and overview components, reduce typo risk, and improve testability.
- Alternative considered: Inline localStorage access directly in host and overview components. Rejected because it scatters storage contract details and makes consistent behavior harder to enforce.

2. Trigger completion persistence from host-level completion transition observation.
- Decision: When tortoise game runtime transitions to completed, host flow persists completion once for the active `gameId`.
- Rationale: Host has both runtime state visibility and route `gameId` context; kernel can remain focused on game mechanics.
- Alternative considered: Persist directly inside kernel service. Rejected because kernel currently does not own routing identity and would become coupled to storage concerns.

3. Use string value `true` in localStorage and parse by strict equality.
- Decision: Write `true` as a string and treat completion as present only when stored value equals `true`.
- Rationale: localStorage is string-based and this keeps semantics explicit while matching proposal language.
- Alternative considered: Use JSON payload (`{"completed":true}`) or timestamp. Rejected as unnecessary complexity for current requirement.

4. Extend reward-games overview view-model with completion flag and crown presentation state.
- Decision: During overview item preparation, read completion for each `gameId` and map to a boolean `isCompleted` used by template to show crown overlay/icon.
- Rationale: Preserves current static game definition while adding a single derived visual state.
- Alternative considered: Compute completion directly in template via function calls. Rejected to avoid repeated storage reads during change detection.

5. Preserve existing locked-state behavior and define coexistence with completion marker.
- Decision: Crown is additive visual state for completed games and does not change route availability or lock semantics.
- Rationale: Requirement asks only for completion indication, not unlocking behavior.
- Alternative considered: Treat completion as implicit unlock. Rejected as out of scope and potentially conflicting with existing progression rules.

## Risks / Trade-offs

- [Storage unavailable or blocked in environment] -> Mitigation: Wrap read/write in safe guards and fail gracefully (no crash; crown simply not shown/persisted).
- [Duplicate writes from repeated completed-state observations] -> Mitigation: Idempotent write (`setItem` to same key/value), optionally short-circuit if already marked.
- [UI ambiguity between lock and crown overlays] -> Mitigation: define explicit template layering/CSS precedence and add UI test assertion for crown visibility condition.
- [Contract drift in key naming across files] -> Mitigation: single key-builder function in persistence service and tests asserting exact key format.
