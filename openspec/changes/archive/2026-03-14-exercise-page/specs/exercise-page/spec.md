## ADDED Requirements

### Requirement: Exercise configuration-driven page rendering
The system SHALL render exercise-page content based on configuration resolved from `ExerciseConfigService` using the exercise id from the route.

#### Scenario: Valid exercise id loads configuration
- **WHEN** a user navigates to an exercise route with a valid exercise id
- **THEN** the page retrieves the matching exercise configuration from `ExerciseConfigService`

#### Scenario: Exercise metadata is rendered
- **WHEN** a valid exercise configuration is resolved
- **THEN** the page displays the exercise name at the top and renders configured letters and impacted keys

### Requirement: Invalid or missing exercise id error page
The system SHALL display an error page when the exercise id is missing or does not match any configuration.

#### Scenario: Missing exercise id
- **WHEN** the exercise page initializes without a usable exercise id parameter
- **THEN** the page displays an error state informing that no exercise is found with this id

#### Scenario: Invalid exercise id
- **WHEN** a user navigates to an exercise id that is not present in `ExerciseConfigService`
- **THEN** the page displays an error state informing that no exercise is found with this id

### Requirement: Error page recovery navigation
The system SHALL provide a home navigation action from the invalid-exercise error page.

#### Scenario: Home button is available on error page
- **WHEN** the invalid-exercise error page is displayed
- **THEN** a home button is visible and enabled

#### Scenario: Home button returns to welcome page
- **WHEN** a user clicks the home button on the invalid-exercise error page
- **THEN** the application navigates to the root welcome page using Angular routing

### Requirement: Automated test coverage for introduced exercise-page changes
The system SHALL include automated tests for service behavior and page integration introduced by this change.

#### Scenario: ExerciseConfigService is tested
- **WHEN** test suites are executed
- **THEN** unit tests verify listing exercises and resolving exercise configuration by id, including not-found outcomes

#### Scenario: Exercise page integration is tested
- **WHEN** test suites are executed
- **THEN** integration tests verify valid-id rendering and invalid/missing-id error-page behavior
