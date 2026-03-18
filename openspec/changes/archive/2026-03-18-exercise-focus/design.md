## Context

The exercise component captures keystrokes via a `(keydown)` listener on a `div.exercise-content` element (`tabindex="0"`). The start/pause button triggers `toggleRuntimeState()`. When the exercise starts, keyboard focus remains on the button. Because browsers fire a synthetic `click` event when Space is pressed on a focused button, any space character expected by the exercise will simultaneously be registered as a typed character *and* pause the exercise.

Current structure relevant to this change:
- `div.exercise-content` — already `tabindex="0"`, holds the `(keydown)` handler
- `button.runtime-button` — receives and holds focus after being clicked to start
- `p.key-display-box` — pressed-key feedback paragraph, no tabindex

## Goals / Non-Goals

**Goals:**
- Prevent the start/pause button from capturing Space key presses while the exercise is running.
- Ensure the fix works for both the initial start (`opened → running`) and resume (`pending → running`).

**Non-Goals:**
- Changing keyboard navigation or tab order for accessibility purposes.
- Re-thinking overall focus management across all exercise states.

## Decisions

### Decision: Move focus to `div.exercise-content` when entering `running` state

`div.exercise-content` already has `tabindex="0"` and hosts the `(keydown)` event listener. It is the semantic "keyboard interaction zone" of the exercise. Moving focus there when the exercise starts is natural and requires no new `tabindex` attribute.

**Alternative considered — move focus to `p.key-display-box`**: Also valid, but requires adding `tabindex="-1"` to the paragraph and a separate template reference. More changes for the same effect.

**Alternative considered — `preventDefault()` Space on the button's `keydown`**: Would prevent the default `click`, but is fragile — it targets the symptom in the button rather than placing focus where it semantically belongs during a running exercise.

### Decision: Use `ViewChild` with a template reference variable

Add `#exerciseContent` to `div.exercise-content` and wire it with `@ViewChild('exerciseContent') exerciseContentRef: ElementRef`. Call `this.exerciseContentRef.nativeElement.focus()` inside `toggleRuntimeState()` after the state is set to `running`.

`ViewChild` is the standard Angular approach for direct DOM access within a component template. It avoids querying the DOM imperatively and stays testable.

### Decision: Focus is moved only on transition to `running`

The `running` state is the only state where key presses must not reach the button. There is no need to manage focus on `pending` or `completed` transitions.

## Risks / Trade-offs

- [Screen-reader announcement] Moving focus away from the button may confuse screen-reader users who expect focus to stay after a button activation. Mitigation: the `div.exercise-content` is within the visible exercise area; the pressed-key feedback box uses `aria-live="polite"` so typed characters are still announced.
- [Test complexity] Tests that call `toggleRuntimeState()` directly via the component instance won't trigger `ViewChild` DOM focus (JSDOM won't error but focus won't move). Existing tests are not affected; behavior is observable through absence of unintended button-click side-effects rather than focus position assertions.
