## Why

Users currently have no explicit feedback about how many mistakes they make while typing in running state. Adding a visible error counter and immediate visual error feedback improves training quality by making mistakes measurable and clearly signaling incorrect input.

## What Changes

- Add runtime tracking of wrong key presses while the exercise is in `running` state.
- Display an error counter in red text during gameplay.
- Place the error counter below the primary start/pause button on the exercise page.
- Change the pressed-key feedback section style to red on a wrong key press.
- Restore the pressed-key feedback section to its normal style after the next correct key press.
- Preserve the current error counter value when the exercise is paused and resumed.
- Initialize the error counter to `0` each time an exercise page is opened, independent of errors from prior exercises.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `exercise-page`: extend runtime UI behavior to show an error counter beneath the primary control and to apply temporary red styling to key-pressed feedback after wrong input.
- `exercise-kernel`: extend running-state input processing to count wrong key presses and expose correct/wrong input outcomes used by UI state transitions.

## Impact

- `src/app/components/exercise/exercise.component.ts` for wrong-key counting and feedback-state transitions.
- `src/app/components/exercise/exercise.component.html` for rendering the error counter below the primary control.
- `src/app/components/exercise/exercise.component.css` for red counter text and wrong-key feedback styling.
- `tests/app/components/exercise/exercise.component.requirements.test.ts` for runtime behavior coverage (counter increment, pause/resume persistence, per-exercise reset to zero, placement, style transitions).
- `openspec/specs/exercise-page/spec.md` and `openspec/specs/exercise-kernel/spec.md` via delta specs for modified requirements.
