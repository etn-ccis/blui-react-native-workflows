/**
 * @packageDocumentation
 * @module Screens
 */

import * as React from 'react';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '@pxblue/colors';

// Nav
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

// Components
import { StatusBar } from 'react-native';

// Screens / Stacks
import { Login } from './Login';
import { ResetPasswordNav } from './ResetPassword/ResetPasswordNav';
import { ResetPasswordHandleDeepLink } from './ResetPassword/ResetPasswordHandleDeepLink';
import { InviteRegistrationPager } from './InviteRegistrationPager';
import { SelfRegistrationPager } from './SelfRegistrationPager';
import { ContactSupport } from './ContactSupport';
import { useInjectedUIContext } from '../contexts/AuthUIContextProvider';

/**
 * @ignore
 */
const Stack = createStackNavigator();

/**
 * Container wrapping status bar and theming customizations to a top-level Stack Navigator which governs access
 * to the login screen, contact screen, reset password flows, and registration flows.
 *
 * @category Component
 */
export const PreAuthContainer: React.FC = () => {
    const authProps = useInjectedUIContext();

    MatIcon.loadFont();
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor={Colors.blue['700']} barStyle="light-content" />
            <Stack.Navigator initialRouteName="Login" mode="modal">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen
                    name="PasswordResetInitiation"
                    component={ResetPasswordNav}
                    options={{ headerShown: false }}
                    initialParams={{
                        contactEmail: authProps.contactEmail ?? 'exampleSupport@eaton.com',
                        contactPhone: authProps.contactPhone ?? '1-888-EXA-TEST',
                    }}
                />
                <Stack.Screen
                    name="PasswordResetCompletion"
                    component={ResetPasswordHandleDeepLink}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RegistrationInvite"
                    component={InviteRegistrationPager}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SupportContact"
                    component={ContactSupport}
                    options={{ headerShown: false }}
                    initialParams={{
                        contactEmail: authProps.contactEmail ?? 'exampleSupport@eaton.com',
                        contactPhone: authProps.contactPhone ?? '1-888-EXA-TEST',
                    }}
                />
                <Stack.Screen name="Registration" component={SelfRegistrationPager} options={{ headerShown: false }} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};
