## Why

The exercise page currently uses a fixed stream font size, which limits accessibility and user comfort across different screen sizes and reading preferences. We need a user-controlled size option now so each learner can tune readability while keeping that preference across sessions.

## What Changes

- Add a horizontal size slider control on the exercise page between the expected-character stream and the pressed-key feedback section.
- Define slider behavior so the left-most position is the default baseline and matches the current stream font size.
- Increase stream character font size progressively when the slider moves to the right.
- Allow larger sizes even when this reduces available side-segment space for previous/following characters.
- Persist the selected stream size in browser localStorage and restore it on later visits/sessions.
- Keep existing runtime progression behavior and key-capture behavior unchanged except for display scaling effects.

## Capabilities

### New Capabilities
- `exercise-size-chooser`: User-adjustable stream-size control and persistence rules for the exercise page.

### Modified Capabilities
- `exercise-page`: Update exercise-page rendering requirements to include slider placement, baseline-size mapping, and localStorage-backed size restoration.
- `exercise-page-ux-alignment`: Update alignment and focus-layout requirements to account for the inserted slider section between stream visualization and key feedback.

## Impact

- Affected code: `ExerciseComponent` template, styles, and component state handling for slider value and localStorage interaction.
- Affected tests: exercise component requirements tests to cover slider placement, baseline/default value behavior, rightward size increase behavior, and persisted preference restore.
- No backend API or external dependency changes are expected.
