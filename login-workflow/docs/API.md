# API
This document outlines the various exports and configuration options for the React Native Auth Workflow package.

## Context Providers

### AuthUIContextProvider
The AuthUIContextProvider allows for application code to pass in middleware actions that result from the Authentication and Registration user interface. Often the actions will be the local storage and API calls satisfying AuthUIActions and RegistrationUIActions. UI configuration properties are also passed in.

#### Usage
```tsx
import { AuthUIContextProvider } from '@pxblue/react-native-auth-workflow';

<AuthUIContextProvider>
    { /* ...contents */ }
</AuthUIContextProvider>
```

#### Available Props
-   **allowDebugMode** (optional): *`boolean`*
    - When true, presents a debug button on the login screen to allow access to deep link-based screens/flows
    - Default: false
-   **authActions**: *`() => AuthUIActions`*
    - Provides application actions for the user's authentication needs.
-   **contactEmail** (optional): *`string`*
    - Contact email address to be shown on the support screen
    - Default: provides a fake email address
-   **contactPhone** (optional): *`string`*
    - Contact phone number to be shown on the support screen
    - Default: provides a fake phone number
-   **passwordRequirements** (optional): *`PasswordRequirement[]`*
    - An array of `PasswordRequirement`s that must be satisfied when creating or changing a password.
    - Default: Passwords must contain a number, uppercase letter, lowercase letter, special character, and be between 8 and 16 characters in length
-   **projectImage** (optional): *`ImageSourcePropType`*
    - Project image shown on splash screen and login screen.
    - Dimensions of the image should be 534w x 152h with a transparent background. Differently sized images may not render properly on all devices.
    - Default: Provides an example project image.
-   **registrationActions**: *`() => RegistrationUIActions`*
    - Provides application actions for the user's registration needs.
-   **showSelfRegistration**: *`boolean`*
    - When true, shows the Create Account button to allow for self registration.
    - Default: true
-   **title** (optional): *`string`*
    - Title of the application












##### RegistrationUIActions

##### PasswordRequirement

### SecurityContextProvider


## AuthNavigationContainer

## useSecurityActions
## useSecurityState
## useAccountUIActions
## useAccountUIState
## useRegistrationUIActions
## useRegistrationUIState


# Type Definitions

## AccountDetailInformation

Type to represent the input of the account details component.

### Type Declaration
-   **firstName**: *`string`*
    -   The user's first name
-   **lastName**: *`string`*
    -   The user's last name / surname.
-   **phone**: *`string`*
    -   The user's phone number

## AuthUIActions

Authentication Actions to be performed based on the user's UI actions. The application will create appropriate actions (often api calls, local network storage, credential updates, etc.) and update the global security state based on the actionable needs of the user. A MockAuthUIActions implementation is provided in the examples folder for getting started with during development.

### Type Declaration
-   **changePassword**: *`(oldPassword: string, newPassword: string) => Promise<void>)`*
    -   An authenticated user wants to change their password. The application should try to change the user's password. Upon completion, the user will be logged out of the application. Upon cancellation, the user will be taken back to the application's home screen.

    -   **Parameters**:
        -   **oldPassword**: *`string`*
            -   The user's current password as entered into the UI.
        -   **newPassword**: *`string`*
            -   The user's new password as entered into the UI.

    -   **Returns**: *`Promise<void>`*
        -   Resolve if successful, otherwise reject with an error message.

-   **forgotPassword**: *`(email: string) => Promise<void>)`*
    -   The user has forgotten their password and wants help. The application generally should call an API which will then send a password reset link to the user's email.

    -   **Parameters**:
        -   **email**: *`string`*
            -   Email address the user uses to log in to the application.

    -   **Returns**: *`Promise<void>`*
        -   Resolve if email is sent successfully, reject otherwise.

-   **initiateSecurity**: *`() => Promise<void>)`*
    -   Initialize the application security state. This will involve reading any local storage, validating existing credentials (token expiration, for example). At the end of validation, the SecurityContextActions should be called with either: onUserAuthenticated (which will present the application), or onUserNotAuthenticated (which will present the Auth UI).
        > Note: Until this method returns, the applications Splash screen will be presented.

    -   **Returns**: *`Promise<void>`*
        -   Should always resolve, never throw.

