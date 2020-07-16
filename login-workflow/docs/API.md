# API
This document outlines the various exports and configuration options for the React Native Auth Workflow package.

The majority of the types and export used in this package come from @pxblue/react-auth-shared. You can read about those exported objects and functions in their [API](https://github.com/pxblue/react-auth-shared/tree/master/docs/API.md) documentation.

## Components

### AuthNavigationContainer
Container component which holds the authentication and navigation state designed for mobile apps. This should be rendered at the root wrapping the whole app (except for the Context Provider components). Any valid `NavigationContainer` props can be added.

#### Usage
```tsx
import { AuthNavigationContainer } from '@pxblue/react-native-auth-workflow';

<AuthNavigationContainer initialState={initialState} ref={ref}>
    { /* ...contents */ }
</AuthNavigationContainer>
```