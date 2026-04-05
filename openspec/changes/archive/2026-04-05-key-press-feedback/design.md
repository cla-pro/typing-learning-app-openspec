## Context

The exercise page currently displays a standalone `<p class="key-display-box">` label beneath the stream that shows the last pressed key character, with red border/background when the key was wrong. Now that `KeyboardDisplayComponent` renders the full layout, the pressed-key feedback belongs on the keyboard itself as a highlighted key — green for a correct press, red for a wrong press.

The keyboard display already receives `selectedLayout` and `impactedKeys`. It needs two more inputs from `ExerciseComponent`: the last pressed key value and its correctness flag. Once the keyboard renders this feedback, the old label and all code/styles that exist solely for it become dead weight.

Additionally, the space previously occupied by the key-press label can be reclaimed to allow a larger stream. The stream size scale formula is `1 + (value × 0.6)`, so raising `STREAM_SIZE_MAX` from `1` to `1.5` increases the maximum scale from `1.6×` to `1.9×` — a meaningful but not excessive increase.

## Goals / Non-Goals

**Goals:**
- Add `lastPressedKey` and `isLastKeyWrong` inputs to `KeyboardDisplayComponent`
- Highlight the pressed key on the keyboard: green for correct, red for wrong
- The highlight state is visually independent of (and takes priority over) enabled/disabled coloring
- Remove the old `key-display-box` label, its CSS, and dead code from `ExerciseComponent`
- Keep the error counter; adjust its layout container as needed
- Raise `STREAM_SIZE_MAX` from `1` to `1.5` in `SettingsService`

**Non-Goals:**
- Changing how `lastPressedKey` or `isLastKeyWrong` are computed in `ExerciseComponent` — those stay as-is
- Highlighting modifier/non-typing keys (Tab, Shift, Enter): the `event.key` values differ from the sentinel values in the keymap (`'Tab'` vs `'TAB'`); this mismatch is acceptable because these keys are never expected characters in exercises
- Changing `STREAM_SIZE_MIN`

## Decisions

### Key matching for highlight

**Decision**: Use direct `key.value === lastPressedKey` equality (case-sensitive), same pattern as `impactedKeys` matching with `isKeyEnabled()`.

**Rationale**: `event.key` for typing characters (letters, digits, space, punctuation) matches the `value` field in the keymap exactly. No transformation is needed. Modifier keys won't match (TAB vs Tab), but that's irrelevant — they are never typed in exercise context.

**Alternative considered**: Case-insensitive matching or normalisation — rejected because it would incorrectly conflate `'a'` and `'A'` which are distinct keys in the layout.

---

### CSS class priority: highlight vs. disabled

**Decision**: Apply highlight classes (`.keyboard-key-pressed-correct`, `.keyboard-key-pressed-wrong`) in addition to, and after, the disabled class in the template. CSS source order gives the highlight rules priority over `.keyboard-key-disabled` without needing `!important`.

**Rationale**: A key can legitimately be both disabled (not an impacted key) and pressed — e.g. the user presses a wrong key not in `impactedKeys`. The highlight should win visually in all cases.

**Alternative considered**: Only highlight if key is enabled — rejected because it hides feedback when the user presses a disabled key (which is always a wrong press and should show red).

---

### Error counter layout after label removal

**Decision**: Remove the `.key-feedback-row` flex wrapper with the feedback label. Keep the `<span class="error-counter">` as a direct standalone child of `.exercise-focus-stack`.

**Rationale**: The row wrapper existed solely to lay out the label and counter side by side. With the label gone, the counter stands alone and fits naturally in the vertical stack. No extra wrapper is needed.

---

### Stream size max value

**Decision**: Raise `STREAM_SIZE_MAX` from `1` to `1.5` in `SettingsService`.

**Rationale**: At max `1.0`, the scale factor reaches `1 + 1.0 × 0.6 = 1.6×`. At `1.5`, the max scale becomes `1 + 1.5 × 0.6 = 1.9×` — a noticeable gain without making the zoom characters overflow their container at typical screen sizes. The keyboard display has a fixed height independent of the scale, so available vertical budget for the stream is increased.

**Alternative considered**: Raising to `2.0` (max scale 2.2×) — reserved for a future iteration once real usage data confirms users want even larger sizes.

---

### `displayedPressedKey` getter removal

**Decision**: Delete the `displayedPressedKey` getter from `ExerciseComponent` along with all template references to it.

**Rationale**: The getter existed purely to render the label (`lastPressedKey || '\u00A0'`). With the label gone, no consumer remains. `lastPressedKey` and `isLastKeyWrong` themselves are kept as component state — they are now passed to `KeyboardDisplayComponent`.

## Risks / Trade-offs

**Risk: stored stream size values above new max** — Users who never changed from the default (0) are unaffected. There is no valid path for a stored value to exceed the old max of 1, so no clamping issue arises when reading from localStorage.

**Risk: highlight flicker at exercise completion** — After the last correct key is typed, `exerciseRuntimeState` transitions to `completed` and key capture stops. `lastPressedKey` retains the last typed value; the keyboard shows it highlighted green permanently until the next exercise opens. This is acceptable and natural.

## Migration Plan

No data migration needed. The `STREAM_SIZE_MAX` increase takes effect immediately; existing stored values (0–1) remain valid within the new range. No breaking API changes.
