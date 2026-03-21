## Purpose

Typing scenario data organization for exercise categories and exercises used by the typing learning application.

## Requirements

### Requirement: Typing scenarios are externalized from ExerciseConfigService
The system SHALL define exercise categories and exercises in external data modules under `src/app/data`, and `ExerciseConfigService` SHALL consume that data instead of embedding hardcoded scenario lists in the service implementation.

#### Scenario: Service provides categories from external scenario data
- **WHEN** exercise categories are requested through `ExerciseConfigService`
- **THEN** returned categories are sourced from external typing-scenario data modules under `src/app/data`

### Requirement: Typing scenarios are split per keyboard layout
The system SHALL organize typing scenario/category data by keyboard layout in per-layout modules and SHALL keep compatibility metadata aligned with each layout-specific source.

#### Scenario: Per-layout scenario modules are available
- **WHEN** developers inspect typing-scenario data sources
- **THEN** data is split into layout-specific modules rather than a single monolithic list

#### Scenario: Layout compatibility remains explicit in category data
- **WHEN** categories are loaded from per-layout scenario modules
- **THEN** each category still exposes explicit `keyboardLayouts` compatibility metadata

### Requirement: Externalized scenario data preserves deterministic ordering
The system SHALL preserve existing category order and within-category exercise order after moving scenario data out of `ExerciseConfigService`.

#### Scenario: Category ordering is preserved after extraction
- **WHEN** categories are listed via `ExerciseConfigService`
- **THEN** category order matches the canonical order defined in external scenario modules

#### Scenario: Exercise ordering is preserved after extraction
- **WHEN** exercises are listed within a category via `ExerciseConfigService`
- **THEN** exercise order matches the canonical order defined in external scenario modules

### Requirement: Service behavior remains testable and unchanged after extraction
The system SHALL preserve existing observable behavior for category listing and exercise lookup after externalizing scenario data.

#### Scenario: Layout-filtered listing remains unchanged
- **WHEN** categories are requested with a specific keyboard layout
- **THEN** returned categories and exercises follow existing filtering and validity rules

#### Scenario: Exercise lookup by id remains unchanged
- **WHEN** an exercise is requested by id through `ExerciseConfigService`
- **THEN** lookup success and not-found behavior remain consistent with prior behavior contracts
