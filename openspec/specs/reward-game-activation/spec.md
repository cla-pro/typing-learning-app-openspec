## Purpose

Reward game setup and unlock evaluation rules for activation based on earned stars.

## Requirements

### Requirement: Reward game setups define extensible unlock criteria
The system SHALL define reward game setups in shared in-app configuration rather than component-local hardcoded card state. Each setup SHALL include a unique game id, display metadata, implementation availability metadata, and an unlock criteria object containing `TotalNbStarsRequired` and `NbStarsByCategoryRequired`. The setup model SHALL support an initial set of six reward game setups and SHALL allow additional setups to be added later without changing the unlock evaluation contract.

#### Scenario: Initial reward game setup list contains six entries
- **WHEN** the reward game setup configuration is loaded for this change
- **THEN** it exposes six reward game setups through the shared reward game configuration layer

#### Scenario: Setup stores total-star unlock threshold
- **WHEN** a reward game setup is defined
- **THEN** its unlock criteria includes a `TotalNbStarsRequired` numeric threshold

#### Scenario: Setup stores category-specific unlock thresholds
- **WHEN** a reward game setup defines category-based unlock conditions
- **THEN** its unlock criteria includes a `NbStarsByCategoryRequired` mapping keyed by stable category id with numeric required star values

#### Scenario: Additional reward game setup can be added without changing the unlock contract
- **WHEN** developers introduce a new reward game setup in the future
- **THEN** the setup uses the same shared structure and unlock criteria contract as the initial six setups

### Requirement: Reward game activation requires all configured unlock criteria to match
The system SHALL evaluate a reward game setup as unlocked only when the player's earned stars satisfy every configured unlock criterion for that setup. Total-star evaluation SHALL compare earned total stars against `TotalNbStarsRequired`. Category-based evaluation SHALL compare earned stars for each listed stable category id against the corresponding value in `NbStarsByCategoryRequired`. Categories not listed in `NbStarsByCategoryRequired` SHALL impose no unlock constraint.

#### Scenario: Game unlocks when total and category requirements are all satisfied
- **WHEN** a player's earned total stars meet `TotalNbStarsRequired` and each required category id meets its configured minimum star count
- **THEN** the reward game setup is evaluated as unlocked

#### Scenario: Game remains locked when total-star requirement is not satisfied
- **WHEN** a player's earned total stars are below `TotalNbStarsRequired`
- **THEN** the reward game setup is evaluated as locked even if all category-specific requirements are satisfied

#### Scenario: Game remains locked when any category requirement is not satisfied
- **WHEN** a player's earned total stars satisfy `TotalNbStarsRequired` but at least one required category id is below its configured minimum star count
- **THEN** the reward game setup is evaluated as locked

#### Scenario: Unspecified categories do not affect unlock outcome
- **WHEN** a reward game setup omits a category from `NbStarsByCategoryRequired`
- **THEN** earned stars from that category are ignored during unlock evaluation for that setup

### Requirement: Category-based unlock evaluation uses selected keyboard layout and stable category ids
The system SHALL evaluate category-based reward game unlock requirements against the categories of the currently selected keyboard layout. Stable category ids SHALL be used as the cross-layout contract for unlock criteria so equivalent categories can be matched consistently across layout-specific scenario datasets.

#### Scenario: Selected layout controls category aggregation source
- **WHEN** category-based unlock requirements are evaluated
- **THEN** earned category stars are aggregated from exercise categories loaded for the currently selected keyboard layout

#### Scenario: Stable category ids match equivalent categories across layouts
- **WHEN** logically equivalent categories exist in multiple keyboard layout datasets
- **THEN** they share the same stable category id for reward game unlock matching

### Requirement: Automated test coverage verifies reward game activation logic
The system SHALL include automated tests that verify reward game setup configuration, conjunctive unlock evaluation, current-layout category evaluation, and stable category id matching.

#### Scenario: Unlock evaluation rules are tested
- **WHEN** reward game activation requirements tests are executed
- **THEN** tests verify unlocked and locked outcomes for total-star, category-star, and combined criteria cases

#### Scenario: Current-layout category matching is tested
- **WHEN** reward game activation requirements tests are executed
- **THEN** tests verify that category-based unlock evaluation uses the currently selected keyboard layout and stable category ids
