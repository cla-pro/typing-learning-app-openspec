## Context

The current application already tracks the selected keyboard layout in `SettingsService` and stores exercise-level `impactedKeys` in exercise configuration data. However, there is no representation of the physical keyboard itself, no service that describes which keys belong to each supported layout, and no exercise-page area that can render a layout-aware keyboard beneath the stream and runtime controls.

This change spans multiple modules: settings, exercise-page presentation, layout-specific data, and new UI tests. The selected layout must continue to drive category filtering as it does today, while also becoming the source for a rendered keymap on the exercise page. The design should keep layout persistence concerns separate from keyboard-geometry concerns so that future visual enhancements, per-key states, and more layouts can be added without overloading `SettingsService`.

## Goals / Non-Goals

**Goals:**
- Introduce a dedicated `KeyboardLayoutService` responsible for supported keymap definitions and layout-specific keyboard lookup.
- Render a keyboard on the exercise page using the currently selected layout.
- Display all visible keys of the selected layout, including non-typing and modifier keys.
- Mark keys as enabled when their labels appear in the exercise configuration's `impactedKeys` and disabled otherwise.
- Keep the first version visually simple: enabled keys share one normal style, disabled keys share one greyed-out style.
- Preserve existing layout persistence and exercise-loading behavior.

**Non-Goals:**
- Highlight the currently expected character or the last pressed key on the keyboard.
- Add per-finger hints, heatmaps, animations, or multi-color semantic states.
- Change exercise selection, exercise progression logic, or layout persistence semantics.
- Add support for layouts beyond the currently supported `fr-ch` and `de-ch`.

## Decisions

### Add a dedicated `KeyboardLayoutService`

The system will add a new `KeyboardLayoutService` that owns the layout registry for supported keyboards. The service will expose the supported layout ids and a method for retrieving a normalized keymap structure for a given layout.

Rationale:
- `SettingsService` currently handles persistence and simple validation. Adding keyboard-row geometry and key-label metadata there would mix unrelated responsibilities.
- Exercise-page rendering needs a stable, reusable data contract for keyboard rows and key labels.
- A dedicated service allows layout definitions to be reused later by settings previews or other keyboard-related features.

Alternatives considered:
- Keep keymaps in `SettingsService`: rejected because it couples persistence with display-specific layout data.
- Inline keymaps directly in `ExerciseComponent`: rejected because it would make the component responsible for static configuration and reduce reuse.
- Store only raw constants without a service: rejected because consumers would have to duplicate lookup and fallback behavior.

### Model keyboard layouts as normalized row/key data

Each supported layout will be represented as ordered rows of key descriptors. A key descriptor will include at least a stable display label and may include optional size or role metadata for wide keys such as Space. The keyboard component or exercise page can iterate over this structure without special-casing each layout.

The keymap must include all visible keys for recognition purposes, including non-typing and modifier keys (for example Shift, Tab, Enter). In this first iteration, key labels will use primary visible legends only.

Rationale:
- The current requirement is display-focused and depends on visible key labels matching impacted-key values.
- A normalized row/key model maps naturally to Angular templates and CSS grid or flex rows.
- Optional metadata keeps the model extensible without requiring a second redesign for special keys.

Alternatives considered:
- Store the entire keyboard as a formatted string matrix: rejected because it makes wide-key rendering and semantic labeling awkward.
- Create a bespoke component template for each layout: rejected because it duplicates markup and styling logic.

### Keep selected-layout state in `SettingsService`, but validate against the keyboard service registry

`SettingsService` will remain responsible for reading, persisting, and exposing the chosen layout. To avoid duplicating the authoritative layout list, it should rely on `KeyboardLayoutService` for supported layout ids or for layout-existence checks.

Rationale:
- The current settings API is already used by settings and welcome flows and should remain stable.
- Persisted layout semantics belong in settings, not in the new keymap service.
- Delegating supported-layout knowledge to the keyboard service avoids drift between the persisted choices and renderable layouts.

Alternatives considered:
- Move layout persistence fully into `KeyboardLayoutService`: rejected because persistence is a user-setting concern, not a keymap concern.
- Leave two separate hardcoded layout lists: rejected because they can diverge over time.

### Expose raw keymap data from `KeyboardLayoutService`

`KeyboardLayoutService` will expose raw keymap structures (layout -> rows -> keys) as its primary API contract. Consumer-side logic (for example enabled-state calculation from `impactedKeys`) remains outside the service.

