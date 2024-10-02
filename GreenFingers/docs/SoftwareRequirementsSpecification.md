# Green Fingers - Software Requirements Specification 

## Table of contents
- [Table of contents](#table-of-contents)
- [Introduction](#1-introduction)
    - [Purpose](#11-purpose)
    - [Scope](#12-scope)
    - [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    - [References](#14-references)
    - [Overview](#15-overview)
- [Overall Description](#2-overall-description)
    - [Vision](#21-vision)
    - [Use Case Diagram](#22-use-case-diagram)
	- [Technology Stack](#23-technology-stack)
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
* Plant Database:  
Store and manage detailed information about plants (e.g., watering frequency, temperature, sunlight requirements).
* User Account System:
Users will create accounts to store gardens and plant data.
* Notifications System:  
Notify users when they need to water or take care of their plants.
* Search System:
Allow users to search for plants based on various parameters like water needs, sunlight, or season.

### 1.3 Definitions, Acronyms and Abbreviations
| Abbrevation | Explanation                            |
| ----------- | -------------------------------------- |
| SRS         | Software Requirements Specification    |
| UC          | Use Case                               |
| n/a         | not applicable                         |
| tbd         | to be determined                       |
| UCD         | overall Use Case Diagram               |
| FAQ         | Frequently asked Questions             |

### 1.4 References

| Title                                                              | Date       | Publishing organization   |
| -------------------------------------------------------------------|:----------:| ------------------------- |
| [Green Fingers Blog](https://dhbw-malte.github.io/gardeningApp/)   | 01.10.2024 | Green Fingers Team        |
| [GitHub](https://github.com/DHBW-Malte/gardeningApp/)              | 01.10.2024 | Green Fingers Team        |

### 1.5 Overview
The following chapter provides an overview of this project with vision and Overall Use Case Diagram. The third chapter (Requirements Specification) delivers more details about the specific requirements in terms of functionality, usability and design parameters. Finally there is a chapter with supporting information. 
    
## 2. Overall Description

### 2.1 Vision

Our vision is to provide a comprehensive gardening solution that seamlessly integrates software and hardware tools to empower users in managing both indoor and outdoor gardens. With a focus on automation and smart features, we offer real-time weather updates, UV lighting sensors, moisture tracking, and a solar-powered watering system, ensuring optimal plant care.

We aim to guide users with tailored advice on watering, nutrition, sunlight, and harvest timing, along with insights into edible plant parts. Personalized notifications keep users informed of their plants’ needs, enhancing their gardening experience.

By offering efficient garden management tools—including pumps, tubing, and nozzles—and software that suggests plants based on location, provides plant calendars, and sends notifications, our goal is to simplify and streamline gardening. We empower users to feel confident and in command of their gardens, making the process smarter, more efficient, and more enjoyable through real-time insights and automation.

### 2.2 Use Case Diagram

![OUCD](../../docs/assets/svg/GreenFingersUsecases.drawio.svg)
- Green: Planned till end of december

### 2.3 Technology Stack
The technology we use is:

Backend:
- Flask
- Flask-CORS
- Flask-RESTful
- Flask-PyMongo
- Flask-Login
- Python

Frontend:
- React Native
- Expo
- TypeScript

Database:
- Firebase (NoSQL)

IDE:
- TBD

Project Management:
- Clockify
- GitHub
- Discord

Deployment:
- TBD

Testing:
- TBD

## 3. Specific Requirements

### 3.1 Functionality
This section will explain the different use cases, you could see in the Use Case Diagram, and their functionality.  
Until December we plan to implement:
- 3.1.1 Sign Up
- 3.1.2 Login / Logout
- 3.1.3 Add plant
- 3.1.4 Delete plant
- 3.1.5 Recieve Notification
- 3.1.6 Send notification about plant needs

#### 3.1.1 Sign Up


#### 3.1.2 Login / Logout


#### 3.1.3 Add plant


#### 3.1.4 Delete plant


#### 3.1.5 Recieve Notification


#### 3.1.6 Send notification about plant needs


### 3.2 Usability
TBD

#### 3.2.1 No training time needed
TBD

#### 3.2.2 Familiar Feeling
TBD

### 3.3 Reliability

#### 3.3.1 Availability
TBD

#### 3.3.2 Defect Rate
TBD

### 3.4 Perfomance

#### 3.4.1 Capacity
TBD

#### 3.4.2 Storage 
TBD

#### 3.4.3 App perfomance / Response time
TBD

### 3.5 Supportability

#### 3.5.1 Coding Standards
TBD

#### 3.5.2 Testing Strategy
TBD

### 3.6 Design Constraints
TBD

### 3.7 On-line User Documentation and Help System Requirements
TBD

### 3.8 Purchased Components
TBD

### 3.9 Interfaces

#### 3.9.1 User Interfaces
TBD

#### 3.9.2 Hardware Interfaces
TBD

#### 3.9.3 Software Interfaces
TBD

#### 3.9.4 Communication Interfaces
TBD

### 3.10 Licensing Requirements

### 3.11 Legal, Copyright, and Other Notices
TBD

### 3.12 Applicable Standards
TBD

## 4. Supporting Information
For any further information you can contact the Green Fingers Team or check our [Green Fingers Blog](https://dhbw-malte.github.io/gardeningApp/). 
The Team Members are:
- Sima
- Casimir
- Ruan 
- Malte

<!-- Picture-Link definitions: -->
<!-- [OUCD]: https://github.com/IB-KA/CommonPlayground/blob/master/UseCaseDiagramCP.png "Overall Use Case Diagram" -->

