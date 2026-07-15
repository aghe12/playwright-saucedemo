Feature: Problem User Verification

  Background:
    Given User is logged in as problem_user

  @smoke @problem
  Scenario: Verify all product images are broken
    Then All product images should display the broken dog image

  @smoke @problem
  Scenario: Verify filtering does not work
    When User attempts to filter products by "za"
    Then The product order should remain unchanged
