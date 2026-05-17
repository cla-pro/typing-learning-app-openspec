## Context

The application already has three relevant building blocks:

- `RewardGamesComponent` renders a static reward-games list with a mix of launchable and locked entries.
- `RewardGamesConfigService` currently resolves tortoise game configurations from `TORTOISE_GAME_CONFIGS`.
- `ExerciseProgressService` already stores per-exercise star counts in `localStorage` and can aggregate total stars across all exercises.

This change adds a real reward-game unlocking system. The immediate goal is to introduce an initial set of six reward game setups, but the configuration model must remain extensible so more setups can be added later without changing the unlock algorithm.

There is one important data constraint: star progress is stored per exercise id, while unlock requirements can refer to specific exercise categories. Category membership is currently defined by `ExerciseConfigService` through ordered `ExerciseCategory[]` data sourced from typing-scenario modules, but categories currently have only display names and no layout-independent identifier. The design therefore needs a reliable way to derive category star totals from existing exercise and category data without introducing a second competing source of truth or relying on unstable localized/display labels.

Stakeholders:
- Product/UX for progression pacing and visibility of unlock status.
- Engineering for extensible game setup configuration and maintainable aggregation logic.
- QA for deterministic unlock evaluation and regression coverage across locked/unlocked states.

## Goals / Non-Goals

**Goals:**
- Define an extensible reward game setup model that supports an initial six setups and future additions.
- Represent unlock criteria with `TotalNbStarsRequired` plus optional `NbStarsByCategoryRequired` per setup.
- Ensure a reward game unlocks only when all configured criteria match.
- Evaluate category-based unlock criteria against the currently selected keyboard layout.
- Introduce a stable category id that is shared across keyboard layouts for logically equivalent categories.
- Keep reward-game page rendering driven by shared configuration rather than hardcoded card state in the component.
- Add a deterministic service-level API for evaluating total stars and category-specific stars from existing exercise progress data.

**Non-Goals:**
- Changing how stars are earned for a completed exercise.
- Introducing backend persistence or user accounts.
- Designing a dynamic authoring UI for reward game setups.
- Changing reward-game completion storage or crown-marker behavior.
- Implementing reward games beyond the setup and unlockability needed for this step.

## Decisions

### Decision: Introduce a shared reward-game setup model with embedded unlock criteria

Reward game entries should move from ad hoc component-local data to a shared configuration model owned by the reward-game configuration layer. Each setup should include:

- identity and display metadata (`id`, translation key, icon, game type)
- route/implementation availability metadata
- an `unlockCriteria` object containing:
  - `TotalNbStarsRequired: number`
  - `NbStarsByCategoryRequired: Map<string, number>` keyed by stable category id

The configuration will initially contain six setups, but the model is intentionally open-ended so future setups can be added by appending more configuration entries.

Rationale: This keeps unlock rules next to reward-game definitions, prevents the component from embedding product logic, and allows future game additions without changing unlock evaluation code.

Alternative considered: Keep the current component-local reward game array and add `locked` booleans manually. Rejected because it would hardcode current state, make six-plus future setups harder to maintain, and disconnect unlock behavior from the shared configuration layer already used for tortoise games.

### Decision: Keep unlock evaluation in a dedicated service layer, not in the component

Unlock calculation should live in a dedicated service such as `RewardGameUnlockService` or as a clearly separated extension of the reward-games configuration layer, rather than inside `RewardGamesComponent`. The service should accept a reward game setup and answer whether it is unlocked based on current exercise progress.

Recommended public behavior:
- read total earned stars
- read earned stars for stable category ids under the currently selected keyboard layout
- evaluate all unlock criteria with logical AND semantics
- treat an empty or omitted `NbStarsByCategoryRequired` collection as "no category-specific constraint"

Rationale: Unlock evaluation is domain logic, not presentation logic. A service boundary keeps tests focused and allows the same rule engine to be reused anywhere unlock state may later be displayed.

Alternative considered: Compute `locked` directly while constructing `rewardGames` inside `RewardGamesComponent`. Rejected because it couples storage/progress logic to UI assembly, makes testing more brittle, and increases the risk of duplicated unlock logic if other views later need the same state.

### Decision: Add a stable `id` to `ExerciseCategory` and key unlock rules by that id

`ExerciseCategory` should be extended with a stable `id: string` that is shared by logically equivalent categories across keyboard layouts. For example, a category such as Middle Line should keep the same id in `fr-ch`, `de-ch`, and other layouts even if the display name changes later.

`NbStarsByCategoryRequired` should use this stable category id as its map key rather than the category display name.

