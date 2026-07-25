## Why

On the reward-games screen, locked games currently show only a generic locked message, so players cannot see how many stars are still needed. Showing current progress versus required stars will make unlock goals clear and reduce confusion.

## What Changes

- Update locked reward-game tile messaging to display star progress as `<current won stars>/<required stars>`.
- Keep existing locked behavior (non-interactive, lock overlay) unchanged; only the locked status text content changes.
- Define that the displayed required star value comes from the game unlock criteria total-star threshold.
- Define that the displayed current value comes from the player's currently earned total stars.
- Add or update automated tests to verify the locked-state progress text format and values.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `reward-games-page`: Change locked-entry status text to show unlock progress as `<current won stars>/<required stars>` for each locked game tile.

## Impact

- Affected code:
  - Reward games page view model/template rendering for locked game status.
  - Reward game lock-state display tests.
- APIs: No external API changes.
- Dependencies: No new dependencies expected.
- Systems:
  - Uses existing unlock criteria and existing earned-star progress data as display inputs.
