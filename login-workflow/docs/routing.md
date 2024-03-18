# Setting up Routing

While this workflow library will work with different routing providers, we generally recommend using [React Navigation](https://reactnavigation.org/) and will do so in all of the examples.

## Usage

Because this workflow package is router-agnostic, you will be required to set up your routing solution and configure which of the workflow screens will appear on each of your routes.




### Registration

The **Registration** workflow is intended to be used on a _single_ route because the screens work together and share data, etc. This single route renders a component that manages the transitions between the screens.

For more information on the `RegistrationContextProvider`, refer to the [Registration Workflow](./registration-workflow.md) Guide.
<!-- @Todo add Auth guard and Guest guard in example when implementented -->
#### Example Usage

```tsx
import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { RegistrationWorkflow, RegistrationContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef();


const RegistrationRouter = (): any => {

    return (
        <RegistrationContextProvider
            language={language}
            actions={Actions()}
            i18n={i18n}
            routeConfig={routes}
            navigate={navigationRef.navigate}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="REGISTER_SELF">{() => <RegistrationWorkflow />}</Stack.Screen>
                <Stack.Screen name="REGISTER_INVITE">
                    {() => <RegistrationWorkflow isInviteRegistration />}
                </Stack.Screen>
            </Stack.Navigator>
        </RegistrationContextProvider>
    );
};
export const MainRouter = (): any => {
    return (
        <NavigationContainer ref={navigationRef}>
            <RegistrationRouter />
            <LoginRouter />
        </NavigationContainer>
    );
};

```

<!-- @Todo  add Protected Routing when auth workflow is done-->
<!-- @TODO setting up deep links/universal links and add a link to the React Navigation guide for that. -->