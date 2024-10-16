# 1 Delete Plant from Garden


## 1.1 Actors

This use case can be performed by a **User**.

## 1.2 Goal

The user wants to **delete a plant** from a specific garden.

## 1.3 Summary

To **delete a plant** from a garden, the user navigates to the garden overview by clicking in the navigation bar on the **garden icon**. The user selects the garden they want to delete the plant from. The user click on the **more options** icon of the plant they want to delete and selects **delete plant**. The use has to **confirm the deletion**. The plant will be removed from the garden and deleted from the database with all its data.

# 2 Flow of Events

## 2.1 Basic Flow

1. The user clicks on **garden icon** in the navigation bar.
2. The user is presented with a **List of Gardens**.
3. The user selects the garden they want to delete the plant from.
4. The user is presented with a **List of Plants**.
5. The user clicks on the **more options** icon of the plant they want to delete.
6. The user selects **delete plant**.
7. The user is presented with a **confirmation dialog**.
8. The user confirms the deletion.
9. The plant is removed from the garden and deleted from the database.

### 2.1.1 Activity Diagram

![Activity diagram](/docs/assets/svg/useCaseDiagrams/deletePlant.drawio.svg)

### 2.1.2 Mock-Up

![Delete plant wireframes](/docs/assets/svg/useCaseWireframes/deletePlant.png)

### 2.1.3 Narrative

```gherkin
Feature: Delete Plant from Garden
  In order to remove a plant from a garden
  As a user
  I want to delete a plant from a garden

  Scenario: User deletes a plant from a garden
    Given the user is on the "Home" page
    When the user clicks on the "Garden" icon in the navigation bar
    Then the system loads the garden overview
    And the user is presented with a list of all gardens
    When the user selects a garden
    Then the system loads the garden details
    And the user is presented with a list of all plants in the garden
    When the user clicks on the "more options" icon of a plant
    And the user selects "delete plant"
    Then the system presents a confirmation dialog
    When the user confirms the deletion
    Then the plant is removed from the garden
    And the plant is deleted from the database
```

### 2.2 Alternative Flows

- If the user long-presses the plant name, the system presents the **more options** menu directly. The user selects **delete plant**, and the system proceeds with the confirmation dialog. The plant is deleted after confirmation.

### 2.3 Exception Flows

#### 2.3.1 Error Handling - Loading the plants
The system displays an error message if the function fails to load the plants.
User can retry the loading.

#### 2.3.2 Error Handling - Deletion
The system displays an error message if the function fails to delete the plant.
User can retry the deletion.

# 3 Special Requirements

# 4 Preconditions

The user is **logged in** and has at least **one garden in their account** and the garden has **one plant in the garden**.
The user is at the **Home** page.

# 5 Postconditions

The user has deleted a plant from the garden.

# 6 Extension Points

# 7 CRUD Classification

The **Delete Plant** use case is a **Delete** operation. The user deletes a plant from the garden.
