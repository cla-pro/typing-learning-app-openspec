## 1. Data Model and Configuration

- [x] 1.1 Add required `keyboardLayouts: string[]` field to the exercise-category model/type definitions.
- [x] 1.2 Update all category configuration sources and test fixtures to include `keyboardLayouts` values.
- [x] 1.3 Ensure category compatibility metadata includes support for initial layouts `fr-ch` and `de-ch` where applicable.

## 2. Keyboard Layout Service

- [x] 2.1 Create `KeyboardLayoutService` with a method returning supported layouts.
- [x] 2.2 Implement supported-layouts default output as exactly `fr-ch` and `de-ch`.
- [x] 2.3 Create method returning chosen layout with initial default `fr-ch`.
- [x] 2.4 Add service behavior tests for supported layouts and chosen layout defaults.

## 3. Exercise Config Service Filtering

- [x] 3.1 Change ExerciseConfigService category retrieval signature to require a keyboard layout parameter.
- [x] 3.2 Implement category filtering so only categories containing the requested layout in `keyboardLayouts` are returned.
- [x] 3.3 Update all internal callers and related tests to pass the required layout parameter.
- [x] 3.4 Add behavior tests verifying matching categories are included and non-matching categories are excluded.

## 4. Welcome Page Integration

- [x] 4.1 Inject/use `KeyboardLayoutService` in the welcome-page data-loading flow.
- [x] 4.2 Retrieve the chosen layout from `KeyboardLayoutService` before loading categories.
- [x] 4.3 Pass chosen layout to ExerciseConfigService when requesting category navigation data.
- [x] 4.4 Update welcome-page integration tests to verify chosen-layout propagation to ExerciseConfigService.

## 5. Verification and Regression Safety

- [x] 5.1 Run requirements and unit tests for keyboard-layout and welcome-page service integration behavior.
- [x] 5.2 Verify existing category/exercise ordering behavior remains unchanged after layout filtering.
- [x] 5.3 Perform final change validation and ensure all checks pass before implementation handoff.
