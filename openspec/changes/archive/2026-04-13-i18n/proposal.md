## Why

All UI labels, buttons, titles, and messages are hardcoded in English, making the app inaccessible to users who don't speak English. The app already handles multiple locales for category and scenario names — that pattern should now extend to the full UI.

## What Changes

- Add a **language selector** to the Settings page (distinct from keyboard layout)
- Integrate **ngx-translate** as the translation library
- Provide JSON translation files for each supported locale
- Replace all hardcoded English text in component templates with `ngx-translate` pipe/directive calls
- Persist the chosen language in localStorage via `SettingsService` and apply it on app start via `TranslateService`
- Support the same three locales already used for exercise data: `en-us`, `fr-ch`, `de-ch`

## Capabilities

### New Capabilities

- `ui-language`: Core translation capability — integrates `ngx-translate`, defines the locale JSON file structure (one file per locale under `assets/i18n/`), wires `TranslateModule` into the app, and initialises the active locale from `SettingsService` on startup. Covers supported locales (`en-us`, `fr-ch`, `de-ch`) and the API consumed by components (pipe / `TranslateService`).

### Modified Capabilities

- `settings-page`: Add a language selector setting (label + dropdown/selector) rendered alongside the existing keyboard layout and stream size settings.
- `welcome-page`: All visible text (page title, settings button label, exercise tile labels) must be driven by the active language instead of hardcoded English.

## Impact

- **New dependency**: `@ngx-translate/core` + `@ngx-translate/http-loader` (loads locale JSON files from `assets/i18n/`)
- **New assets**: `src/assets/i18n/en-us.json`, `fr-ch.json`, `de-ch.json` — one key-value file per locale
- **New service**: `LanguageService` — wraps `TranslateService`, persists chosen locale to localStorage, applies it on init
- **Modified components**: `welcome`, `settings`, `home-button`, `exercise`, `exercise-not-found` — replace hardcoded English strings with `translate` pipe or `TranslateService` calls
- **Modified service**: `SettingsService` — stores and retrieves the chosen language (new localStorage key)
- **No breaking changes** to routing, exercise kernel, or keyboard layout logic
