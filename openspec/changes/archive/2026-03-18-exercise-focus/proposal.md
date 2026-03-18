## Why

When the exercise transitions to `running`, keyboard focus remains on the start/pause button. Because browsers activate a focused button on Space key press, any exercise character that requires a space keystroke unexpectedly triggers the button and pauses the exercise.

## What Changes

- When the exercise transitions to `running` state, keyboard focus is programmatically moved away from the start/pause button to a non-interactive, focusable element (the pressed-key feedback section).
- The pressed-key feedback element receives `tabindex="-1"` so it can accept programmatic focus without entering the natural tab order.
- No visible focus indicator is required on the feedback element during exercise runtime (focus is functional, not decorative).

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `exercise-page`: new requirement — focus management during running state to prevent unintended button activation via Space key.

## Impact

- `exercise.component.html` — add `tabindex="-1"` and a template reference variable to the pressed-key feedback element.
- `exercise.component.ts` — inject `ElementRef` or use `ViewChild` to call `.focus()` on the feedback element when transitioning to `running`.
- No spec, routing, or service changes.
