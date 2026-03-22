## Why

Settings are currently split across multiple pages, which creates extra navigation effort and inconsistent UX. A single dedicated Settings page is needed to make configuration discoverable, coherent, and easier to maintain.

## What Changes

- Add a dedicated Settings page with a centered title "Settings".
- Render settings as a labeled list, including:
  - `streamSize` (font size for expected-character stream)
  - keyboard layout
- Recycle the existing layout service into a unified settings service by renaming `KeyboardLayoutService` to `SettingsService` and extending it to manage both settings.
- Add a gear-icon button on the welcome page (top-right) that navigates to the Settings page.
- Remove setting controls from their current pages and centralize configuration interaction on Settings.
- Move local-storage interaction out of original locations and consolidate persistence through the new Settings flow.
- Preserve visual consistency by matching Settings page styling direction with the welcome page.

## Capabilities

### New Capabilities
- `settings-page`: Dedicated page for viewing and editing app settings as labeled list items, including stream size and keyboard layout.

### Modified Capabilities
- `welcome-page`: Add top-right gear action for navigating to Settings and remove in-page layout chooser behavior.
- `exercise-size-chooser`: Remove exercise-page stream-size control and shift user-facing adjustment flow to Settings.
- `keyboard-layout`: Rework layout management into a broader settings model by renaming `KeyboardLayoutService` to `SettingsService` and keeping layout behavior within that unified service.
- `page-navigation`: Add routing/navigation support for the Settings page entry point.

## Impact

- Affected UI/components: welcome page, exercise page, new settings page and styling.
- Affected services/state: rename `KeyboardLayoutService` to `SettingsService`; centralize keyboard-layout and stream-size ownership/flow and persistence in the unified service.
- Affected routing: new Settings route and navigation link from welcome page.
- Affected tests: requirements/component tests for welcome page, settings behavior, and routing; service tests where ownership of persistence changes.
