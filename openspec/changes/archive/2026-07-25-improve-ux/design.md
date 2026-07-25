## Context

The current exercise flow records completion and star count, but the page ends without a distinct celebration surface. This change adds a completion reward that must be visible on top of the exercise screen, centered, and sized to roughly half the available page area. The celebration is asset-driven, with one GIF selected at random from a star-specific bucket and a second star GIF shown immediately after the first phase completes.

The implementation sits at the intersection of exercise completion state, visual overlay layout, and static asset selection. No API or dependency changes are expected.

## Goals / Non-Goals

**Goals:**
- Show a completion celebration in a dedicated component instead of inline page markup.
- Render the component as a centered overlay above the exercise page.
- Use the earned star count to choose the correct asset bucket.
- Randomize the first GIF selection within the bucket.
- Show a follow-up star GIF based on the achieved star count.
- Keep the exercise page completion flow deterministic and testable.

**Non-Goals:**
- Changing how stars are calculated.
- Changing how exercise completion is persisted.
- Introducing backend support or network fetches for GIF discovery.
- Adding new third-party animation libraries.

## Decisions

- Use a dedicated `CompletionCelebrationComponent` rather than reusing the exercise page template.
  - Rationale: the overlay is a self-contained UI concern with its own sizing, sequencing, and asset selection logic.
  - Alternative considered: render the GIFs directly in `ExerciseComponent`. Rejected because it would keep layout and sequencing concerns mixed into the page shell.

- Render the component as an overlay anchored to the exercise page container.
  - Rationale: the celebration must sit above the exercise screen without removing the underlying page context.
  - Alternative considered: navigate to a separate completion route. Rejected because the user asked for an overlay on top of the exercise screen and that would introduce unnecessary route churn.

- Size the overlay to approximately half the page and center it with flex or absolute positioning.
  - Rationale: this makes the celebration visible without fully obscuring the exercise page.
  - Alternative considered: full-screen modal. Rejected because it is heavier than the requested treatment and would hide too much context.

- Use a small checked-in asset manifest to enumerate GIFs per star bucket.
  - Rationale: browser code cannot discover directory contents at runtime, so random selection needs an explicit list of available asset URLs.
  - Alternative considered: infer filenames dynamically from folder structure. Rejected because the build output does not expose directories for enumeration in the browser.

- Drive the two visual phases from the component state machine.
  - Phase 1 shows a random completion GIF from `assets/animation-completion/<stars>/`.
  - Phase 2 shows `assets/star-gifs/<stars>-stars.gif`.
  - Rationale: GIF end events are not reliable enough across browsers for sequencing, so the component should own the transition timing.
  - Alternative considered: wait for an intrinsic GIF completion event. Rejected because that event is not dependable across implementations.

- Keep the parent page responsible only for opening the celebration with the completed star count.
  - Rationale: this keeps completion triggering in the exercise page while the overlay component owns presentation and sequencing.
  - Alternative considered: let the parent page manage asset selection and timers. Rejected because it would duplicate animation concerns outside the component.

## Risks / Trade-offs

- [GIF duration mismatch] Different completion GIFs may have different lengths, so a fixed phase duration may not perfectly match every asset. → Use conservative timing and keep the first phase duration aligned with the chosen assets; if needed later, add per-asset metadata.
- [Asset manifest drift] The runtime manifest can drift from the files in the asset folders. → Keep the manifest colocated with the assets and cover it with tests that verify bucket membership and star-key resolution.
- [Overlay overlap] The component could cover interactive exercise controls if the container sizing is wrong. → Anchor the overlay to the exercise page shell and verify centering and size in component tests.
- [Randomness test flakiness] Random GIF selection can make tests unstable. → Inject selection logic through a small helper or service so tests can stub the chosen asset.

## Migration Plan

1. Add the static asset folders and GIF files under the new completion-animation structure.
2. Create the completion overlay component and wire it into the exercise page completion path.
3. Add the asset manifest/helper used to select random GIFs by star count.
4. Add or update tests for overlay rendering, sizing, phase sequencing, and star-based asset selection.
5. Verify the overlay appears only after completion and does not change the underlying completion data flow.

Rollback is straightforward: remove the component wiring from the exercise page and leave the existing completion state and star storage untouched.

## Open Questions

- None at this time.
