## Why

The typing learning application needs a navigation system to allow users to move between the welcome page and exercise pages. Currently, only a static "Hello" page exists with no way to navigate to other parts of the application. A clear navigation structure is essential before adding typing exercises and educational content.

## What Changes

- **Welcome page with navigation menu** - Transform the root page into a welcome/landing page with links to exercise pages
- **Home button on exercise pages** - Add a consistent home button to return to the welcome page from any exercise
- **URL redirect handling** - Implement catch-all routing to redirect unknown URLs to the root page
- **Navigation component structure** - Create reusable navigation patterns for consistent UX across pages
- **Exercise URL structure** - Define URL convention `/exercices/<exercice-id>` where `exercice-id` is a string identifier (specific format to be determined in design phase)

## Capabilities

### New Capabilities
- `page-navigation`: Client-side Angular routing, navigation components, and URL redirect handling for the application

### Modified Capabilities
- `hello-page`: Transform from simple "Hello" display to a welcome page with navigation to exercise pages
- `webapp-core`: Add Angular workspace/build configuration and route handling strategy

## Impact

- **Codebase structure**: Addition of Angular routing logic with parameterized routes (`/exercices/:id`), component templates/styles, and navigation components
- **User experience**: Users can navigate between pages instead of viewing only a single static page
- **Future extensibility**: Establishes navigation patterns and URL conventions for adding more exercise pages and features
- **HTML/CSS**: New navigation UI elements, home button styling, page templates
- **Routing architecture**: Angular Router handles dynamic exercise routes and wildcard redirects to root URL
