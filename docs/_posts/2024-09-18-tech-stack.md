---
layout: post
title: "Tech Stack"
date: 2024-09-18
author: "Sima, Casimir, Ruan & Malte"
---

## Tech Stack

 Overview of the Core Features:
 
- Plant database with information on different species.
- Sunlight tracking and analysis based on user input.
- Recommendations for plant placement.
- Alerts and care schedules based on plant needs.

Tech Stack Breakdown:

Frontend (Client):

- React Native:
We will use React Native for the mobile application to ensure a smooth cross-platform experience (iOS and Android). React Native allows for efficient development and a rich UI/UX experience with native performance.
- Expo:
The app will built using Expo to streamline development and testing. Expo simplifies the build process and allows for easy testing across devices without complex native setups.
- TypeScript: Enhances code quality with static typing.

Backend (Server):

- Flask:
The backend will be built with Flask, a lightweight and flexible Python framework. Flask allows us to build APIs quickly and handle requests between the mobile app and the server. It’s ideal for creating RESTful APIs that can query the plant database, process location, and sunlight data, and provide users with real-time recommendations.

Database:
- MongoDB (NoSQL):
MongoDB will be used as our NoSQL database. Since we are dealing with unstructured data (such as different plant types, sunlight conditions, and user preferences), MongoDB provides flexibility in storing and retrieving this data. The schema-less nature of MongoDB allows for easy updates as we scale the plant database with new information.




