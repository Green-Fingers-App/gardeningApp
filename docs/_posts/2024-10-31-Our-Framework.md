---
layout: post
title: "Our Framework"
date: 2024-10-31
author: "Sima, Casimir, Ruan & Malte"
---

# Project Framework Overview

Hello everyone,

As you already know, we chose **React Native** for our front-end framework, paired with **Firebase** as our backend and database solution. We're organizing these within the **MVVM (Model-View-ViewModel)** architecture, which helps us separate objects into three distinct layers: **Models**, **Views**, and **ViewModels**. Here’s a quick breakdown of each:

- **Model**: This layer is responsible for holding application data and business logic. In our setup, the Model interacts directly with Firebase to fetch and store data, ensuring the ViewModel has up-to-date information to pass to the View.

- **View**: This is our user interface, built with React Native components. The View displays data from the ViewModel and responds to user actions, providing a seamless user experience.

- **ViewModel**: Acting as a bridge between the Model and the View, the ViewModel exposes data to the View and handles commands that update the Model based on user inputs. This layer ensures that the UI logic is separate from the data logic, improving maintainability.

By following this framework, we achieve better **code organization**, **testability**, and **scalability**. This structure helps us keep the app modular and easier to manage as it grows.

Thanks for following along, and we're excited to see how MVVM with React Native and Firebase will enhance our project!
