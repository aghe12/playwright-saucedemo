@smoke @filter
Feature: Standard User Product Filtering

  Background:
    Given User is logged in as standard_user

  Scenario Outline: Verify products are sorted correctly
    When User selects the filter option "<filter_option>"
    Then The products should be sorted by "<sort_type>"

    Examples:
      | filter_option | sort_type      |
      | az            | Name A-Z       |
      | za            | Name Z-A       |
      | lohi          | Price Low-High |
      | hilo          | Price High-Low |
