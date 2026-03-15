## 1. Stream-focused exercise page layout

- [x] 1.1 Remove exercise id, exercise name, and impacted keys display blocks from the exercise page template.
- [x] 1.2 Add stream layout containers for left segment, center zoom area, and right segment.
- [x] 1.3 Keep last pressed key feedback visible below the full stream/zoom visualization.
- [x] 1.4 Ensure stream containers enforce side margins and hide overflow at left/right boundaries.

## 2. Zoom window and visual hierarchy

- [x] 2.1 Implement a fixed five-slot zoom window (`active-2` to `active+2`) centered on the active character when active exists.
- [x] 2.2 Keep active character visually recognizable in the center zoom slot while active.
- [x] 2.3 Apply reduced size and opacity styling to side segments relative to zoomed characters.
- [x] 2.4 Ensure no placeholder is rendered in the center slot when no active character remains after completion.

## 3. Progression-to-layout synchronization

- [x] 3.1 Add/update component view-model getters/state to derive previous, zoomed, and following segments from active index and `expectedChars`.
- [x] 3.2 Wire correct-key progression so the stream shifts left consistently across side and zoom segments.
- [x] 3.3 Preserve no-op behavior on incorrect keys while running so stream position remains unchanged.
- [x] 3.4 Ensure final correct key shifts terminal character out of active center slot and leaves no active character.

## 4. Requirements tests and verification

- [x] 4.1 Update exercise component requirements tests to assert hidden metadata fields and stream-focused rendering assumptions.
- [x] 4.2 Add/update tests for zoom-window composition around the active character (start, middle, end boundaries).
- [x] 4.3 Add/update tests for left-shift behavior on correct key progression and no-shift on incorrect keys.
- [x] 4.4 Add/update tests for completion end-state with no active center character.
- [x] 4.5 Run full requirements test suite and confirm passing results.
- [x] 4.6 Run Angular build and confirm successful compilation after UX updates.