-   **login**: *`(email: string, password: string, rememberMe: boolean) => Promise<void>)`*
    -   The user wants to log into the application. Perform a login with the user's credentials. The application should provide the user's email and password to the authentication server. In the case of valid credentials, the applications code should store the returned data (such as token, user information, etc.). Then the onUserAuthenticated function should be called on the SecurityContextActions object.

    -   **Parameters**:
        -   **email**: *`string`*
            -   Email address the user entered into the UI.
        -   **password**: *`string`*
            -   Password the user entered into the UI.
        -   **rememberMe**: *`boolean`*
            -   Indicates whether the user's email should be remembered on success.

    -   **Returns**: *`Promise<void>`*
        -   Resolve if code is credentials are valid, otherwise reject.

-   **setPassword**: *`(code: string, password: string) => Promise<void>)`*
    -   A user who has previously used "forgotPassword" now has a valid password reset code and has entered a new password. The application should take the user's password reset code and the newly entered password and then reset the user's password.
        > Note: Upon success, the user will be taken to the Login screen

    -   **Parameters**:
        -   **code**: *`string`*
            -   Password reset code from a link
        -   **password**: *`string`*
            -   New Password the user entered into the UI

    -   **Returns**: *`Promise<void>`*
        -   Resolve if successful, otherwise reject with an error message.

-   **verifyResetCode**: *`(code: string) => Promise<void>)`*
    -   The user has tapped on an email with a password reset link, which they received after requesting help for forgetting their password. The application should take the password reset code and then verify that it is still valid.

    -   **Parameters**:
        -   **code**: *`string`*
            -   Password reset code from a reset password link

    -   **Returns**: *`Promise<void>`*
        -   Resolve if code is valid, otherwise reject.


## PasswordRequirement

Definition for a security/complexity requirement for application passwords.

### Type Declaration
-   **description**: *`string`*
    -   The text description of the requirement (e.g., 'contains an uppercase letter')
-   **regex**: *`RegExp`*
    -   A regular expression the defines the complexity requirement (e.g., `/[A-Z]+/`)


## RegistrationUIActions

Registration Actions to be performed based on the user's actions. The application will create appropriate actions (often API calls, local network storage, credential updates, etc.) based on the actionable needs of the user. A MockRegistrationUIActions implementation is provided in the examples to start with during development.

### Type Declaration
-   **completeRegistration**: *`(userData: { accountDetails: AccountDetailInformation, password: string }, validationCode: string) => Promise<{ email: string, organizationName: string }>)`*
    -   The user has been invited to register and has entered the necessary account and password information. The application should now complete the registration process given the user's data.
        > Note: Upon resolution, the user will be brought back to the Login screen.

    -   **Parameters**:
        -   **userData**: *`{ accountDetails: AccountDetailInformation, password: string }`*
            -   Account details and password entered by the user.
        -   **validationCode**: *`string`*
            -   Registration code provided from the invitation email link.

    -   **Returns**: *`Promise<{ email: string, organizationName: string }>`*
        -   Resolve when account creation succeeds, otherwise reject with an error message.

-   **loadEULA**: *`(language: string) => Promise<string>)`*
    -   The user wants to complete an action but must first accept the EULA. The application should retrieve an application-specific EULA for the user.

    -   **Parameters**:
        -   **language**: *`string`*
            -   The i18n language the user is requesting for the EULA text.

    -   **Returns**: *`Promise<string>`*
        -   Resolve with EULA, otherwise reject with an error message.

-   **validateUserRegistrationRequest**: *`(validationCode: string) => Promise<void>)`*
    -   The user has tapped on an email link inviting them to register with the application. The application should validate the code provided by the link.

    -   **Parameters**:
        -   **validationCode**: *`string`*
            -   Registration code provided from the link.

    -   **Returns**: *`Promise<void>`*
        -   Resolve when the code is valid, otherwise reject with an error message.
