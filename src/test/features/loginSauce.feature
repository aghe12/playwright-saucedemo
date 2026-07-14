@smoke
Feature: Saucedemo Login

  @Key:sauceLogin 
  Scenario: Successful login with valid credentials
    Given User navigates to the Saucedemo login page
    When User logs in with valid credentials
    Then User should be redirected to the products page

  Scenario Outline: Login with invalid credentials
    Given User navigates to the Saucedemo login page
    When User logs in with username "<username>" and password "<password>"
    Then User should see an error message containing "<expected_error>"

    Examples:
      | username      | password     |expected_error                                                            |
      | standard_user |              | Epic sadface: Password is required                                        |
      |               | secret_sauce | Epic sadface: Username is required                                        |
      | wrong_user    | secret_sauce | Epic sadface: Username and password do not match any user in this service |
      | standard_user | wrong_pass   | Epic sadface: Username and password do not match any user in this service |

  Scenario Outline: Verify login behavior for all user types
    Given User navigates to the Saucedemo login page
    When User logs in with username "<username>" and password "secret_sauce"
    Then The page should behave according to the "<user_type>" expectation

    Examples:
      | username                | user_type          |
      | standard_user           | normal             |
      | locked_out_user         | locked_out         |
      | problem_user            | problem            |
      | performance_glitch_user | delayed            |
      | error_user              | error              |
      | visual_user             | visual_bug         |
