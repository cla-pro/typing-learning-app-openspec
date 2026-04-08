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

### Requirement: Mix Caps exercise category is available for each supported keyboard layout
The system SHALL define a `Mix Caps` exercise category at the end of the category list for each supported keyboard layout (`fr-ch` and `de-ch`). Mix Caps exercises SHALL use `expectedChars` arrays that deliberately mix lowercase and uppercase characters, introducing the user to case-sensitive typing that requires using the Shift key.

#### Scenario: Mix Caps category exists for fr-ch
- **WHEN** exercise categories are requested with layout `fr-ch`
- **THEN** a category named `Mix Caps` is included in the returned list

#### Scenario: Mix Caps category exists for de-ch
- **WHEN** exercise categories are requested with layout `de-ch`
- **THEN** a category named `Mix Caps` is included in the returned list

#### Scenario: Mix Caps exercises contain mixed-case expected characters
- **WHEN** a Mix Caps exercise is loaded
- **THEN** its `expectedChars` array contains a combination of uppercase and lowercase alphabetic characters

#### Scenario: Mix Caps category is positioned at the end of the category list
- **WHEN** exercise categories are listed for any supported layout
- **THEN** the `Mix Caps` category appears after all other categories in that layout
