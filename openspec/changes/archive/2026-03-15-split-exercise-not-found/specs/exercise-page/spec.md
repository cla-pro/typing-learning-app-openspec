## MODIFIED Requirements

### Requirement: Invalid or missing exercise id error page
The system SHALL redirect to a dedicated exercise-not-found page when the exercise id is missing or does not match any configuration, and this validation MUST occur during `ExerciseComponent` initialization.

#### Scenario: Missing exercise id redirects to dedicated page
- **WHEN** the exercise page initializes without a usable exercise id parameter
- **THEN** the page triggers Angular Router navigation to the exercise-not-found route

#### Scenario: Invalid exercise id redirects to dedicated page
- **WHEN** a user navigates to an exercise id that is not present in `ExerciseConfigService`
- **THEN** the page triggers Angular Router navigation to the exercise-not-found route

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

#### Scenario: Exercise tests avoid implementation-text assertions
- **WHEN** exercise-page requirements tests are authored or maintained
- **THEN** they do not load source files to assert the presence of specific code fragments

## REMOVED Requirements

### Requirement: Error page recovery navigation
**Reason**: Recovery navigation has moved from inline exercise-component error rendering to the dedicated exercise-not-found page capability.
**Migration**: Validate home-button recovery behavior in the `exercise-not-found-page` capability tests and related page-navigation tests.
