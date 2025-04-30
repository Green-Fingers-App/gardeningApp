# 1 Add Garden

## 1.1 Brief Description

This use case allows a user to add a new garden. After selecting the **Create Garden option**, the system prompts the user to provide the garden’s name and location (e.g., indoor or outdoor). Once the required information is entered and confirmed, the garden is created and added to the user’s list of gardens.

---

# 2 Flow of Events

## 2.1 Basic Flow

The basic flow for deleting a garden follows these steps:

1. The user clicks on the **Add button**.
2. The user is presented with a **List of add options**.
3. The user selects **Add Garden**.
4. The system displays a form for the new garden to the user.
5. The user fills out the input fields to give the new garden a name and a location.
6. The user submit the form and the system creates a new garden.
7. The user is returned to the **List of Gardens** view, where the new garden appears.

## 2.2 Alternative Flow
- none

## 2.3 Exception Flows

### 2.3.1 Database Error during Garden Creation
1.	The user provides the garden name and location and confirms.
2.	The system attempts to create the garden but encounters a database connection error.
3.	The system logs the error and displays an error message: “Unable to create garden due to a system error. Please try again later.”
4.	The user is returned to the **garden list** screen, and the garden is not created.

### 2.3.2 No Internet Connection
1.	The user provides the garden name and location and confirms.
2.	The system detects that there is no internet connection.
3.	The system displays an error message: “No internet connection. Please try again when connected.”
4.	The user is returned to the **garden list** screen, and the garden is not created.

### 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/addGarden.drawio.svg)

### 2.1.3 Narrative

**Feature:** Create Garden

```gherkin
  Scenario: User adds a new garden
    Given the user clicked on the "Add" button
    And the user selects the "Add Garden" option
    When the system prompts the user to enter a garden name and a location
    And the user provides a name and a location and confirms
    Then the system creates the new garden and adds it to the list
    And the user is returned to the "Gardens List" section
```

---

# 3 Special Requirements

- The system must ensure that a garden cannot be created without a name and location.

---

# 4 Preconditions

- The user must be logged in.
- The user must have the appropriate permissions to create a garden.

---

# 5 Postconditions

- The garden is successfully created with the provided name and location.
- The new garden appears in the user’s list of gardens.

---

# 6 Extension Points

- If the user cancels the process, no garden is created, and the user is returned to the List of Gardens screen
- In the case of an error during creation, an error message is displayed.
