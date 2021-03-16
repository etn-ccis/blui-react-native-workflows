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
import { useTheme } from 'react-native-paper';

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
 * @param extraRoutes (Optional) array of additional screens to be available before authenticating.
 * @param initialRouteName (Optional) default route to load in the PreAuthContainer.
 */
type PreAuthContainerProps = {
    theme?: ReactNativePaper.Theme;
    extraRoutes?: JSX.Element;
    initialRouteName?: string;
};

/**
 * Container wrapping status bar and theming customizations to a top-level Stack Navigator which governs access
 * to the login screen, contact screen, reset password flows, and registration flows.
 *
 * @category Component
 */
export const PreAuthContainer: React.FC<PreAuthContainerProps> = (props) => {
    // const authProps = useInjectedUIContext();
    const {
        contactEmail = 'exampleSupport@eaton.com',
        contactPhone = '1-888-EXA-TEST',
        contactPhoneLink = '1-888-EXA-TEST',
        enableResetPassword = true,
        showContactSupport = true,
        enableInviteRegistration = true,
        showSelfRegistration = true,
    } = useInjectedUIContext();
    const theme = useTheme(props.theme);

    void MatIcon.loadFont();
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
            <Stack.Navigator initialRouteName={props.initialRouteName || 'Login'} mode="modal" headerMode={'none'}>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                {enableResetPassword && (
                    <Stack.Screen
                        name="PasswordResetInitiation"
                        component={ResetPasswordNav}
                        options={{ headerShown: false }}
                        initialParams={{
                            contactEmail,
                            contactPhone,
                        }}
                    />
                )}
                {enableResetPassword && (
                    <Stack.Screen
                        name="PasswordResetCompletion"
                        component={ResetPasswordHandleDeepLink}
                        options={{ headerShown: false }}
                    />
                )}
                {enableInviteRegistration && (
                    <Stack.Screen
                        name="RegistrationInvite"
                        component={InviteRegistrationPager}
                        options={{ headerShown: false }}
                    />
                )}
                {showContactSupport && (
                    <Stack.Screen
                        name="SupportContact"
                        component={ContactSupport}
                        options={{ headerShown: false }}
                        initialParams={{
                            contactEmail,
                            contactPhone,
                            contactPhoneLink,
                        }}
                    />
                )}
                {showSelfRegistration && (
                    <Stack.Screen
                        name="Registration"
                        component={SelfRegistrationPager}
                        options={{ headerShown: false }}
                    />
                )}
                {props.extraRoutes}
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};
