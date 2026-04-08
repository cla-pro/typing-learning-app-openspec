## Context

The exercise runtime currently uses `event.key` directly for both `lastPressedKey` display and progression matching. Because it does no filtering, pressing Shift or Ctrl alone triggers an error. The keyboard display renders a fixed label per key regardless of active modifiers, so the displayed characters never change when the user holds Shift or AltGr. Existing key values in the keymap are uppercase identifiers (e.g. `'A'`) and `isKeyPressed` already bridges the mismatch via `.toLowerCase()`, but there is no model support for second (Shift) or third (AltGr) key layer values or labels.

## Goals / Non-Goals

**Goals:**
- Modifier-only keypresses are silently skipped — no error, no progression, no `lastPressedKey` change
- Keyboard keys display the correct layer character when Shift/CapsLock or AltGr is active
- `isKeyPressed` matches `lastPressedKey` against all layers of a key, so highlights persist after modifier release
- A "Mix Caps" exercise category exists for each supported layout

**Non-Goals:**
- Supporting more than three keymap layers (base, Shift, AltGr) — dead keys, combinations, Ctrl+key shortcuts are out of scope
- Redefining how `impactedKeys` works or changing key identity semantics
- Animating the keyboard on modifier state change

## Decisions

### Decision 1: KeyboardKey model — optional shift and AltGr layer fields

**Choice:** Extend `KeyboardKey` with optional `shiftValue?: string`, `shiftLabel?: string`, `altGrValue?: string`, `altGrLabel?: string`.

**Rationale:** The fields are optional so all existing key entries remain valid without modification. Only keys whose Shift or AltGr layer differs meaningfully from the primary label (e.g. number keys, symbol keys) need the new fields populated. Letter keys where Shift just changes case are handled implicitly by the existing case-insensitive matching — no new fields required for them.

**Alternative considered:** A generic `layers: KeyLayer[]` array — more extensible but requires iterating and indexing by modifier, making call sites more complex for a feature that only needs two extra layers.

---

### Decision 2: Modifier key silencing — explicit sentinel set

**Choice:** In `handleExerciseKeydown`, guard at the top with a constant set:
```
const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'AltGraph', 'CapsLock', 'Meta', 'OS']);
```
If `event.key` is in this set, return immediately — no `lastPressedKey` update, no error count increment.

**Rationale:** `event.key` returns the printable string for normal keys and named values for modifiers. The set is the exact Web API strings for all standalone modifier keys. Checking `event.key` (not `event.code` or `event.which`) keeps the logic consistent with the rest of the key-handling code.

**Alternative considered:** Checking `event.metaKey`/`event.ctrlKey` flags — those are true on any keypress while the modifier is held, not just the modifier key itself. The sentinel set is precise.

---

### Decision 3: Modifier state tracking — event flags on keydown and keyup

**Choice:** Add `isShiftActive: boolean = false` and `isAltGrActive: boolean = false` as component properties on `ExerciseComponent`. Update both on every `keydown` and `keyup` event:
- `isShiftActive = event.shiftKey` (pure Shift key only — NOT combined with CapsLock)
- `isAltGrActive = event.getModifierState('AltGraph')`

Add `(keyup)="handleExerciseKeyup($event)"` to the `#exerciseContent` div in the template. `handleExerciseKeyup` only updates the two modifier flags.

**Rationale:** Shift and CapsLock have different semantics that must be reflected on the keyboard display:
- **Shift** activates the full second character layer — both letters become uppercase AND symbol keys show their shifted characters (e.g. `1` → `!`).
- **CapsLock** only capitalises standard letters — symbol keys remain on the base layer.

Because letter keys already display uppercase labels on their key cap (e.g. `label: 'A'`), CapsLock produces no visual change to the keyboard display and does not need to be tracked. `isKeyPressed` already handles CapsLock-produced characters correctly via the existing `.toLowerCase()` comparison — no additional state tracking is required. `isShiftActive = event.shiftKey` is therefore both necessary and sufficient.

**Alternative considered:** `@HostListener('document:keydown')` — rejected because modifier tracking should be scoped to the exercise content focus area, not the whole document, consistent with how `handleExerciseKeydown` is already wired to the div.

---

### Decision 4: Keyboard display layer rendering — getDisplayLabel method

**Choice:** Add a `getDisplayLabel(key: KeyboardKey): string` method to `KeyboardDisplayComponent`:
```
if (isShiftActive && key.shiftLabel) return key.shiftLabel;
if (isAltGrActive && key.altGrLabel) return key.altGrLabel;
return key.label;
```
Use `{{ getDisplayLabel(key) }}` in the template instead of `{{ key.label }}`.

Add `@Input() isShiftActive: boolean = false` and `@Input() isAltGrActive: boolean = false` to `KeyboardDisplayComponent`.

**Rationale:** A method is cleaner than a nested ternary in the template and is easier to test. The method degrades gracefully: if no `shiftLabel` is defined for a key, the base `label` is shown even when Shift is active (appropriate for keys with no meaningful alternate layer in this exercise context).

---

### Decision 5: isKeyPressed — multi-layer matching, preserve highlight on modifier release

**Choice:** Update `isKeyPressed` to check against all populated layers:
```
isKeyPressed(key): boolean {
  if (!this.lastPressedKey) return false;
  const lp = this.lastPressedKey;
  return key.value.toLowerCase() === lp.toLowerCase()
    || (!!key.shiftValue && key.shiftValue === lp)
    || (!!key.altGrValue && key.altGrValue === lp);
}
```

`lastPressedKey` in `ExerciseComponent` is only updated when a non-modifier key is pressed (Decision 2 ensures this). It is NOT cleared when a modifier is released. Therefore the highlight naturally persists after releasing Shift or AltGr — `isKeyPressed` still returns true for the previously pressed key, and `isLastKeyWrong` retains its last value.

**Rationale:** The proposal requires that "when a key is green/red and the modifier is released, the style remains." Because `lastPressedKey` is only updated on physical character key presses and is never reset by modifier events, no additional logic is needed — the existing rendering already satisfies this once `isKeyPressed` checks all layers.

---

### Decision 6: Mix Caps scenario data

**Choice:** Add a new `ExerciseCategory` named `'Mix Caps'` at the end of each layout's category array, with exercises that mix uppercase and lowercase expected characters (e.g. `['a', 'B', 'c', 'D', ...]`). `impactedKeys` lists the uppercase key identifiers for all involved keys.

The first exercise for each layout uses two keys (one lowercase, one uppercase alternating) to gently introduce the concept.

---

### Decision 7: Keymap layer data scope — letter keys not extended

**Choice:** For letter keys (A–Z and layout-specific letters like É, Ü, Ö, Ä), do NOT add `shiftValue`/`shiftLabel` — the existing `.toLowerCase()` matching in `isKeyPressed` already handles them, and the current `label` (uppercase) is the conventional key cap label. Number keys and symbol keys that have a distinct Shift or AltGr output are populated with the appropriate layer fields.

**Rationale:** Keeping letter key entries unchanged avoids large data churn for zero behaviour gain. The display label for letter keys remains the uppercase cap label whether or not Shift is held — this is the standard keyboard cap printing convention and is accurate for the physical key.

## Risks / Trade-offs

- [Keyup handler scope] The `(keyup)` listener is on the `#exerciseContent` div. If the user releases Shift while focus has moved elsewhere, `isShiftActive` won't update until the next event. — Mitigation: modifier state is only cosmetic; no correctness impact.
- [AltGr layer data completeness] Only a subset of keys will have AltGr values populated for this change. Keys without `altGrValue` gracefully fall back. — Accepted: full AltGr data population can be incremental.
