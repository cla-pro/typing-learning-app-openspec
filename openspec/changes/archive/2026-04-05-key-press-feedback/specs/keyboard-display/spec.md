## ADDED Requirements

### Requirement: Last pressed key is highlighted on the keyboard
The system SHALL highlight the last pressed key on the rendered keyboard, using green for a correct press and red for a wrong press, independently of the key's enabled or disabled state.

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

#### Scenario: Key matching is case-insensitive to handle Shift and Caps Lock
- **WHEN** the user presses a key with a different case than the key's value in the keymap (e.g. pressing `A` while the key has value `a`)
- **THEN** the corresponding key on the keyboard is still highlighted

### Requirement: Key-press highlight state is passed to the keyboard component via inputs
The system SHALL accept the last pressed key value and its correctness flag as inputs to `KeyboardDisplayComponent`. The correctness determination (whether the pressed key is correct or wrong) SHALL be the responsibility of the parent component, not of `KeyboardDisplayComponent`.

#### Scenario: Component receives lastPressedKey and isLastKeyWrong inputs
- **WHEN** a parent composes `KeyboardDisplayComponent`
- **THEN** the component exposes `lastPressedKey: string` and `isLastKeyWrong: boolean` as `@Input()` properties

#### Scenario: KeyboardDisplayComponent does not determine correctness
- **WHEN** highlighting a pressed key
- **THEN** `KeyboardDisplayComponent` uses the `isLastKeyWrong` value received from its parent without re-evaluating it against any expected character
