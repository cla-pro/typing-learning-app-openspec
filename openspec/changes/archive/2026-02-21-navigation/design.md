## Context

The typing learning application currently has a single static page displaying "Hello" at the root URL. Users need to navigate between a welcome page and multiple exercise pages. The application will be migrated to Angular as a single-page application (SPA) framework with client-side routing.

Current state:
- Single `index.html` at root
- Angular workspace configured with standalone components
- No routing beyond static file serving
- No navigation UI components

Constraints:
- Use Angular framework for component-based architecture
- Implement client-side routing with Angular Router
- Keep runtime Angular-only (no custom Node/Express server)
- Support future addition of many exercise pages without restructuring

## Goals / Non-Goals

**Goals:**
- Enable navigation between welcome page and exercise pages
- Implement URL structure `/exercices/<exercice-id>` for exercises
- Redirect unknown URLs to root URL
- Provide consistent navigation UI (home button on exercise pages)
- Establish reusable patterns for page navigation

**Non-Goals:**
- Exercise content implementation (only navigation structure)
- Authentication or user-specific navigation
- Server-side rendering (SSR) or Angular Universal
- State management libraries (NgRx, Akita) - simple component state is sufficient
- Dynamic exercise list loading from database

## Decisions

**1. Exercise ID Format: Kebab-case strings**
- Rationale: Simple, readable URLs like `/exercices/basic-typing`, `/exercices/speed-test`. Easy to add exercises without configuration.
- Alternatives considered: 
  - Numeric IDs (less readable, requires ID mapping)
  - UUID (unnecessarily complex for human-readable URLs)
- Justification: Kebab-case balances readability, simplicity, and URL-friendliness

**2. Routing: Angular Router for client-side routing**
- Rationale: Use Angular Router to handle navigation between pages. Define routes for `/` (welcome component), `/exercices/:id` (exercise component), and wildcard `**` (redirect to root). Enables SPA navigation without page reloads.
- Alternatives considered:
  - Server-side routing only (requires full page reloads, poor UX for interactive app)
  - Manual history API management (reinventing the wheel, Angular Router is battle-tested)
- Justification: Angular Router provides declarative routing, parameterized routes, guards, and lazy loading capabilities ideal for scalable navigation

**3. Page Structure: Angular components with standalone routing**
- Rationale: Create Angular components for each page type: WelcomeComponent (root), ExerciseComponent (parameterized), and shared NavigationComponent. Use Angular's component-based architecture with templates and data binding.
- Alternatives considered:
  - Static HTML with JavaScript (doesn't provide component structure, harder to maintain)
  - Separate HTML file per exercise (doesn't scale, no reusability)
- Justification: Component-based architecture provides reusability, clear separation of concerns, and scales well with many exercises

**4. Welcome Page Transformation: Modify existing index.html**
- Rationale: Transform the "Hello" page into a welcome page with navigation links to exercises. Keeps root URL behavior consistent.
- Alternatives considered:
  - Create new welcome page, redirect root to it (breaks existing root URL expectation)
  - Keep "Hello" separate from welcome page (redundant, confusing UX)
- Justification: Natural evolution of the landing page, maintains root URL as entry point

**5. Navigation UI: Angular components with routerLink directives**
- Rationale: Create reusable navigation components using Angular's `routerLink` directive for declarative navigation. Style with component-scoped CSS. Home button as an Angular component with routerLink to `/`.
- Alternatives considered:
  - Angular Material navigation components (adds significant bundle size, unnecessary for simple navigation)
  - Third-party UI library (adds dependency, less control)
- Justification: Angular's built-in routing directives provide clean, declarative navigation without external dependencies

**6. Redirect Strategy: Angular Router wildcard route**
- Rationale: Define wildcard route `{ path: '**', redirectTo: '/' }` in Angular routing configuration. Client-side redirect happens instantly without server round-trip.
- Alternatives considered:
  - Custom 404 component (poor UX, requires user action to navigate home)
  - Manual redirect logic in components (duplicates routing concerns)
- Justification: Angular Router wildcard provides instant redirect behavior with minimal code and clear route ownership

**7. Component File Structure: Separate template and style files**
- Rationale: Each Angular component should have three separate files: `.ts` (component logic), `.html` (template), and `.css` (styles). This improves code organization, maintainability, and allows designers/developers to work independently on templates and styles.
- Alternatives considered:
  - Inline templates and styles (quick to write, harder to maintain and read)
  - SharedModule pattern (more complexity than needed for simple navigation)
- Justification: Separation of concerns improves readability, enables better IDE support, and aligns with Angular best practices

## Risks / Trade-offs

**[Risk] Angular bundle size increases initial load time** → Mitigation: Use Angular's production build with AOT compilation and tree-shaking. Initial load is one-time cost, subsequent navigation is instant (no page reloads).

**[Risk] Learning curve for Angular framework** → Mitigation: Start with simple component structure. Angular CLI provides excellent tooling. Team can incrementally learn advanced features as needed.

**[Risk] Exercise list on welcome page requires manual updates** → Mitigation: Initially, hardcode exercise links in component. TypeScript makes it easy to define exercise list as array. Future enhancement can fetch from API without architectural changes.

**[Trade-off] Client-side routing requires JavaScript** → Users with JavaScript disabled won't see navigation. This is acceptable for a modern web application focused on interactive typing exercises which inherently require JavaScript.