Rationale:
- The service should stay focused on authoritative layout data rather than exercise-specific UI state.
- Raw keymap exposure keeps the API predictable and easy to reuse across components.
- Exercise-specific behavior can evolve without forcing service contract churn.

Alternatives considered:
- Add `isSupportedLayout` and key-state helper methods now: rejected for the first step to keep service scope narrow and avoid prematurely coupling it to exercise rendering rules.

### Derive key enabled-state from `impactedKeys` at render time

The exercise page will continue to load the exercise configuration as it does today, then derive a set of enabled key labels from `exerciseConfig.impactedKeys`. When the layout keymap is rendered, each visible key will be marked enabled if its label is present in that set and disabled otherwise.

Rationale:
- `impactedKeys` already exists in the exercise model and is the correct feature-level contract for this behavior.
- Deriving the enabled state at render time avoids duplicating or persisting transient exercise UI state.
- This keeps the first implementation simple and aligned with the requirement that only enabled versus disabled state differs visually.

Alternatives considered:
- Precompute keyboard state in exercise data files: rejected because it duplicates layout knowledge inside each exercise definition.
- Infer impacted keys from `expectedChars`: rejected because exercises intentionally provide explicit impacted-key metadata.

### Introduce a focused keyboard-display UI unit

The rendered keyboard SHALL live in a standalone, pluggable `KeyboardDisplayComponent` that can be reused by other features. `ExerciseComponent` SHALL compose this component and SHALL NOT implement layout rendering markup directly.

Rationale:
- `ExerciseComponent` already manages routing, runtime state, focus, and progression.
- Keyboard rendering is a self-contained UI concern and will likely grow in complexity.
- A separate component makes testing easier through input/output behavior rather than deep exercise-component assertions.

Alternatives considered:
- Render the keyboard directly inside `ExerciseComponent`: rejected because it prevents reuse and increases component scope and CSS coupling.

### Place the keyboard below the current control stack

The exercise page layout will be extended so the keyboard appears below the stream visualization, pressed-key feedback row, and primary runtime button. The keyboard should fit within the existing centered exercise surface and remain usable on smaller screens by wrapping or scaling rows rather than moving above the current focus area.

Rationale:
- This matches the requested placement and preserves the stream as the primary interaction focus.
- Keeping the keyboard within the existing exercise content container avoids fragmenting the page structure.

Alternatives considered:
- Place the keyboard beside the stream: rejected because the page currently emphasizes a vertical focus stack and side placement would reduce available stream width.
- Place the keyboard above the stream: rejected because it competes with the core exercise focus area.

### Expand automated tests around observable layout rendering

Tests should verify that the exercise page renders the correct layout for the selected setting and that only impacted keys appear enabled. Keyboard tests should assert observable outcomes such as displayed labels, number of enabled keys, and disabled styling hooks rather than source-text inspection.

Rationale:
- The repository already favors requirements tests based on public behavior.
- The keyboard feature combines data lookup and UI state and needs coverage at both service and rendered-component levels.

Alternatives considered:
- Snapshot-only tests: rejected because they are brittle and less explicit about layout and enabled-state semantics.

## Risks / Trade-offs

- [Layout labels diverge from exercise `impactedKeys`] -> Mitigation: define key labels in the keyboard registry using the same uppercase/display values already present in exercise data and cover both layouts with service tests.
- [Two sources of truth for supported layouts] -> Mitigation: make `KeyboardLayoutService` the authoritative layout registry and have `SettingsService` validate against it.
- [Keyboard UI increases exercise-page CSS size and complexity] -> Mitigation: isolate styling in a dedicated component or scoped section with simple enabled/disabled treatments in the first iteration.
- [Responsive layout becomes cramped on narrow screens] -> Mitigation: design the keyboard rows with wrapping or scaled sizing rules and verify on the existing mobile breakpoint.
- [Wide or special keys such as Space need different sizing] -> Mitigation: include optional width metadata in the key descriptor from the beginning even if only Space uses it initially.

## Migration Plan

No data migration is required. Implementation can roll out in these steps:
1. Add keyboard layout models/data and `KeyboardLayoutService`.
2. Update `SettingsService` to validate supported layouts against the new service rather than a private hardcoded list.
3. Add keyboard-display UI rendering to the exercise feature using the chosen layout and current exercise `impactedKeys`.
4. Add or update requirements tests for service behavior and exercise-page rendering.
5. Validate with the existing test suite and Angular production build.

Rollback is straightforward: remove the keyboard display wiring and service while keeping current settings and exercise behavior unchanged.

## Open Questions

No open questions remain for this iteration.