Rationale: Category display names are not a safe contract for unlock logic. A stable id avoids matching errors, survives display-name changes, and makes cross-layout configuration explicit.

Alternative considered: Keep using `category.name` strings in unlock criteria. Rejected because category renames, localization, or small wording differences across layouts would make unlock criteria brittle and hard to validate.

### Decision: Derive category star totals from `ExerciseConfigService` category data for the currently selected keyboard layout

Category totals should be derived by walking the ordered category data already owned by `ExerciseConfigService`, summing `ExerciseProgressService.getStars(exercise.id)` for each exercise in each category of the currently selected keyboard layout. This requires adding a new aggregation-oriented API to `ExerciseProgressService`, with `ExerciseConfigService` and `SettingsService` injected so category membership comes from the existing source of truth and evaluation follows the active layout.

Recommended additions:
- `getStarsByCategory(): Map<string, number>` returning summed earned stars per stable category id for the selected layout
- optionally `getStarsForCategory(categoryId: string): number` as a convenience wrapper over the map

This aggregation should use `listExerciseCategories(selectedLayout)` and only categories visible for that selected layout. Equivalent categories across layouts are linked by the new stable category id, but unlock evaluation itself is still based on the currently selected keyboard layout as requested.

Rationale: Exercise progress is stored per exercise id, but category membership is defined elsewhere. Reusing `ExerciseConfigService` avoids duplicating category mappings in progress storage or reward-game setup definitions, while the stable category id makes the reward-game configuration robust.

Alternative considered: Persist category star totals separately in `localStorage` at completion time. Rejected because it introduces redundant derived state that can drift from per-exercise stars, complicates migration, and adds update logic whenever category structures change.

### Decision: Reward-games page should render from enriched setup view models

`RewardGamesComponent` should stop hardcoding `locked` values and instead request a list of configured reward games enriched with:

- availability of a playable route
- unlock state from the unlock-evaluation service
- completion state from `RewardGameCompletionService`
- resolved route path only when the setup is both implemented and unlocked

The component should continue to present unimplemented games as locked/non-interactive, even if their unlock criteria are met, because implementation availability and progression unlock are separate concerns.

Rationale: The page needs to distinguish at least three states cleanly: implemented+unlocked, implemented+locked, and unimplemented. Building a stable view model before rendering keeps the template simple and predictable.

Alternative considered: Reuse only the old `routePath` presence check as the lock signal. Rejected because unlockability and route availability are now independent dimensions.

### Decision: Use conjunctive matching for unlock criteria and ignore unspecified categories

Unlock evaluation should follow a strict all-criteria-must-match rule:

1. total stars must be greater than or equal to `TotalNbStarsRequired`
2. for each entry in `NbStarsByCategoryRequired`, the earned stars for that category must be greater than or equal to the required value
3. categories not present in the map impose no constraint

Rationale: This matches the requested product rule exactly and keeps the setup model easy to reason about.

Alternative considered: Unlock when any single criterion matches. Rejected because it would contradict the requested progression rule and make category thresholds largely optional.

## Risks / Trade-offs

- [Category id drift across layouts] Equivalent categories could accidentally receive different ids in different layout files. → Mitigation: add requirements tests that assert expected stable ids across supported layouts for shared category concepts.
- [Layout-dependent aggregation surprises] A user may earn stars in exercises from another layout that do not contribute to the currently selected layout's category requirements. → Mitigation: document this rule explicitly and add tests around selected-layout evaluation.
- [Configuration growth] More reward games will increase the amount of static setup metadata. → Mitigation: keep configuration in dedicated data modules and separate game-specific config from cross-game unlock metadata.
- [Derived-state complexity] Unlock state depends on progress data, setup data, route availability, and completion state. → Mitigation: compose these through focused services and expose a single enriched view model to the component.

## Migration Plan

1. Introduce shared reward game setup and unlock-criteria model types, plus initial configuration entries for six setups.
2. Extend the reward-game configuration layer so it can expose setup metadata beyond tortoise-only config lookup.
3. Add stable category ids to the exercise category model and update typing-scenario data across layouts to use matching ids for equivalent categories.
4. Add category-star aggregation and unlock-evaluation APIs, reusing `ExerciseConfigService` as the category source of truth for the currently selected layout.
5. Refactor `RewardGamesComponent` to render from enriched setup data rather than hardcoded `locked` flags.
6. Update requirements tests to cover stable category ids, implemented/unimplemented games, locked/unlocked states, and current-layout criteria evaluation behavior.

## Open Questions

None.