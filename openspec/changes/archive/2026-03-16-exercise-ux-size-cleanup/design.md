## Context

The current exercise page already renders a three-part stream layout with side segments, a five-slot zoom window, a pressed-key feedback section, and a runtime control panel. The requested change does not alter exercise loading or progression rules, but it does change how these pieces are visually composed and which controls remain available.

The existing template separates the pressed-key panel and runtime panel into full-width blocks below the stream, and the runtime panel still exposes a temporary completion button that is only useful as scaffolding. The component also contains callback logic and CSS tied to that temporary control. This change should tighten the page into a clearer vertical focus stack centered on the active expected character while preserving the existing runtime state machine for `opened`, `running`, `pending`, and `completed`.

## Goals / Non-Goals

**Goals:**
- Align the side stream rows and the zoom row on a shared vertical center line.
- Center the pressed-key feedback directly under the active zoom character and size it to the same visual footprint as the active focus target.
- Reduce runtime controls to a single centered start/pause action with larger emphasis.
- Remove the temporary completion button from the template, component logic, tests, and styles if no longer used.
- Preserve existing keyboard capture and progression behavior apart from the removed temporary completion path.

**Non-Goals:**
- Changing exercise configuration, route handling, or exercise lookup behavior.
- Changing progression semantics such as case sensitivity or last-character completion on correct key input.
- Introducing new dependencies, animations, or broader visual redesign outside the focused exercise interaction column.

## Decisions

### Use a single centered interaction column under the stream
The stream visualization remains the top-level focus. Below it, the pressed-key feedback and primary control will be stacked in a centered column instead of using broad, panel-style sections.

Rationale: the requested UX explicitly shifts emphasis to the active character and its immediate feedback loop. A narrow centered column makes the pressed-key feedback read as part of the typing target rather than as a separate dashboard.

Alternatives considered:
- Keep the existing full-width panels and only adjust spacing. Rejected because it would preserve the current visual fragmentation.
- Place the start/pause button beside the pressed-key feedback. Rejected because the requested layout is vertically centered and columnar.

### Match pressed-key feedback size to the active zoom character via shared sizing rules
The active zoom character and the pressed-key feedback should derive from the same sizing intent so they read as equivalent focus surfaces. The pressed-key feedback will be rendered as a character box without any surrounding textual label, and this can be implemented through shared wrapper sizing or aligned CSS custom properties rather than duplicated numeric values scattered across selectors.

Rationale: the requirement is about perceptual equivalence, not only text size. Tying both elements to the same size contract reduces drift during future styling changes.

Alternatives considered:
- Independently tune the pressed-key box until it looks similar. Rejected because the relationship would be brittle and likely diverge over time.
- Resize only the text and not the box. Rejected because the request calls for the section itself to match the focused active expected character.

### Remove the temporary completion pathway from page UI and component API
The temporary completion button will be removed from the template. If no other code path requires it, the `completeExerciseTemporarily()` callback and related styling classes should also be deleted. Completion remains driven by correct entry of the final expected character.

Rationale: the control is temporary scaffolding and conflicts with the desired simplified flow. Keeping the dead callback or style hooks would increase maintenance cost without user value.

Alternatives considered:
- Hide the button visually but keep the callback and styles. Rejected because it leaves unused code behind.
- Replace the completion button with another secondary action. Rejected because the requested control surface is a single primary start/pause action.

### Preserve the runtime state machine while narrowing visible controls
The component’s `toggleRuntimeState()` flow remains the entry point for start, pause, and resume. The visible button still reflects `start` when not running and `pause` when running. After completion, the primary control remains visible in a disabled state with a clearly recognizable disabled treatment. The `completed` state remains reachable only through typing progression.

Rationale: this preserves tested kernel behavior and keeps the UX cleanup isolated to presentation and removal of temporary scaffolding.

Alternatives considered:
- Collapse `pending` back into `opened`. Rejected because it changes behavior beyond the requested scope.
- Show a disabled button after completion. Rejected unless needed by spec updates; removing the control entirely after completion matches the current page behavior better.

### Update tests around observable outcomes, not CSS internals
Requirements tests should be updated to remove assertions around temporary completion behavior and add DOM-level checks for the simplified control surface and focused feedback stack where appropriate. Logic tests should continue to cover progression and key capture through public component behavior.

Rationale: the repository already prefers behavior-oriented tests, and this change is mostly about user-visible layout and control availability.

Alternatives considered:
- Assert specific class names or stylesheet text. Rejected because it over-couples tests to implementation details.

## Risks / Trade-offs

- [Layout parity risk] Visual alignment can look correct on desktop but drift on smaller screens. Mitigation: update mobile styles together with desktop alignment rules and preserve a centered layout in the responsive breakpoint.
- [Regression risk] Removing the temporary completion callback may break tests or template bindings that still assume manual completion. Mitigation: remove the template hook, component method, and related tests in one change.
- [Sizing drift risk] Pressed-key feedback and active zoom character can diverge if they use separate hard-coded dimensions. Mitigation: centralize the sizing relationship in shared CSS rules or variables.
- [Behavior confusion risk] A larger primary button may overtake the typing focus visually if over-styled. Mitigation: increase emphasis moderately while keeping the active character and pressed-key box as the dominant interaction cues.

## Migration Plan

No data or API migration is required. Implementation can ship as a direct UI update.

Rollback strategy: restore the previous template sections and temporary completion logic from version control if the simplified layout causes usability or test regressions.

## Open Questions

- None currently.
