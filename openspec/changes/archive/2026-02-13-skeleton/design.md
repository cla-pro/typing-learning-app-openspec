## Context

This project establishes a typing learning application. We start with a minimal skeleton - a web application that displays a single "Hello" page. The architecture must support future features like exercise delivery, progress tracking, and user management without requiring fundamental restructuring.

Current state: No existing application infrastructure. We are building from scratch.

Constraints:
- Must be deployable and testable with minimal dependencies
- Must follow web application standards for easy onboarding of future developers
- Must support iterative feature additions

## Goals / Non-Goals

**Goals:**
- Create a functional web application with a working dev environment
- Establish a clean project structure for web development
- Deploy a simple "Hello" landing page as proof of concept
- Enable rapid addition of new pages and endpoints in future changes
- Set up basic build and development tooling

**Non-Goals:**
- User authentication or account management
- Database integration or persistence
- Exercise delivery system
- Performance optimization or scaling
- Mobile-specific optimizations

## Decisions

**1. Technology Stack: Node.js + Express + HTML/CSS/JavaScript**
- Rationale: Express provides lightweight HTTP server with minimal overhead. Node.js ecosystem is mature and widely adopted. Pure HTML/CSS/JavaScript frontend requires no build step for initial pages.
- Alternatives considered: Django (Python-based, heavier), Flask (suitable but less common in teams), static HTML only (lacks extensibility for future dynamic features)
- Justification: Express balances simplicity for the hello-page with enough structure to support future features like routing, middleware, and templating.

**2. Project Structure: Standard Node.js layout**
- Rationale: Familiar structure to any Node.js developer: `/src` for source code, `/public` for static assets, `/tests` for test files
- Ensures maintainability and onboarding clarity

**3. Frontend Rendering: Server-side HTML with Express**
- Rationale: For the hello-page, simple server-side rendering with static HTML files is sufficient. Can evolve to templating engines (EJS, Pug) when needed for dynamic content.
- Keeps initial complexity low while supporting future SPA frameworks if needed

**4. Development Environment: npm scripts + Node.js**
- Rationale: No complex build tooling required initially. npm scripts handle start/dev/test commands. Can upgrade to webpack/Vite later if needed.

## Risks / Trade-offs

**[Risk] Limited tooling complexity** → *Mitigation*: Chose npm scripts over webpack initially to reduce setup time. When performance or bundling becomes critical, can adopt professional build tools without major refactoring.

**[Risk] Server-side rendering scalability** → *Mitigation*: For a typing exercise app, expected user concurrency is moderate. This design scales adequately for initial userbase. Can switch to SPA/API-driven architecture if needed.

**[Risk] No persistence layer** → *Mitigation*: Not part of this change (skeleton only). Future capability changes will add database and API layers.
