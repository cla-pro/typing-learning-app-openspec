## Why

The current exercise runtime does not yet model expected-character progression while running, which blocks meaningful typing behavior. Introducing this kernel now creates the core interaction loop and enables future UI-focused improvements to build on a working behavior foundation.

## What Changes

- Introduce exercise kernel behavior for running state: expected characters are processed in sequence, one active character at a time.
- Rename `ExerciseConfig` field `letters` to `expectedChars` to support characters beyond alphabetic letters.
- During running state, display all expected characters while clearly identifying the active character.
- Ignore incorrect key presses for progression; keep the same active character until the correct key is pressed.
- Advance to the next active character after each correct key press.
- Automatically transition runtime state to `completed` when the last expected character is typed correctly.
- Keep existing exercise-page labels/components visible in this step; only add the behavior and active-character visibility needed for the kernel.

## Capabilities

### New Capabilities
- `exercise-kernel`: Sequential expected-character runtime behavior for exercise progression and completion.

### Modified Capabilities
- `exercise-page`: Update running-state rendering and key handling to support active-character visibility and sequential progression.

## Impact

- Affected code: `ExerciseConfig` model, exercise configuration service data shape/usage, exercise component runtime logic/template, and related tests.
- Affected tests: exercise component requirements tests and any service/component tests that currently refer to `letters`.
- Dependencies/APIs: no new external dependencies; internal config contract changes from `letters` to `expectedChars`.
