## Context

The reward-games page currently shows locked entries with a generic localized status message (`rewardGames.lockedStatus`) and no quantitative unlock progress. Unlock logic already computes whether a game is launchable using the player's earned stars and each setup's configured total-star threshold (`TotalNbStarsRequired`).

This change is intentionally narrow: in locked state, the user should see explicit progress in the form `<current won stars>/<required stars>` so the unlock target is understandable at a glance.

Constraints:
- Existing lock behavior must stay unchanged (locked cards remain non-interactive).
- Existing unlock criteria remain the source of truth.
- Display behavior must remain testable through observable DOM output.

Stakeholders:
- Players who need clear unlock progression feedback.
- Product/UX expecting lock-state clarity without changing unlocking rules.
- QA maintaining behavior-oriented requirements tests.

## Goals / Non-Goals

**Goals:**
- Show numeric progress text on each locked reward-game tile using `<current won stars>/<required stars>`.
- Source `current won stars` from the existing total earned stars value.
- Source `required stars` from each game's configured total-star unlock threshold.
- Preserve current launchability and lock semantics.
- Add/update automated tests validating value and format for locked entries.

**Non-Goals:**
- Changing unlock criteria evaluation rules.
- Introducing per-category progress text in the tile status line.
- Modifying unlocked tile visual treatment.
- Adding backend persistence or API changes.

## Decisions

1. Build lock-status text in the reward-games page view model.
- Decision: add a derived property (for example, `lockedProgressText`) per card entry and render it only on locked cards.
- Rationale: keeps template logic simple and deterministic, and avoids repeated on-template computations.
- Alternative considered: render using inline template expressions that directly call services.
- Why not chosen: harder to test and risks unnecessary repeated computation during change detection.

2. Use total-stars progress for this first clarity improvement.
- Decision: format text as `<earnedTotalStars>/<TotalNbStarsRequired>`.
- Rationale: aligns exactly with requested UX and existing unlock model field names.
- Alternative considered: include category-by-category deficits in the same line.
- Why not chosen: increases complexity and can exceed available card space; not requested in this change.

3. Keep status rendering scoped to locked cards only.
- Decision: do not display progress text on launchable cards.
- Rationale: avoids visual noise once game is already usable and keeps locked-state semantics clear.
- Alternative considered: always show progress regardless of lock state.
- Why not chosen: unnecessary for unlocked games and may imply ongoing gating.

4. Preserve i18n title/intro while allowing numeric status output.
- Decision: keep existing localized title and intro strings unchanged; status line for locked tiles becomes the numeric progress string.
- Rationale: this change targets progression visibility and does not require wording updates for heading/intro copy.
- Alternative considered: localized sentence wrapper around numbers.
- Why not chosen: requirement explicitly asks for direct `<current>/<required>` format.

## Risks / Trade-offs

- [Players may interpret total-stars progress as the only condition when category constraints also exist] -> Mitigation: retain existing lock icon/state and keep criteria logic unchanged; follow-up UX change can add detail if needed.
- [Edge cases with missing/invalid threshold values] -> Mitigation: rely on typed setup model and test rendering against representative setups.
- [Formatting regressions in tests due to whitespace] -> Mitigation: assert normalized text content and exact slash-separated shape in requirements tests.

## Migration Plan

- Implement additive view-model/template changes behind existing reward-games page route.
- Run requirements tests and Angular build before merge.
- Rollback is low risk: revert the locked-status rendering to current generic text without data migration.

## Open Questions

- Category-specific unmet requirements on the card are explicitly deferred to a future enhancement (out of scope for this change).
- Numeric progress text SHALL be shown without surrounding wording.
