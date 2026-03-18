## MODIFIED Requirements

### Requirement: Page structure and styling
The system SHALL provide a properly structured welcome page with navigation elements and basic styling using a compact, dense layout with smaller exercise tiles arranged in responsive multi-column rows.

#### Scenario: Welcome page title is concise
- **WHEN** the welcome page loads
- **THEN** the heading displays "Typing Learning" (not "Welcome to Typing Learning")

#### Scenario: Content is visually dense and compact
- **WHEN** viewing the welcome page in a browser
- **THEN** horizontal padding/margins are reduced so content sits closer to window borders, improving information density

#### Scenario: Exercise tiles are smaller and square-like
- **WHEN** viewing exercise navigation on the welcome page
- **THEN** each exercise link tile is sized as a compact card (roughly square proportions) rather than a full-width block

#### Scenario: Multiple exercise tiles appear per row with wrapping
- **WHEN** viewing a category section with multiple exercises
- **THEN** exercise tiles are arranged horizontally in multiple columns, automatically wrapping to new rows as needed based on available viewport width

#### Scenario: A minimal visual presentation
- **WHEN** viewing the welcome page in a browser
- **THEN** the page displays cleanly with readable typography, compact spacing, and tile-based navigation (no broken styling)

#### Scenario: Navigation links are styled and responsive
- **WHEN** viewing the welcome page
- **THEN** navigation links to exercises are clearly visible as compact cards with proper styling and responsive behavior
