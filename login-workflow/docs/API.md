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
-   **allowDebugMode** (optional): *boolean*
    - When true, presents a debug button on the login screen to allow access to deep link-based screens/flows
    - Default: false
-   **authActions**: *() => AuthUIActions*
    - TODO
-   **contactEmail** (optional): *string*
    - Contact email address to be shown on the support screen
    - Default: provides a fake email address
-   **contactPhone** (optional): *string*
    - Contact phone number to be shown on the support screen
    - Default: provides a fake phone number
-   **passwordRequirements** (optional): *PasswordRequirement[]*
    - An array of `PasswordRequirements` that must be satisfied when creating or changing a password.
    - Default: Passwords must contain a number, uppercase letter, lowercase letter, special character, and be between 8 and 16 characters in length
-   **projectImage** (optional): *ImageSourcePropType*
    - Project image shown on splash screen and login screen.
    - Dimensions of the image should be 534w x 152h with a transparent background. Differently sized images may not render properly on all devices.
    - Default: Provides an example project image.
-   **registrationActions**: *() => RegistrationUIActions*
    - TODO
-   **showSelfRegistration**: *boolean*
    - When true, shows the Create Account button to allow for self registration.
    - Default: true
-   **title** (optional): *string*
    - Title of the application

##### AuthUIActions

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
