## Why

Exercises currently assume a single keyboard layout, which blocks users who type on other layouts from using the application effectively. Supporting multiple layouts is needed now so exercise discovery and progression are accessible to a broader set of learners.

## What Changes

- Add keyboard layout support to exercise-category configuration through a new keyboardLayouts field listing compatible layouts for each category.
- Require a keyboard layout parameter when retrieving categories from ExerciseConfigService so category results are filtered by the user's selected layout.
- Introduce a KeyboardLayoutService responsible for exposing supported layouts and the currently chosen layout, with initial supported layouts `fr-ch` and `de-ch`.
- Define `fr-ch` as the initial default chosen layout returned by KeyboardLayoutService and used by the welcome-page category-loading flow.
- Update welcome-page behavior to retrieve the chosen layout from KeyboardLayoutService and pass it to ExerciseConfigService when loading category navigation.
- Add or update behavior tests for layout-aware category filtering and welcome-page service integration.

## Capabilities

### New Capabilities
- keyboard-layout: Manage supported keyboard layouts, selected layout retrieval, and layout-aware category availability for exercise navigation, with initial supported layouts (`fr-ch`, `de-ch`) and default selected layout `fr-ch`.

### Modified Capabilities
- welcome-page: Exercise category navigation must be loaded using the user-selected keyboard layout so displayed categories match layout compatibility.

## Impact

- Affected areas: exercise configuration domain models, exercise configuration service contract, welcome-page service wiring, and related component/service tests.
- APIs/contracts: ExerciseConfigService category retrieval contract changes to require layout input; new KeyboardLayoutService public methods for supported and chosen layouts.
- Data/config: Category data definitions require keyboardLayouts metadata.
- Risk: Existing category-loading callers and tests must be updated to pass layout context consistently.
