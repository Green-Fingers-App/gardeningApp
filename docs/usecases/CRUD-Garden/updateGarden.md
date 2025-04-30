# 1 Add Garden

## 1.1 Brief Description

This use case allows a user to update an existing garden. From the **Gardens View**, the user selects a specific garden and chooses the **Edit Garden** option from the menu. A new window with a form is displayed, where the user can modify the garden’s name and location. The user can either cancel the operation or submit the changes to save them.

---

# 2 Flow of Events

## 2.1 Basic Flow

The basic flow for updating a garden follows these steps:
1.	The user navigates to the **Gardens View**.
2.	The user selects a specific garden from the list.
3.	The user opens the options menu for the selected garden and chooses **Edit Garden**.
4.	The system displays a form with the current garden name and location pre-filled.
5.	The user modifies the garden’s name and/or location.
6.	The user submits the changes.
7.	The system updates the garden details and displays a success message.
8.	The user is returned to the **Gardens View**, and the updated garden is shown in the list.

## 2.2 Alternative Flow

### 2.2.1 User Cancels Editing
1.	The user opens the form to edit the garden.
2.	The user decides not to proceed and selects **Cancel**.
3.	The system discards any changes and returns the user to the **Gardens View** without modifying the garden.

## 2.3 Exception Flows

2.3.1 Invalid Input

1.	The user opens the form and enters invalid data (e.g., leaves the name field empty).
2.	The system displays an error message: “Please provide a valid name and location.”
3.	The user corrects the input and submits again.

2.3.2 Database Error

1.	The user submits the changes.
2.	The system encounters a database error while updating the garden details.
3.	The system logs the error and displays a message: “Unable to update garden due to a system error. Please try again later.”
4.	The user is returned to the edit form with their input preserved.

2.3.3 No Internet Connection

1.	The user submits the changes.
2.	The system detects that there is no internet connection.
3.	The system displays an error message: “No internet connection. Please try again when connected.”
4.	The user is returned to the edit form with their input preserved.

### 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/updateGarden.drawio.svg)

### 2.1.3 Narrative

**Feature:** Delete Garden

```gherkin
  Scenario: User updates the garden's details
    Given the user is on the "Gardens View"
    And the user selects a garden from the list
    When the user opens the options menu and selects "Edit Garden"
    Then the system displays a form with the current garden name and location pre-filled

  Scenario: User modifies and submits garden details
    Given the user is editing a garden
    When the user updates the garden's name and/or location
    And submits the changes
    Then the system saves the updated details
    And a success message is displayed
    And the user is returned to the "Gardens View"

  Scenario: User cancels editing
    Given the user is editing a garden
    When the user selects "Cancel"
    Then the system discards the changes
    And the user is returned to the "Gardens View"
```

---

# 3 Special Requirements

- The system must validate the inputs to ensure a name and location are provided.
- Changes must not be saved unless the user confirms by submitting the form.
- The system must provide clear feedback for errors during the update process.

---

# 4 Preconditions

- The user must be logged in.
- The user must have at least one garden in their account.
- The user must navigate to the **Gardens View** to initiate editing.

---

# 5 Postconditions

- The garden’s details are updated if the user submits valid changes.
- If the user cancels, no changes are made.
- Any errors encountered are logged, and the user is informed.

---

# 6 Extension Points

- If the user navigates away from the edit form before submitting, no changes are saved.
- The system preserves unsaved input in case of errors, allowing the user to retry the submission.
