# API

This document outlines the various exports and configuration options for the React Native Auth Workflow package.

## Components

### AuthNavigationContainer

Container component which holds the authentication and navigation state designed for mobile apps. This should be rendered at the root wrapping the whole app (except for the Context Provider components). Any valid `NavigationContainer` props can be added.

Additionally, we expose props for `extraRoutes` and `initialRouteName`. You can learn more about these props in the [Customization Guide](https://github.com/etn-ccis/blui-react-native-workflows/tree/master/login-workflow/docs/customization.md).

#### Usage

```tsx
import { AuthNavigationContainer } from '@brightlayer-ui/react-native-auth-workflow';

<AuthNavigationContainer ref={ref} initialState={initialState} extraRoutes={[]} initialRouteName={'Login'}>
    {/* ...contents */}
</AuthNavigationContainer>;
```
