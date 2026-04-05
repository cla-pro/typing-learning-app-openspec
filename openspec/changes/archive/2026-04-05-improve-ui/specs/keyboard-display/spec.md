## MODIFIED Requirements

### Requirement: Enabled and disabled keys use distinct coloring
The system SHALL render enabled keys in a distinct blue color and disabled keys in a greyed-out color, making impacted (enabled) keys immediately distinguishable from non-impacted (disabled) keys.

#### Scenario: Enabled keys are rendered in blue
- **WHEN** enabled keys are rendered
- **THEN** they use a blue fill and text color that is clearly distinguishable from the disabled grey style

#### Scenario: Disabled keys are greyed out
- **WHEN** disabled keys are rendered
- **THEN** they use a greyed-out disabled visual style
