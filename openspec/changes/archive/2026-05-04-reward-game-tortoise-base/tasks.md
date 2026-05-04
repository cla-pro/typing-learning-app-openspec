## 1. Generic Grid Primitives

- [x] 1.1 Create `src/app/models/grid.model.ts` exporting a `GridPosition` type/class with `col` and `row` numeric fields
- [x] 1.2 Verify `GridPosition` has no tortoise-specific properties or methods

## 2. Tortoise Game Configuration Model and Data

- [x] 2.1 Create `src/app/models/tortoise-game-config.model.ts` defining `TortoiseObstacle` (with `position: GridPosition` and `clearCharacters: string[]`) and `TortoiseGameConfig` (with `gameId: string`, `start: GridPosition`, `end: GridPosition`, `waypoints: GridPosition[]`, `obstacles: TortoiseObstacle[]`)
- [x] 2.2 Create `src/app/data/tortoise-game-configs.ts` exporting at least one static `TortoiseGameConfig` entry with a valid `gameId`, orthogonal waypoints path, and at least one obstacle with a non-empty `clearCharacters` list

## 3. RewardGamesConfigService

- [x] 3.1 Create `src/app/services/reward-games-config.service.ts` with a `RewardGamesConfigService` injectable that holds the static tortoise config entries
- [x] 3.2 Implement a `getTortoiseConfig(gameId: string): TortoiseGameConfig | undefined` method that returns the matching config or `undefined`

## 4. Home Button — Configurable Destination

- [x] 4.1 Add an `@Input() destination: string = '/'` property to `HomeButtonComponent` in `src/app/components/home-button/home-button.component.ts`
- [x] 4.2 Update `home-button.component.html` to bind the `[routerLink]` to `destination` instead of the hard-coded root path
- [x] 4.3 Update `tests/app/components/home-button/home-button.component.requirements.test.ts` to add a scenario verifying that when `destination` is set to a custom route the button navigates to that route, and that the default navigation to root is preserved when no destination is set

## 5. Routing — Typed Reward-Game Routes

- [x] 5.1 Create `src/app/components/tortoise-game-host/` folder with `tortoise-game-host.component.ts`, `tortoise-game-host.component.html`, and `tortoise-game-host.component.css` (shell/placeholder — full kernel UI is out of scope)
- [x] 5.2 Add route `reward-games/tortoise/:gameId` mapped to `TortoiseGameHostComponent` in `src/app/routing/app.routes.ts`
- [x] 5.3 Add a catch-all route `reward-games/:gameType/:gameId` that redirects to `exercices/not-found` for unrecognised game types, placed after all specific game-type routes
- [x] 5.4 Update `tests/app/routing/` with route integration tests verifying that `reward-games/tortoise/some-id` renders `TortoiseGameHostComponent` and that `reward-games/unknown-type/some-id` redirects to the exercise-not-found page

## 6. Tortoise Game Host Component

- [x] 6.1 Inject `ActivatedRoute` and `RewardGamesConfigService` into `TortoiseGameHostComponent`
- [x] 6.2 On init, extract `gameId` from route params, call `RewardGamesConfigService.getTortoiseConfig(gameId)`, and redirect to `exercices/not-found` when the result is falsy
- [x] 6.3 Add `<app-home-button [destination]="'/reward-games'">` to `tortoise-game-host.component.html`
- [x] 6.4 Create `tests/app/components/tortoise-game-host/tortoise-game-host.component.requirements.test.ts` with scenarios covering: config loads for a known `gameId`; redirect to not-found for an unknown `gameId`; back navigation control is rendered; activating the back control navigates to the reward-games page

## 7. Reward-Games Page — Launch Navigation

- [x] 7.1 Extend the `RewardGameItem` interface in `src/app/components/reward-games/reward-games.component.ts` with an optional `routePath?: string` field
- [x] 7.2 Add the tortoise game entry to the `rewardGames` list with `locked: false` and `routePath: '/reward-games/tortoise/<gameId>'` using the first static config's `gameId`; keep existing entries with `locked: true` and no `routePath`
- [x] 7.3 Update `reward-games.component.html` to render launchable entries (those with `routePath`) without the lock overlay and as `[routerLink]` links; keep locked entries non-interactive
- [x] 7.4 Update `tests/app/components/reward-games/reward-games.component.requirements.test.ts` to add scenarios verifying: a launchable entry renders without lock overlay and is selectable; activating a launchable entry navigates to the correct game route; locked entries remain non-interactive
