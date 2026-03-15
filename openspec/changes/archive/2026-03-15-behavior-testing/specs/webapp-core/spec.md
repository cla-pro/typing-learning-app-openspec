## ADDED Requirements

### Requirement: Requirements-test policy enforcement in project tooling
The system SHALL provide project-level tooling checks that enforce behavior-oriented requirements testing and forbid direct source-inspection assertions.

#### Scenario: Policy check is available in project workflow
- **WHEN** maintainers run project verification for requirements tests
- **THEN** a policy check validates compliance with behavior/public-API testing constraints

#### Scenario: Policy check reports violations clearly
- **WHEN** forbidden source-inspection patterns are detected in requirements tests
- **THEN** tooling reports actionable failures identifying the violating tests and pattern category

### Requirement: Application requirements tests cover behavior contracts end-to-end
The system SHALL ensure requirements tests under application scope validate behavior contracts for routing, services, and component interactions.

#### Scenario: Routing behavior coverage exists
- **WHEN** requirements tests run for application routing
- **THEN** they validate route outcomes through router behavior rather than route-source text matching

#### Scenario: Service behavior coverage exists
- **WHEN** requirements tests run for application services
- **THEN** they validate public method behavior contracts, including expected success and not-found outcomes

#### Scenario: Component interaction coverage exists
- **WHEN** requirements tests run for application components
- **THEN** they validate user-observable interactions and rendered-state transitions through behavior assertions
