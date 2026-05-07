## Why

The current tortoise reward-game visualization is static, which means the game cannot progress without manual triggering from future kernel work. Introducing baseline movement now enables visible game progression and establishes the behavior contract for obstacle-gated flow.

## What Changes

- Add autonomous tortoise progression along the configured path so movement starts without user input when the next path cell is clear
- Add obstacle-aware movement gating so the tortoise stops before entering a cell occupied by an obstacle
- Define movement as stepwise progression to the next path cell with animation preserved from the visualization capability
- Keep movement logic limited to forward progression and blocking; obstacle clearing and typing-driven unblock behavior remain out of scope for this change

## Capabilities

### New Capabilities
- `reward-game-tortoise-movement`: Runtime movement behavior for tortoise progression along configured path, including automatic stepping and stop-on-obstacle gating

### Modified Capabilities
- `reward-game-tortoise-visualization`: Extend movement requirements from externally instructed motion to autonomous path progression behavior with explicit pause when the next path cell is blocked by an obstacle

## Impact

- Tortoise movement runtime/state logic added in the tortoise feature area (component-level orchestration until a full kernel exists)
- Tortoise visualization component integration updated to trigger and pause movement based on next-cell occupancy
- New/updated automated tests for autonomous movement start, continuous stepping, and obstacle blocking behavior
- No routing changes and no new external dependencies expected
