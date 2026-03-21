## Why

The hardcoded exercise-category list inside `ExerciseConfigService` makes the service difficult to read and harder to test in isolation. Moving this dataset out of the service improves maintainability and enables clearer, more focused service tests.

## What Changes

- Move the exercise-category dataset from `ExerciseConfigService` into a dedicated external configuration module.
- Keep service behavior unchanged for callers: ordered category retrieval, layout filtering, and exercise lookup by id remain consistent.
- Update tests to validate behavior through public APIs while benefiting from the improved separation between data and service logic.
- Ensure the extracted configuration remains the single source of truth for typing scenarios and category metadata.

## Capabilities

### New Capabilities
- typing-scenarios: Define and provide exercise-category typing scenarios from an external configuration source that can be consumed by `ExerciseConfigService`.

### Modified Capabilities
- webapp-core: Project structure requirement is extended to include externalized exercise-category configuration to improve readability and testability of services.

## Impact

- Affected code: exercise configuration service, category model usage, and related requirements tests.
- Affected structure: introduction of an external typing-scenarios configuration file/module under application source.
- Risk: accidental behavior changes during extraction (ordering/filtering/lookup) must be prevented by existing and updated behavior tests.
