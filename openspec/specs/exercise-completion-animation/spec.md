## Purpose

Completion celebration overlay behavior and animation sequencing shown after an exercise reaches completed state.

## Requirements

### Requirement: Completion celebration renders as a centered half-page overlay component
The system SHALL provide a dedicated completion celebration component that is rendered as an overlay above the exercise screen, centered within the page, and constrained to approximately half of the exercise page area.

#### Scenario: Overlay component appears after exercise completion
- **WHEN** the exercise runtime transitions to `completed`
- **THEN** the completion celebration is rendered as its own component above the exercise screen

#### Scenario: Overlay component is centered and half-page sized
- **WHEN** the completion celebration component is visible
- **THEN** its container is centered on the exercise page and sized to roughly half of the page dimensions

### Requirement: First celebration GIF is selected by star bucket with randomized choice
The system SHALL select the first completion animation GIF from `assets/animation-completion/<stars>/`, where `<stars>` is the achieved star count (`0`, `1`, `2`, or `3`), and SHALL randomly choose one GIF from the matching folder for each completion display.

#### Scenario: Star count maps to matching completion bucket
- **WHEN** a user finishes an exercise with `2` stars
- **THEN** the first GIF is selected from `assets/animation-completion/2/`

#### Scenario: Random GIF is chosen from bucket
- **WHEN** multiple GIF files exist in the selected star bucket
- **THEN** the first animation uses one randomly selected GIF from that bucket

### Requirement: Star celebration GIF plays immediately after first animation phase
The system SHALL show a second animation phase immediately after the first completion GIF phase and SHALL source that second GIF from `assets/start-gifs/<stars>-stars.gif` using the same achieved star count.

#### Scenario: Follow-up star GIF starts after first phase
- **WHEN** the first completion GIF phase ends
- **THEN** the second animation phase begins without an intermediate idle gap

#### Scenario: Follow-up star GIF path uses star-count naming convention
- **WHEN** a user completes an exercise with `3` stars
- **THEN** the second animation uses `assets/start-gifs/3-stars.gif`

### Requirement: Completion celebration remains visible until explicit user action
The system SHALL keep the completion celebration component visible after the second star GIF phase finishes and SHALL NOT dismiss the component automatically on timer or animation-end alone.

#### Scenario: Overlay does not auto-dismiss after animation phases
- **WHEN** the first and second celebration GIF phases have both finished playback
- **THEN** the completion celebration overlay remains visible
- **AND** it remains visible until the user clicks one of the component action buttons

### Requirement: Completion celebration provides retry and confirm actions
The system SHALL render two action buttons inside the completion celebration component: a retry action and an OK action.

#### Scenario: Retry action is presented with retry iconography
- **WHEN** the completion celebration overlay is shown
- **THEN** it includes a retry button with iconography representing a circular self-returning arrow

#### Scenario: Confirm action is presented as OK
- **WHEN** the completion celebration overlay is shown
- **THEN** it includes an OK button for leaving the completed exercise view

### Requirement: OK action routes to caller-provided destination
The system SHALL accept a destination route input for the completion celebration component and SHALL navigate to that provided destination when the OK action is clicked.

#### Scenario: OK click routes to provided destination input
- **WHEN** the completion celebration component receives a destination input route
- **AND** the user clicks the OK button
- **THEN** the application navigates to the provided destination route

### Requirement: Automated test coverage for completion celebration animation behavior
The system SHALL include automated tests that verify overlay rendering, centered half-page layout treatment, star-bucket GIF selection, random selection behavior, two-phase animation sequencing, action-button rendering, destination-input routing behavior, and non-auto-dismiss behavior through observable component behavior.

#### Scenario: Overlay rendering and sizing are tested
- **WHEN** completion celebration requirements tests are executed
- **THEN** tests verify that the component appears as a centered overlay with half-page sizing treatment

#### Scenario: Two-phase animation sequencing is tested
- **WHEN** completion celebration requirements tests are executed
- **THEN** tests verify that a star-bucket completion GIF is shown first and the corresponding `assets/start-gifs/<stars>-stars.gif` is shown second

#### Scenario: Action and persistence behavior are tested
- **WHEN** completion celebration requirements tests are executed
- **THEN** tests verify that retry and OK buttons are rendered
- **AND** tests verify the overlay remains visible after animation playback until one of those actions is clicked
