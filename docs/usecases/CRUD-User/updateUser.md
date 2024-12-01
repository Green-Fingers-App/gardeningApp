# Update Account Information

## 1.1 Brief Description

This use case allows a user to update their account information, specifically their email address and username. The user navigates to their **Profile** by selecting the profile icon and clicks on the **Edit Profile** option. The system displays a form where the user can update their email and username. The user can save the changes or cancel the operation.

# 2 Flow of Events

## 2.1 Basic Flow

1.	The user clicks the **Profile** icon to access their profile page.
2.	The user selects the **Edit Profile** option.
3.	The system displays a form with the current email and username pre-filled.
4.	The user edits the email and/or username fields.
5.	The user submits the form.
6.	The system validates the updated information:
  - Checks the new email format.
  - Ensures the username is unique.
7.	If validation is successful, the system updates the account information.
8.	The system displays a success message and returns the user to the profile page with the updated information.

## 2.2 Alternative Flows

### 2.2.1 User Cancels Editing

1.	The user decides not to save changes and exits the **Edit Profile** view.
2.	The system discards the changes and retains the existing account information.

## 2.3 Exception Flows

### 2.3.1 Invalid Input

1.	The user submits the form with invalid or empty fields (e.g., invalid email format).
2.	The system highlights the invalid fields and displays error messages:
  - “Invalid email address format.”
  - “Username cannot be empty.”
3.	The user corrects the input and resubmits the form.

### 2.3.2 Username or Email Already Exists

1.	The user submits the form with a username or email that is already in use.
2.	The system displays an error message:
  - “Username is already taken. Please choose another.”
	- “An account with this email address already exists.”
3.	The user updates the fields and resubmits the form.

### 2.3.3 System Error

1.	The user submits the form.
2.	The system encounters an error while updating the account information.
3.	The system logs the error and displays a message:
  - “Unable to update account information. Please try again later.”
4.	The user remains on the Edit Profile screen with their input preserved.

## 2.4 Activity Diagram

Coming soon…

## 2.5 Narrative

Feature: Update Account Information

```gherkin
  Scenario: User successfully updates account information  
    Given the user is on the "Edit Profile" screen  
    When the user enters a valid email and unique username  
    And the user submits the form  
    Then the system updates the account information  
    And the user sees a success message on the profile page  
  
  Scenario: User cancels account information update  
    Given the user is on the "Edit Profile" screen  
    When the user cancels the editing process  
    Then the system discards any changes  
    And the user is returned to the profile page  
  
  Scenario: User encounters validation errors during update  
    Given the user is on the "Edit Profile" screen  
    When the user enters invalid or incomplete information  
    And the user submits the form  
    Then the system displays appropriate error messages for each invalid field  
```

# 3 Special Requirements

- The system must validate user input before submission.
- Email updates should follow standard email format validation rules.
- The system must ensure usernames are unique and adhere to naming rules.

# 4 Preconditions

- The user must be logged in.
- The user must have access to their Profile page.

# 5 Postconditions

- If successful: The user’s account information is updated.
- If canceled or errors occur: No changes are made to the account information.

6 Extension Points

- Add email verification for changes to the email address.
- Provide feedback if the user tries to submit an unchanged profile.
