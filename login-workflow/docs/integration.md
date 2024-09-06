# Integrating the Package

This package includes workflows for authentication-related screens and registration-related screens which can be used either separately or together.

In both cases, you will be required to set up the necessary routes in your routing provider for the screens you wish to use, wrap the route(s) in the appropriate ContextProvider, and define the API calls that will be made when certain actions are performed in the workflow screens.

For specific details, see the dedicated guides for [Login/Authentication](./authentication-workflow.md) (includes login, forgot/reset password, etc.) and [Registration](./registration-workflow.md).

## Integrating Okta package

To integrate Okta redirect authentication into your project, follow the steps below for both iOS and Android platforms.

### iOS

Update Podfile:

cd ios
pod install --repo-update

Follow the documentation for advance configuration.(https://www.npmjs.com/package/@okta/okta-react-native#ios-setup)

### Android

Update build.gradle:

Defining a redirect scheme to capture the authorization redirect. In android/app/build.gradle, under android -> defaultConfig, add:

```tsx
manifestPlaceholders = [
  appAuthRedirectScheme: 'com.sampleapplication'
]
```

Sync your project with Gradle files to ensure the new dependencies are included.

Follow the documentation for advance configuration. (https://www.npmjs.com/package/@okta/okta-react-native#android-setup)

