## 1. Project Setup & Initialization

- [x] 1.1 Create project directory structure (src/, public/, tests/)
- [x] 1.2 Initialize npm project with package.json
- [x] 1.3 Install Express.js and other core dependencies
- [x] 1.4 Configure ESLint for code quality
- [x] 1.5 Add .gitignore for node_modules and build artifacts

## 2. Web Server Implementation

- [x] 2.1 Create Express application instance in src/server.js
- [x] 2.2 Configure Express to serve static files from public/ directory
- [x] 2.3 Set up port configuration (default 3000, configurable via environment variables)
- [x] 2.4 Add error handling middleware for 404 and 500 responses
- [x] 2.5 Add logging middleware to track HTTP requests

## 3. Hello Page Implementation

- [x] 3.1 Create index.html with "Hello" in public/ directory
- [x] 3.2 Style index.html with basic CSS (clean typography and layout)
- [x] 3.3 Create route handler for GET / that serves index.html
- [x] 3.4 Verify page renders correctly with proper content-type (text/html)

## 4. Development Environment Setup

- [x] 4.1 Create npm script: `npm start` - runs the production server
- [x] 4.2 Create npm script: `npm run dev` - runs with auto-restart (nodemon)
- [x] 4.3 Create npm script: `npm test` - runs test suite
- [x] 4.4 Create .env.example file documenting configuration variables
- [x] 4.5 Add README.md with setup and running instructions

## 5. Testing & Verification

- [x] 5.1 Write test for server initialization
- [x] 5.2 Write test for GET / returns status 200 and contains "Hello"
- [x] 5.3 Write test for static file serving (404 on missing files)
- [x] 5.4 Run full test suite and verify all tests pass
- [x] 5.5 Manual verification: start server, visit http://localhost:3000, confirm "Hello" appears
