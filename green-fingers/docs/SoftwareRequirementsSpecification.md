# Green Fingers - Software Requirements Specification

## Table of contents

- [Table of contents](#table-of-contents)
- [Introduction](#1-introduction)
  - [Purpose](#11-purpose)
  - [Scope](#12-scope)
  - [Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
  - [References](#14-references)
  - [Overview](#15-overview)
- [Overall Description](#2-overall-description)
  - [Vision](#21-vision)
  - [Use Case Diagram](#22-use-case-diagram)
  - [used Tools](#23-Used-Tools)
- [Specific Requirements](#3-specific-requirements)
  - [Functionality](#31-functionality)
  - [Usability](#32-usability)
  - [Reliability](#33-reliability)
  - [Performance](#34-performance)
  - [Supportability](#35-supportability)
  - [Design Constraints](#36-design-constraints)
  - [Online User Documentation and Help System Requirements](#37-on-line-user-documentation-and-help-system-requirements)
  - [Purchased Components](#purchased-components)
  - [Interfaces](#39-interfaces)
  - [Licensing Requirements](#310-licensing-requirements)
  - [Legal, Copyright And Other Notices](#311-legal-copyright-and-other-notices)
  - [Applicable Standards](#312-applicable-standards)
- [Supporting Information](#4-supporting-information)

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) provides a comprehensive description of the specifications for the "Green Fingers" application. It aims to assist gardeners in tracking plant care through features like adding plants, managing watering schedules, receiving notifications, and integrating sensor data. This document details the planned features, functionality, and boundary conditions for the development of the app.

### 1.2 Scope

The app will be developed for both Android and iOS (via Flutter).

Actors of this app include:

- Users: Gardeners who will use the app to track their plants and care schedules.
- Admins: Admins responsible for maintaining plant databases and overseeing app content.

The main subsystems include:

- Plant Database:  
  Store and manage detailed information about plants (e.g., watering frequency, temperature, sunlight requirements).
- User Account System:
  Users will create accounts to store gardens and plant data.
- Notifications System:  
  Notify users when they need to water or take care of their plants.
- Search System:
  Allow users to search for plants based on various parameters like water needs, sunlight, or season.

### 1.3 Definitions, Acronyms and Abbreviations

| Abbrevation | Explanation                         |
| ----------- | ----------------------------------- |
| SRS         | Software Requirements Specification |
| UC          | Use Case                            |
| n/a         | not applicable                      |
| tbd         | to be determined                    |
| UCD         | overall Use Case Diagram            |
| FAQ         | Frequently asked Questions          |

### 1.4 References

| Title                                                            |    Date    | Publishing organization |
| ---------------------------------------------------------------- | :--------: | ----------------------- |
| [Green Fingers Blog](https://dhbw-malte.github.io/gardeningApp/) | 13.03.2025 | Green Fingers Team      |
| [GitHub](https://github.com/DHBW-Malte/gardeningApp/)            | 13.03.2025 | Green Fingers Team      |
| [YouTrack](https://dhbw-malte.youtrack.cloud/)                   | 13.03.2025 | Green Fingers Team      |

### 1.5 Overview

The following chapter provides an overview of this project, including a vision and Overall Use Case Diagram. The third chapter (Requirements Specification) delivers more details about the specific requirements in terms of functionality, usability, and design parameters. Finally, there is a chapter with supporting information.

## 2. Overall Description

### 2.1 Vision

Our vision is to provide a comprehensive gardening solution that seamlessly integrates software and hardware tools to empower users in managing both indoor and outdoor gardens. With a focus on automation and smart features, we offer real-time weather updates, UV lighting sensors, moisture tracking, and a solar-powered watering system, ensuring optimal plant care.

We aim to guide users with tailored advice on watering, nutrition, sunlight, and harvest timing, along with insights into edible plant parts. Personalized notifications keep users informed of their plants’ needs, enhancing their gardening experience.

By offering efficient garden management tools—including pumps, tubing, and nozzles—and software that suggests plants based on location, provides plant calendars, and sends notifications, our goal is to simplify and streamline gardening. We empower users to feel confident and in command of their gardens, making the process smarter, more efficient, and more enjoyable through real-time insights and automation.

Check out our blog and read our first blog post to get to know more about our vison and our team roles.
[Our Vision](https://dhbw-malte.github.io/gardeningApp/2024/09/13/our-vision.html)

### 2.2 Use Case Diagram

![OUCD](../../docs/assets/svg/GreenFingersUsecases.drawio.svg)

### 2.3 used Tools

\*Technology Stack:
The technology we are planning to use is:

Frontend:

- React Native
- Expo
- TypeScript

Backend:

- Node.js with Express.js

Database:

- PostgreSQL

IDE:

- Visual Studio

Project Management:

- Youtrack
- GitHub
- Discord

Deployment Tools:

- Docker
- Nginx
- PM2

Testing:

- TBD

## 3. Specific Requirements

### 3.1 Functionality

This section will explain the different use cases, you could see in the Use Case Diagram, and their functionality.

### CRUD-User

#### [3.1.1 Use Case: Create User](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-User/createUser.md)

Users will be able to create a new account using an email address, username and password.

#### [3.1.2 Use Case: Login / Logout](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-User/loginLogoutUser.md)

Users will log into their accounts using an email and password. They can also log out when needed.

#### [3.1.3 Use Case: Update user](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-User/updateUser.md)

Users will be able to change their email address and username.

#### [3.1.4 Use Case: Calender]()

Users will be able to check the date of planting and last time watering their plants.

### CRUD-Plant

#### [3.1.4 User Case: Add plant](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Plant/addPlant.md)

Users can add new plants to their personal garden by entering a plant type, nickname and the corresponding garden.

#### [3.1.5 Use Case: View plant](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Plant/viewPlant.md)

The user can select a specific plant and view the details of it.

#### [3.1.6 Use Case: Update plant](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Plant/updatePlant.md)

The user can edit the nickname and garden of a plant.

#### [3.1.7 Use Case: Delete plant](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Plant/deletePlant.md)

The user can delete a plant from their app. This will remove the plant from the user's garden and all associated data in the database.

### CRUD-Garden

#### [3.1.8 Use Case: Add garden](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Garden/addGarden.md)

The user can create a new garden, with a name and a location.

#### [3.1.9 Use Case: Show garden](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Garden/showGardens.md)

The user can view a list of all gardens.

#### [3.1.10 Use Case: Edit garden](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Garden/updateGarden.md)

The user can update the name and location of his gardens.

#### [3.1.11 Use Case: Delete garden](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Garden/deleteGarden.md)

The user can delete a garden from their app. This will remove the plant from the user's garden and all associated data in the database.

### CRUD-Sensor

#### [3.1.12 Use Case: Add sensor](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Sensor/addSensor.md)

The user can create a new sensor, with a name and an associated plant.

#### [3.1.9 Use Case: Show sensor](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Garden/showSensor.md)

The user can view a list of all sensors data.

#### [3.1.10 Use Case: Edit sensor](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Garden/updateSensor.md)

The user can update the name and the plant it assigned to it.

#### [3.1.11 Use Case: Delete sensor](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/CRUD-Garden/deleteSensor.md)

The user can delete a sensor.

### 3.2 Usability

We plan to design the user interface as intuitive and self-explanatory as possible, so users will feel comfortable organizing their plants as they wish.

#### 3.2.1 No training time needed

The app's user interface will be intuitive and require no formal training. Users should be able to navigate and use its features effortlessly upon first interaction. This will be achieved by incorporating simple navigation menus, clear labels, and recognizable icons.

#### 3.2.2 Familiar Feeling

The design will incorporate elements familiar to users from other applications, such as plus sign as an add button, pull-to-refresh actions, and standard app layouts. Leveraging common UI/UX patterns ensures that users feel at home while exploring the app, reducing the cognitive load associated with learning a new tool.

#### 3.2.3 Customization

Users can customize their dashboard and notifications to suit their preferences. This includes selecting what information is displayed prominently and scheduling reminders at times most convenient for them.

#### 3.2.4 Security and Privacy

We use password.js Authentication to handle user logins securely. This supports email/password login options to ensure that users can only access their own data. This includes role-based access controls for admins and users.

### 3.3 Reliability

#### 3.3.1 Availability

The app will ensure 99.9% uptime, supported by Process Management (PM2) that we use to run our Backend 24/7, even if the server crashes or restarts.

#### 3.3.2 Backup and Recovery

Automatic backups will be implemented for user data on our Server. In case of data loss, recovery mechanisms will ensure data restoration with minimal impact.

### 3.4 Perfomance

#### 3.4.1 Capacity

Hosting our database on our own server gives us full control over its capacity and scalability.

#### 3.4.2 Storage

With our own server, we can optimize database performance and efficiently manage storage for files, logs, and backups.

#### 3.4.3 App perfomance / Response time

The app is designed to achieve a response time of under 2 seconds for all user actions. During the loading time all the user's data from Firebase gets ready to use, this ensures low latency and high performance.

### 3.5 Supportability

#### 3.5.1 Coding Standards

The project will follow clean coding principles.

#### 3.5.2 Testing Strategy

in the future testing will include:
Unit tests for individual components and functions.
Integration tests to ensure seamless interaction between features.
End-to-end tests for real-world usage scenarios.
User acceptance testing (UAT) to ensure the app meets user expectations.

### 3.6 Design Constraints

- Mobile-First Design: The app is designed for mobile devices with React Native, ensuring responsiveness across various screen sizes.
- Platform Compatibility: The app will run on Android and in the future on iOS platforms.
- Hardware Integration: Compatibility with IoT devices for automated watering and sensor data is a core constraint.

### 3.7 On-line User Documentation and Help System Requirements

- Online Documentation: Comprehensive documentation will be available on the Green Fingers website, including step-by-step usage instructions and video guides.
- Support System: Users can contact support through in-app messaging or email for additional assistance.

### 3.8 Purchased Components

The following third-party components and services will be used:

- Expo Modules: for push notifications, camera access, and hardware integration.
- Third-Party Analytics Tool: TBD, to track app usage and performance.

### 3.9 Interfaces

#### 3.9.1 User Interfaces

## Screencast of Demo

The app will feature:
<video width="100%" height="auto" controls>

  <source src="/gardeningApp/assets/screencasts/MY Movie.mp4" type="video/mp4">
  Your browser doesn't support video tags
</video>

#### 3.9.2 Hardware Interfaces

Integration with IoT devices like soil moisture sensors and automated watering systems via APIs or Bluetooth.

#### 3.9.3 Software Interfaces

Our backend is built with Node.js (Express) and exposes RESTful APIs to communicate with the frontend. It interfaces with a PostgreSQL database, ensuring efficient data access. The entire system runs within Docker containers, and PM2 ensures process stability.

#### 3.9.4 Communication Interfaces

The backend communicates with the frontend via REST APIs, using JSON for data exchange. Nginx acts as a reverse proxy, ensuring secure and efficient request handling. The backend interacts with PostgreSQL using an ORM, managing database queries efficiently.

### 3.10 Licensing Requirements

### 3.11 Legal, Copyright, and Other Notices

n/a

### 3.12 Applicable Standards

n/a

## 4. Supporting Information

For any further information you can contact the Green Fingers Team or check our [Green Fingers Blog](https://dhbw-malte.github.io/gardeningApp/).
The Team Members are:

- Sima
- Casimir
- Malte

<!-- Picture-Link definitions: -->
<!-- [OUCD]: https://github.com/IB-KA/CommonPlayground/blob/master/UseCaseDiagramCP.png "Overall Use Case Diagram" -->
