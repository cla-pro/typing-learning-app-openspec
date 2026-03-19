## Why

Completing an exercise currently gives no feedback on how well the user performed. Introducing a star-based score tied to error rate gives immediate, persistent performance feedback and motivates improvement, while the completion flag lets the welcome page surface which exercises have been finished.

## What Changes

- When an exercise transitions to `completed`, compute a score ratio: `errorCount / expectedChars.length`.
- Map the ratio to a star count using fixed thresholds: `[0, 0.05)` → 3 stars, `[0.05, 0.15)` → 2 stars, `[0.15, 0.25)` → 1 star, `[0.25, ∞)` → 0 stars.
- Introduce a new `ExerciseProgressService` that receives the completion event (exercise id + star count) from the exercise page and writes two entries to `localStorage`: `<exercise-id>_completed` (boolean flag) and `<exercise-id>_stars` (star count 0–3).
- The exercise page calls `ExerciseProgressService` once when the runtime state first reaches `completed`.
- The welcome page reads completion state and star count from `ExerciseProgressService` for each exercise tile.
- Completed tiles get a green border.
- The star count is displayed as an icon in the top-right corner of each completed tile.

## Capabilities

### New Capabilities

- `exercise-progress`: A new persistent-progress service (`ExerciseProgressService`) that stores and retrieves per-exercise completion flag and star count from `localStorage`, and the associated welcome-page tile visual behavior driven by that data.

### Modified Capabilities

- `exercise-page`: The exercise page now reports completion (exercise id + final error count) to `ExerciseProgressService` when the runtime state reaches `completed`.
- `welcome-page`: Exercise tiles on the welcome page reflect completion state (green border) and display a star-count icon at the top-right corner of each completed tile.
- `exercise-kernel`: The score ratio formula and star-count thresholds are kernel-level behavior that determines the star grant.

## Impact

- New Angular service `ExerciseProgressService` in `src/app/services/`.
- `ExerciseComponent` gains a one-way call to `ExerciseProgressService` on completion.
- `WelcomeComponent` reads per-exercise completion/stars from `ExerciseProgressService` for template rendering.
- `localStorage` gains two keys per exercise (`<id>_completed`, `<id>_stars`); these persist across page reloads.
- New requirements tests for the progress service and updated welcome-page component tests.
