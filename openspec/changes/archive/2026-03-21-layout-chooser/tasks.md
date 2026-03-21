## 1. Keyboard Layout Service Persistence

- [x] 1.1 Extend `KeyboardLayoutService` to restore the chosen layout from local storage key `layout.selected`.
- [x] 1.2 Validate restored values against supported layouts and fall back to `fr-ch` for invalid stored values.
- [x] 1.3 Add a method to update the chosen layout and persist supported selections back to local storage.
- [x] 1.4 Keep unsupported layout updates from changing the chosen layout.

## 2. Welcome Page Layout Chooser UI

- [x] 2.1 Add a chooser control to the welcome page that lists all supported layouts from `KeyboardLayoutService`.
- [x] 2.2 Initialize the chooser selection from the current chosen layout.
- [x] 2.3 Update welcome-page component state to expose supported layouts and selected layout for rendering.

## 3. Layout Change Behavior

- [x] 3.1 Handle chooser change events in the welcome page.
- [x] 3.2 Notify `KeyboardLayoutService` when the user selects a new supported layout.
- [x] 3.3 Reload categories from `ExerciseConfigService` using the newly selected layout.
- [x] 3.4 Preserve existing category ordering, grouping, and progress decoration after reload.

## 4. Behavior Tests

- [x] 4.1 Add service requirements tests for persisted selection restore and invalid-value fallback.
- [x] 4.2 Add service requirements tests for chosen-layout update and local storage persistence.
- [x] 4.3 Update welcome-page requirements tests to verify chooser rendering from supported layouts.
- [x] 4.4 Update welcome-page requirements tests to verify chooser initialization from current layout.
- [x] 4.5 Update welcome-page requirements tests to verify layout change updates the service and reloads categories.

## 5. Verification

- [x] 5.1 Run requirements/unit tests and confirm they pass.
- [x] 5.2 Verify welcome-page category reload behavior remains correct after layout changes.
- [x] 5.3 Perform final change validation and ensure persisted selection uses `layout.selected` as the single storage key.
