## MODIFIED Requirements

### Requirement: Tortoise game host component resolves game configuration
The system SHALL provide a tortoise game host component that extracts the `gameId` route parameter, requests the corresponding configuration from `RewardGamesConfigService`, renders the tortoise visualization when a configuration is found, and renders a not-found state when no configuration is found.

#### Scenario: Valid game ID loads configuration and renders visualization
- **WHEN** the tortoise game host component is activated with a `gameId` that exists in `RewardGamesConfigService`
- **THEN** the component loads the tortoise game configuration and provides it to the tortoise visualization for rendering

#### Scenario: Unknown game ID redirects to not-found
- **WHEN** the tortoise game host component is activated with a `gameId` that does not exist in `RewardGamesConfigService`
- **THEN** the application redirects to the exercise-not-found page

### Requirement: Automated test coverage for reward-game-tortoise-base
The system SHALL include automated tests that verify tortoise host component configuration loading and not-found redirection, generic grid primitive reusability, `RewardGamesConfigService` lookup behaviour, and host integration with the tortoise visualization component.

#### Scenario: Tortoise host component tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the host component loads config for a known `gameId`, passes it to the tortoise visualization, and redirects to not-found for an unknown `gameId`

#### Scenario: RewardGamesConfigService tests are executed
- **WHEN** the test suite runs
- **THEN** tests verify that the service returns a configuration for a known `gameId` and a falsy value for an unknown `gameId`
