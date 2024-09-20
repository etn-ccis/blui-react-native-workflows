# React Native Auth Workflow

[![Build](https://github.com/etn-ccis/blui-react-native-workflows/actions/workflows/blui-ci.yml/badge.svg?branch=master)](https://github.com/etn-ccis/blui-react-native-workflows/actions/workflows/blui-ci.yml) ![npm (scoped)](https://img.shields.io/npm/v/@brightlayer-ui/react-native-auth-workflow) [![codecov](https://codecov.io/gh/etn-ccis/blui-react-native-workflows/branch/master/graph/badge.svg?token=U4OI0D5UVP)](https://codecov.io/gh/etn-ccis/blui-react-native-workflows)

The React Native Auth Workflow package provides a consistent UI implementation of authentication-related capabilities for use in Eaton web applications built with React Native.

The package is intended to provide a standard, out-of-the-box experience for capabilities such as:

-   Okta Login
-   Login
-   Forgot / Reset Password
-   Change Password
-   Contact Support
-   Self Registration
-   Invitation-based Registration

This package is flexible, allowing you to use the Login and Registration flows independently or in combination (or simply use individual screen components), while also providing many opportunities to customize the flows if needed for your particular application.

These workflows are back-end agnostic, meaning you can use them with any back-end API you wish. You simply need to provide an implementation for several key functions (actions) that are called at various points within the workflows based on user interaction.

<img width="400" alt="Login" src="https://github.com/etn-ccis/blui-react-native-workflows/blob/master/login-workflow/media/screens/okta-login.png?raw=true">
<img width="400" alt="Create Password" src="https://github.com/etn-ccis/blui-react-native-workflows/blob/master/login-workflow/media/screens/create-password.png?raw=true">

# Installation

To install the latest version of this package, run:

```shell
npm install --save @brightlayer-ui/react-native-auth-workflow
// or
yarn add @brightlayer-ui/react-native-auth-workflow

```

# Compatibility

This package has a peer dependency on React Native Paper.

-   @brightlayer-ui/react-native-auth-workflow @1.x --> react-native-paper @3.x
-   @brightlayer-ui/react-native-auth-workflow @2.x --> react-native-paper @4.x
-   @brightlayer-ui/react-native-auth-workflow @4.x --> react-native-paper @5.x

### Peer Dependencies

This package also has a number of peer dependency requirements that you will need to install in your project. To install the latest version of all of these peer dependencies, run the following command in your project root:

```
npm install --save @brightlayer-ui/react-native-components @brightlayer-ui/react-native-vector-icons @okta/okta-react-native i18next react react-i18next react-native react-native-gesture-handler react-native-keyboard-aware-scroll-view react-native-pager-view react-native-paper react-native-reanimated react-native-safe-area-context react-native-svg react-native-svg-transformer react-native-vector-icons react-native-webview
// or
yarn add @brightlayer-ui/react-native-components @brightlayer-ui/react-native-vector-icons @okta/okta-react-native i18next react react-i18next react-native react-native-gesture-handler react-native-keyboard-aware-scroll-view react-native-pager-view react-native-paper react-native-reanimated react-native-safe-area-context react-native-svg react-native-svg-transformer react-native-vector-icons react-native-webview
```

# Usage

To use the package, read our [Integration](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/integration.md) instructions. Even if you are starting from scratch, it may be useful for you to refer to the [Example](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/example) project while getting started.

In short, you will need to:

-   Add routes for each of the Login Workflow screens you wish to include
-   Define a mechanism for tracking the authenticated state of the current user
-   Add a registration route for the registration workflow component
-   Configure route guards / protected routes to ensure users only have access to specific routes when appropriate
-   Define actions files to integrate the workflow screens with your back-end API

> If you are starting a brand new project, the easiest way to get started with the React Native Auth Workflow is to use the [BLUI CLI](https://www.npmjs.com/package/@brightlayer-ui/cli) and select the Authentication template as your starting point. This will create a brand new project that exactly mirrors the example project from this repository.

## Learn More

-   [Setting Up Routing](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/routing.md)
-   [Language Support](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/language-support.md)
-   [Adding an Authentication/Login Workflow](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/authentication-workflow.md)
-   [Adding a Registration Workflow](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/registration-workflow.md)
-   [Handling Errors](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/error-management.md)
-   [Customizing Workflows](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/customization.md)
-   [Components & APIs](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/components/README.md)
-   [Screens](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/screens/README.md)

# Migrating from v5 => v6

We have listened to your feedback and version 5 of this library is a significant rewrite that aims to address many requests for greater flexibility and customization of the workflows.

Some notable changes include:

-   Router independence — you now have full control over your routing library and its configuration
-   Allowing you to manage the authentication status / mechanism (separating UI from business logic)
-   Separation of Login and Registration workflows so they can be used independently
-   Allow for re-ordering or adding/removing screens from workflows (utility components available to help you match our styling in custom screens)
-   Exporting screens individually so you can build your own custom flows
-   Simpler approach to translations (separating our internal translations from your application-level translations)
-   Greater customization of screens through props (and moving customization properties to the screens they affect instead of handling all customizations through a monolithic wrapper component)
-   Improved error management mechanism (customizable)

Learn more about upgrading your existing application by reading our [Migrating Guide](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/migration-guide-5-6.md)

# Contributors

To work on this package as a contributor, first clone down the repository:

```shell
git clone https://github.com/etn-ccis/blui-react-native-workflows
cd react-native-workflows/login-workflow
```

You can install all necessary dependencies and run the demo project by running:

```shell
yarn start:example
// or
yarn start:example-android
```

If you make changes to the library components and want to link them to the running example project, you can run:

```shell
yarn link:components
```

You can build the library by running:

```shell
yarn build
```

You can run the Lint checks, prettier formatter, typescript validator, and unit tests by running:

```shell
yarn validate
```

You can update the auto-generated licenses.md file by running:

```shell
yarn generate:licenses
```
