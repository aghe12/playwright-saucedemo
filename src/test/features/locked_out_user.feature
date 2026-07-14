@smoke
Feature: Locked Out User Verification

  Scenario: Verify locked out user cannot login
    Given User navigates to the Saucedemo login page
    When User logs in with username "locked_out_user" and password "secret_sauce"
    Then User should see an error message containing "Epic sadface: Sorry, this user has been locked out."
