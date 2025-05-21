# 1 Update Sensor

## 1.1 Brief Description

This use case allows a user to update a Sensor’s details, such as its name or the plant it's assigned to. The user selects a Sensor from the list, opens the **Edit Sensor** screen, modifies the necessary fields, and submits the changes. The system updates the sensor details in the backend and reflects the changes in the frontend.

---

# 2 Flow of Events

## 2.1 Basic Flow

1. The user navigates to the **Sensor Detail** screen.
2. The user taps on the **Edit** button.
3. The system displays the **Edit Sensor** form.
4. The user modifies the Sensor name and/or assigned plant.
5. The user submits the form.
6. The system sends a PUT /api/sensor/:id request with the updated fields.
7. The backend validates and updates the Sensor in the database.
8. The system returns to the Sensor detail screen showing the updated info.

### 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/updateSensor.drawio.svg)

### 2.1.2 Narrative

**Feature:** update Sensor

```gherkin
  Feature: Update sensor configuration
  As a user
  I want to change the sensor’s name, type, or linked plant
  So that the information stays up to date and relevant

  Scenario: User updates sensor config
    Given the user has an existing sensor in the system
    When the user edits the sensor's name, type, or plant assignment
    Then the system updates the sensor configuration in the database
    And shows a confirmation message
```

## 2.2 Alternative Flows

- None

## 2.3 Exception Flows

### 2.3.1 Sensor Update Fails Due to Missing Fields

1. The user submits the form with missing name or plant ID.
2. The backend responds with a 400 Bad Request.
3. The system displays an error message: “Missing required fields.”
4. The user stays on the edit form and can try again.

### 2.3.2 Backend Timeout or Unreachable

1. The user submits the form.
2. The system fails to reach the backend API (e.g., timeout, DNS issue).
3. The system displays an error message: “Unable to update Sensor. Please try again later.”

### 2.3.3 Sensor Not Found or Unauthorized

1. The user submits the form for a sensor they don’t own or that has been deleted.
2. The backend responds with 403 Forbidden or 404 Not Found.
3. The app displays a toast: “You are not authorized to update this sensor.”

---

# 3 Special Requirements

- The system must validate user ownership of the Sensor before update.
- The API must support partial updates for fields like `name` and `plant_id`.

---

# 4 Preconditions

- The user must be logged in.
- The user must have at least one sensor.

---

# 5 Postconditions

- The Sensor is updated in the backend.
- The user sees the updated name and/or plant on the sensor detail screen.

---

# 6 Extension Points

- Support editing other sensor metadata in future updates (e.g., update frequency).
