# GreenFingers Testing Tools

This document outlines the testing tools selected for the GreenFingers project, along with the reasoning behind each choice.

---

## Testing Tools Overview

| Area          | Tool(s) Used                         | Why We Chose It                                                                 |
|---------------|--------------------------------------|----------------------------------------------------------------------------------|
| **Frontend**  | Jest + React Native Testing Library  | Fast, reliable tests tailored to user interaction and behavior                   |
| **Backend**   | Jest                                 | Widely used with Node.js/Express, great support for async and mocking            |
| **End-to-End**| Detox *(planned)*                    | Designed for React Native, simulates real user behavior in emulators             |
| **API**       | Postman *(planned)*                  | Powerful REST client for testing Express.js APIs manually and in CI              |

---

## Why These Tools?

### 1. **Frontend – Jest & React Native Testing Library**
- **Jest** is the standard for JavaScript testing, offering great performance and a rich mocking system.
- **React Native Testing Library** encourages testing through the user’s perspective instead of internal implementation details.

**Use Case:** Component testing, input validation, login forms, and button behavior.

---

### 2. **Backend – Jest**
- Unified test runner for frontend and backend.
- Great async support, easy mocking of services (e.g., database or Firebase).
- Matches our current Node.js + Express setup.

**Use Case:** Route logic, service layer, middleware, and database interaction.

---

### 3. **End-to-End (E2E) – Detox** *(planned)*
- Optimized for React Native.
- Runs on real devices and emulators.
- Good integration with CI/CD for full user journey testing.

**Use Case:** Testing login flow, navigating between screens, and user interactions with the UI.

---

### 4. **API Testing – Postman** *(planned)*
- Simple to use and supports automated testing using Newman.
- Ideal for manual testing during development and regression tests in pipelines.

**Use Case:** Testing Express.js REST endpoints for gardens, plants, and sensor data.

---

## Summary

The GreenFingers project uses a focused set of testing tools to cover different layers of the application:

- **Unit Tests** → Jest  
- **Component/UI Tests** → React Native Testing Library  
- **E2E Tests** → Detox *(planned)*  
- **API Tests** → Postman *(planned)*  

