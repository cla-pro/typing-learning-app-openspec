## Why

The reward-games area currently has no playable game route or game-specific loading flow, so users cannot enter a reward game experience. We need a minimal but extensible base for the first game (tortoise path) now, while keeping game-kernel mechanics out of scope.

## What Changes

- Add reward-game URL navigation based on `/reward-games/<game-type>/:game-id`.
- Introduce game-type routing resolution so each game type maps to its own host component.
- Implement tortoise game host component resolution for `game-id`, loading game configuration from a dedicated service.
- Add back navigation from tortoise game host to the reward-games page by reusing and customizing the shared home-button behavior.
- Introduce tortoise game configuration data model and initial config entries.
- Introduce generic grid primitives (position and related grid elements as needed) independent from the tortoise game domain.
- Explicitly exclude gameplay kernel/rules execution from this change.

## Capabilities

### New Capabilities
- `reward-game-tortoise-base`: Base routing, host component, configuration service/data, and generic grid primitives for the tortoise reward game (without kernel logic).

### Modified Capabilities
- `page-navigation`: Extend routing requirements with reward-game typed dynamic route pattern and in-app back navigation from game host to reward-games page.
- `reward-games-page`: Update reward game entry behavior to allow navigation to implemented game routes from the reward-games page.

## Impact

- Affected code:
  - Angular route definitions and route parameter handling.
  - Reward-games page action wiring for game launch navigation.
  - Shared navigation button reuse/customization for game back action.
  - New tortoise reward-game host component.
  - New tortoise game configuration service and static configuration dataset.
  - New generic grid model classes/types reused by tortoise config.
- Affected tests:
  - Route integration tests for `/reward-games/<game-type>/:game-id`.
  - Reward-games page navigation behavior tests.
  - Tortoise host component tests for `game-id` resolution and config loading behavior.
  - Back-button navigation tests returning to reward-games page.
- APIs/dependencies:
  - No external dependency additions expected.
  - No backend/API changes expected.
