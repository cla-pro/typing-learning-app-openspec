## Purpose

Base routing, host component, configuration service, and generic grid primitives for the tortoise reward game (without kernel logic).

## Requirements

### Requirement: Tortoise game host component resolves game configuration
The system SHALL provide a tortoise game host component that extracts the `gameId` route parameter, requests the corresponding configuration from `RewardGamesConfigService`, and renders a not-found state when no configuration is found.

#### Scenario: Valid game ID loads configuration
- **WHEN** the tortoise game host component is activated with a `gameId` that exists in `RewardGamesConfigService`
- **THEN** the component loads the tortoise game configuration and makes it available for rendering

#### Scenario: Unknown game ID redirects to not-found
- **WHEN** the tortoise game host component is activated with a `gameId` that does not exist in `RewardGamesConfigService`
- **THEN** the application redirects to the exercise-not-found page

### Requirement: Generic grid position primitives
The system SHALL provide domain-independent grid coordinate types and position classes that are not semantically tied to the tortoise game or any other single game, and that can be composed into game-specific configuration types.

#### Scenario: Grid position is reusable in tortoise configuration
- **WHEN** the tortoise game configuration model is defined
- **THEN** it uses the generic grid position type for all coordinate fields (start, end, waypoints, obstacles)

#### Scenario: Grid primitives carry no tortoise-specific semantics
- **WHEN** the generic grid position type is inspected
- **THEN** its API contains no properties or methods specific to the tortoise game domain

### Requirement: Tortoise game configuration model
The system SHALL define a typed tortoise game configuration model that includes: a `gameId` string identifier; a `start` and an `end` grid position; an ordered list of `waypoints` forming a path composed only of straight horizontal or vertical segments between consecutive points; and a list of `obstacles`, each carrying a grid position and a non-empty list of characters whose sequential typing clears the obstacle.

#### Scenario: Tortoise configuration contains required fields
- **WHEN** a tortoise game configuration object is created
- **THEN** it exposes `gameId`, `start`, `end`, `waypoints`, and `obstacles` fields with the correct types

#### Scenario: Waypoints form only orthogonal path segments
- **WHEN** consecutive waypoints in a tortoise configuration are examined
- **THEN** each pair of adjacent waypoints differs on exactly one grid axis (horizontal or vertical segment only)

#### Scenario: Obstacle carries a non-empty clear-character list
- **WHEN** an obstacle in a tortoise configuration is examined
- **THEN** its clear-character list contains at least one character

### Requirement: RewardGamesConfigService provides tortoise configuration
The system SHALL provide a `RewardGamesConfigService` that holds static in-app tortoise game configuration entries and SHALL expose a method to look up a tortoise configuration by `gameId`, returning the configuration when found and a falsy value when not found.

#### Scenario: Known game ID returns configuration
- **WHEN** `RewardGamesConfigService` is queried with a `gameId` that matches a registered tortoise configuration
- **THEN** the service returns the corresponding tortoise game configuration object

#### Scenario: Unknown game ID returns falsy value
- **WHEN** `RewardGamesConfigService` is queried with a `gameId` that does not match any registered configuration
- **THEN** the service returns a falsy value

### Requirement: Automated test coverage for reward-game-tortoise-base
The system SHALL include automated tests that verify tortoise host component configuration loading and not-found redirection, generic grid primitive reusability, and `RewardGamesConfigService` lookup behaviour.

#### Scenario: Tortoise host component tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the host component loads config for a known `gameId` and redirects to not-found for an unknown `gameId`

#### Scenario: RewardGamesConfigService tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the service returns a configuration for a known `gameId` and a falsy value for an unknown `gameId`
