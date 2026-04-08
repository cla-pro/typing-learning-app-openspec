## MODIFIED Requirements

### Requirement: Key labels reflect the active modifier layer
The system SHALL render each key's label based on the currently active modifier state: the shift layer label when Shift is active, the AltGr layer label when AltGr is active, or the primary label otherwise. Keys with no layer-specific label SHALL fall back to the primary label regardless of modifier state. Letter keys display their conventional uppercase primary label at all times, as their key cap already reflects the uppercase form.

#### Scenario: Primary layer labels are shown when no modifier is active
- **WHEN** a supported layout keymap is rendered with no modifier active
- **THEN** each key shows its primary visible legend

#### Scenario: Shift layer labels are shown when Shift is active
- **WHEN** a supported layout keymap is rendered with Shift active
- **THEN** keys that have a `shiftLabel` show their shift layer label, and keys without a `shiftLabel` display their primary label

#### Scenario: AltGr layer labels are shown when AltGr is active
- **WHEN** a supported layout keymap is rendered with AltGr active
- **THEN** keys that have an `altGrLabel` show their AltGr layer label, and keys without an `altGrLabel` display their primary label

---

### Requirement: Last pressed key is highlighted on the keyboard
The system SHALL highlight the last pressed key on the rendered keyboard, using green for a correct press and red for a wrong press, independently of the key's enabled or disabled state. The highlight SHALL persist after a modifier key is released, because `lastPressedKey` is only updated by non-modifier key presses.

`isKeyPressed` SHALL match `lastPressedKey` against all populated layers of a key: the primary value (case-insensitive), the `shiftValue` (exact), and the `altGrValue` (exact).

#### Scenario: Correct key press is highlighted green
- **WHEN** the last pressed key matches the active expected character
- **THEN** the corresponding key on the keyboard is rendered with a green highlight style

#### Scenario: Wrong key press is highlighted red
- **WHEN** the last pressed key does not match the active expected character
- **THEN** the corresponding key on the keyboard is rendered with a red highlight style

#### Scenario: Highlight applies to disabled keys too
- **WHEN** the user presses a key that is not in `impactedKeys`
- **THEN** the corresponding key on the keyboard shows the pressed-wrong red highlight regardless of its disabled state

#### Scenario: No highlight when no key has been pressed
- **WHEN** no key has been pressed yet in the current exercise session
- **THEN** no key on the keyboard shows a highlight style

#### Scenario: Key matching is case-insensitive for letter keys
- **WHEN** the user presses a letter with a different case than the key's primary value in the keymap (e.g. pressing `A` while the key has primary value `a`)
- **THEN** the corresponding key on the keyboard is still highlighted

#### Scenario: Key matching uses shift layer value for non-letter keys
- **WHEN** the user presses a character that matches the `shiftValue` of a key (e.g. pressing `!` on a key whose `shiftValue` is `!`)
- **THEN** the corresponding key on the keyboard is highlighted

#### Scenario: Key matching uses AltGr layer value
- **WHEN** the user presses a character that matches the `altGrValue` of a key
- **THEN** the corresponding key on the keyboard is highlighted

#### Scenario: Highlight persists after modifier key is released
- **WHEN** a key has been highlighted and the user subsequently releases a modifier key (e.g. releases Shift)
- **THEN** the highlight on the previously pressed key remains unchanged

## ADDED Requirements

### Requirement: Keyboard display component accepts modifier-state inputs
The system SHALL accept active modifier state as inputs to `KeyboardDisplayComponent`. These inputs drive the active layer label rendering (Decision 4 in design) and are the responsibility of the parent component to compute and pass in.

#### Scenario: Component exposes isShiftActive input
- **WHEN** a parent composes `KeyboardDisplayComponent`
- **THEN** the component exposes an `isShiftActive: boolean` `@Input()` property, defaulting to `false`

#### Scenario: Component exposes isAltGrActive input
- **WHEN** a parent composes `KeyboardDisplayComponent`
- **THEN** the component exposes an `isAltGrActive: boolean` `@Input()` property, defaulting to `false`
