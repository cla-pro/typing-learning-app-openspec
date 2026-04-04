## Why

The exercise page currently hides the keyboard context that the user is supposed to practice against, which makes it harder to connect the active exercise with the concrete key positions for the selected layout. Displaying the keyboard directly on the exercise page makes the current layout visible and clarifies which keys are relevant for the active exercise.

## What Changes

- Add a keyboard display beneath the exercise stream and primary runtime control on the exercise page.
- Render the keyboard using the currently selected keyboard layout so the visible keys match the active layout.
- Grey out keys that are not part of the current exercise configuration's impacted keys.
- Keep impacted keys visually enabled while using the same base key color for all keys in this first iteration.

## Capabilities

### New Capabilities
- `keyboard-display`: Display a keyboard representation for the selected layout and apply enabled or disabled key state based on the current exercise's impacted keys.

### Modified Capabilities
- `exercise-page`: Extend the exercise page layout to show the keyboard beneath the stream and runtime control stack for a valid exercise.

## Impact

- Affected specs: new `keyboard-display` spec and modified `exercise-page` spec.
- Affected code: exercise page component, keyboard layout data or mapping model, and related component tests.
- Dependencies: no new external libraries expected.
- Systems: selected keyboard layout state and exercise configuration impacted-key metadata will drive the rendered keyboard state.