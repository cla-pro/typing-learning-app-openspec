## 1. Routing and new page scaffolding

- [x] 1.1 Create a dedicated exercise-not-found page component under the app components tree.
- [x] 1.2 Implement the exercise-not-found template with a shared generic message that does not display unresolved exercise id.
- [x] 1.3 Include the reusable home button on the exercise-not-found page and ensure it stays enabled.
- [x] 1.4 Add a dedicated static route for the exercise-not-found page in app routing configuration.

## 2. Exercise component refactor and redirect flow

- [x] 2.1 Inject Angular Router into ExerciseComponent for navigation on invalid/missing exercise ids.
- [x] 2.2 Update ExerciseComponent initialization to validate route id and resolve config through ExerciseConfigService.
- [x] 2.3 Redirect to the dedicated exercise-not-found route when id is missing or lookup returns undefined.
- [x] 2.4 Remove inline not-found rendering state/branch from exercise component while preserving valid runtime lifecycle and key capture behavior.

## 3. Requirements tests updates

- [x] 3.1 Update exercise component requirements tests to remove assertions tied to inline not-found rendering.
- [x] 3.2 Add a new exercise component requirements test that asserts Router navigation occurs when exercise lookup fails during initialization.
- [x] 3.3 Add or update navigation requirements tests to cover dedicated exercise-not-found route rendering.
- [x] 3.4 Add or update navigation requirements tests to cover home-button recovery from the exercise-not-found page.

## 4. Verification and quality gates

- [x] 4.1 Run the test suite and verify updated requirements tests pass.
- [x] 4.2 Run Angular build and verify routing/component changes compile successfully.
- [x] 4.3 Perform a manual route check for valid exercise, invalid/missing exercise redirect, and return-to-home behavior.
