## Why

The tortoise reward game has routing and a data model but nothing to display yet. The first visualization step establishes the layered rendering canvas, the grid coordinate system, and the animated tortoise movement so that subsequent kernel integration has a stable visual foundation to build on.

## What Changes

- Add a tortoise visualization component that the host component renders when a valid configuration is loaded
- Render the game world on separate layers: path layer (waypoints), object layer (tortoise + obstacles), debug grid layer
- All game objects (path waypoints, tortoise, obstacles) are positioned centered inside their grid cell
- The tortoise moves with a smooth pixel-level animation between consecutive grid positions; during movement its screen position is decoupled from any discrete grid coordinate
- A debug grid overlay draws the grid lines and labels each cell with its (x, y) coordinate; toggled independently from game objects

## Capabilities

### New Capabilities
- `reward-game-tortoise-visualization`: Layered canvas rendering of the tortoise game world — path, tortoise, obstacles, and optional debug grid — with smooth animated tortoise movement between grid cells

### Modified Capabilities
- `reward-game-tortoise-base`: The tortoise host component now renders the visualization component when a valid configuration is loaded (previously the rendered content for the valid-config state was unspecified)

## Impact

- New Angular component under the tortoise game feature area
- Tortoise host component template extended to embed the visualization component
- No new dependencies expected; rendering uses Angular/DOM primitives
- No changes to routing, configuration model, or `RewardGamesConfigService`
