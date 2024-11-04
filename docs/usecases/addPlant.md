# 1 Use-Case Name

Add Plant

## 1.1 Brief Description

The user wants to add some plants to their Garden. First of all, they need to decide if they wish to have an indoor plant or an outdoor plant then They need to open up the plant list, select the plant they want to add, and read the information about the plant requirements.
Once the user finds the plant that meets needed requirements, they will add it to the garden.here they can also add the plants they already have and need to bring into the app.
Along the plant will be set a short description, the information about the Sensor, and the plant's needs.

# 2 Flow of Events

- User clicks on the Garden of choice
- User clicks on plus button and choose add a new plant
- User check for the plant information
- User add the plant to their garden

## 2.1 Basic Flow

### 2.1.1 Activity Diagram

![UML flowchart](/docs/assets/svg/useCaseDiagrams/addPlant.drawio.svg)

### 2.1.2 Mock-Up

![add plant wireframes](/docs/assets/svg/useCaseWireframes/addPlant.png)

### 2.1.3 Narrative

- **Step 1**: The user navigates to the **My Gardens** section from the main app interface.
- **Step 2**: The user views the list of gardens they have created.
- **Step 3**: The user clicks on **the garden** they want to add a new plant in it.
- **Step 4**: The user views the list of plants they have created.
- **Step 5**: The user clicks **plus button** to proceed.
- **Step 6**: The user clicks on **A new Plant** button.
- **Step 7**: The user leads to the **Plants database** section.
- **Step 8**: The user clicks on the **information** button for the plant of choice.
- **Step 9**: The user add the plant to their garden through **add button**.
- **Step 10**: The user can also add thier own plant through the **plus button**.
- **Step 11**: in this case the user need to add needed information in the app.
- **Step 12**: The new plant will be added into the garden of the user.

# 3 Special Requirements

- If adding a plant the user already owns, the app should allow for manual data entry to specify plant type, sensor information, and care requirements.
- The app should be able to support adding both indoor and outdoor plants and classify them accordingly.

# 4 Preconditions

- The user must be logged in to the app.
- The user must have an existing garden created or have the option to create a new garden.
- The plant database must be available and accessible.
- If the user is adding their own plant, they should have the necessary information (e.g., plant name, description, care needs).

# 5 Postconditions

- The plant is added to the user's selected garden, either from the app's database or as a custom plant.
- The user can view the plant's details and care requirements from the garden view.
- If the plant has a sensor, the sensor data will be linked to the plant for real-time monitoring.

# 6 Extension Points

- Sensor Integration: If the user adds a plant with an associated sensor, the app should guide them to configure the sensor for real-time plant health tracking.
- Plant Wishlist: The user might choose to add plants to a wishlist for future addition instead of directly to a garden.
- Plant Recommendations: Based on the current garden's conditions, the app could recommend suitable plants.
