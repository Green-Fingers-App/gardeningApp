---
layout: post
title: "Our SRS and UCD"
date: 2024-10-01
author: "Sima, Casimir, Ruan & Malte"
---

Hello everyone! We are excited to share our Software Requirements Specification (SRS) and Use-Case Diagram (UCD) for our project. These documents outline the core features, functionalities, and design considerations that will shape our gardening app "Green Fingers".

## Software Requirements Specification (SRS)

This Software Requirements Specification (SRS) provides a comprehensive description of the specifications for the "Green Fingers" application. It aims to assist gardeners in tracking plant care through features like adding plants, managing watering schedules, receiving notifications, and integrating sensor data. This document details the planned features, functionality, and boundary conditions for the development of the app.

[Our SRS Markdown](https://github.com/DHBW-Malte/gardeningApp/blob/main/GreenFingers/docs/SoftwareRequirementsSpecification.md)

---

## Use-Case Diagram (UCD)

Here is our first draft of the User-Case Diagram for "Green Fingers":

![Use-Case Diagram](/gardeningApp/assets/svg/GreenFingersUsecases.drawio.svg)

### User Roles

We have identified the following user roles and their interactions with the system:

1. **User**: The primary user of the app who will use it to manage their garden, plants, and tasks about their plants. The user can also receive notifications about their plants' health and needs and adapt their profile settings.
2. **Sensor**: The sensor that collects data about the environment and plant health and sends it to the app.
3. **Plant**: The plant that sends notifications to the user about its needs and health status.
4. **Garden**: The garden that provides an overview of all plants and tasks in the user's garden.

### Our Scope for the use cases

In accordance with our MVP (Minimum Viable Product), we have identified the following five use cases, which we plan to deliver in December 2024

1. **Sign Up**: The user can create an account and log in to the app.
2. **Login**: The user can log in to the app.
3. **Add Plant**: The user can add a new plant to their app.
4. **Remove Plant**: The user can remove a plant from their app.
5. **Receive Notification**: The user receives a notification about a plant's health status or needs.
