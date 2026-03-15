## Purpose

Project-wide testing policy for behavior-oriented requirements tests that validate public APIs and observable outcomes.

## Requirements

### Requirement: Requirements tests are behavior-oriented
The system SHALL implement requirements tests that validate observable behavior and public APIs rather than implementation text.

#### Scenario: Route behavior is validated through navigation outcomes
- **WHEN** requirements tests validate application routing behavior
- **THEN** tests assert navigation outcomes and routed states through router behavior, not source-file string inspection

#### Scenario: Service behavior is validated through public methods
- **WHEN** requirements tests validate `ExerciseConfigService`
- **THEN** tests call public service methods (`listExercises`, `getExerciseById`) and assert returned behavior contracts

#### Scenario: Component behavior is validated through interactions
- **WHEN** requirements tests validate component behavior
- **THEN** tests simulate user-visible interactions and assert rendered/output state transitions

### Requirement: Source-file inspection is forbidden in requirements tests
The system SHALL prohibit direct source-file loading for implementation-text assertions in requirements tests.

#### Scenario: Direct source reads are not used as test oracle
- **WHEN** requirements tests are implemented or updated
- **THEN** they do not rely on loading source files to assert code snippets as pass/fail criteria

#### Scenario: Public API remains the testing contract
- **WHEN** requirements tests verify class/component/service behavior
- **THEN** they assert through public APIs and externally observable outcomes

### Requirement: Requirements-test policy is enforced by automated checks
The system SHALL provide an automated check that fails when forbidden source-inspection patterns are used in requirements tests.

#### Scenario: Lint/check fails on forbidden source inspection
- **WHEN** requirements tests introduce forbidden direct source-inspection patterns (for example `fs.readFileSync` used as implementation-text oracle)
- **THEN** the check fails with actionable output

#### Scenario: Lint/check passes for compliant behavior tests
- **WHEN** requirements tests use behavior/public-API assertions without forbidden source inspection
- **THEN** the check passes

### Requirement: TestBed usage is selective and DI-driven
The system SHALL use Angular TestBed in requirements tests only where dependency injection participation makes it materially useful.

#### Scenario: TestBed is used for DI-heavy behavior tests
- **WHEN** a requirements test depends on Angular dependency injection wiring
- **THEN** the test uses TestBed setup appropriate to that behavior

#### Scenario: Lightweight tests avoid unnecessary TestBed usage
- **WHEN** a requirements test can validate behavior through a simpler harness without DI setup
- **THEN** the test does not require TestBed

### Requirement: inject API is preferred over constructor injection
The system SHALL use Angular `inject()` for dependency injection in components and services instead of constructor-parameter injection when injecting framework-managed dependencies.

#### Scenario: New dependency-injected class follows inject API style
- **WHEN** a component or service introduces dependency injection
- **THEN** dependencies are obtained with `inject()` rather than constructor parameters

#### Scenario: Existing constructor injection is migrated when touched
- **WHEN** a dependency-injected component or service is modified as part of this change
- **THEN** constructor-parameter injection is replaced by `inject()` where practical
