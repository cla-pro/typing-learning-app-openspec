## MODIFIED Requirements

### Requirement: Supported keyboard layouts are exposed
The system SHALL expose the currently supported keyboard layouts.

#### Scenario: Initial supported layouts are returned
- **WHEN** a consumer requests supported keyboard layouts
- **THEN** the service returns exactly `fr-ch` and `de-ch`

### Requirement: Chosen keyboard layout is available and persisted
The system SHALL expose the currently chosen keyboard layout, SHALL persist layout changes in local storage under `layout.selected`, and SHALL restore a valid persisted layout on later sessions.

#### Scenario: Initial chosen layout is fr-ch
- **WHEN** a consumer requests the chosen keyboard layout with no valid persisted selection
- **THEN** the service returns `fr-ch`

#### Scenario: Persisted chosen layout is restored
- **WHEN** local storage contains a supported layout value under `layout.selected`
- **THEN** the service returns that stored layout as the chosen layout

#### Scenario: Unsupported persisted layout falls back to default
- **WHEN** local storage contains an unsupported value under `layout.selected`
- **THEN** the service ignores that value and returns `fr-ch`

#### Scenario: Chosen layout can be updated and persisted
- **WHEN** a consumer sets the chosen layout to a supported layout
- **THEN** the service updates the chosen layout and stores that value under `layout.selected`

#### Scenario: Unsupported chosen layout is rejected
- **WHEN** a consumer attempts to set the chosen layout to an unsupported value
- **THEN** the chosen layout remains unchanged

### Requirement: Automated test coverage for keyboard layout filtering
The system SHALL include automated tests that verify supported layouts, chosen layout, layout persistence, and layout-based category filtering behavior.

#### Scenario: Layout filtering behavior is tested
- **WHEN** requirements tests are executed
- **THEN** tests verify that category retrieval includes only categories compatible with the requested layout

#### Scenario: Layout persistence behavior is tested
- **WHEN** requirements tests are executed
- **THEN** tests verify persisted layout restore, update, and invalid-value fallback behavior
