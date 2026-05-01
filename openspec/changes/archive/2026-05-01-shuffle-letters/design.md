## Context

Typing scenario data is defined as static arrays of `ExerciseConfig` objects in per-layout data modules under `src/app/data/`. Each config carries an `expectedChars: string[]` array — the canonical, immutable sequence for that exercise. `ExerciseComponent` loads this array into `expectedCharsToDisplay` during `ngOnInit` and works from that copy at runtime. The runtime state machine starts in `opened`, transitions to `running` on the first toggle, and ends in `completed`.

The shuffle feature needs to be opt-in (some scenarios benefit from repetition in a fixed order), must not mutate source data, and must reset to the canonical order on each page open.

## Goals / Non-Goals

**Goals:**
- Allow individual exercises to declare themselves as shufflable via an optional model property
- Show a Shuffle button before the exercise starts (state `opened`) when that property is true
- Shuffle only the session-local copy of `expectedChars`; the button can be pressed multiple times
- Hide the button as soon as the exercise transitions to `running`
- Reset to the canonical sequence each time the exercise page is opened (navigation or route re-activation)

**Non-Goals:**
- Persisting the shuffle state across page loads
- Providing a seeded or reproducible shuffle (pure randomness is sufficient)
- Auto-shuffling without user action
- Exposing a shuffle setting at the category level

## Decisions

### Decision: Add `shufflable?: boolean` to `ExerciseConfig`

The flag belongs on `ExerciseConfig` (the per-exercise model) because shufflability is an intrinsic property of an exercise's character set, not a user preference or a category-level concept. It is optional and defaults to `undefined`/falsy so all existing exercises remain unaffected without changes to data files.

*Alternative considered*: A separate `shufflableExercises: string[]` list in a service — rejected because it separates related data and makes the model harder to understand.

### Decision: Shuffle only `expectedCharsToDisplay` (the session copy)

`ExerciseComponent` already copies `exerciseConfig.expectedChars` into `this.expectedCharsToDisplay` in `ngOnInit`. The shuffle operation mutates that local array in-place (or replaces it with a shuffled copy) without touching the source data. Because `ngOnInit` always resets `expectedCharsToDisplay` from the config on each route activation, the canonical order is automatically restored on re-open.

*Algorithm*: Fisher-Yates shuffle, implemented inline in the component — no external library needed.

### Decision: Shuffle button visibility is driven by runtime state and the `shufflable` flag

A computed getter `get isShuffleAvailable(): boolean` returns `true` when `exerciseConfig.shufflable === true` AND `exerciseRuntimeState === 'opened'`. The button is therefore only visible in the strict pre-start state — it does **not** reappear when the exercise is paused (`pending` state). Once the exercise has been started for the first time, the button is gone for the remainder of the session. The template uses `@if` on this getter with no additional teardown logic required.

### Decision: Shuffle button label is translated via ngx-translate

The button label uses the existing `TranslateModule` / `translate` pipe (already imported in `ExerciseComponent`). A new key `exercise.shuffle` is added to each of the three i18n JSON files (`fr-ch.json`, `de-ch.json`, `en-us.json`). Translations:

| Locale  | Key              | Value           |
|---------|------------------|-----------------|
| fr-ch   | `exercise.shuffle` | `Mélanger`    |
| de-ch   | `exercise.shuffle` | `Mischen`     |
| en-us   | `exercise.shuffle` | `Shuffle`     |

### Decision: Store `shufflable` on the component from config, not re-read from config

When the exercise loads, `this.isShufflable = exerciseConfig.shufflable ?? false` is stored alongside the other fields. This keeps the template bound to a simple boolean on the component rather than reaching into a config object, consistent with how `exerciseName`, `impactedKeys`, etc. are handled.

## Risks / Trade-offs

- [Risk: Fisher-Yates randomness quality] → `Math.random()` is not cryptographically random but is perfectly adequate for a learning UX shuffle. No mitigation needed.
- [Risk: Shuffle button present but exercise config changes mid-session] → Not possible: route re-activation calls `ngOnInit` which fully resets state including `isShufflable`.
- [Risk: Shuffle button reappearing after pause] → Mitigated by design: `isShuffleAvailable` is gated on `opened` only, not `opened || pending`.
- [Trade-off: `shufflable` defaults to absent/falsy] → Existing exercises silently opt out; new exercises must explicitly set it. This is the correct default — "fixed order" is the safe, current behavior.

## Migration Plan

1. Add `shufflable?: boolean` to `ExerciseConfig` interface
2. Implement `shuffleExpectedChars()` method and `isShuffleAvailable` getter in `ExerciseComponent`
3. Populate `isShufflable` from config in `ngOnInit`
4. Add the Shuffle button to the exercise template (pre-start controls area)
5. Add `shufflable: true` to every exercise in `fr-ch.exercise-categories.ts` and `de-ch.exercise-categories.ts` **except** those in the `Histoires` and `Geschichten` categories
6. Add `exercise.shuffle` translation key to `fr-ch.json`, `de-ch.json`, and `en-us.json`
7. Add tests for shuffle button visibility (opened only, not pending/completed), shuffle re-randomization, and post-start button absence

Rollback: removing `shufflable` from data files and model reverts the feature completely with no other side-effects.

## Open Questions

*(none)*

## Shuffle Assignment

All exercises are `shufflable: true` **except** those in story/narrative categories, where the fixed order is part of the content:

| Layout | Category excluded | Reason |
|--------|-------------------|--------|
| fr-ch  | `Histoires`       | Story text — sequence is the narrative |
| de-ch  | `Geschichten`     | Story text — sequence is the narrative |

Every other category (home row, upper row, lower row, finger drills, mix caps) gets `shufflable: true` on all their exercises.
