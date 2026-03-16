## ADDED Requirements

### Requirement: Stream rows share a vertical center line
The system SHALL align the reduced-emphasis side stream segments and the zoomed center row on the same vertical center line so the focused expected-character stream reads as one continuous horizontal band.

#### Scenario: Stream centers align during exercise rendering
- **WHEN** the exercise page renders a stream with an active expected character
- **THEN** the left side segment, center zoom row, and right side segment share a common vertical center alignment

### Requirement: Pressed-key feedback forms a centered focus box
The system SHALL render pressed-key feedback as an unlabeled character box centered beneath the active zoom character, and the feedback box SHALL match the active zoom-character focus target in visual size.

#### Scenario: Pressed key feedback is centered beneath active character
- **WHEN** the exercise page renders the pressed-key feedback area
- **THEN** it appears as a centered character box directly below the active zoom character without any textual label

#### Scenario: Pressed key feedback matches active focus size
- **WHEN** the exercise page renders both the active zoom character and the pressed-key feedback
- **THEN** the feedback box uses the same visual footprint as the active zoom-character focus target

### Requirement: Primary control is centered beneath the feedback box
The system SHALL render a single primary start/pause control centered beneath the pressed-key feedback and SHALL style it with stronger visual emphasis than the previous compact control presentation.

#### Scenario: Primary control is stacked beneath pressed-key feedback
- **WHEN** the exercise page renders runtime controls
- **THEN** exactly one primary control is shown centered below the pressed-key feedback box

#### Scenario: Completed state shows visibly disabled control
- **WHEN** the exercise runtime state is `completed`
- **THEN** the primary control remains visible and presents a clearly recognizable disabled appearance
