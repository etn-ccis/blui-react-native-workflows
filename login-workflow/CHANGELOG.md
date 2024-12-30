# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v7.0.1 (December 27, 2024)

### Fixed

- Android - Registration workflow not loading [546](https://github.com/etn-ccis/blui-react-native-workflows/issues/546).
- Pressing login does not dismiss keyboard and can obscure error modal [514](https://github.com/etn-ccis/blui-react-native-workflows/issues/514).

## v7.0.0 (September 20, 2024)

### Fixed

-   Make cybersecurity badge size configurable [497](https://github.com/etn-ccis/blui-react-native-workflows/issues/497).
-   Screen transition when clicking on the "forgot password" button [227](https://github.com/etn-ccis/blui-react-native-workflows/issues/227)

### Added 

-   Okta redirect-compatible login screen.

## v6.0.1 (July 23, 2024)

### Fixed

-   Incorrect Screenshot for ChangePassword Screen [500](https://github.com/etn-ccis/blui-react-native-workflows/issues/500).
-   Able to see Success Screen in ChangePassword Screen even if showSuccessScreen set to false [501](https://github.com/etn-ccis/blui-react-native-workflows/issues/501).

### Changed

-   Updated the peer dependencies.

## v6.0.0 (May 14, 2024)

### Fixed

-   Keyboard persists issue on visibility icon toggle [174](https://github.com/etn-ccis/blui-react-native-workflows/issues/174).
-   Using keyboard done button [265](https://github.com/etn-ccis/blui-react-native-workflows/issues/265).
-   Navigation and error handling updated [275](https://github.com/etn-ccis/blui-react-native-workflows/issues/275).
-   Disable next button for invalid inputs [276](https://github.com/etn-ccis/blui-react-native-workflows/issues/276).
-   Keyboard bounce on every character [279](https://github.com/etn-ccis/blui-react-native-workflows/issues/279).
-   Error display for email text inputs [302](https://github.com/etn-ccis/blui-react-native-workflows/issues/302).
-   Verification code validator function can be set [305](https://github.com/etn-ccis/blui-react-native-workflows/issues/305).
-   Workflow card headers with close button [306](https://github.com/etn-ccis/blui-react-native-workflows/issues/306).
-   Workflow card and screens to display correct titles [307](https://github.com/etn-ccis/blui-react-native-workflows/issues/307).
-   Support React Native ^0.73.0 and Gradle 8 [316](https://github.com/etn-ccis/blui-react-native-workflows/issues/316).

## v5.2.0 (October 31, 2023)

### Fixed

-   Disable Next button when valid prop of Account Details form is false ([#276](https://github.com/etn-ccis/blui-react-native-workflows/issues/276)).
-   Verification code prefilled value issue on Verify Email screen on resend, next and back button pressed ([#280](https://github.com/etn-ccis/blui-react-native-workflows/issues/280)).

-   Incorrect navigation on dismissal of error occurred in Account Details screen ([#275](https://github.com/etn-ccis/blui-react-native-workflows/issues/275)).

### Added

-   Ability to hide the CreatePassword screen.
-   Ability to hide the login form in the Login screen.

## v5.1.0 (January 25, 2023)

### Fixed

-   Fixed issue with change password closing screen ([#121](https://github.com/etn-ccis/blui-react-native-workflows/issues/121)).

### Removed

-   Cancel button in the change password screen ([#210](https://github.com/etn-ccis/blui-react-native-workflows/issues/210)).

## v5.0.0 (October 31, 2022)

### Changed

-   Update to build with react-native 0.70.0.
-   Forced dark mode for the EULA's webview when using dark theme.

## v4.2.0 (September 29, 2022)

### Fixed

-   Fixed Eula checkbox alignment ([#76](https://github.com/etn-ccis/blui-react-native-workflows/issues/76) & [#178](https://github.com/etn-ccis/blui-react-native-workflows/issues/178)).
-   Fixed `<MobileStepper>` and `<RequirementCheck>` active/valid state color in dark theme ([#161](https://github.com/etn-ccis/blui-react-native-workflows/issues/161)).
-   Fixed issue with scroll containers not filling the screen ([#75](https://github.com/etn-ccis/blui-react-native-workflows/issues/75)).
-   Fixed issue with Eula text not being centered ([#164](https://github.com/etn-ccis/blui-react-native-workflows/issues/164)).
-   Fixed keyboard dismissal on initial click of input fields ([#130](https://github.com/etn-ccis/blui-react-native-workflows/issues/130)).

### Added

-   Added support for Portuguese translations ([#110](https://github.com/etn-ccis/blui-react-native-workflows/issues/110)).
-   Ability to customize how error messages are displayed on the login screen via the `loginErrorDisplayConfig` prop on the `AuthUIContextProvider` ([#124](https://github.com/etn-ccis/blui-react-native-workflows/issues/124)).

### Changed

-   Changed the verification code styles for the self registration workflow ([#77](https://github.com/etn-ccis/blui-react-native-workflows/issues/157)).
-   Updated styles for EULA loading screen ([#77](https://github.com/etn-ccis/blui-react-native-workflows/issues/157)).

## v4.1.0 (April 28, 2022)

### Fixed

-   Issue with horizontal scrolling when using HTML EULA on Android ([#113](https://github.com/etn-ccis/blui-react-native-workflows/issues/113)).
-   Issue with background colors when using HTML EULA with the dark theme.
-   Fixed missing header on Change Password screen ([#122](https://github.com/etn-ccis/blui-react-native-workflows/issues/122)).
-   Fixed Verify Email and Account Created page not being wrapped with a View.
-   Fixed email not being populated when navigating back while creating an account via deeplink.

### Added

-   Added functionality to disable pager animations on the registration pagers by using the `disablePagerAnimation` prop on `AuthUIContextProvider`.

## v4.0.0 (December 9, 2021)

### Changed

-   Changed package namespace from `@pxblue` to `@brightlayer-ui`.

## Package Migration Notice

Previous versions listed after this indicator refer to our deprecated `@pxblue` packages.

---

## v4.0.0 (October 27, 2021)

### Changed

-   Updated to use `@brightlayer-ui/react-native-components` v6 — you will need to update your project dependencies to at least version 6.0.0.
-   This package now has a new peerDependency on `@brightlayer-ui/react-native-vector-icons`.

### Removed

-   The themed components previously available from this package (ActivityIndicator, Button, and TextInput) are no longer part of this package. You should import these from `@brightlayer-ui/react-native-components/themed` instead.
-   The `AltThemeProvider` is no longer part of this package. The latest themes from `@brightlayer-ui/react-native-themes` (v6) no longer require any alternate themes.

## v3.3.0 (July 27, 2021)

### Fixed

-   Issue where "Invalid Credentials" error message would persist on login screen.

### Changed

-   EULA screen now appears first in the self registration workflow.
-   Allow users to go back at all steps of the registration flow ([#83](https://github.com/etn-ccis/blui-react-native-workflows/issues/83)).

### Added

-   Ability to customize the character limits for first and last name text fields in the registration workflow via the `registrationConfig` prop on the `AuthUIContextProvider` ([#90](https://github.com/etn-ccis/blui-react-native-workflows/issues/90)).

## v3.2.2 (July 15, 2021)

### Fixed

-   Issue with html EULA screen not appearing ([#86](https://github.com/etn-ccis/blui-react-native-workflows/issues/86)).
-   Issue with soft keyboard blocking input field ([#84](https://github.com/etn-ccis/blui-react-native-workflows/issues/84)).

## v3.2.1 (June 30, 2021)

### Fixed

-   Issue with EULA screen not loading in self-registration flow ([#81](https://github.com/etn-ccis/blui-react-native-workflows/issues/81)).

## v3.2.0 (June 8, 2021)

### Added

-   Support for Spanish and Chinese languages.
-   Translation extension / override capability.
-   Dark theme support.
-   Tablet device styles.

## v3.1.0 (April 27, 2021)

### Added

-   Ability to customize the success screen in the Registration flows.

### Fixed

-   Issue where Remember Me checkbox is cleared after changing password ([#56](https://github.com/etn-ccis/blui-react-native-workflows/issues/56)).

## v3.0.1 (April 8, 2021)

### Fixed

-   Issue causing application to crash when existing user completes self-registration flow ([#50](https://github.com/etn-ccis/blui-react-native-workflows/issues/50)).

## v3.0.0 (March 31, 2021)

### Added

-   Ability to customize the Login screen by toggling on/off various elements and adding custom content.
-   Ability to insert custom forms into the Account Details section of registration for collecting additional user information.

### Removed

-   Phone number from the default fields collected during registration
    -   If you need to collect phone number, you must now do it through a custom Account Details form
-   Dependency on `highcharts` — highcharts translation utilities have moved to [@brightlayer-ui/highcharts](https://www.npmjs.com/package/@brightlayer-ui/highcharts).

### Changed

-   Updated from deprecated `@react-native-community/viewpager` to `react-native-pager-view`. Update your peer dependencies accordingly.

## v2.0.0 (December 10, 2020)

### Changed

-   Updated to use React Native Paper version 4 components — this update requires you to update your project to use v4 as well.

## v1.4.0 (November 10, 2020)

### Added

-   `phoneContactLink` prop to allow specification of tel URI details while keeping `phoneContact` for human-readable UI display of the same number

### Fixed

-   ChangePassword was not using the correct error message
-   EULA checkbox will only be available to tap after the webview has loaded
-   Tapping the "X" from an Android cold boot deep link will now properly navigate to Login

### Changed

-   ChangePassword now uses the property callbacks rather than directly using security helper
-   Additional support for Android hardware back button closing out of the various deep link flow to Login
-   Default TextInput selection color is now light blue for Android

## v1.3.0 (September 29, 2020)

### Added

-   i18n utilities
    -   This was relocated from [@brightlayer-ui/react-auth-shared](https://www.npmjs.com/package/@brightlayer-ui/react-auth-shared)
-   DismissKeyboardView component
    -   This was relocated from @brightlayer-ui/react-auth-shared

### Fixed

-   Fixed custom `passwordRequirements` validation on the create password and change password screens.

## v1.2.1 (July 16, 2020)

### Changed

-   Shareable logic has been extracted to [@brightlayer-ui/react-auth-shared](https://www.npmjs.com/package/@brightlayer-ui/react-auth-shared). This package re-exports all exports from the shared package, so there are no breaking changes in usage. The majority of the API documentation in now in the shared repository.

## v1.1.0 (July 7, 2020)

### Added

-   New required `RegistrationUIActions` for self registration, `requestRegistrationCode`, which takes an email string
-   Optional email parameter (`validationEmail?: string`) to the following registration actions: `validateUserRegistrationRequest`, `completeRegistration`
-   Optional email parameter (`email?: string`) to the following authentication actions: `verifyResetCode`, `setPassword`
-   `TextInput` and `TextInputSecure` can optionally accept a testID property
-   `AuthUIContextProvider` has a `eulaIsHtml` property allowing the EULA to be displayed as text or as HTML

### Changed

-   The return of the `validateUserRegistrationRequest` action to be `Promise<boolean>`
-   README deep link documentation: `Note: It is recommended to update navigation > DeepLinking.ts to include the initialRouteParam in the config if you haven’t already` referring to [stack-navigator documentation](https://reactnavigation.org/docs/stack-navigator/#initialroutename)
-   Deep Link parameters have changed from `verificationCode`, `validationCode`, and `verifyCode` to `code`
-   EULA now supports HTML content in addition to plaintext

## v1.0.0 (June 9, 2020)

### Changed

-   Package published under the @brightlayer-ui scope and made publicly available
-   Removed internal theming to defer to the end-user application theme
-   Removed dependency on react-native-elements

## v0.2.3

### Added

-   iOS and Android icons
-   Support for setting language based on device's locale
-   More strong typing
-   Script for example to use local code first, but if moved out of the folder it will use the node_module folder

### Fixed

-   Next button state on first screen of self registration

### Changed

-   Define tighter dependencies
-   Prevent users who reach the email verification step in self registration from jumping back in the flow
-   Email regex
-   Use PX Blue Typography for most textual elements
-   Significant documentation clarifications

## v0.2.1

### Added

-   Deep link support
-   TypeDoc code documentation generation and folder
-   Additional testing of new components
-   `yarn precommit` task for code validation, testing, code documentation generation, and licenses generation
-   Documentation for mock actions within the examples folder

### Fixed

-   Change Password keyboard overlaying text input
-   Status bar colours across iOS and Android
-   Enable state of EULA accept button when EULA is not loaded
-   Resolved additional TODOs and FIXMEs throughout the code

### Changed

-   Updated README with more specific integration information
-   Refactored contexts for global authentication and registration states and actions
-   Moved extra strings into the english.ts translations file and added TODOs for missing French translations

## v0.2.0

### Added

-   Networking mocks for examples
-   Error handling for all networking
-   UI and unit tests
-   Rename applications to AuthUIExample
-   Embed ChangePassword in AuthNavigator
-   Debug mode
-   Ability to configure external options showSelfRegistration, allowDebugMode, contactEmail, contactPhone, projectImage at a high level
-   Support for a wider array of screen sizes
-   Packaging for NPM
-   Validation tasks
-   Ability to launch UI from a provided code

### Fixed

-   UI fixes
-   Images not loading in Android (React Native bug workaround)
-   Handle Android back button
-   Sentence case all buttons
-   Linting and prettifying

### Changed

-   Rearchitecture Android and iOS examples into separate directory
-   Refactor security context
-   Replace promises with await/async pattern

## v0.1.0

### Added

-   Initial beta release
