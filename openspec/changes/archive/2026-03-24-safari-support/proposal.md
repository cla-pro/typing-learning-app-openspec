## Why

Safari on iOS (iPad) is not an officially supported platform for this application, yet it is a realistic usage environment. Currently the app has at least one known rendering failure on Safari/iOS: the draggable thumb of the stream-size range input (`input[type="range"]`) does not appear, making that control unusable. Establishing Safari/iOS support as a first-class requirement makes future breakage visible and frames this fix in the right context.

## What Changes

- Establish Safari on iOS (iPad) as a supported browser platform.
- Fix the stream-size range input on Safari/iOS: add `-webkit-appearance: none`, `::-webkit-slider-thumb`, and `::-webkit-slider-runnable-track` CSS rules so the thumb renders visibly.
- No functional or layout changes; only cross-browser rendering compatibility is affected.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `settings-page`: The stream-size range input SHALL render with a visible, draggable thumb on all supported browsers, including Safari on iOS (iPad).
- `webapp-core`: The application SHALL explicitly declare Safari on iOS (iPad) as a supported browser platform.

## Impact

- `src/app/components/settings/settings.component.css` — add Safari/WebKit vendor-prefixed slider CSS rules.
- `openspec/specs/webapp-core/spec.md` — add Safari/iOS to the supported browsers list.
- No TypeScript, HTML, routing, or service changes required.
- No new dependencies.
