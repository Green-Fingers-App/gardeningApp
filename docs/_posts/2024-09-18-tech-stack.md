---
layout: post
title: "Tech Stack"
date: 2024-09-18
author: "Sima, Casimir, Ruan & Malte"
---
<br/>

# Tech Stack

<br/>

## Overview of the Core Features:
 
- Plant database with information on different species.
- Sunlight tracking and analysis based on user input.
- Recommendations for plant placement.
- Alerts and care schedules based on plant needs.

<br/>

## Tech Stack Breakdown:

<br/>

### Frontend (Client):

<br/>

**React Native**:
We will use React Native for the mobile application to ensure a smooth cross-platform experience (iOS and Android). React Native allows for efficient development and a rich UI/UX experience with native performance. <br/>
**Expo**:
The app will built using Expo to streamline development and testing. Expo simplifies the build process and allows for easy testing across devices without complex native setups.<br/>
**TypeScript**: 
Enhances code quality with static typing. <br/>

<br/>

### Backend (Server):

<br/>

**Flask**:
The backend will be built with Flask, a lightweight and flexible Python framework. Flask allows us to build APIs quickly and handle requests between the mobile app and the server. It’s ideal for creating RESTful APIs that can query the plant database, process location, and sunlight data, and provide users with real-time recommendations. <br/>
**Flask-CORS**: 
Flask-CORS will be used to handle Cross-Origin Resource Sharing (CORS) issues when the frontend makes requests to the backend API. This will ensure that the frontend can communicate with the backend server securely. <br/>
**Flask-RESTful**:
Flask-RESTful will be used to create RESTful APIs that can handle HTTP requests from the frontend. This library simplifies the process of creating endpoints for different functionalities, such as retrieving plant data, analyzing sunlight conditions, and providing recommendations. <br/>
**Flask-PyMongo**:
Flask-PyMongo will be used to connect the Flask server to the MongoDB database. This library simplifies the process of querying and updating the database from the Flask server. <br/>
**Python**: The backend will be written in Python, which is well-suited for data processing and handling API requests. We will an object-oriented approach to structure the codebase and ensure modularity. <br/>
**Flask-Login**: For user authentication and session management. <br/>

<br/>

#### Database:

<br/>

**MongoDB (NoSQL)**:
MongoDB will be used as our NoSQL database. Since we are dealing with unstructured data (such as different plant types, sunlight conditions, and user preferences), MongoDB provides flexibility in storing and retrieving this data. The schema-less nature of MongoDB allows for easy updates as we scale the plant database with new information. <br/>




