# Delete Garden

## 1.1 Brief Description

This use case allows a user to delete a garden from their list of gardens. After selecting the **Delete Garden** option, the system prompts the user for confirmation. Once confirmed, the garden, along with all associated plants and data, is permanently removed.

---

# 2 Flow of Events

## 2.1 Basic Flow

The basic flow for deleting a garden follows these steps:

1. The user navigates to the **Manage Gardens** section.
2. The user is presented with a **List of Gardens**.
3. The user selects **Delete Garden** for a specific garden.
4. The system displays a confirmation dialog to the user.
5. The user confirms the deletion.
6. The system deletes the garden and its associated data.
7. The user is returned to the **List of Gardens** view.

## 2.2 Alternative Flow
- If the user long-presses the garden name, the system presents a confirmation dialog. The user confirms, and the garden is deleted. The user is returned to the **List of Gardens** view.

## 2.3 Exception Flows

### 2.3.1 Database Error during Deletion
1. The user confirms the deletion of the garden.
2. The system attempts to delete the garden but encounters a database connection error.
3. The system logs the error and displays an error message: "Unable to delete garden due to a system error. Please try again later."
4. The user is returned to the **Manage Gardens** section, and the garden remains unchanged.

### 2.3.2 No Internet Connection
1. The user confirms the deletion of the garden.
2. The system detects that there is no internet connection.
3. The system displays an error message: "No internet connection. Please try again when connected."
4. The user is returned to the **Manage Gardens** section, and the garden remains unchanged.

### 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/deleteGarden.drawio.svg)

### 2.1.3 Narrative

**Feature:** Delete Garden

```gherkin
  Scenario: User deletes a garden from their list
    Given the user is on the "Manage Gardens" section
    And the user views the list of gardens they have created
    When the user clicks the "Delete Garden" button next to the garden they want to remove
    Then a confirmation dialog appears asking "Are you sure you want to delete this garden?"
    When the user clicks "Confirm" to proceed
    Then the system permanently deletes the garden and its related data
    And a success message is shown to the user
    And the user is returned to the "Manage Gardens" section
```

---

# 3 Special Requirements

- The system must ensure that deleting a garden removes all linked data, such as plants, sensors, and notifications.
- Deletion must be permanent, with no recovery option.
- A confirmation dialog must be presented to prevent accidental deletions.

---

# 4 Preconditions

- The user must be logged in.
- The user must have at least one garden in their account.
- The user must have the appropriate permissions to delete the garden.

---

# 5 Postconditions

- The garden is permanently deleted.
- All related plants, sensors, and notifications are also deleted.
- A confirmation message is displayed after successful deletion.

---

# 6 Extension Points

- If the user cancels the deletion, the garden remains unchanged, and the user is returned to the **List of Gardens** screen.
- In the case of an error during the deletion, an error message is displayed, and the garden remains intact.
