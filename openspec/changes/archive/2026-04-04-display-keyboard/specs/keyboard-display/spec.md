## ADDED Requirements

### Requirement: Layout keymaps are exposed for supported keyboard layouts
The system SHALL expose raw keyboard keymap data for each supported keyboard layout through `KeyboardLayoutService`.

#### Scenario: Raw keymap is returned for a supported layout
- **WHEN** a consumer requests the keymap for `fr-ch`
- **THEN** `KeyboardLayoutService` returns raw row-and-key data for that layout

#### Scenario: Raw keymap includes non-typing keys
- **WHEN** a consumer requests a supported layout keymap
- **THEN** the returned keymap includes visible non-typing and modifier keys such as Tab, Shift, and Enter

### Requirement: Keyboard rendering is provided by a pluggable reusable component
The system SHALL provide keyboard rendering through a dedicated `KeyboardDisplayComponent` that can be used by multiple parent components.

#### Scenario: Reusable keyboard component can be composed by different parents
- **WHEN** a parent component needs to display a keyboard layout
- **THEN** it composes `KeyboardDisplayComponent` with layout and impacted-key inputs instead of duplicating keyboard markup

### Requirement: Key labels use primary visible legends in first iteration
The system SHALL render key labels from the primary visible character legends for each key in the selected layout.

#### Scenario: Primary legends are used for key display
- **WHEN** a supported layout keymap is rendered
- **THEN** each key shows its primary visible legend and does not include modified-layer legends in this iteration

### Requirement: Keyboard key state is derived from exercise impacted keys
The system SHALL determine keyboard key enabled-state from the current exercise configuration's `impactedKeys`, with impacted keys enabled and all other visible keys disabled.

#### Scenario: Impacted keys are enabled
- **WHEN** the keyboard is rendered for an exercise with impacted keys
- **THEN** keys whose labels are in `impactedKeys` are rendered with enabled state

#### Scenario: Non-impacted keys are disabled
- **WHEN** the keyboard is rendered for an exercise with impacted keys
- **THEN** all other visible keys are rendered with disabled state

### Requirement: Enabled and disabled keys use first-step uniform coloring
The system SHALL use the same base key color for enabled keys in this first iteration, while disabled keys SHALL be greyed out.

#### Scenario: Enabled keys share one normal style
- **WHEN** enabled keys are rendered
- **THEN** they use the same normal color styling without per-key semantic color differences

#### Scenario: Disabled keys are greyed out
- **WHEN** disabled keys are rendered
- **THEN** they use a greyed-out disabled visual style