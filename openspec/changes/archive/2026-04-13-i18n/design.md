## Context

All component templates contain hardcoded English text. The app already supports three locales (`en-us`, `fr-ch`, `de-ch`) for exercise category/scenario names via per-locale data files. This change extends locale support to the full UI using **ngx-translate**.

The app is Angular 21.2 with standalone components bootstrapped in `main.ts` via `bootstrapApplication`. There is no `NgModule`. All providers are registered in the `providers` array of `bootstrapApplication`. Components individually declare their imports.

## Goals / Non-Goals

**Goals:**
- Translate all hardcoded UI strings (titles, button labels, ARIA labels, error messages) into the three supported locales
- Add a language selector to the Settings page, persisted to localStorage
- Integrate ngx-translate with minimal friction to the existing codebase

**Non-Goals:**
- Translating exercise category/scenario names (already handled by per-locale data files)
- Supporting additional locales beyond `en-us`, `fr-ch`, `de-ch`
- Pluralisation or ICU message formatting (no plural strings in scope)
- Server-side rendering / SSR considerations

## Decisions

### 1. ngx-translate over Angular built-in `@angular/localize`

Angular's built-in i18n produces one compiled bundle per locale and requires a full rebuild to switch languages. ngx-translate loads translations at runtime from JSON files, enabling in-app language switching without a rebuild or navigation. This is the right trade-off given the app needs a runtime language toggle in Settings.

**Alternative considered**: `@angular/localize` — rejected because runtime switching would require reloading the whole app with a different base-href.

### 2. HTTP loader for translation files

Use `@ngx-translate/http-loader` to load translations from `src/assets/i18n/<locale>.json` via HTTP. Files are served as static assets (Angular copies the `assets/` folder on build).

**Alternative considered**: Inline loader (import JSON directly in TypeScript) — avoids the HTTP request but couples translation data to the bundle and makes it harder to update strings without a rebuild. HTTP loader is the standard ngx-translate pattern.

**Implication**: `provideHttpClient()` must be added to `main.ts` providers (currently absent).

### 3. Translation keys — flat, namespaced by component

Keys use a `component.key` dot notation, e.g. `settings.title`, `exercise.start`, `home-button.label`. Flat structure avoids deeply nested JSON objects while still grouping strings logically. No deeply nested interpolation needed.

**Alternative considered**: Fully flat keys (no namespace) — harder to maintain as the key list grows.

### 4. Language persistence in `SettingsService`

The existing `SettingsService` already owns localStorage keys for keyboard layout and stream size. A new `language.selected` key follows the same pattern. A thin `LanguageService` wraps `TranslateService` and delegates persistence to `SettingsService`.

**Alternative considered**: A standalone `LanguageService` that handles its own localStorage I/O — adds redundancy without benefit.

### 5. Initialisation via `APP_INITIALIZER`

The chosen language must be applied before any component renders to avoid a flash of English text. An `APP_INITIALIZER` factory in `main.ts` calls `LanguageService.init()`, which reads the stored locale from `SettingsService` and calls `TranslateService.use(locale)`. The initialiser returns a Promise so Angular waits for the JSON to load before rendering.

**Alternative considered**: Initialising inside `LanguageService` constructor — not guaranteed to complete before the first component renders.

### 6. Default language

Default language is `fr-ch`, consistent with the existing keyboard layout default in `SettingsService`. `en-us` is set as the ngx-translate fallback language so any missing keys gracefully fall back to English.

### 7. Each standalone component imports `TranslateModule`

Since there is no shared `NgModule`, each component that uses the `translate` pipe must import `TranslateModule` in its `imports` array. This is the standard pattern for standalone components with ngx-translate.

## Risks / Trade-offs

- **Extra HTTP request on startup**: The `HttpLoader` triggers one GET per locale file on first load. Files are small (< 2 KB) and cached by the browser on subsequent visits. Risk is negligible.
- **ngx-translate version compatibility with Angular 21**: `@ngx-translate/core@^16` supports Angular 17+. Verify exact compatible version on install. Document as a dependency exception if a version pin is needed.
- **Flash of untranslated content (FOUT)**: Mitigated by `APP_INITIALIZER` pattern (see Decision 5). If the HTTP request fails, ngx-translate returns the key string as fallback — degraded but not broken.
- **`provideHttpClient()` side-effects**: Adding `HttpClient` to the global providers has no known side-effects; no existing code uses HTTP today so there is no conflict.

## Migration Plan

1. Install `@ngx-translate/core` and `@ngx-translate/http-loader`
2. Add `provideHttpClient()` and `TranslateModule.forRoot(httpLoaderFactory)` to `main.ts`
3. Create `src/assets/i18n/en-us.json`, `fr-ch.json`, `de-ch.json` with all UI string keys
4. Add `language.selected` read/write to `SettingsService`
5. Create `LanguageService` with `init()` method; register `APP_INITIALIZER`
6. Update `SettingsComponent` — add language selector UI, import `TranslateModule`, replace hardcoded strings
7. Update remaining components (`welcome`, `home-button`, `exercise`, `exercise-not-found`) — import `TranslateModule`, replace hardcoded strings
8. Run tests and build

**Rollback**: All changes are additive (new files + template edits). Reverting is a standard git revert with no data migration needed.

## Open Questions

- None — scope and approach are fully defined.
