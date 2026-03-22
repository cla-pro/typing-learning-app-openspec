## 1. Service Refactor And Settings Ownership

- [x] 1.1 Rename `KeyboardLayoutService` to `SettingsService` and update all imports/usages.
- [x] 1.2 Add stream-size state APIs to `SettingsService` (read, validate, write) while preserving existing storage key names.
- [x] 1.3 Keep layout APIs in `SettingsService` with current validation/default semantics and `layout.selected` persistence.
- [x] 1.4 Remove direct local-storage access from components and route all settings persistence through `SettingsService`.

## 2. Settings Page UI And Routing

- [x] 2.1 Add Settings route to Angular routing configuration.
- [x] 2.2 Create Settings page component with centered "Settings" title.
- [x] 2.3 Render settings as labeled list items with controls for keyboard layout and stream size.
- [x] 2.4 Apply styling aligned with welcome-page visual direction.

## 3. Welcome And Exercise Page Integration

- [x] 3.1 Add top-right gear-icon-only button on welcome page that navigates to Settings.
- [x] 3.2 Remove welcome-page layout chooser UI and related change handling.
- [x] 3.3 Update welcome-page category loading to use chosen layout from `SettingsService`.
- [x] 3.4 Remove exercise-page stream-size chooser UI.
- [x] 3.5 Ensure stream-size changes apply when opening the next exercise page.

## 4. Tests And Verification

- [x] 4.1 Update service requirements tests for the renamed `SettingsService` and unified settings behavior.
- [x] 4.2 Update welcome component requirements tests for gear-button rendering/navigation and chooser removal.
- [x] 4.3 Update exercise component requirements tests for stream-size control removal and next-exercise application behavior.
- [x] 4.4 Update routing tests to include Settings route behavior.
- [x] 4.5 Run `npm test` and resolve regressions.
- [x] 4.6 Run `npm run build:angular` to verify production build integrity.
