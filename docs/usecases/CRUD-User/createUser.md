# 1 Create User

### 1.1 Brief Description

This use case allows a new user to create an account in the application. The user navigates to the **Sign Up** screen and provides their desired username, email address, and password. Once the user submits the form, the system validates the input and creates the account if the information is valid.

# 2 Flow of Events

### 2.1 Basic Flow

The basic flow for creating a user account follows these steps:
1.	The user navigates to the **Sign Up** screen.
2.	The user enters a username, email address, and password into the form fields.
3.	The user submits the form.
4.	The system validates the input:
  - Ensures the username is unique.
  - Verifies the email address format.
  - Checks the password meets security requirements (e.g., length, character complexity).
5.	If the input is valid, the system creates a new account.
6.	The system displays a success message and redirects the user to the **Home screen**.

## 2.2 Alternative Flows

### 2.2.1 User Cancels Sign-Up

1.	The user decides not to complete the sign-up process and leaves the screen.
2.	The system does not save any input, and the user remains unsigned up.

## 2.3 Exception Flows

### 2.3.1 Missing or Invalid Input

1.	The user submits the form with missing or invalid fields (e.g., empty username, malformed email, or weak password).
2.	The system highlights the invalid fields and displays error messages:
  - “Username is required.”
  - “Invalid email address format.”
3.	The user corrects the input and resubmits the form.

2.3.2 Username or Email Already Exists

1.	The user submits the form with a username or email already in use.
2.	The system displays an error message:
  - “Username is already taken. Please choose another.”
  - “An account with this email address already exists.”
3.	The user modifies the input and resubmits the form.

2.3.3 System Error

1.	The user submits the form.
2.	The system encounters an error while creating the account (e.g., database issue).
3.	The system logs the error and displays a message: “Unable to create account at this time. Please try again later.”
4.	The user remains on the sign-up screen with their input preserved.

2.1.1 Activity Diagram

Comming soon…

2.1.3 Narrative

Feature: Create User

```gherkin
  Scenario: User successfully creates an account  
    Given the user is on the "Sign Up" screen  
    And the user enters a unique username, valid email address, and secure password  
    When the user submits the form  
    Then the system creates the account  
    And the user is redirected to the "Login" screen with a success message  
  
  Scenario: User encounters validation errors during sign-up  
    Given the user is on the "Sign Up" screen  
    And the user enters missing or invalid input  
    When the user submits the form  
    Then the system displays appropriate error messages for each invalid field  
  
  Scenario: User cancels the sign-up process  
    Given the user is on the "Sign Up" screen  
    When the user navigates away without submitting the form  
    Then no account is created
```

3 Special Requirements

- The system must validate user input before submission to ensure compliance with username, email, and password.
- The system must protect user data and prevent duplicate accounts.

4 Preconditions

- The user must not already have an account.
- The user must have access to the Sign Up screen.

5 Postconditions

- A new user account is created if the input is valid.
- If the process is canceled or errors occur, no account is created.

6 Extension Points

- Integration with email verification (if applicable).
- Enhancement for username or email suggestions if the provided ones are already taken.
