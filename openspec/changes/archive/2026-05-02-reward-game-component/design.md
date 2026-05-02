## Context

The application currently has a star-earning system (`ExerciseProgressService`) with no downstream benefit for the player. A reward games list page is being introduced to give stars a purpose. This first change only adds the list screen with locked (disabled) game entries — no games are playable yet.

Existing patterns to follow:
- The settings icon on the welcome page uses a conditional display driven by component logic.
- The `HomeButtonComponent` is a reusable component already used on exercise and not-found pages.
- All new user-visible strings must be added to the i18n locale JSON files (`src/assets/i18n/`).

## Goals / Non-Goals

**Goals:**
- Add a `RewardGamesComponent` that lists reward games in a disabled/locked state
- Add a route for the reward games page (`/reward-games`)
- Show a `🎮` icon on the welcome page that navigates to the reward games page, visible only once at least one star has been earned across all exercises
- Show a lock icon overlaid on each game's icon to signal it is locked
- Reuse the existing `HomeButtonComponent` on the reward games page

**Non-Goals:**
- Implementing any actual reward game logic or content
- Unlocking games (all remain locked in this change)
- Defining what criteria unlock individual games in the future
- Changing the star computation or storage logic

## Decisions

### Route path: `/reward-games`
A dedicated static route `/reward-games` is registered in `app.routes.ts`. It follows the existing flat routing pattern (no nesting). The wildcard redirect at `**` already covers unknown paths, so no extra fallback is needed.

### Star threshold detection in `WelcomeComponent`
`ExerciseProgressService` gains a dedicated `getTotalStars()` helper that sums stars across all exercises. `WelcomeComponent` uses this method and shows the reward games icon when `totalStars > 0`.

**Alternative considered:** Keeping the summation in `WelcomeComponent`. Rejected because total-star aggregation belongs with the existing star progress API and should not be duplicated in UI components.

### Lock icon overlay: CSS positioning
Each game card in `RewardGamesComponent` renders as a container with `position: relative`. The lock icon (`🔒` emoji or a CSS/Unicode lock glyph) is absolutely positioned in the top-right corner of the game icon, overlapping it. This avoids any new dependency (no icon library needed).

**Alternative considered:** A separate icon library (e.g. Material Icons). Rejected to stay consistent with the existing emoji/Unicode approach used elsewhere in the app (e.g. the home button `🏠`, settings gear `⚙️`).

### Reward games data: static array in component
Since no games exist yet and none are playable, a small static array defined directly in `RewardGamesComponent` describes the available (future) games. Each entry has: `id`, `name`, `icon` (emoji), and `locked: true`. This avoids premature service extraction.

### Welcome page entry icon: `🎮`
The welcome page uses the `🎮` emoji as the initial reward games entry point icon. This keeps the first iteration aligned with the app's existing emoji-based visual language and leaves room for later visual polish without changing the interaction.

### `HomeButtonComponent` reuse
The existing `<app-home-button>` is placed at the top of the reward games page template, identical to its usage on the exercise page. No changes to `HomeButtonComponent` are needed.

## Risks / Trade-offs

- **New aggregation helper on `ExerciseProgressService` increases service scope slightly** → Mitigation: the helper stays focused on already-owned star progress data and prevents duplicate UI logic.
- **Static game list in component** → When real games are added, the list will need to be extracted to a service or data file. Acceptable for this scope.
- **Emoji lock icon rendering varies across OS/browsers** → Mitigation: use the Unicode lock character `🔒` which has broad support; can be replaced with an SVG icon in a future polish change.
