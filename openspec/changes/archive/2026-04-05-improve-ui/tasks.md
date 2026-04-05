## 1. KeyboardDisplayComponent — enabled key blue coloring

- [x] 1.1 In `keyboard-display.component.css`, update the `.keyboard-key` rule: change `background-color` to `#d4ecf7`, `color` to `#1565a5`, and `border` color to `#91c4e8` — the `.keyboard-key-disabled` and highlight classes already override this via source order, so no other changes are needed

## 2. ExerciseComponent — control panel layout

- [x] 2.1 In `exercise.component.html`, wrap the `<button class="runtime-button">` and `<span class="error-counter">` in a new `<div class="control-panel">`, with the button first and the counter second (counter sits to the right of the button in the flex row)
- [x] 2.2 In `exercise.component.css`, add a `.control-panel` rule: `display: flex; align-items: center; gap: 1.5rem;`

## 3. Verification

- [x] 3.1 `npm test` — all tests pass with no failures
- [x] 3.2 `npm run build:angular` — build completes successfully
