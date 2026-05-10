## Why

The tortoise reward game currently ends without recording completion or reflecting success in the reward-games overview. Adding explicit completion persistence and a visible completed marker is needed so players can see their achievement after finishing a game.

## What Changes

- Persist reward-game completion when the tortoise game reaches the completed state.
- Define the completion storage contract as localStorage key `reward-game-<gameId>-completion` with boolean `true` represented as the stored value.
- Update reward-games overview tile rendering to show a crown marker on a game tile when that game is marked completed.
- Ensure completion visualization is evaluated from persisted completion state so the crown remains visible after reload.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `reward-game-tortoise-movement`: extend end-of-game behavior to persist completion for the finished `gameId`.
- `reward-games-page`: extend reward-game tile state rendering to display a crown for completed games using persisted completion state.

## Impact

- Affected code: tortoise game host/kernel completion flow, reward games page tile rendering, and reward-games data/view-model mapping.
- Storage: browser localStorage read/write for reward-game completion keys (`reward-game-<gameId>-completion`).
- Tests: add/extend automated tests for completion persistence and crown tile rendering from persisted completion state.
