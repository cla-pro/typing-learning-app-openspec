## Why

The exercise page currently lacks explicit runtime states and keyboard input feedback, making it hard to validate start/pause/resume flow and key handling behavior. We need a clear lifecycle contract now so implementation and tests can evolve around deterministic exercise-state transitions.

## What Changes

- Define an exercise lifecycle state model on the exercise page with states: `opened`, `running`, `pending`, and `completed`.
- Require initial state to be `opened` when the exercise page is first displayed.
- Require a primary action button that toggles state:
  - `opened` -> `running` when user presses `start`
  - `running` -> `pending` when user presses `pause`
  - `pending` -> `running` when user presses `start` again
- Require the primary action button label to reflect state (`start` when not running, `pause` when running).
- Add a temporary secondary button to simulate exercise completion and force transition to `completed`.
- Require keyboard input capture during `running` state and display of the pressed character on the exercise page.
- Require automated coverage for lifecycle transitions, button-label toggling, completion simulation, and running-state key capture/display.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `exercise-page`: Add requirements for lifecycle states and transitions, start/pause toggle behavior, temporary completion simulation control, and running-state keyboard key capture/display.

## Impact

- Affected code: `src/app/components/exercise/*` (component state logic, template controls, display bindings).
- Affected tests: `tests/app/components/exercise/*.test.js` requirements and interaction coverage for transitions and key events.
- Affected UI behavior: Exercise runtime control flow and visible input feedback on the exercise page.
