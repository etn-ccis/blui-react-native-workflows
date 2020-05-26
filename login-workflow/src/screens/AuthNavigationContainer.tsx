/**
 * @packageDocumentation
 * @module Screens
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './Splash';
import { useSecurityState, useSecurityActions } from '../contexts/SecurityContextProvider';
import PreAuthContainer from './PreAuthContainer';
import { ChangePassword } from '../screens/ChangePassword';

// Theme
// import { ThemeProvider } from '@pxblue/react-native-components';
// import { blue as BlueTheme } from '@pxblue/react-native-themes';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { paperBlueTheme } from '../helpers/paperBlueTheme';
import { default as AuthUIInternalStore } from '../stores/AuthUIInternalStore';
import { useInjectedUIContext } from '../contexts/AuthUIContextProvider';

/**
 * Type for the properties of the navigation container.
 */
type NavigationContainerComponentProps = React.ComponentProps<typeof NavigationContainer>;

/**
 * Container component which holds the authentication and navigation state
 * designed for mobile apps.
 * This should be rendered at the root wrapping the whole app.
 * Any valid NavigationContainer props can be added.
 *
 * ```typescript
 * // Initial state can be mapped to a specific auth screen to pass in
 * // codes if needed. Use useLinking with a similar linking options
 * export const authLinkMapping: LinkingOptions = {
 *     prefixes: ['https://authui.com', 'authui://'],
 *     config: {
 *         Login: 'login',
 *         PasswordResetInitiation: 'password/reset/initiate',
 *         PasswordResetCompletion: 'password/reset/:verifyCode',
 *         RegistrationInvite: 'invite/:validationCode',
 *         Registration: 'register/:verificationCode',
 *         SupportContact: 'support',
 *     },
 * };
 * ```
 *
 * @param props.initialState Initial state object for the navigation tree.
 * @param props.onStateChange Callback which is called with the latest navigation state when it changes.
 * @param props.theme Theme object for the navigators.
 * @param props.children Child elements to render the content.
 * @param props.ref Ref object which refers to the navigation object containing helper methods.
 *
 * @category Component
 */
function AuthNavigationContainer(props: NavigationContainerComponentProps, ref: any): JSX.Element {
    const securityState = useSecurityState();
    const securityActions = useSecurityActions();
    const injectedContext = useInjectedUIContext();

    React.useEffect(() => {
        const bootstrapAsync = async (): Promise<void> => {
            await injectedContext.authActions().initiateSecurity();
        };

        bootstrapAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (securityState.isLoading) {
        // We haven't finished checking for the token yet
        return <SplashScreen mainImage={injectedContext.projectImage} />;
    }

    const ChangePasswordScreen = (
        // <PaperProvider theme={paperBlueTheme}>
        //     <ThemeProvider theme={BlueTheme}>
        <ChangePassword
            onChangePassword={injectedContext.authActions().changePassword}
            onCancel={securityActions.hideChangePassword}
            onChangeComplete={securityActions.hideChangePassword}
        />
        //     </ThemeProvider>
        // </PaperProvider>
    );

    const appShouldBeVisible = securityState.isAuthenticatedUser && !securityState.isShowingChangePassword;

    // Show the change password screen regardless of state if true
    // Show PreAuthContainer unless the user is authenticated
    // Show the application
    return (
        <NavigationContainer ref={ref} {...props}>
            {appShouldBeVisible ? (
                <>{props.children}</>
            ) : (
                <AuthUIInternalStore>
                    {securityState.isShowingChangePassword ? ChangePasswordScreen : <PreAuthContainer />}
                </AuthUIInternalStore>
            )}
        </NavigationContainer>
    );
}

export default React.forwardRef(AuthNavigationContainer);
