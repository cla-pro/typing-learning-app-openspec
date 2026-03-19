## 1. ExerciseProgressService

- [x] 1.1 Create `src/app/services/exercise-progress.service.ts` with `@Injectable({ providedIn: 'root' })` and `inject()` pattern
- [x] 1.2 Implement `recordCompletion(exerciseId: string, errorCount: number, totalChars: number): void` — compute star count and write `<id>_completed` and `<id>_stars` to `localStorage`
- [x] 1.3 Implement private `computeStars(errorCount: number, totalChars: number): number` — apply the four-threshold ratio formula; return 3 for `totalChars === 0`
- [x] 1.4 Implement `isCompleted(exerciseId: string): boolean` — read `<id>_completed` from `localStorage`; return `false` on missing or storage error
- [x] 1.5 Implement `getStars(exerciseId: string): number` — read `<id>_stars` from `localStorage`; return `0` on missing or storage error
- [x] 1.6 Wrap all `localStorage` reads and writes in try/catch

## 2. ExerciseProgressService Tests

- [x] 2.1 Create `tests/app/services/exercise-progress.service.requirements.test.ts`
- [x] 2.2 Add test: `isCompleted` returns `false` and `getStars` returns `0` before any `recordCompletion` call
- [x] 2.3 Add test: `recordCompletion` makes `isCompleted` return `true`
- [x] 2.4 Add test: 3 stars when `errorCount = 0` (ratio `0 < 0.05`)
- [x] 2.5 Add test: 2 stars at boundary `errorCount / totalChars = 0.05`
- [x] 2.6 Add test: 1 star at boundary `errorCount / totalChars = 0.15`
- [x] 2.7 Add test: 0 stars at boundary `errorCount / totalChars = 0.25`
- [x] 2.8 Add test: 0 stars above threshold (e.g. ratio `> 0.25`)
- [x] 2.9 Add test: `totalChars = 0` defaults to 3 stars
- [x] 2.10 Add test: two different exercise ids stored and retrieved independently without cross-contamination
- [x] 2.11 Add test: second `recordCompletion` call for same id overwrites previous values

## 3. ExerciseComponent — Report Completion

- [x] 3.1 Inject `ExerciseProgressService` into `ExerciseComponent`
- [x] 3.2 In `handleExerciseKeydown`, call `exerciseProgressService.recordCompletion(this.exerciseId, this.errorCount, this.expectedCharsToDisplay.length)` immediately before setting `exerciseRuntimeState = 'completed'`

## 4. ExerciseComponent Tests

- [x] 4.1 Add test: `ExerciseProgressService.recordCompletion` is called with the correct exercise id, error count, and total char count when the exercise transitions to `completed`
- [x] 4.2 Add test: `recordCompletion` is not called when the exercise is still in `running` or `pending` state

## 5. WelcomeComponent — Tile Enrichment

- [x] 5.1 Inject `ExerciseProgressService` into `WelcomeComponent`
- [x] 5.2 Define a local interface or type for enriched exercise tiles: `{ id, name, completed, stars }`
- [x] 5.3 At construction time, build an enriched `exerciseCategoriesWithProgress` array by calling `isCompleted(id)` and `getStars(id)` for each exercise
- [x] 5.4 Update the welcome template to bind tile CSS class `exercise-link--completed` when `tile.completed` is true
- [x] 5.5 Update the welcome template to render a star indicator element in the top-right corner of each tile, displaying content from `tile.stars`, shown only when `tile.completed` is true

## 6. Welcome CSS

- [x] 6.1 Add `.exercise-link--completed` rule: green border (e.g. `border: 2px solid #27ae60`)
- [x] 6.2 Add `.exercise-stars` rule: absolute positioning at top-right of the tile, small font, visible over the tile background
- [x] 6.3 Ensure the `.exercise-link` container has `position: relative` so the star overlay positions correctly

## 7. WelcomeComponent Tests

- [x] 7.1 Update welcome component test setup to stub `ExerciseProgressService`
- [x] 7.2 Add test: tile for a completed exercise receives the `exercise-link--completed` CSS class
- [x] 7.3 Add test: tile for an incomplete exercise does not receive the `exercise-link--completed` class
- [x] 7.4 Add test: star indicator on a completed tile reflects the star count returned by `getStars`
- [x] 7.5 Add test: star indicator is absent or empty for an incomplete tile

## 8. Validation

- [x] 8.1 Run `npm test` and confirm all tests pass
