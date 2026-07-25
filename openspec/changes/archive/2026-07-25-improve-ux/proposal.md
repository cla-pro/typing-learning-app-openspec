## Why

Completing an exercise currently ends without any visible reward, so users get no immediate feedback that they finished well. Adding a short completion celebration makes the end of an exercise feel more satisfying and gives a stronger incentive to keep practicing.

## What Changes

- Add a completion celebration animation that plays when an exercise finishes, encapsulated in its own overlay component.
- Select the celebration GIF from a star-based asset bucket, then choose one GIF at random from that bucket.
- Add a second short star animation immediately after the first animation completes.
- Display the celebration component centered over the exercise screen at roughly half the page size.
- Introduce a new asset structure under `assets/animation-completion/` with four star-specific subfolders, each containing at least one GIF.
- Use a dedicated star GIF from `assets/star-gifs/` named with the pattern `<number-of-stars>-stars.gif` for the follow-up animation.
- Keep the change additive: the exercise still completes normally, but now it shows completion feedback instead of ending silently.

## Capabilities

### New Capabilities
- `exercise-completion-animation`: play completion and star-celebration animations after an exercise finishes, including random GIF selection from the correct star bucket, rendered inside a centered overlay component.

### Modified Capabilities
- `exercise-page`: trigger and sequence the completion celebration when the runtime transitions to `completed`.

## Impact

- Exercise page UI and completion flow
- Overlay component layout and sizing on the exercise page
- New static assets under the application asset tree
- Component and test updates for completion-state behavior and animation sequencing
- No API or dependency changes are expected
