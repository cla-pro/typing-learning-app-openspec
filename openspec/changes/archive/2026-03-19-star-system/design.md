## Context

Exercise completion currently transitions `exerciseRuntimeState` to `completed` in `ExerciseComponent`, but no score is computed and no data is persisted. The welcome page renders exercise tiles as plain links with no state decoration.

The requested change adds two concerns that must be coordinated:

1. **Score & progress persistence**: compute a star count from the runtime error data, store it alongside a completion flag in `localStorage`.
2. **Welcome page tile decoration**: read that stored state per exercise and reflect it visually (green border, star icon).

`ExerciseComponent` already tracks `errorCount` (number of wrong key presses) and `expectedCharsToDisplay.length` (total chars). Both values are available at the moment the `completed` transition fires.

Constraints:
- Storage keys must be prefixed with the exercise id: `<id>_completed` and `<id>_stars`.
- Star thresholds are fixed: `[0, 0.05)` = 3, `[0.05, 0.15)` = 2, `[0.15, 0.25)` = 1, `[0.25, ∞)` = 0.
- The service must be injectable and testable independently of Angular components.
- Welcome page must not duplicate storage logic — reads go through the service.

## Goals / Non-Goals

**Goals:**
- Introduce `ExerciseProgressService` as the single source of truth for per-exercise completion and star state.
- `ExerciseComponent` calls `ExerciseProgressService.recordCompletion(exerciseId, errorCount, totalChars)` exactly once when transitioning to `completed`.
- Welcome page tiles display a green border when `isCompleted(id)` returns true, and a star icon (0–3) at the top-right corner of each tile.
- All persistence reads and writes go through `ExerciseProgressService`.
- Score-to-stars mapping is implemented inside `ExerciseProgressService` (not in the component).
- New requirements tests for `ExerciseProgressService`; updated welcome-page component tests.

**Non-Goals:**
- Displaying the star count or any completion badge on the exercise page itself.
- Resetting or clearing stored progress.
- History, timestamps, or best-score tracking.
- Syncing across devices or tabs.

## Decisions

### Decision: Introduce `ExerciseProgressService` in `src/app/services/`

A dedicated Angular service (`ExerciseProgressService`, `providedIn: 'root'`, using `inject()` pattern) owns all progress logic: score computation, star mapping, and `localStorage` I/O. It exposes three public methods:
- `recordCompletion(exerciseId: string, errorCount: number, totalChars: number): void` — computes score, maps to stars, writes both keys.
- `isCompleted(exerciseId: string): boolean` — reads `<id>_completed` from localStorage.
- `getStars(exerciseId: string): number` — reads `<id>_stars` from localStorage, returns 0 if missing.

Rationale: Keeps progression logic out of the component; makes it independently testable; a single injection point for welcome page and exercise page.

Alternative considered: Store in `ExerciseConfigService`. Rejected — config service holds static exercise definitions; mixing in runtime progress data would blur its responsibility.

### Decision: `ExerciseComponent` calls `recordCompletion` inline at the `completed` transition point

The call site is the existing guard in `handleExerciseKeydown` that sets `exerciseRuntimeState = 'completed'`. A single call with `this.exerciseId`, `this.errorCount`, and `this.expectedCharsToDisplay.length` is inserted before the `return`.

Rationale: The data is available at this exact point. A subscription-based approach would require additional state tracking for "first time completed" and is unnecessarily complex.

Alternative considered: React to `exerciseRuntimeState` changes via `ngDoCheck`. Rejected — side effects in change-detection hooks are fragile.

### Decision: Score ratio formula is `errorCount / totalChars`; star thresholds are `< 0.05`, `< 0.15`, `< 0.25`

```
ratio = errorCount / totalChars
3 stars: ratio < 0.05
2 stars: ratio < 0.15
1 star:  ratio < 0.25
0 stars: ratio >= 0.25
```

Edge case: if `totalChars` is 0, the service returns 3 stars (a zero-length exercise is vacuously perfect).

Rationale: Matches the specification exactly. Edge case protection prevents a divide-by-zero.

Alternative considered: Derive from a percentage displayed to the user. Rejected — display concerns are separate; the kernel stores the raw star value.

### Decision: Welcome page reads progress state eagerly in `WelcomeComponent` constructor

`WelcomeComponent` already builds its `exerciseCategories` array in the constructor from `ExerciseConfigService`. For each rendered exercise tile, call `exerciseProgressService.isCompleted(id)` and `exerciseProgressService.getStars(id)` directly in the template via a method on the component or via bound properties on enriched exercise objects.

The simplest approach: enrich each exercise with `completed` and `stars` at construction time, so the template remains stateless.

Rationale: `localStorage` reads are synchronous and cheap at this scale. Avoids adding `async` pipe complexity.

Alternative considered: Live subscription to a BehaviorSubject in the service. Rejected — not needed; the welcome page is re-created on every navigation, so constructor-time reads are always fresh.

### Decision: Star icon rendered as Unicode/emoji characters (`★` filled, `☆` empty) — no new image assets

Tile top-right overlay uses absolute positioning within the tile's relative container. Display `★★★`, `★★☆`, `★☆☆`, or `☆☆☆` depending on the star count. Completed tile gets a CSS class `exercise-link--completed` for the green border.

Rationale: No new assets, no build-pipeline changes, universally supported in browsers.

Alternative considered: SVG star icons. Rejected — adds complexity with no functional benefit at this stage.

## Risks / Trade-offs

- [`localStorage` unavailable (private mode, JSDOM in tests)] → Mitigation: wrap all storage calls in try/catch; default to `false`/`0` on read failure, silently ignore write failures. Tests use `globalThis.localStorage` which JSDOM provides.
- [Stale stars shown if user navigates away mid-exercise and back] → This is acceptable; progress only updates on completion.
- [Star icon accessibility] → Mitigation: add `aria-label` on the star display element indicating the count.
- [Tile layout breaking on star overlay with small tile size] → Mitigation: use absolute positioning so icon does not affect tile flow; test at 70px minimum tile width.

## Migration Plan

1. Create `ExerciseProgressService` with `recordCompletion`, `isCompleted`, `getStars` and localStorage I/O.
2. Inject `ExerciseProgressService` into `ExerciseComponent`; call `recordCompletion` at the `completed` transition.
3. Inject `ExerciseProgressService` into `WelcomeComponent`; enrich exercise data with `completed` and `stars` at construction time.
4. Update welcome template to apply `exercise-link--completed` class and render star overlay.
5. Add CSS for `exercise-link--completed` (green border) and `.exercise-stars` overlay (top-right).
6. Write requirements tests for `ExerciseProgressService` (record, read, edge cases).
7. Update welcome component requirements tests to cover completed/starred tile rendering.
8. Run `npm test`.

## Open Questions

None.
