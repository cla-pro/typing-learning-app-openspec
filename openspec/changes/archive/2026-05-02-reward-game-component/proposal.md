## Why

Stars earned by completing scenarios currently carry no benefit, leaving players with no long-term motivation to improve their accuracy. Introducing reward games — unlocked by earning stars — gives the star system a purpose and adds a layer of engagement beyond pure typing practice.

## What Changes

- A new **reward games list page** is added, accessible via a fun icon on the welcome page.
- The icon on the welcome page is **only visible once the player has earned at least one star** across any exercise.
- The list page shows all available reward games; all games are displayed but in a **disabled (non-selectable) state** — no actual games are implemented in this change.
- Each locked game displays a **lock icon overlaid on top of its game icon** to visually indicate it is not yet available.
- The list page includes the same **home button** used on exercise/scenario pages to return to the welcome page.
- A new route is registered for the reward games list page.

## Capabilities

### New Capabilities
- `reward-games-page`: The reward games list screen — displays all reward games in a disabled/locked state, accessible from the welcome page, with a home button to navigate back.

### Modified Capabilities
- `welcome-page`: A new icon button linking to the reward games page is added; it is only rendered when the player has earned at least one star.
- `page-navigation`: A new route for the reward games list page is registered.

## Impact

- New component: `RewardGamesComponent` (e.g. `src/app/components/reward-games/`)
- Modified: `ExerciseProgressService` — adds `getTotalStars()` for aggregate star lookup across exercises
- Modified: `WelcomeComponent` — uses `ExerciseProgressService.getTotalStars()` to conditionally show the reward games icon
- Modified: `app.routes.ts` — new route entry for the reward games page
- New i18n keys required in all locale files (`src/assets/i18n/`)
- No new dependencies required
