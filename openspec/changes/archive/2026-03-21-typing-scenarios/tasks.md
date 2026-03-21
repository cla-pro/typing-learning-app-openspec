## 1. Data Module Structure

- [x] 1.1 Create `src/app/data/` structure for typing-scenario sources.
- [x] 1.2 Define per-layout scenario modules (at minimum for `fr-ch`) exporting typed category data.
- [x] 1.3 Add a composition/export module that exposes the scenario data set consumed by application services.

## 2. Scenario Data Extraction

- [x] 2.1 Move hardcoded exercise categories/exercises out of `ExerciseConfigService` into the new per-layout data modules.
- [x] 2.2 Preserve existing category order and exercise order during extraction.
- [x] 2.3 Preserve explicit `keyboardLayouts` metadata in extracted category definitions.

## 3. Service Integration

- [x] 3.1 Update `ExerciseConfigService` to import scenario data from `src/app/data` instead of local hardcoded arrays.
- [x] 3.2 Keep `listExerciseCategories(layout)` behavior unchanged for filtering and expectedChars validation.
- [x] 3.3 Keep `getExerciseById` lookup behavior unchanged after data extraction.

## 4. Behavior Tests

- [x] 4.1 Update service requirements tests to continue validating ordering through public APIs after extraction.
- [x] 4.2 Add or update tests confirming layout-filtered category listing still matches behavior requirements.
- [x] 4.3 Add or update tests confirming `getExerciseById` success and not-found behavior remain unchanged.

## 5. Verification

- [x] 5.1 Run requirements/unit tests and confirm they pass after extraction.
- [x] 5.2 Verify no regression in welcome-page category rendering order and grouping.
- [x] 5.3 Perform final change validation and ensure extracted data is the single source of truth.
