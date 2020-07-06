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
-   **htmlEula** (optional): *`boolean`*
    - Set to true if your EULA needs to be rendered as HTML
    - Default: false
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


### SecurityContextProvider
SecurityContextProvider provides a single source of state for the state of user authentication. It is not meant to authenticate the user or hold credential information. Its purpose is to control access to authenticated or non-authenticated sections of the application (as well as change password for a currently authenticated user).
> Note: the `SecurityContextProvider` should come before the `AuthUIContextProvider` in your application hierarchy.

#### Usage
```tsx
import { SecurityContextProvider } from '@pxblue/react-native-auth-workflow';

<SecurityContextProvider>
    <AuthUIContextProvider {...props}>
        { /* ...contents */ }
    </AuthUIContextProvider>
</SecurityContextProvider>
```


## Other Components

### AuthNavigationContainer
Container component which holds the authentication and navigation state designed for mobile apps. This should be rendered at the root wrapping the whole app (except for the Context Provider components). Any valid `NavigationContainer` props can be added.

#### Usage
```tsx
import { AuthNavigationContainer } from '@pxblue/react-native-auth-workflow';

<AuthNavigationContainer initialState={initialState} ref={ref}>
    { /* ...contents */ }
</AuthNavigationContainer>
```

## Hooks

### useAccountUIActions
Hook for using the global AccountUIActions actions (i.e. logIn, forgotPassword, etc.) which change the global AccountUIState.

#### Usage
```tsx
import { useAccountUIActions } from '@pxblue/react-native-auth-workflow';

const accountUIActions: AuthUIActions = useAccountUIActions();
```

### useAccountUIState
Hook for using the global account state for account-related global `AccountUIState` state changes (i.e. login, forgot password, set password, verify reset code).

#### Usage
```tsx
import { useAccountUIState } from '@pxblue/react-native-auth-workflow';

const accountUIState: AccountUIState = useAccountUIState();
```

### useRegistrationUIActions
Hook for using the global RegistrationUIActions actions (i.e. loadEULA, completeRegistration, etc.) which change the global RegistrationUIState.

#### Usage
```tsx
import { useRegistrationUIActions } from '@pxblue/react-native-auth-workflow';

const registrationActions: RegistrationUIActions = useRegistrationUIActions();
```

### useRegistrationUIState
Hook for using the global account state for account-related global RegistrationUIState state changes (i.e. loading EULA, registration via invite).

#### Usage
```tsx
import { useRegistrationUIState } from '@pxblue/react-native-auth-workflow';

const registrationState: RegistrationUIState = useRegistrationUIState();
```

### useSecurityActions
A hook to get the security actions (on authenticated / on not authenticated).
> Note: Must be used inside of a `SecurityContextProvider`.

#### Usage
```tsx
import { useSecurityActions } from '@pxblue/react-native-auth-workflow';

const securityActions: SecurityContextActions = useSecurityAction();
```

### useSecurityState
A hook to get the security state (authenticated / not authenticated).
> Note: Must be used inside of a `SecurityContextProvider`.

#### Usage
```tsx
import { useSecurityState } from '@pxblue/react-native-auth-workflow';

const securityState: SecurityContextState = useSecurityState();
```


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

## AccountUIState

Global state for authentication-related activities and forgotten password retrieval.

### Type Declaration
-   **email**: *`string | null`*
    -   The email of the current user.
