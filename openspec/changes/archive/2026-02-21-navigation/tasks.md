## 1. Angular Project Setup & Migration

- [x] 1.1 Install Angular CLI and initialize Angular project structure
- [x] 1.2 Configure Angular project to output build to deployable host-compatible directory
- [x] 1.3 Add Angular dependencies to package.json (Angular core, router, common)
- [x] 1.4 Create tsconfig.json for TypeScript configuration
- [x] 1.5 Update .gitignore for Angular-specific build artifacts (dist/, .angular/)
- [x] 1.6 Configure Angular build scripts in package.json (ng build, ng serve)

## 2. Angular Router Configuration

- [x] 2.1 Create app-routing.module.ts with Angular Router configuration
- [x] 2.2 Define route for root path `/` pointing to WelcomeComponent
- [x] 2.3 Define parameterized route `/exercices/:id` pointing to ExerciseComponent
- [x] 2.4 Define wildcard route `**` redirecting to root path
- [x] 2.5 Import RouterModule in main app module
- [x] 2.6 Add router-outlet to main app component template

## 3. Welcome Page Component Implementation

- [x] 3.1 Create WelcomeComponent to replace static "Hello" page
- [x] 3.2 Add welcome page template with heading and description
- [x] 3.3 Define exercise list as array in component (TypeScript)
- [x] 3.4 Add navigation links using routerLink directive for each exercise
- [x] 3.5 Style welcome page with component-scoped CSS (clean typography)
- [x] 3.6 Ensure welcome page displays prominently at root URL

## 4. Exercise Page Component Implementation

- [x] 4.1 Create ExerciseComponent with route parameter injection
- [x] 4.2 Extract exercice-id parameter from ActivatedRoute
- [x] 4.3 Create exercise page template with placeholder content
- [x] 4.4 Display exercise ID in the template for verification
- [x] 4.5 Style exercise page with basic layout

## 5. Home Navigation Component

- [x] 5.1 Create HomeButtonComponent as reusable navigation element
- [x] 5.2 Add routerLink directive pointing to root path `/`
- [x] 5.3 Style home button with CSS (visible, clear affordance)
- [x] 5.4 Include HomeButtonComponent in ExerciseComponent template
- [x] 5.5 Verify home button navigates without page reload

## 6. Angular Host & Fallback Routing

- [x] 6.1 Configure Angular build output for deployable SPA hosting
- [x] 6.2 Ensure Angular bundle files are generated and served from build output
- [x] 6.3 Configure wildcard route in Angular Router to redirect unknown URLs to root
- [x] 6.4 Verify fallback behavior for unknown non-file routes
- [x] 6.5 Test direct URL access to `/exercices/test-id` in browser-hosted environment

## 7. Development & Build Configuration

- [x] 7.1 Create npm script: `npm run build:angular` - builds Angular production bundle
- [x] 7.2 Update `npm start` to serve the Angular app (without server.js)
- [x] 7.3 Create `npm run dev:angular` for Angular development server
- [x] 7.4 Verify production build works with Angular build pipeline
- [x] 7.5 Document new build process in README.md

## 8. Testing & Verification

- [x] 8.1 Test navigation from welcome page to exercise pages
- [x] 8.2 Test home button navigation back to root from exercise page
- [x] 8.3 Test invalid URL redirects to root page (e.g., `/unknown/path`)
- [x] 8.4 Test direct URL access to `/exercices/some-id` via browser address bar
- [x] 8.5 Verify no full page reloads during navigation (SPA behavior)
- [x] 8.6 Test with multiple exercise IDs (basic-typing, speed-test, etc.)
- [x] 8.7 Verify Angular Router is properly configured (check browser dev tools)
