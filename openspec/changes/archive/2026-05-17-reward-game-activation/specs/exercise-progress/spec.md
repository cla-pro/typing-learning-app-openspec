## ADDED Requirements

### Requirement: ExerciseProgressService aggregates stars for reward game unlock evaluation
The system SHALL extend `ExerciseProgressService` with public read APIs that aggregate earned stars for reward game unlocking. The service SHALL continue using stored per-exercise star data as the source for aggregation, SHALL expose total earned stars, and SHALL expose earned stars by stable category id for the currently selected keyboard layout.

#### Scenario: Total stars are aggregated from stored exercise star values
- **WHEN** total earned stars are requested for reward game unlocking
- **THEN** the service returns the sum of all stored `<exercise-id>_stars` values available in localStorage

#### Scenario: Category stars are aggregated for the selected layout
- **WHEN** stars by category are requested while a keyboard layout is selected
- **THEN** the service returns a mapping of stable category ids to summed earned stars for exercise categories loaded for that selected layout

#### Scenario: Category total is zero when no stars are recorded for that category
- **WHEN** stars are requested for a stable category id whose exercises have no recorded stars
- **THEN** the service returns `0` for that category id

#### Scenario: Unknown category id returns zero
- **WHEN** stars are requested for a stable category id that is not present in the selected layout's exercise categories
- **THEN** the service returns `0`

### Requirement: Automated test coverage for reward game star aggregation
The system SHALL include automated tests that verify total-star aggregation and category-star aggregation for the selected layout through the public `ExerciseProgressService` API.

#### Scenario: Selected-layout category aggregation is tested
- **WHEN** exercise progress requirements tests are executed for reward game unlocking behavior
- **THEN** tests verify that category-star aggregation uses the currently selected keyboard layout and returns values keyed by stable category ids

#### Scenario: Unknown category handling is tested
- **WHEN** exercise progress requirements tests are executed for reward game unlocking behavior
- **THEN** tests verify that an unknown stable category id returns `0`