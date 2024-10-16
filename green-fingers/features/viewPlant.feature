Feature: View Plant

  I am on my garden page and I want specific information on one of my plants

  Scenario: I click on a plant card
    Given I am on the garden page
    And I click on a plant card
    Then I switch pages
    And I see the plant's detailed information