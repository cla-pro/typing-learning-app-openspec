## Context

The application already supports multiple keyboard layouts at the service and filtering level, but the selected layout is effectively fixed from the user's perspective. The welcome page currently reads the chosen layout from `KeyboardLayoutService` once during initialization and loads categories for that layout, with no user-facing way to change it.

This change introduces a welcome-page layout chooser and extends `KeyboardLayoutService` so layout selection can be updated, persisted in browser storage, and restored on later visits. Existing ordering, grouping, and category filtering behavior must remain unchanged apart from reflecting the newly selected layout.

## Goals / Non-Goals

**Goals:**
- Add a welcome-page dropdown listing all supported layouts from `KeyboardLayoutService`.
- Initialize the dropdown from the currently chosen layout.
- Allow the user to change the chosen layout from the welcome page.
- Persist the selected layout in local storage under `layout.selected`.
- Reload welcome-page categories immediately after a layout change.
- Keep category ordering and exercise ordering consistent with `ExerciseConfigService` output.

**Non-Goals:**
- Adding layout selection controls outside the welcome page.
- Persisting the selection to a server or user profile.
- Changing the list of supported layouts or category datasets in this change.
- Introducing reactive state management libraries or a global store.

## Decisions

1. Extend `KeyboardLayoutService` with explicit read/write behavior.
- Decision: Keep `getSupportedLayouts()` and `getChosenLayout()`, and add a setter method that updates the chosen layout and persists it to local storage.
- Rationale: The service remains the single authority for layout state while providing the minimum API needed for UI interaction.
- Alternative considered: Let the welcome component write directly to local storage.
- Why not: That duplicates persistence rules and weakens the service contract.

2. Use local storage key `layout.selected` as the persistence source.
- Decision: On initialization, `KeyboardLayoutService` reads `layout.selected` from local storage and falls back to the existing default `fr-ch` when no valid stored value exists.
- Rationale: Keeps session persistence simple and aligned with browser capabilities.
- Alternative considered: Session storage.
- Why not: The requirement is to survive the session, which needs durable storage across browser restarts.

3. Validate stored and newly selected layouts against supported layouts.
- Decision: Only supported layouts are accepted as the chosen layout; invalid stored values fall back to the default.
- Rationale: Prevents broken states and keeps category filtering deterministic.
- Alternative considered: Trust any stored value.
- Why not: Could leave the app with a layout that has no supported data or chooser option.

4. Keep welcome-page selection handling local to the component.
- Decision: The welcome component owns the chooser value, obtains supported layouts from the service, and reloads categories after notifying the service of a layout change.
- Rationale: The component already orchestrates category loading and is the narrowest UI scope for this behavior.
- Alternative considered: Make `ExerciseConfigService` observe layout changes indirectly.
- Why not: Adds hidden coupling and unnecessary indirection for a simple page interaction.

5. Reload categories synchronously after a selection change.
- Decision: On dropdown change, the component updates the chosen layout via `KeyboardLayoutService` and immediately refreshes category data from `ExerciseConfigService` using the new layout.
- Rationale: Keeps rendered navigation and selected layout in sync in one interaction path.
- Alternative considered: Full page reload.
- Why not: Unnecessary and degrades user experience.

6. Cover the behavior with service and component tests.
- Decision: Add tests for persisted selection restore/fallback in `KeyboardLayoutService`, and for chooser rendering, change propagation, and category reload in welcome-page tests.
- Rationale: This change crosses both browser storage and UI orchestration boundaries.
- Alternative considered: Template/source inspection assertions.
- Why not: Less robust and inconsistent with the repo's behavior-testing policy.

## Risks / Trade-offs

- [Risk] Invalid or stale local storage values may produce unsupported layout state.
  -> Mitigation: Validate stored values against `getSupportedLayouts()` and fall back to `fr-ch`.

- [Risk] UI selection and displayed categories could drift out of sync.
  -> Mitigation: Update the service and reload categories in the same change handler.

- [Risk] Browser storage access can fail in some environments.
  -> Mitigation: Keep a safe in-memory fallback so the app remains usable without storage.

- [Trade-off] The welcome component takes on slightly more orchestration logic.
  -> Mitigation: Limit added logic to chooser state and category refresh only.

## Migration Plan

1. Extend `KeyboardLayoutService` with persisted chosen-layout initialization and update behavior.
2. Add a layout chooser to the welcome page UI and load its options from the service.
3. Wire selection changes to update the chosen layout and reload categories.
4. Add or update behavior tests for service persistence and welcome-page interaction.
5. Verify category ordering, grouping, and existing welcome-page behaviors remain intact.

## Open Questions

- None currently.
