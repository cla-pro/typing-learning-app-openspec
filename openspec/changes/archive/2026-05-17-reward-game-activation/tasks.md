## 1. Category identity groundwork

- [x] 1.1 Add a stable `id` field to the shared `ExerciseCategory` model
- [x] 1.2 Update all layout-specific typing-scenario category definitions to provide matching stable ids for equivalent categories across layouts
- [x] 1.3 Add or update typing-scenarios requirements tests to verify category ids are present, unique per layout, and stable across supported layouts

## 2. Reward game setup configuration

- [x] 2.1 Define shared reward game setup and unlock-criteria model types including `TotalNbStarsRequired` and `NbStarsByCategoryRequired`
- [x] 2.2 Move reward game card definitions out of `RewardGamesComponent` into shared configuration populated with six initial reward game setups
- [x] 2.3 Extend the reward-game configuration layer to expose reward game setups and implemented route metadata needed by the page and host components

## 3. Progress aggregation and unlock evaluation

- [x] 3.1 Extend `ExerciseProgressService` with public APIs for total-star and stable-category-id star aggregation used by reward game unlocking
- [x] 3.2 Use the currently selected keyboard layout when aggregating category stars from `ExerciseConfigService`
- [x] 3.3 Implement a dedicated reward game unlock evaluation service or equivalent configuration-layer logic that applies all configured criteria with AND semantics
- [x] 3.4 Add or update focused service tests covering total-star aggregation, selected-layout category aggregation, unknown category ids, and unlocked versus locked outcomes

## 4. Reward games page integration

- [x] 4.1 Refactor `RewardGamesComponent` to render from enriched reward game setup view models instead of hardcoded `locked` values
- [x] 4.2 Keep unimplemented games non-interactive and add unlock-gated locked presentation for implemented but not-yet-unlocked games
- [x] 4.3 Allow navigation only for implemented reward games whose unlock criteria are satisfied
- [x] 4.4 Preserve completion crown rendering for completed reward games after the page refactor

## 5. Behavior test updates

- [x] 5.1 Update reward-games page requirements tests to cover implemented-but-locked, implemented-and-unlocked, and unimplemented reward game entries
- [x] 5.2 Add or update reward game activation tests to verify current-layout category matching via stable category ids
- [x] 5.3 Run the relevant test suite and Angular build to verify the reward-game-activation change end to end