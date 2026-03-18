## 1. Focus Management Implementation

- [x] 1.1 Add a template reference for the exercise content container and expose it through `ViewChild` in `ExerciseComponent`
- [x] 1.2 Move keyboard focus to the exercise content container whenever `toggleRuntimeState()` transitions the exercise into `running`
- [x] 1.3 Preserve existing runtime behavior for `opened`, `pending`, and `completed` states while applying the focus change only on entry to `running`

## 2. Verification

- [x] 2.1 Add or update component requirements tests to verify focus leaves the runtime button on both start and resume
- [x] 2.2 Add or update component requirements tests to verify pressing Space while running does not trigger an unintended pause
- [x] 2.3 Run the automated test suite and confirm the exercise-page behavior remains green
