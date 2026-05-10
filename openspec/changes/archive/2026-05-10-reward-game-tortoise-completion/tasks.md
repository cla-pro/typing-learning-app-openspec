## 1. Completion Persistence Foundation

- [x] 1.1 Add a reward-game completion storage service that builds localStorage keys in the format reward-game-<gameId>-completion
- [x] 1.2 Implement idempotent write/read methods using value true and safe localStorage access fallback behavior
- [x] 1.3 Add unit tests for key format, true-value persistence, read behavior, and graceful handling when storage is unavailable

## 2. Persist Completion From Tortoise Game Flow

- [x] 2.1 Inject completion storage service into the tortoise game host completion flow where gameId is available
- [x] 2.2 Detect transition to completed and persist completion for the active gameId without altering kernel movement responsibilities
- [x] 2.3 Add/extend host or movement tests to verify completed games write reward-game-<gameId>-completion with value true

## 3. Render Crown On Reward Games Overview Tiles

- [x] 3.1 Extend reward-games page view-model mapping to include isCompleted from persisted completion state per gameId
- [x] 3.2 Update reward-games tile template/styles to render a visible crown marker for completed entries while preserving existing lock/launch behavior
- [x] 3.3 Ensure crown marker is derived from persisted state on initial page load so it remains visible after browser reload

## 4. Verification And Regression Coverage

- [x] 4.1 Add/extend reward-games page requirements tests for crown visibility when reward-game-<gameId>-completion is true
- [x] 4.2 Add/extend reward-games page tests for persistence-after-reload behavior and coexistence of crown with existing tile states
- [x] 4.3 Run full requirement test suite and update any affected mocks or fixtures for completion storage behavior
