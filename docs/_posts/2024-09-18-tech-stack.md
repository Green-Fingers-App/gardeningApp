---
layout: post
title: "Tech Stack"
date: 2024-09-18
author: "Sima, Casimir, Ruan & Malte"
---

## Overview of the Core Features

- **Plant database**: Information on different species.
- **Sunlight tracking**: Analyzes user-inputted data to track sunlight.
- **Plant placement recommendations**: Based on sunlight analysis and user preferences.
- **Alerts and care schedules**: Personalized based on each plant's needs.

---

## Tech Stack: App

### Frontend (Client)

#### React Native
We will use React Native to build the mobile application, ensuring a smooth cross-platform experience for both iOS and Android. React Native allows for efficient development while delivering a rich user interface (UI) and user experience (UX) with native performance.

#### Expo
The app will be built using Expo, which simplifies development and testing by providing easy access to native features without complex setups. Expo allows us to test the app across different devices seamlessly.

#### TypeScript
We will use TypeScript to enhance code quality and maintainability by adding static typing, making the development process more reliable and less error-prone.

---

### Backend (Server)

#### Flask
The backend will be built using Flask, a lightweight Python framework. Flask enables us to quickly create RESTful APIs to handle communication between the app and the server. It will manage requests like querying the plant database, processing user input (e.g., sunlight data), and providing real-time recommendations.

#### Flask-CORS
We will implement Flask-CORS to manage Cross-Origin Resource Sharing (CORS) issues, ensuring secure communication between the frontend and backend APIs.

#### Flask-RESTful
The Flask-RESTful extension will be used to create RESTful APIs. This extension simplifies the process of creating HTTP endpoints for functionalities like retrieving plant data, analyzing sunlight conditions, and offering recommendations.

#### Flask-PyMongo
Flask-PyMongo will be used to connect Flask with the MongoDB database. This library will help in querying and updating the database easily from our Flask server.

#### Python
The backend will be written in Python, which is ideal for handling API requests and data processing. Our backend codebase will be structured in an object-oriented manner to ensure modularity and ease of maintenance.

#### Flask-Login
Flask-Login will manage user authentication and session handling, ensuring secure login and logout processes.

---

### Database

#### Firebase (NoSQL)
We are using Firebase, a NoSQL database that offers flexibility in handling unstructured data like plant species information, user preferences, and sunlight conditions. The schema-less nature of Firebase will allow us to easily scale the plant database by adding new entries as needed.

---

## Tech Stack: Hardware

Details on the hardware setup will be provided as we finalize the design.