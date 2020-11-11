/**
 * @packageDocumentation
 * @module Screens
 */

import * as React from 'react';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

// Nav
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

// Components
import { StatusBar } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';

// Screens / Stacks
import { Login } from './Login';
import { ResetPasswordNav } from './ResetPassword/ResetPasswordNav';
import { ResetPasswordHandleDeepLink } from './ResetPassword/ResetPasswordHandleDeepLink';
import { InviteRegistrationPager } from './InviteRegistrationPager';
import { SelfRegistrationPager } from './SelfRegistrationPager';
import { ContactSupport } from './ContactSupport';
import { useInjectedUIContext } from '@pxblue/react-auth-shared';

/**
 * @ignore
 */
const Stack = createStackNavigator();

/**
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type PreAuthContainerProps = {
    theme?: Theme;
};

/**
 * Container wrapping status bar and theming customizations to a top-level Stack Navigator which governs access
 * to the login screen, contact screen, reset password flows, and registration flows.
 *
 * @category Component
 */
export const PreAuthContainer: React.FC<PreAuthContainerProps> = (props) => {
    const authProps = useInjectedUIContext();
    const theme = useTheme(props.theme);

    MatIcon.loadFont();
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
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
                        contactPhoneLink: authProps.contactPhoneLink ?? '1-888-EXA-TEST',
                    }}
                />
                <Stack.Screen name="Registration" component={SelfRegistrationPager} options={{ headerShown: false }} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};
