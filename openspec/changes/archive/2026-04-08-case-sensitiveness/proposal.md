## Why

Typing exercises currently only contain lowercase characters, and pressing modifier keys (Shift, CapsLock, Ctrl, Alt) during an exercise wrongly counts as an error. The keyboard display also has no awareness of active modifiers — it always shows the primary key layer regardless of whether Shift or AltGr is held. Together, these gaps make it impossible to practice capital letters or alternate characters correctly.

## What Changes

- Modifier key presses (Shift, CapsLock, Ctrl, Alt, AltGr, Meta) are silently ignored during exercise runtime: they do not update `lastPressedKey`, do not count as errors, and do not affect progression
- A new "Mix Caps" exercise category is introduced in each layout's scenario data, with exercises that mix uppercase and lowercase expected characters
- The `KeyboardKey` model gains optional `shiftValue`/`shiftLabel` and `altGrValue`/`altGrLabel` fields for second (Shift) and third (AltGr) key layers
- Keyboard layout data (`fr-ch`, `de-ch`) is extended with shift and AltGr layer values for keys where the alternate layer differs from the primary
- `KeyboardDisplayComponent` accepts new inputs for active modifier state (`isShiftActive`, `isAltGrActive`) and displays the correct layer character for each key accordingly
- `isKeyPressed` in `KeyboardDisplayComponent` matches `lastPressedKey` against all layer values of a key (primary, shift, AltGr), so a green/red highlight persists after the modifier is released even if the displayed character reverts to the primary layer
- `ExerciseComponent` tracks active modifier state via keydown/keyup listeners and passes that state to `<app-keyboard-display>`

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `exercise-kernel`: modifier key presses are silently ignored (no error, no progression effect, no lastPressedKey update)
- `keyboard-layout`: `KeyboardKey` model gains optional shift and AltGr layer fields; layout keymap data extended with second/third layer values for applicable keys
- `keyboard-display`: accepts `isShiftActive` and `isAltGrActive` inputs; renders the active modifier layer per key; `isKeyPressed` matches across all key layers
- `exercise-page`: tracks modifier keydown/keyup state and passes it to `KeyboardDisplayComponent`
- `typing-scenarios`: new "Mix Caps" exercise category added for each supported keyboard layout

## Impact

- `src/app/models/keyboard-layout.model.ts`: `KeyboardKey` extended with optional `shiftValue`, `shiftLabel`, `altGrValue`, `altGrLabel`
- `src/app/data/keyboard-layouts.ts`: shift and AltGr layer values populated for `fr-ch` and `de-ch`
- `src/app/components/keyboard-display/keyboard-display.component.ts`: new `isShiftActive`/`isAltGrActive` inputs; `isKeyPressed` updated
- `src/app/components/keyboard-display/keyboard-display.component.html`: display label driven by active modifier
- `src/app/components/exercise/exercise.component.ts`: modifier key tracking via keydown/keyup; `isShiftActive`/`isAltGrActive` properties
- `src/app/components/exercise/exercise.component.html`: new bindings on `<app-keyboard-display>`
- `src/app/data/typing-scenarios/fr-ch.exercise-categories.ts`: Mix Caps category added
- `src/app/data/typing-scenarios/de-ch.exercise-categories.ts`: Mix Caps category added
- Test files for exercise component and keyboard-display component
