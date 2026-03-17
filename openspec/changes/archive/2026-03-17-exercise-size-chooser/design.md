## Context

The exercise page currently renders a fixed-size expected-character stream with side segments, a center zoom window, and pressed-key feedback. This layout recently moved to a focused vertical stack where stream visualization appears above feedback controls. The new requirement introduces a user-adjustable size slider between the stream and key-feedback box to improve readability while preserving interaction flow.

Because stream typography drives both readability and spatial density, increasing character size reduces the amount of side content that can remain visible before clipping. The design must allow this trade-off intentionally, without changing progression logic, route behavior, or runtime state semantics.

The selected size must persist across browser sessions via localStorage, so the page can restore the user’s preferred stream scale during initialization.

## Goals / Non-Goals

**Goals:**
- Add a horizontal slider between the stream visualization and pressed-key feedback.
- Map slider minimum (left-most) to the current baseline stream size.
- Increase stream character size as slider moves right.
- Persist selected size in localStorage and restore on later visits.
- Keep runtime lifecycle and typing progression behavior unchanged.

**Non-Goals:**
- Changing exercise configuration source, routing, or kernel matching semantics.
- Guaranteeing fixed side-character counts at larger sizes.
- Introducing server-side preference storage.

## Decisions

### Insert a dedicated size-control section between stream and key feedback
A dedicated control container will be rendered in the existing focused stack between `.exercise-stream-shell` and the pressed-key box. It will include a single range input for stream size.

Rationale: this exactly matches required placement and keeps visual ownership with the stream, not the runtime control area.

Alternatives considered:
- Place slider below key feedback. Rejected because placement requirement is explicit.
- Place slider inside stream shell header. Rejected because it competes with stream focus and compresses layout.

### Use slider step index mapped to CSS custom properties
The component will hold a numeric slider value over a continuous linear range, with the minimum position representing the current baseline size. The selected value maps to computed CSS values (character box size and font size) through style binding or host CSS variables.

Rationale: a linear slider matches the requested interaction model, keeps the baseline definition explicit, and allows smooth font-size adjustment instead of coarse jumps.

Alternatives considered:
- Store raw px/rem values directly from slider. Rejected due to brittle persistence and harder versioning.
- Apply transform scale on container. Rejected because it can distort spacing/borders and complicate clipping behavior.

### Persist preference globally in localStorage with resilient fallback
The selected size will be persisted as a global browser preference, not scoped per exercise. On component initialization for a valid exercise, read the localStorage key (e.g., `exercise.streamSizeValue`) and clamp to supported bounds. If absent or invalid, default to the minimum baseline value. On slider change, update component state and write the new numeric value to localStorage.

Rationale: the requirement is about a reusable reading preference across sessions, so global persistence best matches user intent and keeps the model simple.

Alternatives considered:
- Persist per exercise id. Rejected because the requested behavior is one carried preference, not per-exercise customization.
- Persist only for the current tab or session. Rejected because cross-session restore is required.

### Preserve side-segment clipping as an intentional layout trade-off
The existing overflow-clipped side segments remain as-is. Larger stream sizes may reduce visible previous/following characters due to width consumption.

Rationale: this behavior is explicitly allowed and avoids over-constraining responsive layouts.

Alternatives considered:
- Dynamically reduce side-character count at larger sizes. Rejected because current rendering already naturally clips and requirement allows reduced visible space.
- Shrink zoom window at larger sizes. Rejected because it changes core stream visualization semantics.

### Extend behavior tests around observable slider and persistence state
Requirements tests should validate:
- default slider value is the minimum baseline
- increasing the slider value increases exposed stream sizing outputs
- slider value round-trips via global localStorage restore on init
- runtime progression and state transitions still behave unchanged

Rationale: tests remain behavior-oriented through component public outputs and state transitions, consistent with repository policy.

Alternatives considered:
- Assert exact style text in CSS files. Rejected by behavior-testing policy and too implementation-coupled.

## Risks / Trade-offs

- [Persistence key drift] Renaming storage key can break previously saved preferences. Mitigation: define one stable key constant and keep backward-compatible parsing if changed later.
- [Accessibility risk] Slider without clear accessible naming reduces usability for assistive tech. Mitigation: include explicit label/aria attributes for the range control.
- [Layout pressure risk] Large sizes may overly compress side segments on small screens. Mitigation: preserve clipping behavior and responsive bounds while capping max slider step.
- [Invalid stored values] Corrupt/non-numeric localStorage data can cause inconsistent sizing. Mitigation: parse defensively and fallback to baseline step.
- [Affordance risk] A control without visible labels can be harder to interpret visually. Mitigation: rely on placement, accessible naming, and immediate stream-size feedback while omitting visible labels as requested.

## Migration Plan

No data migration is required. Deploy as a UI behavior enhancement.

Rollback strategy: remove slider UI and localStorage handling, reverting to fixed baseline stream size while leaving unrelated runtime behavior untouched.

## Open Questions

- None currently.
