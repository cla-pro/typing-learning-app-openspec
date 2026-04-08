## Purpose

Supported keyboard-layout options, chosen-layout persistence, and layout-based category filtering behavior for the typing learning application.

## Requirements

### Requirement: Supported keyboard layouts are exposed
The system SHALL expose the currently supported keyboard layouts.

#### Scenario: Initial supported layouts are returned
- **WHEN** a consumer requests supported keyboard layouts
- **THEN** the service returns exactly `fr-ch` and `de-ch`

### Requirement: Chosen keyboard layout is available and persisted
The system SHALL expose the currently chosen keyboard layout, SHALL persist layout changes in local storage under `layout.selected`, and SHALL restore a valid persisted layout on later sessions.

#### Scenario: Initial chosen layout is fr-ch
- **WHEN** a consumer requests the chosen keyboard layout with no valid persisted selection
- **THEN** the service returns `fr-ch`

#### Scenario: Persisted chosen layout is restored
- **WHEN** local storage contains a supported layout value under `layout.selected`
- **THEN** the service returns that stored layout as the chosen layout

#### Scenario: Unsupported persisted layout falls back to default
- **WHEN** local storage contains an unsupported value under `layout.selected`
- **THEN** the service ignores that value and returns `fr-ch`

#### Scenario: Chosen layout can be updated and persisted
- **WHEN** a consumer sets the chosen layout to a supported layout
- **THEN** the service updates the chosen layout and stores that value under `layout.selected`

#### Scenario: Unsupported chosen layout is rejected
- **WHEN** a consumer attempts to set the chosen layout to an unsupported value
- **THEN** the chosen layout remains unchanged

### Requirement: Exercise categories declare compatible keyboard layouts
The system SHALL include a `keyboardLayouts` field on each exercise category that lists all keyboard layouts compatible with that category.

#### Scenario: Category compatibility metadata is available
- **WHEN** exercise category configuration is loaded
- **THEN** each category includes a non-empty `keyboardLayouts` list

### Requirement: Category retrieval is filtered by keyboard layout
The system SHALL require a keyboard layout input when retrieving exercise categories and SHALL return only categories whose `keyboardLayouts` contains that layout.

#### Scenario: Matching categories are included
- **WHEN** categories are requested with layout `fr-ch`
- **THEN** categories that include `fr-ch` in `keyboardLayouts` are returned

#### Scenario: Non-matching categories are excluded
- **WHEN** categories are requested with layout `fr-ch`
- **THEN** categories that do not include `fr-ch` in `keyboardLayouts` are not returned

### Requirement: Automated test coverage for keyboard layout filtering
The system SHALL include automated tests that verify supported layouts, chosen layout, layout persistence, and layout-based category filtering behavior.

#### Scenario: Layout filtering behavior is tested
- **WHEN** requirements tests are executed
- **THEN** tests verify that category retrieval includes only categories compatible with the requested layout

#### Scenario: Layout persistence behavior is tested
- **WHEN** requirements tests are executed
- **THEN** tests verify persisted layout restore, update, and invalid-value fallback behavior

### Requirement: KeyboardKey model supports optional shift and AltGr layer fields
The `KeyboardKey` model SHALL support optional `shiftValue`, `shiftLabel`, `altGrValue`, and `altGrLabel` fields representing the second (Shift) and third (AltGr) key layers. All four fields are optional; omitting them is valid and leaves the primary value and label as the sole representation of that key.

#### Scenario: KeyboardKey without layer fields remains valid
- **WHEN** a `KeyboardKey` entry has no `shiftValue`, `shiftLabel`, `altGrValue`, or `altGrLabel` fields
- **THEN** the entry is treated as a valid key using only its primary `value` and `label`

#### Scenario: KeyboardKey with shift layer fields exposes alternate value and label
- **WHEN** a `KeyboardKey` entry includes `shiftValue` and `shiftLabel`
- **THEN** consumers can read `shiftValue` and `shiftLabel` to determine the character produced and the label to display when Shift is active

#### Scenario: KeyboardKey with AltGr layer fields exposes alternate value and label
- **WHEN** a `KeyboardKey` entry includes `altGrValue` and `altGrLabel`
- **THEN** consumers can read `altGrValue` and `altGrLabel` to determine the character produced and the label to display when AltGr is active

### Requirement: Keyboard layout keymap data is extended with shift and AltGr layer values for applicable keys
The system SHALL populate `shiftValue`, `shiftLabel`, `altGrValue`, and `altGrLabel` on keys in the `fr-ch` and `de-ch` keymaps where the alternate layer character differs meaningfully from the primary layer. Letter keys (A–Z and layout-specific letters) SHALL NOT be extended with shift layer fields because the `.toLowerCase()` matching strategy already handles them, and the conventional uppercase key-cap label is accurate for the physical key.

#### Scenario: Number and symbol keys carry shift layer data
- **WHEN** a number or symbol key in `fr-ch` or `de-ch` has a distinct Shift-layer character
- **THEN** that key entry includes a non-empty `shiftValue` and `shiftLabel` reflecting the shifted character

#### Scenario: AltGr layer data is populated where applicable
- **WHEN** a key in `fr-ch` or `de-ch` produces a distinct character when AltGr is held
- **THEN** that key entry includes a non-empty `altGrValue` and `altGrLabel` reflecting the AltGr character

#### Scenario: Letter keys are not extended with shift layer fields
- **WHEN** a letter key entry (A–Z or layout-specific letter) is inspected in the keymap
- **THEN** it does not have `shiftValue` or `shiftLabel` fields, as case-insensitive matching handles shift behaviour for letters
