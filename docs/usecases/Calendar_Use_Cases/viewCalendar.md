# 1 View Calendar

## 1.1 Brief Description

The **View Calendar** use case allows the user to view the gardening calendar. This includes a visual overview of scheduled gardening tasks, events, and reminders. It supports user-friendly navigation by date or task type. No modifications to events are allowed in this view-only scenario.

# 2 Flow of Events

## 2.1 Basic Flow

1. The user selects the “Calendar” option from the main menu.
2. The system retrieves the current calendar data.
3. The system displays the calendar in a month/week/day view format.
4. The user can navigate between different dates.
5. The user can click on a calendar entry to view event details.
6. The use case ends.

## 2.2 Alternative Flow

### 2.2.1 User Switches View Mode

- At any point in step 3, the user can choose to switch between day, week, and month views.
- The system refreshes the view accordingly without reloading data.

## 2.3 Exception Flows

### 2.3.1 Data Retrieval Failure

- If the system fails to retrieve calendar data:
  - The system displays an error message.
  - The user is given the option to retry or return to the main menu.

### 2.3.2 No Calendar Entries Available

- If no entries are found for the selected view:
  - The system shows an empty state message indicating no tasks/events for the selected date or period.

## 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/viewCalendar.drawio.svg)

## 2.1.3 Narrative

## 2.1.3 Narrative

```gherkin
Feature: View Calendar
  As a user
  I want to view my gardening calendar
  So that I can see scheduled tasks and events

  Scenario: Display calendar view
    Given the user is logged in
    And the user is on the main menu
    When the user selects the "Calendar" option
    Then the system loads the calendar data
    And the system displays the calendar in a default view (e.g. month)

  Scenario: Navigate between calendar views
    Given the calendar is displayed
    When the user selects a different view mode (day, week, or month)
    Then the system updates the calendar to reflect the selected view

  Scenario: View event details
    Given the calendar is displayed
    And events are visible on the calendar
    When the user clicks on an event
    Then the system displays the event details in a popup or modal

  Scenario: Calendar data retrieval failure
    Given the user selects the "Calendar" option
    And the backend is unavailable
    When the system attempts to load calendar data
    Then an error message is shown
    And the user can retry or return to the main menu

  Scenario: No calendar entries
    Given the user selects a date with no events
    When the calendar view loads
    Then the system displays an empty state message


# 3 Special Requirements

- The calendar must support smooth transitions between views (day/week/month).
- Event tooltips or modals should be accessible via keyboard and touch interfaces.
- Localization and time zone support for calendar entries.
- Calendar must be responsive and optimized for both desktop and mobile devices.

# 4 Preconditions

- The user is authenticated and authorized to access calendar data.
- Calendar data exists in the backend system.
- The system is online and can retrieve data.

# 5 Postconditions

- The user has successfully viewed the calendar and optionally browsed event details.
- No data is modified as this is a read-only operation.

# 6 Extension Points

- **Add Calendar Entry** – When clicking on a specific date, user can optionally be directed to a different use case for creating a new task.
- **Edit Calendar Entry** – From an event detail popup, if allowed, user can enter the edit flow.
- **Delete Calendar Entry** – Events could include a delete button if user has sufficient permissions.
```
