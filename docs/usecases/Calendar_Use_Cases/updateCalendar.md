# 1 Update Calendar

## 1.1 Brief Description

The **Update Calendar** use case allows users to modify an existing watering event in the gardening calendar. This typically involves selecting a scheduled task (e.g., watering a plant), editing the date and time, and saving the changes. The user must be authorized to edit events.

# 2 Flow of Events

## 2.1 Basic Flow

1. The user navigates to the calendar.
2. The user selects an existing watering event.
3. The system displays the event details in an editable form.
4. The user modifies the date and/or time.
5. The user confirms and saves the changes.
6. The system updates the calendar entry and shows the updated event.
7. The use case ends.

## 2.2 Alternative Flow

### 2.2.1 User Cancels Editing

- At step 4, the user chooses to cancel the operation.
- The system discards all changes and returns to the calendar view without modifying the event.

## 2.3 Exception Flows

### 2.3.1 Invalid Input

- If the user enters an invalid date or time:
  - The system displays a validation error message.
  - The user must correct the input before proceeding.

### 2.3.2 Update Failure

- If the backend update fails due to a server or network issue:
  - The system displays an error message.
  - The user can retry or cancel the update.

## 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/updateWateringDate.drawio.svg)

## 2.1.3 Narrative

```gherkin
Feature: Update Calendar
  As a user
  I want to edit an existing watering event
  So that I can change the scheduled watering date or time

  Scenario: Successfully update a watering event
    Given the user is logged in
    And the calendar is displayed
    And a watering event exists on the selected date
    When the user selects the event
    And changes the date or time
    And confirms the update
    Then the system saves the changes
    And the updated event is displayed in the calendar

  Scenario: Cancel editing
    Given the user is editing a watering event
    When the user clicks "Cancel"
    Then the system discards the changes
    And the user is returned to the calendar view

  Scenario: Enter invalid date or time
    Given the user is editing a watering event
    When the user enters an invalid date or time
    Then the system displays a validation error
    And the user must correct the input before proceeding

  Scenario: Update failure due to server issue
    Given the user confirms the event update
    And the backend is unreachable
    Then the system displays an error message
    And offers the user the option to retry or cancel
```

# 3 Special Requirements

Date and time pickers should support validation for allowed input ranges.

The system must ensure updates do not overlap with other scheduled tasks.

The update process must work both online and with temporary offline support (queued changes).

# 4 Preconditions

The user is authenticated and has permission to modify calendar entries.

The calendar event to be edited exists and is not expired or locked.

# 5 Postconditions

The calendar event has been updated with the new date/time.

The changes are persisted in the backend and reflected in the UI.

# 6 Extension Points

Notify Users – After a successful update, the system may trigger notifications to relevant users.

Audit Logging – Changes to calendar events may be recorded for auditing purposes.
