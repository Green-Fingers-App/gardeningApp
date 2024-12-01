# Login/Logout User

## 1.1 Brief Description

This use case allows a user to securely log in and log out of the application. To log in, the user navigates to the **Login** screen and enters their registered email address and password. Upon successful authentication, the user gains access to the app’s features. For logout, the user selects the Logout option, which securely ends their session and returns them to the login screen.

# 2 Flow of Events

## 2.1 Basic Flow

**Login**

1.	The user navigates to the **Login** screen.
2.	The user enters their registered email address and password into the form fields.
3.	The user submits the login form.
4.	The system verifies the credentials:
  - Checks if the email exists.
  - Validates the password against the stored credentials.
5.	If authentication is successful, the system grants the user access to the app and redirects to the **Home** screen.

**Logout**

1.	The user selects the **Logout** option from the navigation menu or settings.
2.	The system securely ends the user’s session.
3.	The system redirects the user to the **Login** screen.

## 2.2 Alternative Flows

### 2.2.1 User Cancels Login

1.	The user decides not to log in and navigates away from the login screen.
2.	No session is initiated, and the user remains logged out.

## 2.3 Exception Flows

### 2.3.1 Invalid Credentials

1.	The user submits the login form with incorrect email or password.
2.	The system displays an error message:
  - “Invalid email or password. Please try again.”
3.	The user corrects their credentials and resubmits the form.

## 2.4 Activity Diagram

Comming soon…

## 2.5 Narrative

Feature: Login/Logout User

```gherkin
  Scenario: User successfully logs in  
    Given the user is on the "Login" screen  
    And the user has a registered account  
    When the user enters valid credentials and submits the form  
    Then the system authenticates the user  
    And the user is redirected to the "Home" screen  
  
  Scenario: User encounters invalid credentials  
    Given the user is on the "Login" screen  
    And the user enters an incorrect email or password  
    When the user submits the form  
    Then the system displays an error message  
    And the user remains on the "Login" screen  
  
  Scenario: User logs out  
    Given the user is logged into the application  
    When the user selects "Logout"  
    Then the system ends the user session  
    And the user is redirected to the "Login" screen
```

# 3 Special Requirements

- The system must securely store and transmit user credentials to prevent unauthorized access.
- Password input must be masked to ensure privacy.
- Logout must terminate the session completely to protect user data.

# 4 Preconditions

- For login: The user must have a registered account.
- For logout: The user must be logged in.

# 5 Postconditions

- For login: The user gains access to the app if credentials are valid.
- For logout: The user’s session is securely terminated, and access to app features is restricted.

# 6 Extension Points

- Implement “Remember Me” functionality to persist login sessions.
- Allow users to reset passwords if they forget their credentials.
- Add multi-factor authentication for enhanced security.
