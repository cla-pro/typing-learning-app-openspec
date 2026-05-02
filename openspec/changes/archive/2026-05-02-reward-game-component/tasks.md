## 1. Progress and navigation plumbing

- [x] 1.1 Add `ExerciseProgressService.getTotalStars()` and cover the aggregate star-count behavior with a focused service test
- [x] 1.2 Register the `/reward-games` route in the Angular router so the reward games page can be reached by client-side navigation
- [x] 1.3 Update welcome-page navigation tests to cover reward-games entry visibility and navigation when total stars are greater than zero

## 2. Reward games page implementation

- [x] 2.1 Create `RewardGamesComponent` with a static locked game list, localized page heading, and shared home button
- [x] 2.2 Implement reward game card styling with a visible lock overlay and non-interactive locked presentation
- [x] 2.3 Add component tests that verify reward-games page rendering, locked state presentation, and home-button navigation behavior

## 3. Welcome page integration and copy

- [x] 3.1 Update `WelcomeComponent` to show the `🎮` reward-games entry only when `getTotalStars()` reports at least one earned star
- [x] 3.2 Add the reward-games entry labels and reward-games page strings to all locale files under `src/assets/i18n/`
- [x] 3.3 Verify the integrated behavior with the relevant test suite and a build run so the new route, UI, and translations compile cleanly