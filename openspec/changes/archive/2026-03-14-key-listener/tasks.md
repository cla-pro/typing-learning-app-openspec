## 1. Exercise Runtime State Model

- [x] 1.1 Introduce explicit exercise runtime state type in `ExerciseComponent` with values `opened`, `running`, `pending`, and `completed`
- [x] 1.2 Initialize runtime state to `opened` when a valid exercise page loads
- [x] 1.3 Reset runtime state and key-display state appropriately when exercise id is invalid or missing

## 2. Runtime Control Behavior

- [x] 2.1 Implement primary runtime action method to enforce transitions `opened -> running`, `running -> pending`, and `pending -> running`
- [x] 2.2 Bind primary control label to runtime state (`start` when not running, `pause` when running)
- [x] 2.3 Add temporary completion control that forces transition to `completed`
- [x] 2.4 Disable or hide primary run/pause control in `completed` state to avoid ambiguous post-completion transitions

## 3. Keyboard Input Capture and Display

- [x] 3.1 Add keyboard event handling on a focusable exercise-page target using Angular lifecycle-safe bindings
- [x] 3.2 Capture and store the last pressed key character only while runtime state is `running`
- [x] 3.3 Render the captured key character in exercise-page UI and preserve previous value when key events are ignored in non-running states

## 4. Exercise Page Template and Styling Updates

- [x] 4.1 Update `exercise.component.html` to render runtime controls and current state information for valid exercise pages
- [x] 4.2 Add UI block in template for displaying the last captured key character
- [x] 4.3 Add/adjust `exercise.component.css` styles for runtime controls, temporary completion button, and key-display panel

## 5. Automated Test Coverage

- [x] 5.1 Extend exercise requirements tests to verify presence of lifecycle state model and transition methods in component code
- [x] 5.2 Extend template-focused tests to verify start/pause label behavior and temporary completion control rendering
- [x] 5.3 Add tests that verify running-state key capture wiring and displayed key output contract
- [x] 5.4 Add tests that verify non-running states (`opened`, `pending`, `completed`) do not update displayed key value from keyboard input

## 6. Verification

- [x] 6.1 Run test suite and confirm new/updated requirements tests pass
- [x] 6.2 Run Angular build and confirm no regressions from lifecycle and key-listener additions
- [x] 6.3 Review temporary completion control naming/commenting to ensure intent is explicit for later removal
