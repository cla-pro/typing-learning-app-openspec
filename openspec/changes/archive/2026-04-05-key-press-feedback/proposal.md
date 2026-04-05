## Why

The current key-press feedback — a standalone label beneath the stream that shows the last pressed key character — was a temporary solution. Now that the keyboard display is in place, showing the live key press directly on the keyboard as a highlighted key is a more natural and visually coherent approach. The old label and its associated error-state styling are redundant once the keyboard provides this feedback.

## What Changes

- `KeyboardDisplayComponent` gains new inputs for the last pressed key value and its correctness state, and renders that key with a green highlight on correct press or a red highlight on wrong press — both distinct from the enabled/disabled coloring
- `ExerciseComponent` passes `lastPressedKey` and `isLastKeyWrong` to the keyboard display component
- The old key-press feedback label (`key-display-box`, `key-display-error` red styling) is removed from the exercise page template
- All CSS rules, component properties, and template logic that exist solely to support the removed label are deleted
- The error counter remains but its layout context is adjusted if the surrounding container changes
- The stream size upper bound is increased: `STREAM_SIZE_MAX` in `SettingsService` is raised to reflect the additional vertical space gained; `STREAM_SIZE_MIN` is unchanged

## Capabilities

### New Capabilities
- none

### Modified Capabilities
- `keyboard-display`: new inputs for last-pressed key and correctness state; green highlight for correct press, red highlight for wrong press — both visually distinct from the enabled/disabled coloring
- `exercise-page`: wire pressed key to keyboard display, remove the old feedback label with all dead code and styles, and expand the stream size range

## Stream Size Range Increase

Removing the key-press feedback box reclaims vertical space in the exercise layout. This space should be used to increase the allowed range of the stream size slider, giving the user more room to scale the stream larger than was previously feasible.

The exact new maximum value is a design decision. Only the upper bound is raised; the lower bound stays at its current value.

## Impact

- `KeyboardDisplayComponent`: new `@Input() lastPressedKey`, new `@Input() isLastKeyWrong`, green and red highlight CSS classes (independent of enabled/disabled state)
- `exercise.component.html`: remove feedback label markup, update `<app-keyboard-display>` binding
- `exercise.component.css`: remove `.key-display-box`, `.key-display-error`, potentially `.key-feedback-row` if no longer needed
- `exercise.component.ts`: remove `displayedPressedKey` getter and any properties used exclusively by the removed label
- Tests: remove tests for the old feedback label; add/update tests for keyboard highlight behavior and new stream size bounds
