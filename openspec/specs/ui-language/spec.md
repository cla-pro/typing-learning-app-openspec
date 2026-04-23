## Purpose

Runtime UI translation capability for the typing-learning application.

## Requirements

### Requirement: UI language translations are loaded at runtime
The system SHALL provide runtime UI translation support through locale-specific translation resources stored under `src/assets/i18n/`, SHALL expose translation lookup to standalone Angular components through the configured translation library, and SHALL support the locales `en-us`, `fr-ch`, and `de-ch` for all in-scope UI strings.

#### Scenario: Translation resources exist for each supported locale
- **WHEN** the application build includes static assets
- **THEN** translation files exist for `en-us`, `fr-ch`, and `de-ch` under the UI translation asset directory and can be loaded by the application at runtime

#### Scenario: Components can bind translated UI strings
- **WHEN** a standalone Angular component renders an in-scope UI label, title, button caption, ARIA label, or message
- **THEN** the component can resolve that string from the active UI locale through the configured translation library instead of a hardcoded English literal

### Requirement: UI language selection is persisted and applied on startup
The system SHALL persist the selected UI language through `SettingsService`, SHALL initialize the active UI language before the first application render, and SHALL fall back to English translation values when a key is missing from the active locale.

#### Scenario: Stored UI language is restored on application startup
- **WHEN** a user previously selected a supported UI language and opens the app again
- **THEN** the application restores that stored language before rendering translated UI text

#### Scenario: Default UI language is used when no preference is stored
- **WHEN** no UI language preference exists in persisted settings
- **THEN** the application initializes the default UI language defined by the implementation and renders the UI in that language

#### Scenario: Missing translation key falls back to English
- **WHEN** the active UI language file does not define an in-scope translation key
- **THEN** the application resolves that UI string from the English translation resource instead of showing a broken or empty label