## 1. KeyboardDisplayComponent — highlight inputs and rendering

- [x] 1.1 Add `@Input() lastPressedKey: string = ''` and `@Input() isLastKeyWrong: boolean = false` to `KeyboardDisplayComponent`
- [x] 1.2 Add `isKeyPressed(key: KeyboardKey): boolean` method that returns `key.value === this.lastPressedKey && this.lastPressedKey !== ''`
- [x] 1.3 Add `.keyboard-key-pressed-correct` (green) and `.keyboard-key-pressed-wrong` (red) CSS classes to `keyboard-display.component.css`, defined after `.keyboard-key-disabled` so they take priority via source order
- [x] 1.4 Bind highlight classes in `keyboard-display.component.html`: `[class.keyboard-key-pressed-correct]="isKeyPressed(key) && !isLastKeyWrong"` and `[class.keyboard-key-pressed-wrong]="isKeyPressed(key) && isLastKeyWrong"`
- [x] 1.5 Update `keyboard-display.component.requirements.test.ts`: add test that `isKeyPressed` returns `true` for the matching key value and `false` for a non-matching key value

## 2. ExerciseComponent — wire inputs and remove old label

- [x] 2.1 Add `[lastPressedKey]="lastPressedKey"` and `[isLastKeyWrong]="isLastKeyWrong"` bindings to `<app-keyboard-display>` in `exercise.component.html`
- [x] 2.2 Remove the `<div class="key-feedback-row">` flex wrapper and the `<p class="key-display-box">` label from `exercise.component.html`; keep `<span class="error-counter">` as a direct standalone child of `.exercise-focus-stack`
- [x] 2.3 Remove the `displayedPressedKey` getter from `exercise.component.ts`
- [x] 2.4 Remove `.key-feedback-row`, `.key-display-box`, and `.key-display-error` CSS rules from `exercise.component.css`
- [x] 2.5 Update the shared `.zoom-char, .key-display-box { ... }` rule in `exercise.component.css` to `.zoom-char { ... }` (remove the dead `,  .key-display-box` selector)
- [x] 2.6 Remove the `'exposes a blank pressed-key display until a running key press is captured'` test from `exercise.component.requirements.test.ts` (tests `displayedPressedKey` which is being deleted); add tests verifying that a correct key press sets `isLastKeyWrong` to `false` (green highlight) and a wrong key press sets it to `true` (red highlight), confirming correctness determination is owned by `ExerciseComponent`

## 3. SettingsService — raise stream size maximum

- [x] 3.1 Change `STREAM_SIZE_MAX` from `1` to `1.5` in `settings.service.ts`
- [x] 3.2 Update the `'clamps stream size updates to supported range'` test in `settings.service.requirements.test.ts`: change `service.setStreamSizeValue(2); expect(service.getStreamSizeValue()).toBe(1)` to `toBe(1.5)`

## 4. Verification

- [x] 4.1 `npm test` — all tests pass with no failures
- [x] 4.2 `npm run build:angular` — build completes successfully
