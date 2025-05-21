# 1 Delete Sensor

## 1.1 Brief Description

This use case allows a user to delete an existing Sensor from their list. When the user chooses to delete a sensor, the system removes the sensor entry from the database, unlinks it from any associated plants, and deletes all related historical data. This action is irreversible.

---

# 2 Flow of Events

## 2.1 Basic Flow

1. The user navigates to the **Sensor Detail** page.
2. The user clicks the **Delete Sensor** button.
3. The system displays a confirmation dialog.
4. The user confirms the deletion.
5. The system:
   - Deletes the sensor from the `moisture_sensor` table.
   - Removes its reference from the `user_plant` table.
   - Deletes all moisture history entries from the `moisture_level_history` table.
6. The system returns a success message.
7. The sensor is removed from the user's list.

### 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/deleteSensor.drawio.svg)

### 2.1.2 Narrative

**Feature:** delete Sensor

```gherkin
  Feature: Remove a sensor from the system
  As a user
  I want to delete a sensor and unlink it from any associated plant
  So that it no longer appears in my app or affects calendar entries

  Scenario: User deletes a sensor
    Given the user has a sensor in the system
    When the user chooses to delete the sensor
    Then the system removes the sensor from the database
    And unlinks it from any associated plant or garden
```

## 2.2 Alternative Flows

- If the user cancels the confirmation dialog, no deletion is performed.

## 2.3 Exception Flows

### 2.3.1 Deletion Fails Due to Foreign Key Constraints

1. The system attempts to delete the sensor.
2. The sensor is still linked to a plant in `user_plant`.
3. An error is thrown: `violates foreign key constraint`.
4. The system should first nullify `moisture_sensor_id` in `user_plant` and delete history records.
5. The system retries the deletion or logs the failure.

### 2.3.2 Backend Fails to Respond

1. The system calls the DELETE `/api/sensor/:id` endpoint.
2. The backend is down or times out.
3. The system shows an error: “Unable to delete sensor. Please try again later.”
4. No data is changed.

---

# 3 Special Requirements

- A confirmation dialog is required before deletion.
- Proper cascading deletions must be ensured (or performed manually in backend logic).

# 4 Preconditions

- The user must be logged in.
- The user must own the sensor being deleted.

---

# 5 Postconditions

- The sensor and its associated data are deleted from the system.
- The sensor no longer appears in the user’s list.

---

# 6 Extension Points

- The system could log deleted sensors for audit purposes.
