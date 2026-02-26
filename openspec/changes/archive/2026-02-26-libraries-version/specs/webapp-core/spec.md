## MODIFIED Requirements

### Requirement: Project structure and tooling
The system SHALL include npm configuration, build scripts, and standard project directories for web development, and MUST define dependency management rules that keep all direct dependencies and devDependencies at the most recent versions compatible with the current Angular baseline, with Angular upgrades executed through Angular CLI (`ng update`).

#### Scenario: npm scripts are available
- **WHEN** running `npm start` in the project root
- **THEN** the development server starts successfully

#### Scenario: Project structure is organized
- **WHEN** a developer clones the project
- **THEN** they find `/src` for source code, `/public` for static assets, and clear configuration files

#### Scenario: Dependency versions follow latest-compatible policy
- **WHEN** maintainers add or update a direct dependency
- **THEN** the selected version is the newest available release that is compatible with the current Angular baseline

#### Scenario: Angular upgrade uses Angular CLI path
- **WHEN** maintainers upgrade Angular framework packages and CLI/tooling
- **THEN** they run the upgrade via Angular CLI (`ng update`) before upgrading non-Angular direct dependencies

#### Scenario: Incompatible latest release is handled consistently
- **WHEN** a dependency's absolute latest release conflicts with current Angular compatibility
- **THEN** maintainers choose the highest Angular-compatible release and record the temporary exception for later review
