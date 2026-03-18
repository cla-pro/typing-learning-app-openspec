## 1. Grouped Exercise Data

- [x] 1.1 Add a category model that represents an ordered category name with its ordered exercises
- [x] 1.2 Update `ExerciseConfigService` to store exercises under ordered categories and expose a grouped listing API for the welcome page
- [x] 1.3 Preserve `getExerciseById()` behavior by resolving exercise configs from the grouped source data

## 2. Welcome Page Rendering

- [x] 2.1 Update `WelcomeComponent` to load grouped exercise categories from `ExerciseConfigService`
- [x] 2.2 Update the welcome-page template to render category sections and ordered exercise links within each section

## 3. Verification

- [x] 3.1 Update service requirements tests to verify grouped listing behavior, ordering guarantees, and unchanged id lookup behavior
- [x] 3.2 Update welcome component requirements tests to verify grouped data is rendered from the service in category and exercise order without duplication
- [x] 3.3 Run the automated test suite and confirm the grouped welcome-page behavior remains green
