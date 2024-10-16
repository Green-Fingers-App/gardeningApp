  Scenario: User deletes a plant from their garden
    Given the user is on the "Manage Gardens" section
    And the user views the list of gardens
    When the user selects the garden they want to modify
    And the user clicks on the "More options" icon next to the plant they want to delete
    And the user selects "Delete Plant"
    Then a confirmation dialog appears asking "Are you sure you want to delete this plant?"
    When the user clicks "Confirm"
    Then the system permanently deletes the plant and its related data
    And a success message is shown to the user
    And the user is returned to the garden's plant list