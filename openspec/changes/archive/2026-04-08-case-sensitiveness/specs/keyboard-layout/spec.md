## ADDED Requirements

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
