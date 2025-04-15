---
layout: post
title: "Testing Strategy"
date: 2025-04-13
author: "Sima, Casimir & Malte"
---

# Testing Strategy – From Unit to E2E

This week, we deep-dived into the topic of software testing and started building our **GreenFingers test strategy** based on the Rational Unified Process (RUP). With that, we now have a structured approach for verifying the quality and functionality of our application at multiple levels.

Our app is growing – from user management and garden creation to future features like IoT integration. So testing early and often is key to staying confident in our code.

---

## What We're Testing

We’ve identified several test levels, based on both our tech stack and testing goals:

| Layer        | Tool(s)                      | Purpose                                                 |
| ------------ | ---------------------------- | ------------------------------------------------------- |
| **Frontend** | Jest + React Testing Library | Test UI components and form behavior from a user’s view |
| **Backend**  | Jest                         | Unit testing business logic and route handlers          |
| **API**      | Postman                      | Manual and automated testing of REST endpoints          |
| **E2E**      | Detox (planned)              | Behavior-driven full-app flows for login, signup, etc.  |

We started implementing **unit tests for our login flow** using Jest and React Testing Library. Here's a sneak peek at our passing test suite for `login.tsx`:

![Login Test Screenshot](/gardeningApp/assets/screenshots/testUnitTestLoginForm.png)

We also implementing **unit tests for our authentication logic** in our backend side. The unit tests in auth.test.js focus on verifying the behavior of the auth controller functions (login, signup, and jsonrefresh) in controllers/auth.js.

![auth test screenshot](/gardeningApp/assets/screenshots/unittestAuthController.png)

The tests use Jest to mock dependencies (authModel, bcrypt, jsonwebtoken, pg), isolating controller logic and simulating database, password hashing, and token operations to validate correct responses and error handling.

---

## First Tests in Action

To test our login form, we focused on:

- Rendering basic elements
- Validating input (email and password)
- Verifying that the login function is called with correct values

Here you can checkout our [**LoginForm.test.tsx**](https://github.com/DHBW-Malte/gardeningApp/blob/main/green-fingers/_tests_/LoginForm.test.tsx).

And yes, that test is now green!

We also used the implemented **test coverage** function from **Jest** to check our first unit test:

![Login Test Coverage Screenshot](/gardeningApp/assets/screenshots/loginFormTestCoverage.png)

---

## What's Next?

We're currently working on our [**RUP-based Test Plan**](https://github.com/DHBW-Malte/gardeningApp/blob/main/green-fingers/docs/RUPTestPlan.md), which defines:

- Test motivation and strategy
- Targeted components and workflows
- Entry/exit criteria for test cycles
- Environmental setup and responsibilities

Once finalized, this plan will guide all our future testing efforts – from microcontroller integration to database edge-case testing.

We’ll also explore using **Detox** for end-to-end mobile UI tests, so we can simulate real user behavior in our React Native app.

---

## Summary

By formalizing our test approach now, we’re setting up GreenFingers for long-term stability. Our CI/CD pipeline will soon run these tests on every push to `main`, helping us catch bugs early and ship with confidence.

We’ll keep you updated on how this test strategy evolves — especially as we bring in sensors and hardware!

Thanks for reading
Stay tuned for our next milestone!
