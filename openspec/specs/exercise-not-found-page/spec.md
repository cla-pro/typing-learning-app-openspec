## Purpose

Dedicated routed error page for invalid or missing exercise requests and recovery navigation back to home.

## Requirements

### Requirement: Dedicated exercise-not-found page
The system SHALL provide a dedicated routed page for invalid or missing exercise requests.

#### Scenario: Missing exercise id lands on dedicated page
- **WHEN** the exercise flow determines the route id is missing during initialization
- **THEN** the user is navigated to the dedicated exercise-not-found page route

#### Scenario: Invalid exercise id lands on dedicated page
- **WHEN** the exercise flow determines the requested exercise id does not exist
- **THEN** the user is navigated to the dedicated exercise-not-found page route

### Requirement: Shared generic not-found message
The exercise-not-found page SHALL display the same generic error message for both missing-id and invalid-id cases, and MUST NOT include the unresolved exercise id value.

#### Scenario: Message does not expose unresolved id
- **WHEN** the exercise-not-found page is shown
- **THEN** the page message does not render the requested exercise id value

#### Scenario: Missing-id and invalid-id share one message
- **WHEN** the exercise-not-found page is shown after either missing-id or invalid-id detection
- **THEN** the same user-facing not-found message is displayed

### Requirement: Home recovery action on exercise-not-found page
The system SHALL provide a home navigation action from the exercise-not-found page.

#### Scenario: Home button is visible and enabled
- **WHEN** the exercise-not-found page is displayed
- **THEN** a home button is visible and enabled

#### Scenario: Home button returns to welcome page
- **WHEN** a user clicks the home button on the exercise-not-found page
- **THEN** the application navigates to the root welcome page using Angular routing
