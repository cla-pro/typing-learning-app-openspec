## Context

Settings are currently fragmented across the welcome and exercise pages, with each page owning a separate control and direct local-storage interaction. This creates UX friction (users must navigate multiple places) and duplicates persistence concerns.

The proposed change introduces a dedicated Settings page and consolidates settings state management by renaming `KeyboardLayoutService` to `SettingsService` and extending it to own both keyboard layout and stream size. This is a cross-cutting change affecting routing, shared services, welcome/exercise component behavior, and requirements tests.

Constraints:
- Keep Angular component/routing patterns already used in the project.
- Preserve existing behavior semantics for valid/invalid setting values.
- Match Settings page visual style with the welcome page layout language.

## Goals / Non-Goals

**Goals:**
- Provide one dedicated Settings page with a centered title and labeled settings list.
- Manage both `keyboardLayout` and `streamSize` through a single `SettingsService` API.
- Remove per-page settings controls from welcome/exercise pages and route users to Settings instead.
- Add a welcome-page top-right gear button that navigates to Settings.
- Centralize local-storage read/write responsibility in `SettingsService`.

**Non-Goals:**
- Redesign visual identity beyond matching existing welcome-page style language.
- Introduce backend synchronization or user-account scoped settings.
- Change exercise logic or scoring behavior unrelated to settings ownership.

## Decisions

### 1) Consolidate settings into one service by renaming KeyboardLayoutService
- Decision: Rename `KeyboardLayoutService` to `SettingsService` and expand it to expose/get/set both keyboard layout and stream size.
- Rationale: One owner for app-level preferences reduces duplicated persistence logic and avoids divergent validation behavior.
- Alternatives considered:
  - Keep two separate services (`KeyboardLayoutService` + new `StreamSizeService`): simpler migration per feature but preserves split ownership and duplicated storage handling.
  - Keep existing service name and add stream-size methods: lower rename cost but creates a misleading abstraction name.

### 2) Store local persistence only inside SettingsService
- Decision: Move all local-storage interactions for both settings into `SettingsService`; components use service methods only.
- Rationale: Encapsulation ensures consistent fallback behavior, easier testing, and reduced component complexity.
- Alternatives considered:
  - Keep local-storage logic in components: faster short-term changes but weakens consistency and testability.

### 3) Introduce a dedicated Settings route/page and remove in-place controls
- Decision: Add a Settings page route and UI for both settings; remove layout chooser from welcome and stream-size chooser from exercise page.
- Rationale: Centralized UX improves discoverability and consistency while reducing repetitive controls.
- Alternatives considered:
  - Keep controls on current pages and add Settings page in parallel: avoids immediate disruption but keeps fragmented UX.

### 4) Add gear-icon-only entry point on welcome page
- Decision: Add a top-right gear button on the welcome page that navigates to Settings.
- Rationale: Provides immediate discoverability in the app's landing view while meeting compact UI intent.
- Alternatives considered:
  - Text-based "Settings" link in header/body: clearer label but higher visual weight and does not match requested icon-only affordance.

### 5) Keep compatibility for existing storage keys during transition
- Decision: `SettingsService` should read existing persisted values (layout and stream size keys currently used), validate, and write back through unified methods.
- Rationale: Prevents user preference loss and supports seamless rollout.
- Alternatives considered:
  - Introduce entirely new keys without fallback: cleaner internals but breaks existing persisted preferences.

## Risks / Trade-offs

- [Route and navigation regressions] -> Mitigation: add/update routing tests for settings route and welcome-page gear navigation.
- [Service rename import breakage across components/tests] -> Mitigation: perform workspace-wide symbol rename and run full test suite.
- [Behavior drift in default/fallback values] -> Mitigation: preserve previous validation rules and add requirements tests for invalid persisted values.
- [Icon-only button discoverability/accessibility concerns] -> Mitigation: include accessible label/title/aria-label while keeping icon-only visual text.
- [Temporary mismatch between old tests and new ownership model] -> Mitigation: update requirements tests in same change and verify all suites pass.

## Migration Plan

1. Add `SettingsService` (rename/replace existing keyboard layout service) with unified APIs for layout and stream size.
2. Refactor consumers to use `SettingsService` methods and remove direct local-storage interactions from components.
3. Add Settings page component (title + labeled settings list) and route.
4. Add top-right gear button on welcome page; remove welcome layout chooser and exercise stream-size control.
5. Update requirements/component/routing/service tests to match new UX and service ownership.
6. Run full test suite and production build.

Rollback strategy:
- Revert route/UI changes and restore previous controls if navigation or settings editing flow fails.
- Keep storage key compatibility so rollback does not lose preferences.

## Open Questions

No open questions remain for this iteration.

Resolved constraints for this change:
- Settings page entry point is only on the welcome page for now.
- Stream-size changes are applied when the user opens the next exercise page (no live update on an already-open exercise).
- Existing persisted storage key names are kept unchanged.