-   **forgotPassword**: *`ForgotPasswordState`*
    -   State of a forgot password request (which then sends an email to the user's account).
-   **login**: *`LoginState`*
    -   State of authentication for the current user, including transit state of the call.
-   **setPassword**: *`SetPasswordState`*
    -   State of the setPassword request, after a user begins resetting a forgotten password using the deep link token from their email.
-   **userToken**: *`string | null`*
    -   The current user's authentication token.


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

-   **setPassword**: *`(code: string, password: string, email?: string) => Promise<void>)`*
    -   A user who has previously used "forgotPassword" now has a valid password reset code and has entered a new password. The application should take the user's password reset code and the newly entered password and then reset the user's password.
        > Note: Upon success, the user will be taken to the Login screen

    -   **Parameters**:
        -   **code**: *`string`*
            -   Password reset code from a link
        -   **password**: *`string`*
            -   New Password the user entered into the UI
        -   **email**: (optional) *`string`*
            -   Email address if it was passed from the reset link

    -   **Returns**: *`Promise<void>`*
        -   Resolve if successful, otherwise reject with an error message.

-   **verifyResetCode**: *`(code: string, email?: string) => Promise<void>)`*
    -   The user has tapped on an email with a password reset link, which they received after requesting help for forgetting their password. The application should take the password reset code and then verify that it is still valid.

    -   **Parameters**:
        -   **code**: *`string`*
            -   Password reset code from a reset password link
        -   **email**: (optional) *`string`*
            -   Email address if it was passed from the reset link

    -   **Returns**: *`Promise<void>`*
        -   Resolve if code is valid, otherwise reject.

## ForgotPasswordState
Network state and email for a user requesting forgot password. Extends `TransitState`.

### Type Declaration
-   **email**: *`string | null`*
    -   The email belonging to the account for which a user is doing a forgot password request.

## InviteRegistrationState
Network state and returned email and organization for a user who was invited to register within the app (deep link token from their email).

### Type Declaration
-   **codeRequestTransit**: *`TransitState`*
    -   Network state for initiating user registration (sending verification email).
-   **email**: *`string | null`*
    -   The email belonging to the user who was invited to register through the app.
-   **organizationName**: *`string | null`*
    -   The organization of the user who was invited to register through the app.
-   **registrationTransit**: *`TransitState`*
    -   Network state for completing registration of the invited user.
-   **validationTransit**: *`TransitState`*
    -   Network state for validating the invited user's invite token (the deep link token from their email).

## LoginState
Network state and email for a user attempting to authenticate into the app. Extends `TransitState`.

### Type Declaration
-   **email**: *`string | null`*
    -   The email with which a user is attempting to authenticate into the app.


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
-   **completeRegistration**: *`(userData: { accountDetails: AccountDetailInformation, password: string }, validationCode: string, validationEmail?: string) => Promise<{ email: string, organizationName: string }>)`*
    -   The user has been invited to register and has entered the necessary account and password information. The application should now complete the registration process given the user's data.
        > Note: Upon resolution, the user will be brought back to the Login screen.

    -   **Parameters**:
        -   **userData**: *`{ accountDetails: AccountDetailInformation, password: string }`*
            -   Account details and password entered by the user.
        -   **validationCode**: *`string`*
            -   Registration code provided from the invitation email link.
        -   **validationEmail**: (optional) *`string`*
            -   Email provided from the invitation email link (optional) `?email=addr%40domain.com`.

    -   **Returns**: *`Promise<{ email: string, organizationName: string }>`*
        -   Resolve when account creation succeeds, otherwise reject with an error message.

-   **loadEULA**: *`(language: string) => Promise<string>)`*
    -   The user wants to complete an action but must first accept the EULA. The application should retrieve an application-specific EULA for the user.

    -   **Parameters**:
        -   **language**: *`string`*
            -   The i18n language the user is requesting for the EULA text.

    -   **Returns**: *`Promise<string>`*
        -   Resolve with EULA, otherwise reject with an error message.

-   **requestRegistrationCode**: *`(email: string) => Promise<void>)`*
    -   The user entered their email address and accepted the EULA. The API should now send them an email with the validation code.

    -   **Parameters**:
        -   **email**: *`string`*
            -   The email address for the registering user.

    -   **Returns**: *`Promise<void>`*
        -   Resolve when the server has accepted the request.

-   **validateUserRegistrationRequest**: *`(validationCode: string, validationEmail?: string) => Promise<boolean>)`*
    -   The user has tapped on an email link inviting them to register with the application. The application should validate the code provided by the link.

    -   **Parameters**:
        -   **validationCode**: *`string`*
            -   Registration code provided from the link.
        -   **validationEmail**: (optional) *`string`*
            -   Email provided from the invitation email link (optional) `?email=addr%40domain.com`.

    -   **Returns**: *`Promise<boolean>`*
        -   Resolves when the code is valid. True if registration is complete, False if account information is needed. If the code is not valid a rejection will occur with an error message.

## RegistrationUIState
Global state for registration-related activities and loading the EULA for newly registering users

### Type Declaration
-   **eulaTransit**: *`TransitState`*
    -   Network state for fetching a remote EULA.
-   **inviteRegistration**: *`InviteRegistrationState`*
    -   Network and returned values state for registration of anew user via invitation.

## SecurityContextActions
Actions that change the security state of the application.

### Type Declaration
-   **hideChangePassword**: *`() => void`*
    -   Close the Change Password screen. This is most often called from within the Change Password screen. If the user has successfully changed their password, then hiding Change Password will take to the Authentication User Interface. If the user cancels changing their password, hiding Change Password will take the user back to the application's main screen.

    -   **Returns**: *`void`*

-   **onUserAuthenticated**: *`(args: { email: string, rememberMe: boolean, userId: string }) => void`*
    -   If the user has been authenticated, this function should be called. Most likely, this should be called within the initiateSecurity or logIn actions of the `AuthUIActions` provided to the `AuthUIContextProvider`. Once called, the application will be shown.

    -   **Parameters**:
        -   **args**: *`{ email: string, rememberMe: boolean, userId: string }`*
            -   **email**: *`string`*
                -   Email with which the user authenticate
            -   **rememberMe**: *`boolean`*
                -   Whether the user's email should be visible upon logout.
            -   **userId**: *`string`*
                -   UserId of the authenticated user (may be email).

    -   **Returns**: *`void`*

-   **onUserNotAuthenticated**: *`( clearRememberMe?: boolean, overrideRememberMeEmail?: string) => void`*
    -   If the user has been de-authenticated (either because they logged out or app started with no credentials), this function should be called. Most likely, this should be called within the `initiateSecurity` action of the `AuthUIActions` provided to the `AuthUIContextProvider`, or from a logout event within the application. Once called, the Authentication User Interface will be shown.

    -   **Parameters**:
        -   **clearRememberMe**: (optional) *`boolean`*
            -   If true, clear any "remember me" data upon logout.
        -   **overrideRememberMeEmail**: (optional) *`string`*
                -   If a value is provided, the `SecurityContextState`'s rememberMe will be set to true and this email will be shown in the email field of Login upon logout.

    -   **Returns**: *`void`*

-   **showChangePassword**: *`() => void`*
    -   Present the Change Password screen to the user (if the user is authenticated). The application will be unmounted.

    -   **Returns**: *`void`*


## SecurityContextState
Basic state upon which to make application security decisions.

### Type Declaration
-   **setPasswordTransit**: *`TransitState`*
    -   Network state for setting a new password for a user who has made a forgot password request.
-   **verifyResetCodeTransit**: *`TransitState`*
    -   Network state for verifying the reset password code for a user who has made a forgot password request.


## SetPasswordState
Network state for a user attempting to set a new password using a verify reset code after requesting forgot password.

### Type Declaration
-   **email**: (optional) *`string`*
    -   Email of the authenticated user.
-   **isAuthenticatedUser**: *`boolean`*
    -   True: The user is authenticated and the application is shown (or the Change Password interface). 
    -   False: The user is not authenticated and the Authentication User Interface is shown.
-   **isLoading**: *`boolean`*
    -   True: The security state is being loaded (all other fields are invalid). 
    -   False: The security state has been loaded.
-   **isShowingChangePassword**: *`boolean`*
    -   True: The Change Password screen is currently visible. 
    -   False: The Change Password screen is not currently visible.
-   **isSignOut**: *`boolean`*
    -   Used for animation purposes only.
    -   True: The user is logged in currently and a change will be the result of logging out.
    -   False: The user is likely logging in if authentication state changes.
-   **rememberMeDetails**: *`{ email?: string, rememberMe?: boolean }`*
    -   Information for a user who wants to be remembered upon logout.
    -   **email**: (optional) *`string`*
        -   Email address to show in the email field of Login after logout.
    -   **rememberMe**: (optional) *`boolean`*
        -   When true, the user's email will be in the email field of Login.
-   **userId**: (optional) *`string`*
    -   UserId of the authenticated user (may be an email).


## TransitState
Keeps track of the state of a network call.

### Type Declaration
-   **transitComplete**: *`boolean`*
    -   Returns true if a network call has completed, either successfully or unsuccessfully.
-   **transitErrorMessage**: *`string | null`*
    -   An error message describing the failure of the last network call, or null if the last call was a success.
-   **transitId**: *`number | null`*
    -   The identifier for a specific network call. Can be used to ignore an old return if a modal dismisses or another action fires.
-   **transitInProgress**: *`boolean`*
    -   Returns true if the network call is currently active and awaiting a response.
-   **transitSuccess**: *`boolean`*
    -   Returns true if the previously completed network call returned without error.