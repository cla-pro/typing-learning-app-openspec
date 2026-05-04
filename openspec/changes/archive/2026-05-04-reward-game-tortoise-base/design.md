## Context

The application already has a reward-games page and shared client-side routing, but no route contract for opening a concrete reward game instance. This change introduces the first playable entry point (tortoise game) as a host/configuration layer only.

Constraints and current state:
- Existing Angular Router setup already handles welcome, exercises, settings, and reward-games navigation.
- Reward game entries currently render as locked/static, with no game host route.
- The reusable home button exists and currently targets root navigation.
- This change must not include game kernel behavior (movement, collision, progression rules).
- Grid coordinates in configuration are domain-independent and must not be tied to pixel coordinates.

Stakeholders:
- Product/UX for reward-game access flow and return navigation.
- Engineering for extensible reward-game type routing and reusable models.
- QA for deterministic config loading and route behavior.

## Goals / Non-Goals

**Goals:**
- Add typed reward-game route support using `/reward-games/<game-type>/:game-id`.
- Route by `game-type` to a game-specific host component.
- Implement tortoise host component that resolves `game-id` and loads config from a dedicated service.
- Provide a back control on the game host that reuses/customizes the shared home-button component to navigate to reward-games.
- Define generic grid primitives reusable outside tortoise domain.
- Introduce initial tortoise configuration schema/data: game-id, start/end positions, orthogonal waypoints path, and obstacles with clearing character lists.

**Non-Goals:**
- Implementing tortoise game kernel or runtime mechanics.
- Introducing backend APIs or persistence for game configuration.
- Solving reward unlock progression logic beyond route enablement required to open the game.

## Decisions

1. Route contract and resolution
- Decision: Add route pattern `/reward-games/:gameType/:gameId` and resolve `gameType` by mapping to dedicated host components.
- Rationale: Keeps URL aligned with requested format while preserving Angular-friendly parameterized routing and clean component boundaries by game type.
- Alternative considered: Single generic reward-game component with internal switch on `gameType`.
- Why not chosen: Encourages a monolithic component and weakens type-specific ownership as new games are added.

2. Tortoise host as composition layer
- Decision: Create a tortoise-specific host component responsible only for route param extraction, config loading, and shell rendering state.
- Rationale: Separates bootstrap concerns from kernel/runtime logic and supports future independent kernel integration.
- Alternative considered: Load config directly in reward-games page before navigation.
- Why not chosen: Couples list page to game internals and complicates deep-link handling.

3. Shared reward-games config service
- Decision: Add a single `RewardGamesConfigService` that resolves any game's config by `gameType` + `gameId` from static in-app definitions and returns a typed object.
- Rationale: Centralises config lookup and validation across all current and future game types; avoids a proliferation of per-game services for what is fundamentally a shared data access layer.
- Alternative considered: A dedicated config service per game type (e.g. tortoise-specific service).
- Why not chosen: Creates unnecessary per-game overhead; config loading strategy (static, remote, generated) should evolve in one place.

4. Generic grid model primitives
- Decision: Introduce domain-neutral grid types/classes (for example position and path/obstacle coordinate carriers) in shared models, then compose tortoise-specific config types from them.
- Rationale: Ensures grid abstractions are reusable across future games and not semantically bound to tortoise.
- Alternative considered: Tortoise-prefixed coordinate classes.
- Why not chosen: Violates reuse requirement and causes avoidable duplication.

5. Path and obstacle constraints at configuration boundary
- Decision: Enforce configuration invariants at load/definition time:
  - Waypoint segments are only horizontal or vertical.
  - Start/end/waypoint/obstacle coordinates are grid positions.
  - Obstacle clear conditions are a non-empty character list.
- Rationale: Prevents invalid scenario definitions from entering future kernel logic and makes test behavior deterministic.
- Alternative considered: Defer all validation to future kernel.
- Why not chosen: Pushes basic data-quality issues too late and blurs ownership.

6. Back navigation via reusable home-button customization
- Decision: Reuse shared home-button component with configurable destination target for this context (reward-games route).
- Rationale: Preserves visual/interaction consistency and avoids duplicate button components.
- Alternative considered: Add a bespoke back button in tortoise host.
- Why not chosen: Creates UI duplication and divergent behavior risk.

## Risks / Trade-offs

- [Risk] Route complexity increases as more game types are added.
  - Mitigation: Keep an explicit game-type-to-component map and cover unknown types with deterministic fallback behavior/tests.

- [Risk] Config validation rules may be too strict or too lax for future kernels.
  - Mitigation: Start with structural invariants only; keep validation composable so kernel-specific rules can be layered later.

- [Risk] Reusing home-button with custom destination may impact existing usages.
  - Mitigation: Keep default destination unchanged (root) and add tests for both default and customized targets.

- [Trade-off] Static in-app config is simple but not dynamic.
  - Mitigation: Service boundary isolates storage/source choice so migration to external data is non-breaking.

## Migration Plan

1. Add route entries for typed reward game URLs and host component mapping.
2. Add/extend shared navigation button API to support destination override while preserving current default behavior.
3. Implement tortoise host component with route param extraction and dedicated config service integration.
4. Introduce generic grid model primitives and tortoise config types/data.
5. Update reward-games page action wiring to navigate to the tortoise route for implemented game entries.
6. Add/update tests for route handling, host config loading, and back navigation.

Rollback strategy:
- Revert the new route entries and reward-games page launch wiring.
- Keep shared button API backward-compatible so rollback can be limited to tortoise/reward-game route additions.

## Open Questions

_All initial open questions have been resolved:_

- **Unknown `gameType`**: Redirect to the existing not-found state (reuse exercise-not-found UX).
- **Unknown `gameId`** (for a valid `gameType`): Also redirect to the existing exercise-not-found UX.
- **Obstacle clear-character matching**: Follows the same rules as the standard typing app input matching logic (no special-casing at the config level).
