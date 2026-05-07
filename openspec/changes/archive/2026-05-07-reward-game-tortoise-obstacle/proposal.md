## Why

With movement now implemented, tortoise progression can stop permanently on blocked cells. Introducing obstacle-clearing by typed character sequences is needed so the game remains playable and progression can resume after the player solves each obstacle.

## What Changes

- Extend obstacle configuration model so each obstacle defines an ordered character sequence per supported keyboard layout.
- Add obstacle-clearing gameplay where the active ordered character sequence is selected from the current keyboard layout and must be typed exactly to clear the obstacle.
- Add runtime typing validation for obstacle input using the same typing fundamentals as exercises: case-sensitive and keyboard-layout-sensitive matching.
- Remove cleared obstacles from the rendered path so blocked movement can resume immediately through the kernel progression flow.
- Ensure that if an obstacle is cleared before the tortoise reaches its cell, the tortoise continues along the path without stopping at that former obstacle position.
- Add an obstacle-character display box at the bottom of the game field (pushing the start button downward), styled similarly to exercise character display.
- Keep the obstacle-character box focused on the next obstacle along the path at all times, including while the tortoise is currently moving.
- Reuse existing stream/font-size setting to control obstacle-character display size in the tortoise game.
- Explicitly keep virtual keyboard hidden on tortoise game pages.

## Capabilities

### New Capabilities
- `reward-game-tortoise-obstacle`: Obstacle-clearing logic and UI for ordered character-sequence input, obstacle removal, and movement resume behavior.

### Modified Capabilities
- `reward-game-tortoise-movement`: Movement behavior changes from permanent obstacle blocking to resumable progression when the blocking obstacle is cleared.
- `reward-game-tortoise-visualization`: Obstacle rendering behavior changes to remove cleared obstacles and support obstacle-character box placement/layout under the game field.
- `settings-page`: Stream-size setting applicability is extended so the same setting controls tortoise obstacle-character display size.

## Impact

- Affected code in tortoise game kernel/service state for obstacle typing progress, obstacle cleared state, and movement unblocking/resume.
- Affected tortoise obstacle model/data to support per-layout character sequences for all supported layouts.
- Affected tortoise host UI for obstacle-character display box, start-button vertical placement shift, and keyboard-hidden gameplay layout.
- Affected visualization integration so obstacle disks disappear when cleared and movement can continue through previously blocked cells.
- Affected settings consumption to apply existing stream-size preference to the obstacle-character display.
- New/updated automated tests for typing sequence validation (case/layout sensitivity), obstacle removal, resume behavior, display-box behavior, and no-virtual-keyboard constraints.
