# Show Sensor Data

## 1.1 Brief Description: Retrieve and Display Moisture Data

This use case allows a user to view real-time or recent moisture data collected by their connected sensors. Once a sensor is paired and connected to the backend, the system will periodically receive moisture readings. This information is displayed in the app, showing both raw values and interpreted levels (e.g., "Very Dry", "Moist").

---

# 2 Flow of Events

## 2.1 Basic Flow

1. The user opens the app and navigates to the **Sensor Detail** or **Overview** screen.
2. The system identifies the sensor associated with the user.
3. The system sends a `GET /api/sensor/:id` request to the backend.
4. The backend returns sensor data including:
   - `sensor.id`
   - `name`
   - `current_moisture_level`
   - `interpretedMoisture`
   - `percentage`
   - linked plant name
5. The system displays this data in a visual format (e.g., chart or card).

### 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/showSensor.drawio.svg)

### 2.1.2 Narrative

**Feature:** show Sensor

```gherkin
  Feature: View real-time sensor data
  As a user
  I want to see the current readings from my sensors
  So that I can monitor my plants and take appropriate action

  Scenario: User views sensor data
    Given the user has at least one active sensor
    When the user opens the sensor detail or overview page
    Then the app displays the latest sensor readings (e.g.  moisture)
```

---

## 2.2 Alternative Flow

- If the sensor has no recent data, a placeholder message is displayed: “No recent readings available.”

## 2.3 Exception Flows

### 2.3.1 Sensor Not Found

1. The app sends a request to `/api/sensor/:id`.
2. The backend responds with a 404 error:  
   `{ "error": "Sensor not found or not authorized" }`
3. The user is shown an error: “Sensor not found.”

### 2.3.2 Backend Timeout or Offline

1. The app sends a `GET` request.
2. The backend server is unreachable or times out.
3. The app displays: “Unable to load sensor data. Please check your connection or try again later.”

---

# 3 Special Requirements

- Sensor data must be fetched using the user’s access token (JWT).
- Data must include both raw and interpreted values.
- Data is visualized using a progress bar or status label.

# 4 Preconditions

- The user must be logged in.
- The sensor must be successfully paired and transmitting data.

# 5 Postconditions

- The app displays the latest available moisture data for the selected sensor.

# 6 Extension Points

- Historical sensor readings can be fetched via `/api/sensor/:id/details`
- Interpreted moisture levels (e.g., "Wet", "Dry") can be used to trigger alerts or UI changes.
