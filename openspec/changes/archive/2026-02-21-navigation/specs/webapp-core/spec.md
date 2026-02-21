## ADDED Requirements

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

## MODIFIED Requirements

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
