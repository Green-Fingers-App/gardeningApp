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

