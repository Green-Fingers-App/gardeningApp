# 1 Use Case Name

**Delete Garden**

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

### 2.1.1 Activity Diagram

![UML flowchart]()

### 2.1.2 Mock-Up

Mock-up pending, awaiting access to the Figma file.

### 2.1.3 Narrative

- **Step 1**: The user navigates to the **Manage Gardens** section from the main app interface.
- **Step 2**: The user views the list of gardens they have created.
- **Step 3**: The user clicks the **Delete Garden** button next to the garden they want to remove.
- **Step 4**: A confirmation dialog appears, asking: "Are you sure you want to delete this garden?"
- **Step 5**: The user clicks **Confirm** to proceed.
- **Step 6**: The system permanently deletes the garden and its related data. A success message is shown to the user.
- **Step 7**: The user is returned to the **Manage Gardens** section.

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
