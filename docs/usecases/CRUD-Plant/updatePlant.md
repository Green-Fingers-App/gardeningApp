# 1 Update Plant

## 1.1 Brief Description

This use case allows a user to update the details of an existing plant. The user navigates to the **Plants View** or the **List of Plants** in a selected garden. The user selects a specific plant and chooses the **Edit Plant** option from the menu. A form is displayed, allowing the user to modify the plant’s nickname and reassign it to a different garden. The user can either cancel the operation or submit the changes to save them.

---

# 2 Flow of Events

## 2.1 Basic Flow

The basic flow for updating a plant follows these steps:
1.	The user navigates to the **Plants View** or the **List of Plants** for a specific garden.
2.	The user selects a plant from the list.
3.	The user opens the options menu for the selected plant and chooses **Edit Plant**.
4.	The system displays a form with the current plant nickname and assigned garden pre-filled.
5.	The user modifies the plant’s nickname and/or reassigns it to a different garden.
6.	The user submits the changes.
7.	The system updates the plant details and displays a success message.
8.	The user is returned to the previous view, with the updated plant details visible in the list.

## 2.2 Alternative Flow

### 2.2.1 User Cancels Editing
1.	The user opens the **Edit Plant** form.
2.	The user decides not to proceed and selects **Cancel**.
3.	The system discards any changes and returns the user to the previous view without modifying the plant.

## 2.3 Exception Flows

### 2.3.1 Missing or Invalid Input

1.	The user attempts to submit the form without completing all required fields (e.g., leaves the nickname field empty).
2.	The system displays an error message: “Please provide a valid nickname and select a garden.”
3.	The user corrects the input and resubmits the form.

### 2.3.2 Database Error

1.	The user submits the changes.
2.	The system encounters a database error while updating the plant details.
3.	The system logs the error and displays a message: “Unable to update plant due to a system error. Please try again later.”
4.	The user is returned to the edit form with their input preserved.

### 2.3.3 No Internet Connection

1.	The user submits the changes.
2.	The system detects no internet connection.
3.	The system displays an error message: “No internet connection. Please try again when connected.”
4.	The user is returned to the edit form with their input preserved.

## 2.4 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/updatePlant.drawio.svg)

## 2.5 Narrative

**Feature:** Update Plant

```gherkin
  Scenario: User updates a plant's details  
    Given the user is in the "Plants View" or "List of Plants" for a selected garden  
    And the user selects a plant from the list  
    When the user opens the options menu and selects "Edit Plant"  
    Then the system displays a form with the current nickname and garden pre-filled  
  
  Scenario: User modifies and submits plant details  
    Given the user is editing a plant  
    When the user updates the nickname and/or garden  
    And submits the changes  
    Then the system saves the updated details  
    And a success message is displayed  
    And the user is returned to the previous view  
  
  Scenario: User cancels editing  
    Given the user is editing a plant  
    When the user selects "Cancel"  
    Then the system discards the changes  
    And the user is returned to the previous view  
```

---

# 3 Special Requirements

- The system must validate the input fields: nickname and garden selection.
- Changes must not be saved unless the user confirms by submitting the form.
- The system must provide clear feedback for errors during the update process.

---

# 4 Preconditions

- The user must be logged in.
- The user must have at least one existing plant to edit.
- The user must have at least one garden to assign the plant to.

---

# 5 Postconditions

- The plant’s details are updated if the user submits valid changes.
- If the user cancels, no changes are made.
- Any errors encountered are logged, and the user is informed.

---

# 6 Extension Points

- If the user navigates away from the edit form before submitting, no changes are saved.
