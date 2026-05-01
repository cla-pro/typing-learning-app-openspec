## 1. Data Model

- [x] 1.1 Add optional `shufflable?: boolean` property to the `ExerciseConfig` interface in `src/app/models/exercise-config.model.ts`

## 2. Scenario Data

- [x] 2.1 Add `shufflable: true` to every exercise in `src/app/data/typing-scenarios/fr-ch.exercise-categories.ts` except those in the `Histoires` category
- [x] 2.2 Add `shufflable: true` to every exercise in `src/app/data/typing-scenarios/de-ch.exercise-categories.ts` except those in the `Geschichten` category

## 3. Translations

- [x] 3.1 Add `"exercise.shuffle": "Mélanger"` to `src/assets/i18n/fr-ch.json`
- [x] 3.2 Add `"exercise.shuffle": "Mischen"` to `src/assets/i18n/de-ch.json`
- [x] 3.3 Add `"exercise.shuffle": "Shuffle"` to `src/assets/i18n/en-us.json`

## 4. Component Logic

- [x] 4.1 Add `isShufflable: boolean` field to `ExerciseComponent` and populate it from `exerciseConfig.shufflable ?? false` in `ngOnInit`
- [x] 4.2 Add `get isShuffleAvailable(): boolean` getter returning `this.isShufflable && this.exerciseRuntimeState === 'opened'`
- [x] 4.3 Implement `shuffleExpectedChars()` method using Fisher-Yates shuffle on `this.expectedCharsToDisplay`

## 5. Template

- [x] 5.1 Add the shuffle button to `exercise.component.html` in the pre-start controls area, conditioned on `isShuffleAvailable`, bound to `shuffleExpectedChars()`, with label `{{ 'exercise.shuffle' | translate }}`

## 6. Tests

- [x] 6.1 Add test: shuffle button is visible when `shufflable: true` and state is `opened`
- [x] 6.2 Add test: shuffle button is absent when `shufflable` is not set
- [x] 6.3 Add test: shuffle button is absent when state is `pending` (paused)
- [x] 6.4 Add test: shuffle button is absent when state is `running`
- [x] 6.5 Add test: shuffle button is absent when state is `completed`
- [x] 6.6 Add test: pressing shuffle reorders `expectedCharsToDisplay`
- [x] 6.7 Add test: pressing shuffle multiple times is allowed before starting
- [x] 6.8 Add test: `expectedCharsToDisplay` is reset to canonical sequence on page re-open (route re-activation)
