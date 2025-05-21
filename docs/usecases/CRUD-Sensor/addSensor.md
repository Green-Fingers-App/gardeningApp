# 1 Add Sensor

## 1.1 Brief Description : Transmit Wi-Fi Credentials to Sensor

This use case allows a user to add a new sensor to their plants. After selecting the Add Sensor option, the system offers the user the ability to scan a QR code from the package that was delivered with the sensor. After scanning the QR code, the user can select a Wi-Fi network in the app and enter the password. Once the sensor successfully connects to Wi-Fi, the app prompts the user to provide the sensor’s name and assign it to a plant. Once all required information is submitted and confirmed, the sensor is created and added to the user’s list of sensors.

---

# 2 Flow of Events

## 2.1 Basic Flow

The basic flow for pairing a Sensor follows these steps:

1. The user clicks the **Add** button.
2. The user is presented with a **List of Add Options**.
3. The user selects **Add Sensor**.
4. The user scans the QR code.
5. The system displays a form for entering Wi-Fi credentials.
6. The user fills out the input fields.
7. The system displays a form for entering sensor details.
8. The user fills out the input fields to name the sensor and assign it to a plant.
9. The user submits the form, and the system creates a new sensor.
10. The user is returned to the **Sensor Detail** page, where the new sensor is listed.

## 2.2 Alternative Flow

- none

## 2.3 Exception Flows

### 2.3.1 Sensor Creation Fails Due to Missing Fields

    1.	The user or the ESP sensor submits a POST /api/sensor/pair request with incomplete data (e.g., missing user_id, plant_id, name, or current_moisture_level).
    2.	The backend detects the missing fields and rejects the request.
    3.	The system responds with an error message:{ "error": "Missing required fields" }
    4.	The ESP sensor does not receive tokens and logs the pairing failure.
    5.	The frontend app shows an appropriate toast notification, and the pairing process is halted.

### 2.3.2 No Internet Connection

    1.	The user connects to the ESP sensor’s Access Point and submits Wi-Fi credentials via the /wifi endpoint.
    2.	The sensor attempts to connect to the provided Wi-Fi but fails (e.g., wrong password, no signal).
    3.	The system sets wifiConnected = false and restarts the Access Point.
    4.	The sensor responds with:{ "status": "failed", "message": "WiFi connection failed" }
    5.	The frontend app displays an error: “No internet connection.

### 2.3.3 Backend Pairing Fails (Timeout or Server Error)

    1.	The ESP sensor attempts to register via a POST /api/sensor/pair request after receiving user input (name, userId, plantId).
    2.	The backend is unreachable (server offline, DNS issue, etc.) or returns a 5xx error.
    3.	The sensor logs the error and responds with:    { "status": "error", "message": "Backend pairing failed" }
    4.	No access or refresh token is saved on the sensor.
    5.	The user sees a message in the app: “Unable to connect to server. Please try again later.”

### 2.3.4 Backend Returns Invalid or Unexpected Response

    1.	The sensor sends a pairing request and receives a malformed or incomplete JSON response (e.g., missing accessToken or sensor.id).
    2.	The JSON fails to parse on the sensor.
    3.	The sensor logs:  Failed to parse backend JSON
    4.	The app receives a generic error: “Pairing failed. Please try again.”
    5.	No tokens are stored, and the sensor remains inactive.

### 2.3.6 Sensor Data Submission Fails Due to Network Loss

    1.	The sensor successfully connects to Wi-Fi and attempts to send moisture data periodically.
    2.	During a scheduled send, the network is temporarily offline.
    3.	The POST /api/data request fails (e.g., timeout or DNS failure).
    4.	The sensor logs: Failed to send data. Code: -1
    5.	Data is not stored in the backend, but the sensor tries again after moistureInterval.

### 2.1.1 Activity Diagram

![UML flowchart](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/assets/svg/useCaseDiagrams/createSensor.drawio.svg)

### 2.1.3 Narrative

**Feature:** Create Sensor

```gherkin
  Feature: Provide Wi-Fi access to the sensor
  As a user
  I want to send my Wi-Fi SSID and password to the sensor
  So that it can connect to the local network

  Scenario: User transmits Wi-Fi credentials

    Given the user is connected to the sensor's Wi-Fi access point
    And the ESP has started a web server on its local IP

    When the user opens the configuration page in a browser
    And the user scans for nearby Wi-Fi networks
    And the user selects a network and enters the correct password
    And the user clicks "Save & Restart"

    Then the ESP device stores the Wi-Fi credentials in its filesystem
    And the ESP device restarts and attempts to connect to the provided network

    When the connection is successful
    Then the ESP device switches to station mode
    And the sensor joins the user's Wi-Fi network
    And the ESP provides its IP address or mDNS name

    When the connection fails
    Then the ESP reverts to access point mode
    And the configuration page is made available again

    Feature: Pair a new sensor with the app
  As a user
  I want to enter or scan a sensor ID to start pairing via Wi-Fi
  So that the app can connect to the sensor hardware

  Scenario: User pairs sensor

    Given the user is logged into the app
    And the user has scanned or entered a valid sensor ID

    When the app detects the sensor’s QR code or ID
    Then the app connects to the sensor’s Wi-Fi access point (AP)
    And the app opens a configuration interface hosted by the sensor

    When the app automatically sends the user's Wi-Fi credentials and backend server URL to the sensor
    And submits the configuration

    Then the sensor stores the credentials and restarts
    And the sensor connects to the user's local Wi-Fi network
    And the sensor begins sending data to the specified backend URL

    When the app receives confirmation from the backend
    Then the app displays a success message to the user
    And the pairing process is complete
```

---

# 3 Special Requirements

- User can input SSID and password
- Credentials are transmitted securely to the ESP
- The sensor attempts to connect to the Wi-Fi network
- User receives feedback on success or failure

# 4 Preconditions

- The user must be logged in.
- The user must have the appropriate permissions to create a Sensor.

---

# 5 Postconditions

- The Sensor is successfully created with the provided name.
- The new Sensor appears in the user’s list of Sensors.

---

# 6 Extension Points

- If the user cancels the process, no Sensor is created, and the user is returned to the List of Sensors screen
- In the case of an error during creation, an error message is displayed.
