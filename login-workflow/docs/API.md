# API

This document outlines the various exports and configuration options for the React Native Auth Workflow package.

The majority of the types and export used in this package come from @brightlayer-ui/react-auth-shared. You can read about those exported objects and functions in their [API](https://github.com/brightlayer-ui/react-auth-shared/tree/master/docs/API.md) documentation.

## Components

### AuthNavigationContainer

Container component which holds the authentication and navigation state designed for mobile apps. This should be rendered at the root wrapping the whole app (except for the Context Provider components). Any valid `NavigationContainer` props can be added.

Additionally, we expose props for `extraRoutes` and `initialRouteName`. You can learn more about these props in the [Customization Guide](https://github.com/brightlayer-ui/react-native-workflows/tree/master/login-workflow/docs/customization.md).

#### Usage

```tsx
import { AuthNavigationContainer } from '@brightlayer-ui/react-native-auth-workflow';

<AuthNavigationContainer ref={ref} initialState={initialState} extraRoutes={[]} initialRouteName={'Login'}>
    {/* ...contents */}
</AuthNavigationContainer>;
```
