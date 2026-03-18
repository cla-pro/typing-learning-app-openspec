## 1. Component TypeScript

- [x] 1.1 Add `errorCount: number` property to `ExerciseComponent`, initialized to `0`
- [x] 1.2 Add `isLastKeyWrong: boolean` property to `ExerciseComponent`, initialized to `false`
- [x] 1.3 Reset `errorCount` to `0` and `isLastKeyWrong` to `false` in the exercise initialization / reset path (same place `expectedCharsToDisplay` is set)
- [x] 1.4 In `handleExerciseKeydown`, on key mismatch: increment `errorCount` and set `isLastKeyWrong = true`
- [x] 1.5 In `handleExerciseKeydown`, on key match: set `isLastKeyWrong = false` before existing progression logic

## 2. Template

- [x] 2.1 Add a conditional class binding on the pressed-key feedback section that applies an error CSS class when `isLastKeyWrong` is true
- [x] 2.2 Add an error counter element to the right of the pressed-key feedback section in the same feedback row

## 3. CSS

- [x] 3.1 Add a red text style rule for the error counter element
- [x] 3.2 Add a red treatment rule for the pressed-key feedback section error state class

## 4. Tests

- [x] 4.1 Add test: error counter is rendered to the right of pressed-key feedback and uses red text styling
- [x] 4.2 Add test: wrong key press in `running` state increments `errorCount` by 1
- [x] 4.3 Add test: correct key press in `running` state does not increment `errorCount`
- [x] 4.4 Add test: key press outside `running` state (`opened`, `pending`, `completed`) does not increment `errorCount`
- [x] 4.5 Add test: wrong key press in `running` state sets pressed-key feedback to error style
- [x] 4.6 Add test: subsequent correct key press clears pressed-key feedback error style
- [x] 4.7 Add test: `errorCount` persists after pause and resume (state transitions `running` → `pending` → `running`)
- [x] 4.8 Add test: `errorCount` is `0` when an exercise is opened, even after a prior session with errors

## 5. Validation

- [x] 5.1 Run `npm test` and confirm all tests pass
