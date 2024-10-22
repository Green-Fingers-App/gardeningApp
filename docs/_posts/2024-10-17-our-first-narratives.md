---
layout: post
title: Our First Narratives
date: 2024-10-17
author: "Sima, Casimir, Ruan & Malte"
---

Welcome back to our blog. Today we will update you on our newest addition to our Gardening Project: cucumber. And we are not talking about the real creeping vine plant.
But we mean the BBD (Behavior-Driven Development) tool that will help us create narratives for our use cases. Cucumber comes with it's own language called Gherkin.
Gerkin's syntax makes it easy to write the path of a use-case in (almost) plain English, while still being executable and testable. This will help us to transform our
use-cases from requirements written in English to code written in Typescript.

In the example below you can see a code snippet from Gerkin from one of our use-cases:

```gherkin
Feature: Show Gardens
  In order to view an overview of all gardens
  As a user
  I want to see a list of all gardens
  Scenario: User views an overview of all gardens
    Given the user is on the "Home" page
    When the user clicks on the "Garden" icon in the navigation bar
    Then the system loads the garden overview
    And the user is presented with a list of all gardens
    And each garden card contains the garden name, an image of the garden, and the status of the garden

  Scenario: Database failed to load gardens
    Given the user is on the "Home" page
    When the user clicks on the "Garden" icon in the navigation bar
    Then the system displays an error message
```

[showGardens feature file](https://github.com/DHBW-Malte/gardeningApp/blob/main/green-fingers/features/showGardens.feature)
In this code snippet we see the paths of our use-case "Show Gardens". It looks like it is written in plain English, but looks can be decieving.
This piece of text is actually executable code. That will test if the use-case paths do what they say they will do. This makes cucumbur a fantastic addage
to our project's toolbox.

We use the Cucumber (Gherkin) extension in our Visual Studio Code environment to give visual cues about the keywords. The extension also provides auto complete
and code snippets that help with coding in Gherkin. In the screenshot below you can see an example of auto completion and code highlighting done by Visual
Studio Code.
![screenshot gherkin on Visual Studio Code](/gardeningApp/assets/screenshots/screenshot_gherkin.png)

To see how this all comes together in our documentation, check out our two completed use-cases:<br/><br/>
[use-case Show Gardens](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/showGardens.md)
[use-case Delete Plant](https://github.com/DHBW-Malte/gardeningApp/blob/main/docs/usecases/deletePlant.md)
