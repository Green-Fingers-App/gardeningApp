# 1 Add Plant

## 1.1 Brief Description

This use case allows a user to add a new plant. The user accesses the Add Plant option by selecting the Add Button available throughout the app. A form is displayed where the user can search for a plant from the Plant Catalogue, assign a nickname to the plant, and select one of their existing gardens to place it in. The plant is added to the selected garden upon submission. If the user navigates away from the form before submitting, no changes are saved.

# 2 Flow of Events

## 2.1 Basic Flow
The basic flow for adding a plant follows these steps:
1.	The user selects the Add Button from anywhere in the app.
2.	The user chooses the Add Plant option from the menu.
3.	The system displays a form with the following fields:
   - A search field to find a plant from the Plant Catalogue.
   - A nickname field to assign a nickname to the plant.
   - A dropdown menu to select one of the user’s existing gardens.
4.	The user searches for a plant using its common name, selects it from the results, and assigns a nickname.
5.	The user selects one of their gardens from the dropdown menu.
6.	The user submits the form.
7.	The system adds the plant to the selected garden and displays a success message.
8.	The user is returned to their previous view.

## 2.2 Alternative Flow

### 2.2.1 User Cancels Adding a Plant

1.	The user opens the Add Plant form.
2.	The user decides not to proceed and selects Cancel.
3.	The system discards all input and returns the user to their previous view without adding a plant.

### 2.2.2 No Search Results for Plant

1.	The user enters a search query in the plant search field.
2.	The system finds no matching results in the Plant Catalogue.
3.	The system displays the message: “No plants found for the given search. Please try again with a different name.”
4.	The user can adjust the search query or cancel the operation.

## 2.3 Exception Flows

### 2.3.1 Missing or Invalid Input

1.	The user attempts to submit the form without completing all required fields (e.g., nickname or garden selection).
2.	The system displays an error message: “Please complete all required fields before submitting.”
3.	The user corrects the input and resubmits the form.

### 2.3.2 Database Error

1.	The user submits the form.
2.	The system encounters a database error while saving the plant.
3.	The system logs the error and displays a message: “Unable to add the plant due to a system error. Please try again later.”
4.	The user is returned to the form with their input preserved.

### 2.3.3 No Internet Connection

1.	The user submits the form.
2.	The system detects no internet connection.
3.	The system displays an error message: “No internet connection. Please try again when connected.”
4.	The user is returned to the form with their input preserved.

### 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/addPlant.drawio.svg)

### 2.1.2 Mock-Up
**Disclaimer** This mock up does not completley match the recent version of the flow
![add plant wireframes](/docs/assets/svg/useCaseWireframes/addPlant.png)

### 2.1.3 Narrative

**Feature**: Add Plant

```gherkin
  Scenario: User adds a new plant
    Given the user selects the "Add Button"
    When the user chooses the "Add Plant" option
    Then the system displays the "Add Plant" form with required fields

  Scenario: User successfully adds a plant
    Given the user is on the "Add Plant" form
    And the user searches for a plant by its common name and selects it
    And the user assigns a nickname to the plant
    And the user selects an existing garden
    When the user submits the form
    Then the system saves the new plant to the selected garden
    And a success message is displayed
    And the user is returned to their previous view

  Scenario: User cancels adding a plant
    Given the user is on the "Add Plant" form
    When the user selects "Cancel"
    Then the system discards all input
    And the user is returned to their previous view
```

# 3 Special Requirements

- The **Add Button** must provide clear access to the **Add Plant** option.
- The system must validate all required fields: selected plant, nickname, and garden.
- The plant search field must only allow searching by common name and display results dynamically.
- Any unsaved input must be preserved in case of errors, allowing the user to retry submission.

# 4 Preconditions

- The user must be logged in.
- The user must have at least one existing garden to assign the plant to.
- The **Plant Catalogue** must contain at least one plant.

# 5 Postconditions

- A new plant is added to the selected garden with the specified nickname.
- If the process is canceled or fails, no changes are made to the gardens or plants.

# 6 Extension Points

- If the user navigates away from the form before submitting, no changes are saved.
