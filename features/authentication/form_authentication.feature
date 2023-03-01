Feature: Form-Based Authentication
  In order to learn how to use Serenity/JS with Cucumber and WebdriverIO
  As a Curious Developer
  I'd like to see an example

  Background: 
    Given Alice starts on the keymanager landing page

  Scenario Outline: Using username and password to log in
    ["The Internet"](https://the-internet.herokuapp.com/) is an example application
    that captures prominent and ugly functionality found on the web.
    Perfect for writing automated acceptance tests against 😎

    Note: With **Serenity/JS** you can use [Markdown](https://en.wikipedia.org/wiki/Markdown)
    to better describe each `Feature` and `Scenario`.

    When she logs in using "<username>" and "<password>"
    Then she should see that authentication for "<username>" has "<outcome>"

    Examples: 
      | username      | password | outcome   |
      | test@user.com | pwdPWD1! | succeeded |
      | test@user.com | barfoo   | failed    |
