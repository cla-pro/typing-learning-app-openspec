## Why

The current keyboard layout is effectively fixed for the user, which makes multi-layout support incomplete in practice. Users need a way to choose their layout on the welcome page and keep that choice across sessions so category navigation stays aligned with their keyboard setup.

## What Changes

- Add a layout chooser control on the welcome page that lists all supported layouts returned by `KeyboardLayoutService`.
- Initialize the chooser with the currently selected layout from `KeyboardLayoutService`.
- Update the selected layout through `KeyboardLayoutService` when the user changes the chooser value.
- Reload welcome-page exercise categories after layout changes so navigation reflects the new selection.
- Persist the selected layout in local storage under the key `layout.selected` so the chosen layout survives browser sessions.
- Add or update behavior tests covering layout chooser rendering, selection changes, category reload, and persisted selection behavior.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- keyboard-layout: The keyboard layout service must support updating and persisting the chosen layout, while continuing to expose supported layouts and the active selection.
- welcome-page: The welcome page must render a layout chooser, initialize it from the chosen layout, react to user selection changes, and reload categories for the new layout.

## Impact

- Affected code: `KeyboardLayoutService`, welcome component/template, and related service/component tests.
- Browser storage: selected layout is stored in local storage using `layout.selected`.
- Risk: layout changes could desynchronize chooser state and displayed categories unless the page reload path is updated atomically.
