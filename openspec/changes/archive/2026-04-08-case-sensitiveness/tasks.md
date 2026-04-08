## 1. Model Extension

- [x] 1.1 Add optional `shiftValue`, `shiftLabel`, `altGrValue`, `altGrLabel` fields to `KeyboardKey` in `src/app/models/keyboard-layout.model.ts`

## 2. Keymap Data — Layer Values

- [x] 2.1 Populate `shiftValue`/`shiftLabel` and `altGrValue`/`altGrLabel` on number and symbol keys in the `fr-ch` keymap (`src/app/data/keyboard-layouts.ts`)
- [x] 2.2 Populate `shiftValue`/`shiftLabel` and `altGrValue`/`altGrLabel` on number and symbol keys in the `de-ch` keymap (`src/app/data/keyboard-layouts.ts`)

## 3. KeyboardDisplayComponent — Modifier-Aware Rendering

- [x] 3.1 Add `@Input() isShiftActive: boolean = false` and `@Input() isAltGrActive: boolean = false` to `KeyboardDisplayComponent`
- [x] 3.2 Implement `getDisplayLabel(key: KeyboardKey): string` method: returns `shiftLabel` when `isShiftActive && key.shiftLabel`, `altGrLabel` when `isAltGrActive && key.altGrLabel`, otherwise `key.label`
- [x] 3.3 Replace `{{ key.label }}` with `{{ getDisplayLabel(key) }}` in `keyboard-display.component.html`
- [x] 3.4 Update `isKeyPressed` to match `lastPressedKey` against all layers: primary value (case-insensitive), `shiftValue` (exact), and `altGrValue` (exact)

## 4. ExerciseComponent — Modifier State Tracking

- [x] 4.1 Add `isShiftActive: boolean = false` and `isAltGrActive: boolean = false` properties to `ExerciseComponent`
- [x] 4.2 Add modifier key silencing guard at the top of `handleExerciseKeydown`: return early if `event.key` is in `MODIFIER_KEYS` set (Shift, Control, Alt, AltGraph, CapsLock, Meta, OS), without updating `lastPressedKey` or incrementing error count
- [x] 4.3 Update `isShiftActive` and `isAltGrActive` from `event.shiftKey` and `event.getModifierState('AltGraph')` inside `handleExerciseKeydown` (after guard)
- [x] 4.4 Add `handleExerciseKeyup(event: KeyboardEvent)` method that updates both `isShiftActive` and `isAltGrActive`
- [x] 4.5 Add `(keyup)="handleExerciseKeyup($event)"` to the `#exerciseContent` div in `exercise.component.html`
- [x] 4.6 Bind `[isShiftActive]="isShiftActive"` and `[isAltGrActive]="isAltGrActive"` on `<app-keyboard-display>` in `exercise.component.html`

## 5. Typing Scenarios — Mix Caps Category

- [x] 5.1 Add `Mix Caps` exercise category at the end of the `fr-ch` scenario data (`src/app/data/typing-scenarios/fr-ch.exercise-categories.ts`) with mixed-case `expectedChars`
- [x] 5.2 Add `Mix Caps` exercise category at the end of the `de-ch` scenario data (`src/app/data/typing-scenarios/de-ch.exercise-categories.ts`) with mixed-case `expectedChars`

## 6. Tests

- [x] 6.1 Add test: pressing a modifier key during `running` state does not increment error counter (ExerciseComponent)
- [x] 6.2 Add test: pressing a modifier key during `running` state does not update `lastPressedKey` (ExerciseComponent)
- [x] 6.3 Add test: pressing a modifier key during `running` state does not advance progression (ExerciseComponent)
- [x] 6.4 Add test: `isShiftActive` becomes `true` on Shift keydown and `false` on Shift keyup (ExerciseComponent)
- [x] 6.5 Add test: `isAltGrActive` becomes `true` on AltGr keydown and `false` on AltGr keyup (ExerciseComponent)
- [x] 6.6 Add test: `getDisplayLabel` returns `shiftLabel` when `isShiftActive` and key has `shiftLabel` (KeyboardDisplayComponent)
- [x] 6.7 Add test: `getDisplayLabel` returns `altGrLabel` when `isAltGrActive` and key has `altGrLabel` (KeyboardDisplayComponent)
- [x] 6.8 Add test: `getDisplayLabel` falls back to primary `label` when modifier is active but key has no layer label (KeyboardDisplayComponent)
- [x] 6.9 Add test: `isKeyPressed` matches `lastPressedKey` against `shiftValue` (KeyboardDisplayComponent)
- [x] 6.10 Add test: `isKeyPressed` matches `lastPressedKey` against `altGrValue` (KeyboardDisplayComponent)

## 7. Verification

- [x] 7.1 Run tests — all pass
- [x] 7.2 Run Angular build — no errors
