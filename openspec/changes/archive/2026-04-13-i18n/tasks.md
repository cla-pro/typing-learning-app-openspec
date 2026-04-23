## 1. Translation infrastructure

- [x] 1.1 Add `@ngx-translate/core` and `@ngx-translate/http-loader` to the project dependencies and record any required version-governance exception if Angular 21 compatibility requires a pin
- [x] 1.2 Update `src/main.ts` to provide `HttpClient`, configure the ngx-translate HTTP loader, and register startup initialization that applies the persisted UI language before the first render
- [x] 1.3 Create `src/assets/i18n/en-us.json`, `src/assets/i18n/fr-ch.json`, and `src/assets/i18n/de-ch.json` with the in-scope UI translation keys for settings, welcome, home-button, exercise, and exercise-not-found text

## 2. Language persistence services

- [x] 2.1 Extend `SettingsService` with persisted UI-language read/write support using the new localStorage setting key and the supported locales `en-us`, `fr-ch`, and `de-ch`
- [x] 2.2 Add a `LanguageService` that wraps `TranslateService`, restores the saved language on startup, applies language changes at runtime, and configures English fallback behavior for missing keys

## 3. Settings page language selection

- [x] 3.1 Update the Settings page component to import translation support, replace hardcoded settings text with translation keys, and render a dedicated UI-language selector alongside keyboard layout and stream size controls
- [x] 3.2 Wire the Settings page language selector to `LanguageService` so changing the control updates the active language immediately and persists the selection for future visits

## 4. Localized page chrome and actions

- [x] 4.1 Update the welcome page component to import translation support and replace its heading and settings-entry text or accessible label with translated UI strings while preserving grouped exercise loading behavior
- [x] 4.2 Update the shared and routed UI surfaces identified in the proposal impact (`home-button`, `exercise`, and `exercise-not-found`) to import translation support and replace remaining in-scope hardcoded English labels, buttons, ARIA labels, and messages

## 5. Verification

- [x] 5.1 Add or update automated tests covering startup language restoration, Settings page language selection, and translated welcome-page text behavior
- [x] 5.2 Run `npm test`
- [x] 5.3 Run `npm run build:angular`