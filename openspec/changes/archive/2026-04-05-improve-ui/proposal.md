## Why

The exercise page UI has two rough edges that reduce clarity: enabled keys on the keyboard are visually indistinct from disabled keys (both use the same base color), and the error counter sits next to the pressed-key keyboard highlight rather than next to the start/pause button where it provides more actionable context. Grouping the button and counter into a unified control panel improves information hierarchy.

## What Changes

- Enabled keyboard keys are rendered in blue to make them stand out from greyed-out disabled keys
- The error counter is moved from beside the keyboard highlight area to beside the start/pause button
- The button and error counter form a horizontal control panel row within the exercise page (no new component)
- The old "same feedback row as pressed-key feedback" placement of the counter is removed

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `keyboard-display`: enabled key color changes from generic normal styling to a distinct blue
- `exercise-page`: error counter placement moves from the keyboard-highlight row to the control panel row alongside the start/pause button; requirement wording for counter placement is updated accordingly

## Impact

- `keyboard-display.component.css`: update enabled key color rule
- `exercise.component.html`: reposition `<span class="error-counter">` into the control panel row
- `exercise.component.css`: update layout rules for the control panel row
- `exercise.component.requirements.test.ts`: update counter-placement test
- `keyboard-display.component.requirements.test.ts`: update enabled-key styling test if present
