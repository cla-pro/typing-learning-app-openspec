## Why

Typing scenarios are statically defined, so replaying a scenario always repeats the exact same character sequence. For some scenarios this is fine, but for others it would benefit the learner to practice the same characters in a randomized order. A shuffle mechanism lets users vary the sequence on demand before starting, improving practice variety without changing the canonical scenario definition.

## What Changes

- Add an optional `shufflable` boolean property to the scenario/exercise configuration model
- When `shufflable` is `true`, display a **Shuffle** button on the exercise page before the exercise starts
- Pressing the Shuffle button randomizes the current `expectedChars` sequence for this play session only
- The button can be pressed multiple times to re-shuffle
- Once the exercise transitions to `running` state, the Shuffle button disappears
- Every time the exercise page is opened, the original canonical sequence is used as the starting point (shuffle state is not persisted)

## Capabilities

### New Capabilities
- `exercise-shuffle`: Shuffle button UX and behavior — the `shufflable` property on exercise configuration, the pre-start Shuffle button, and session-scoped randomization of `expectedChars`

### Modified Capabilities
- `typing-scenarios`: Exercise configuration model gains an optional `shufflable` property; existing scenarios are unaffected (property defaults to absent/false)
- `exercise-page`: Pre-start controls area gains the conditional Shuffle button, which is visible only when `shufflable` is true and the exercise has not yet started; button disappears once the exercise is running

## Impact

- Exercise configuration data model (`src/app/models/` or equivalent) — add `shufflable?: boolean`
- Scenario data modules (`src/app/data/`) — optionally annotate exercises with `shufflable: true`
- `ExerciseComponent` — conditional Shuffle button in template, shuffle logic before start
- Exercise-page tests — new behavior scenarios for shuffle button visibility and re-shuffle
