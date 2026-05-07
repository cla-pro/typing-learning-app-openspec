## 1. Obstacle Model and Configuration

- [x] 1.1 Replace obstacle config shape from `clearCharacters` to `clearCharactersByLayout` in tortoise game models.
- [x] 1.2 Update tortoise game configuration data so every obstacle provides character sequences for all supported keyboard layouts.
- [x] 1.3 Add strict validation in kernel initialization so missing layout sequences fail startup and prevent game start.

## 2. Kernel Obstacle Runtime

- [x] 2.1 Extend `TortoiseGameKernelService` state to track cleared obstacles, typed progress, and next obstacle along the remaining route.
- [x] 2.2 Extend kernel snapshot output to include next obstacle characters (active layout), typed progress, and cleared-obstacle metadata.
- [x] 2.3 Add imperative `typeObstacleChar(char)` command to the kernel API.
- [x] 2.4 Implement layout-aware sequence selection using the currently chosen keyboard layout.
- [x] 2.5 Implement typing rules: matching character advances progress; mismatching character is ignored and does not reset progress.
- [x] 2.6 Implement obstacle-clear transition when full sequence is typed, including cleared-state persistence and progress reset for next obstacle.
- [x] 2.7 Update movement blocking logic so only uncleared obstacles block movement.
- [x] 2.8 Ensure movement resumes when a blocking obstacle is cleared and ensure pre-cleared obstacles are passed without stopping.

## 3. Host Input and UI Integration

- [x] 3.1 Inject layout/settings dependencies in tortoise host and pass selected layout context to kernel obstacle typing flow.
- [x] 3.2 Add keydown handling in tortoise host that forwards non-modifier `event.key` values to `typeObstacleChar(char)`.
- [x] 3.3 Keep virtual keyboard hidden in tortoise game and verify no keyboard display component is rendered.
- [x] 3.4 Add bottom obstacle-character display box under the game field and move start button further down.
- [x] 3.5 Render only character content (no status text) in the obstacle box.
- [x] 3.6 Show obstacle characters only while `gameState === 'running'`.
- [x] 3.7 Bind obstacle box to always show the next uncleared obstacle sequence from kernel snapshot, including while tortoise is moving.
- [x] 3.8 Apply stream-size setting scale to obstacle character display using the same sizing rule used by exercise stream.

## 4. Visualization and Obstacle Rendering

- [x] 4.1 Update host-to-visualization obstacle binding so cleared obstacles are excluded from rendered obstacle set.
- [x] 4.2 Keep path and tortoise animation behavior unchanged while ensuring cleared obstacle disks disappear immediately.

## 5. Automated Tests and Verification

- [x] 5.1 Add/extend model and configuration tests for layout-keyed obstacle sequences.
- [x] 5.2 Add kernel tests for strict layout coverage validation and startup failure when layout sequences are missing.
- [x] 5.3 Add kernel tests for layout-selected sequence matching, mismatch-ignore behavior, and clear-on-complete transitions.
- [x] 5.4 Add kernel tests for blocked-to-running resume on clear and pre-cleared obstacle pass-through.
- [x] 5.5 Update host requirements tests for running-only obstacle box visibility, no status text, and next-obstacle selection during movement.
- [x] 5.6 Update host requirements tests for keyboard input handling parity (case-sensitive, modifier-ignore) and no virtual keyboard rendering.
- [x] 5.7 Update visualization requirements tests to verify cleared obstacles are not rendered.
- [x] 5.8 Update settings-related tests to verify stream-size value affects tortoise obstacle-character display scaling.
- [x] 5.9 Run full behavior test suite and confirm all tortoise obstacle, movement, visualization, and settings scenarios pass.
