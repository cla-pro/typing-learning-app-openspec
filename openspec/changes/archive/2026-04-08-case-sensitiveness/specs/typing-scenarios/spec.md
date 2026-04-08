## ADDED Requirements

### Requirement: Mix Caps exercise category is available for each supported keyboard layout
The system SHALL define a `Mix Caps` exercise category at the end of the category list for each supported keyboard layout (`fr-ch` and `de-ch`). Mix Caps exercises SHALL use `expectedChars` arrays that deliberately mix lowercase and uppercase characters, introducing the user to case-sensitive typing that requires using the Shift key.

#### Scenario: Mix Caps category exists for fr-ch
- **WHEN** exercise categories are requested with layout `fr-ch`
- **THEN** a category named `Mix Caps` is included in the returned list

#### Scenario: Mix Caps category exists for de-ch
- **WHEN** exercise categories are requested with layout `de-ch`
- **THEN** a category named `Mix Caps` is included in the returned list

#### Scenario: Mix Caps exercises contain mixed-case expected characters
- **WHEN** a Mix Caps exercise is loaded
- **THEN** its `expectedChars` array contains a combination of uppercase and lowercase alphabetic characters

#### Scenario: Mix Caps category is positioned at the end of the category list
- **WHEN** exercise categories are listed for any supported layout
- **THEN** the `Mix Caps` category appears after all other categories in that layout
