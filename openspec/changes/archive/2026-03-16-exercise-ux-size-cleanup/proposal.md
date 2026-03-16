## Why

The current exercise UI has misaligned character rows and oversized control sections that pull attention away from the typing focus. We need to tighten the layout now so the active character, key feedback, and control flow read as one clear visual column.

## What Changes

- Align the previous/following stream segments vertically with the zoomed center character row so all character streams share the same visual center line.
- Redesign the pressed-key feedback section so it is centered under the active zoom character and sized to match that active character focus target.
- Simplify runtime controls by removing the temporary completion control from the page and keeping a single start/pause primary action centered under the pressed-key feedback.
- Remove the temporary completion button's component callback and any CSS classes that become unused after the control is removed.
- Increase the visual prominence of the primary start/pause control to keep the action clear after control simplification.
- Update behavior tests to validate the new layout and control-surface expectations through observable DOM behavior.

## Capabilities

### New Capabilities
- `exercise-page-ux-alignment`: Refines exercise-page visual alignment rules for stream rows, pressed-key focus sizing, and centered control stacking.

### Modified Capabilities
- `exercise-page`: Update runtime and page-layout requirements to remove temporary completion control and enforce centered alignment/sizing of stream, pressed-key, and primary control areas.

## Impact

- Affected code: `ExerciseComponent` template, component logic, styles, and related exercise-page requirements tests.
- Affected behavior requirements: exercise-page layout and runtime control expectations.
- No new external dependencies or API contract changes are expected.
