## Why

The exercise page currently exposes metadata and runtime panels that do not provide a focused typing experience for character flow. Improving the page UX now makes the typing progression visually clear, supports the kernel behavior during running state, and prepares the page for later polish without changing the core interaction model.

## What Changes

- Redesign exercise-page presentation to focus on typing flow and remove display of exercise id, exercise name, and impacted keys from the page UI.
- Render expected characters as a continuous stream with a central zoom area that shows exactly two previous characters, the active character, and two following characters in larger typography.
- Keep the active character always in the center slot while it exists and make it visually recognizable.
- Render non-zoomed previous characters on the left and following characters on the right up to container borders with configured margins.
- Hide overflow when character content exceeds available horizontal space.
- On each correct key press, shift the whole stream left so the next character enters the active center slot and zoom/side areas update consistently.
- When the final character is typed correctly, shift it left out of the active slot like normal progression so there is no remaining active character.
- Display the last pressed key below the full character-stream/zoom visualization.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `exercise-page`: Update page rendering requirements to define stream-based character layout, zoomed active-window behavior, hidden overflow, and required visible fields.
- `exercise-kernel`: Refine progression-end behavior so the final correct key shifts out of the active slot and leaves no active character after completion.

## Impact

- Affected code: exercise component template and styles, exercise component derived view-model state for zoom/window rendering, and progression-end display behavior.
- Affected tests: exercise component requirements tests for stream layout behavior, active-window shifting, overflow assumptions, and final-character no-active-slot outcome.
- Dependencies/APIs: no new dependencies and no data-contract changes expected; this is a rendering/behavior integration change over existing `expectedChars` kernel logic.
