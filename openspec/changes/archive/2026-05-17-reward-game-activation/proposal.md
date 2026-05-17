## Why

The first reward game is now implemented, but the reward system cannot yet scale progression across multiple games. We need a structured unlocking model so an initial set of six reward game setups can be introduced now and additional setups can be added later while using the same star-based progression rules.

## What Changes

- Define an extensible reward game setup configuration used by the reward games page, populated first with six game setups.
- Add an unlock criteria structure on each game setup with:
  - `TotalNbStarsRequired` (minimum total stars collected across all exercises).
  - `NbStarsByCategoryRequired` (`Map<string, number>`) keyed by a stable category id for per-category star requirements.
- Define unlock evaluation rules where all configured criteria must match for a game to be unlocked.
- Evaluate category-based requirements against the currently selected keyboard layout.
- Add a stable category id to each exercise category definition so category-based unlock criteria can match consistently across layouts.
- Keep categories not listed in `NbStarsByCategoryRequired` as unconstrained for that game.
- Update reward game availability behavior so lock/unlock state is driven by achieved stars and criteria matching.

## Capabilities

### New Capabilities
- `reward-game-activation`: Defines an extensible reward game setup configuration and unlocking rules based on total stars plus optional per-category star requirements.

### Modified Capabilities
- `reward-games-page`: Change reward game lock/unlock behavior to use unlock criteria evaluation from configured star thresholds.
- `exercise-progress`: Extend progress/star read capabilities so total stars and category-level stars needed by unlock rules can be evaluated.
- `typing-scenarios`: Extend exercise category definitions with a stable cross-layout category id used by reward-game unlock criteria.

## Impact

- Affected code:
  - Reward games setup data/model definitions.
  - Reward games list/selection logic and lock-state rendering.
  - Exercise progress aggregation logic for total stars and stars by category.
  - Exercise category model and typing-scenario data definitions to include a stable category id across layouts.
  - Setup configuration structure designed to support additional reward games in future updates.
- APIs: No external API changes; behavior is internal to the Angular app.
- Dependencies: No new runtime dependencies expected.
- Systems:
  - localStorage-backed exercise star data remains the source for unlock calculations.