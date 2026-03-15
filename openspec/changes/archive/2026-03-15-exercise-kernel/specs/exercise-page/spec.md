## MODIFIED Requirements

### Requirement: Exercise configuration-driven page rendering
The system SHALL render exercise-page content based on configuration resolved from `ExerciseConfigService` using the exercise id from the route, and SHALL use `expectedChars` as the expected-character source for runtime progression display.

#### Scenario: Valid exercise id loads configuration
- **WHEN** a user navigates to an exercise route with a valid exercise id
- **THEN** the page retrieves the matching exercise configuration from `ExerciseConfigService`

#### Scenario: Exercise metadata is rendered
- **WHEN** a valid exercise configuration is resolved
- **THEN** the page displays the exercise name at the top, renders expected characters from `expectedChars`, and renders configured impacted keys

### Requirement: Automated test coverage for introduced exercise-page changes
The system SHALL include automated tests for service behavior and page integration introduced by this change, and those tests MUST validate behavior through public APIs and observable outcomes rather than source-file text inspection.

#### Scenario: ExerciseConfigService is tested
- **WHEN** test suites are executed
- **THEN** tests verify listing exercises and resolving exercise configuration by id, including not-found outcomes, through public service API calls

#### Scenario: Exercise page integration is tested
- **WHEN** test suites are executed
- **THEN** tests verify valid-id rendering and invalid/missing-id redirection behavior through component interaction and observable outcomes

#### Scenario: Exercise runtime lifecycle and key capture are tested
- **WHEN** test suites are executed
- **THEN** tests verify lifecycle state transitions, start/pause button-label switching, temporary completion transition, and running-state key capture/display via observable page behavior

#### Scenario: Exercise redirection test exists for invalid lookup
- **WHEN** exercise component requirements tests are executed
- **THEN** at least one test asserts Angular Router navigation is triggered when exercise lookup fails during initialization

#### Scenario: Exercise progression behavior is tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify active expected-character initialization, progression only on exact match, case-sensitive matching, and completion transition on the final expected character

#### Scenario: Exercise tests avoid implementation-text assertions
- **WHEN** exercise-page requirements tests are authored or maintained
- **THEN** they do not load source files to assert the presence of specific code fragments
