## MODIFIED Requirements

### Requirement: Exercise configuration-driven page rendering
The system SHALL render exercise-page content based on configuration resolved from `ExerciseConfigService` using the exercise id from the route, SHALL use `expectedChars` as the expected-character source for runtime progression display, and SHALL present expected characters as a stream-focused typing UI.

#### Scenario: Valid exercise id loads configuration
- **WHEN** a user navigates to an exercise route with a valid exercise id
- **THEN** the page retrieves the matching exercise configuration from `ExerciseConfigService`

#### Scenario: Stream-focused exercise rendering
- **WHEN** a valid exercise configuration is resolved
- **THEN** the page renders expected characters as a continuous stream and does not display exercise id, exercise name, or impacted keys

#### Scenario: Center zoom window is rendered
- **WHEN** the exercise page is rendered with an active expected character
- **THEN** a center zoom area displays exactly two previous characters, the active character, and two following characters in larger typography

#### Scenario: Side segments are reduced-emphasis and clipped
- **WHEN** expected-character stream content exceeds the available width
- **THEN** left and right side segments render with reduced size and opacity, respect side margins, and hide overflow beyond their containers

#### Scenario: Last pressed key is displayed under stream visualization
- **WHEN** the exercise page is rendered
- **THEN** the last pressed key feedback is displayed beneath the stream and zoomed area

#### Scenario: Home button remains available on exercise page
- **WHEN** the exercise page is rendered
- **THEN** a home button is visible and provides navigation back to the root page

### Requirement: Automated test coverage for introduced exercise-page changes
The system SHALL include automated tests for service behavior and page integration introduced by this change, and those tests MUST validate behavior through public APIs and observable outcomes rather than source-file text inspection.

#### Scenario: ExerciseConfigService is tested
- **WHEN** test suites are executed
- **THEN** tests verify listing exercises and resolving exercise configuration by id, including not-found outcomes, through public service API calls

#### Scenario: Exercise page integration is tested
- **WHEN** test suites are executed
- **THEN** tests verify valid-id rendering and invalid/missing-id redirection behavior through component interaction and observable outcomes

#### Scenario: Exercise runtime lifecycle and key capture are tested
- **WHEN** test suites are executed
- **THEN** tests verify lifecycle state transitions, start/pause button-label switching, temporary completion transition, and running-state key capture/display via observable page behavior

#### Scenario: Exercise redirection test exists for invalid lookup
- **WHEN** exercise component requirements tests are executed
- **THEN** at least one test asserts Angular Router navigation is triggered when exercise lookup fails during initialization

#### Scenario: Exercise progression behavior is tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify active expected-character initialization, progression only on exact match, case-sensitive matching, and completion transition on the final expected character

#### Scenario: Exercise stream UX behavior is tested
- **WHEN** exercise component requirements tests are executed
- **THEN** tests verify hidden metadata fields, zoom-window composition, side-segment overflow behavior assumptions, and left-shift progression updates

#### Scenario: Exercise tests avoid implementation-text assertions
- **WHEN** exercise-page requirements tests are authored or maintained
- **THEN** they do not load source files to assert the presence of specific code fragments
