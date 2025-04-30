# 1 View Plant

## 1.1 Brief Description

This use case allows a user to view detailed information about a plant in their garden. The user navigates to the **List of Plants** for a selected garden and selects a specific plant. The system displays an overview of the plant, divided into two sections:
- **Status**: Displays key information about the plant’s current condition (e.g., growth stage, health).
- **Description**: Provides general information about the plant, such as its type and care instructions.

The user can switch between these sections by clicking on the relevant accordion item.

# 2 Flow of Events

## 2.1 Basic Flow

The basic flow for viewing plant details follows these steps:
	1.	The user navigates to the **List of Plants** for a selected garden.
	2.	The user selects a specific plant from the list.
	3.	The system displays the plant details, divided into two sections: **Status** and **Description**.
	4.	The user interacts with the accordion to switch between the sections.
	5.	The user reviews the desired information.
	6.	The user can exit the view by navigating back to the plant list or another section of the app.

### 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/viewPlantDetail.drawio.svg)

### 2.1.3 Narrative
```gherkin
  Scenario: User views a plant's details  
    Given the user is on the "List of Plants" for a selected garden  
    When the user selects a specific plant  
    Then the system displays the plant details, divided into "Status" and "Description" sections  
  
  Scenario: User switches between sections  
    Given the user is viewing the details of a plant  
    When the user clicks on the "Status" or "Description" accordion item  
    Then the corresponding section is expanded, and the other sections are collapsed  
  
  Scenario: User exits the plant details view  
    Given the user is viewing the details of a plant  
    When the user navigates back or to another section  
    Then the system returns the user to the previous view
```
# 3 Special Requirements

- The accordion must provide a smooth and intuitive user experience for toggling between sections.
- The plant details should be displayed in a clean and organized format.

# 4 Preconditions

- The user must be logged in.
- The user must be in the List of Plants for a selected garden.
- The selected garden must contain at least one plant.

# 5 Postconditions

- The user views detailed information about the selected plant.

# 6 Extension Points

(n/a)
