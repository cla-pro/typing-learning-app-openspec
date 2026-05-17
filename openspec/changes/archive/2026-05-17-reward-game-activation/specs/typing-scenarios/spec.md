## ADDED Requirements

### Requirement: Exercise categories expose stable ids across keyboard layouts
The system SHALL define a stable `id` field on each `ExerciseCategory`. That id SHALL be layout-independent for logically equivalent categories across supported keyboard layouts and SHALL be used as the matching contract for reward game category-based unlock criteria.

#### Scenario: Category id is present in each layout-specific category definition
- **WHEN** developers inspect exercise category definitions in layout-specific typing-scenario modules
- **THEN** each category definition includes a stable `id` field in addition to its display name and layout metadata

#### Scenario: Equivalent categories share the same id across layouts
- **WHEN** logically equivalent categories exist in more than one supported keyboard layout
- **THEN** those categories use the same stable `id` value across layout-specific datasets

#### Scenario: Category ids are unique within a layout
- **WHEN** exercise categories are loaded for a given keyboard layout
- **THEN** no two categories in that layout share the same stable `id`

### Requirement: Automated test coverage verifies stable category ids
The system SHALL include automated tests that verify the presence and stability of exercise category ids across supported keyboard layouts.

#### Scenario: Stable category ids are tested across layouts
- **WHEN** typing-scenarios requirements tests are executed
- **THEN** tests verify that equivalent category concepts in supported keyboard layouts expose the same stable `id` values