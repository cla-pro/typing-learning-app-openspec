## Purpose

Core web application infrastructure providing HTTP server functionality, static file serving, and standard project tooling for the typing learning application.

## Requirements

### Requirement: Web application server initialization
The system SHALL provide a running HTTP web server that listens on a configurable port (default 3000) and serves HTTP requests.

#### Scenario: Server starts successfully
- **WHEN** the application is started with `npm start`
- **THEN** the server listens on port 3000 and is ready to accept HTTP requests

#### Scenario: Server responds to requests
- **WHEN** a client makes an HTTP GET request to `http://localhost:3000/`
- **THEN** the server responds with HTTP status 200 and serves the home page

### Requirement: Angular SPA hosting with fallback routing
The system SHALL host the Angular single-page application and implement fallback routing to support client-side Angular Router navigation.

#### Scenario: Angular host serves app shell for routed paths
- **WHEN** a client makes a request to any URL path (e.g., `/`, `/exercices/basic-typing`, `/any/path`)
- **THEN** the host serves the Angular application's app shell (index.html)

#### Scenario: Angular handles routing after initial load
- **WHEN** the Angular application loads in the browser
- **THEN** Angular Router takes over navigation without requiring server round-trips

#### Scenario: Direct URL access works correctly
- **WHEN** a user directly enters a client-side route in the browser (e.g., `/exercices/typing-101`)
- **THEN** the host serves the Angular app shell and Angular Router displays the correct page

### Requirement: Static file serving
The system SHALL serve static files (HTML, CSS, JavaScript) including bundled Angular application files from the Angular build output directory.

#### Scenario: Static files are accessible
- **WHEN** a client requests a static asset (e.g., `/style.css`, `/main.js`, or Angular bundle files)
- **THEN** the server responds with the correct content type and file contents

#### Scenario: Missing static files return 404
- **WHEN** a client requests a static file that does not exist
- **THEN** the server responds with HTTP status 404

#### Scenario: Angular bundle files are served
- **WHEN** a client requests Angular-generated JavaScript files
- **THEN** the host serves the files from the Angular build output directory

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
