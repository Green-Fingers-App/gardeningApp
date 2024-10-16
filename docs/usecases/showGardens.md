# 1 Show Gardens

## 1.1 Actors

This use case can be performed by a **User**.

## 1.2 Goal

The user wants to see an **overview of all gardens** they have.

## 1.4 Summary

To see an **overview of all gardens**, the user navigate to the garden overview by clicking in the navigation bar on the **garden icon**. The user will see a list of all gardens they have. Each garden card contains the following information:

- Garden name
- Image of the garden
- Status of the garden

# 2 Flow of Events

## 2.1 Basic Flow

1. The user clicks on **garden icon** in the navigation bar.
2. The user is presented with a **List of Gardens**.

### 2.1.1 Activity Diagram

![Activity diagram](/docs/assets/svg/useCaseDiagrams/showGardens.drawio.svg)

### 2.1.2 Mock-Up

![Show gardens wireframes](/docs/assets/svg/useCaseWireframes/showGardens.png)

### 2.1.3 Narrative

**Feature:** Show Gardens

```gherkin
  Scenario: User views an overview of all gardens
    Given the user is on the "Home" page
    When the user clicks on the "Garden" icon in the navigation bar
    Then the system loads the garden overview
    And the user is presented with a list of all gardens
    And each garden card contains the garden name, an image of the garden, and the status of the garden
```

### 2.2 Alternative Flows

### 2.3 Exception Flows

#### 2.3.1 Error Handling - Loading the gardens
The system displays an error message if the function fails to load the garden overview.

# 3 Special Requirements

# 4 Preconditions

The user is **logged in** and has at least **one garden in their account**, also the user is at the **Home** page.

# 5 Postconditions

The user has seen an **overview of all gardens** they have.

# 6 Extension Points

# 7 CRUD Classification

The **Show Gardens** use case is a **Read** operation. The user reads information about their gardens.
