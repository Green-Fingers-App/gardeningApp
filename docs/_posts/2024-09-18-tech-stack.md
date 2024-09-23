---
layout: post
title: "Tech Stack"
date: 2024-09-18
author: "Sima, Casimir, Ruan & Malte"
---
<br/>

## Tech Stack

### Overview of the Core Features:

Plant database with information on different species.<br/><br/>
Sunlight tracking and analysis based on user input.<br/><br/>
Recommendations for plant placement.<br/><br/>
Alerts and care schedules based on plant needs.<br/><br/>


### Tech Stack Breakdown:

#### Frontend (Client):

**React Native**:<br/>
We will use React Native for the mobile application to ensure a smooth cross-platform experience (iOS and Android). React Native allows for efficient development and a rich UI/UX experience with native performance. <br/><br/>

**Expo**:<br/>
The app will built using Expo to streamline development and testing. Expo simplifies the build process and allows for easy testing across devices without complex native setups.<br/><br/>

**TypeScript**:<br/>
Enhances code quality with static typing. <br/><br/>


#### Backend (Server):

**Flask**:<br/>
The backend will be built with Flask, a lightweight and flexible Python framework. Flask allows us to build APIs quickly and handle requests between the mobile app and the server. It’s ideal for creating RESTful APIs that can query the plant database, process location, and sunlight data, and provide users with real-time recommendations. <br/><br/>

**Flask-CORS**:<br/>
Flask-CORS will be used to handle Cross-Origin Resource Sharing (CORS) issues when the frontend makes requests to the backend API. This will ensure that the frontend can communicate with the backend server securely. <br/><br/>

**Flask-RESTful**:<br/>
Flask-RESTful will be used to create RESTful APIs that can handle HTTP requests from the frontend. This library simplifies the process of creating endpoints for different functionalities, such as retrieving plant data, analyzing sunlight conditions, and providing recommendations. <br/><br/>

**Flask-PyMongo**:<br/>
Flask-PyMongo will be used to connect the Flask server to the MongoDB database. This library simplifies the process of querying and updating the database from the Flask server. <br/><br/>

**Python**:<br/>
The backend will be written in Python, which is well-suited for data processing and handling API requests. We will an object-oriented approach to structure the codebase and ensure modularity. <br/><br/>

**Flask-Login**:<br/>
For user authentication and session management. <br/><br/>

#### Database:

**MongoDB (NoSQL)**:<br/>
MongoDB will be used as our NoSQL database. Since we are dealing with unstructured data (such as different plant types, sunlight conditions, and user preferences), MongoDB provides flexibility in storing and retrieving this data. The schema-less nature of MongoDB allows for easy updates as we scale the plant database with new information. <br/><br/>





