/**
 * @packageDocumentation
 * @module Screens
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Splash as SplashScreen } from './Splash';
import { PreAuthContainer } from './PreAuthContainer';
import { ChangePassword } from '../screens/ChangePassword';

// Shared Auth Logic
import {
    // Store
    AuthUIInternalStore,
    // Hooks
    useSecurityState,
    useSecurityActions,
    useInjectedUIContext,
} from '@brightlayer-ui/react-auth-shared';

/**
 * Type for the properties of the navigation container.
 */
type NavigationContainerComponentProps = React.ComponentProps<typeof NavigationContainer> & {
    extraRoutes?: JSX.Element;
    initialRouteName?: string;
};

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
 *         // email can be passed in as parameter if needed for the api
 *         PasswordResetCompletion: 'password/reset/:code',
 *         // email can be passed in as parameter if needed for the api
 *         RegistrationInvite: 'invite/:code',
 *         // email can be passed in as parameter if needed for the api
 *         Registration: 'register/:code',
 *         SupportContact: 'support',
 *     },
 * };
 * ```
 *
 * @param props.extraRoutes An array of routes to make accessible outside of the auth guard.
 * @param props.initialState Initial state object for the navigation tree.
 * @param props.initialRouteName Name of the default route to load in the navigator.
 * @param props.onStateChange Callback which is called with the latest navigation state when it changes.
 * @param props.theme Theme object for the navigators.
 * @param props.children Child elements to render the content.
 * @param props.ref Ref object which refers to the navigation object containing helper methods.
 *
 * @category Component
 */
const AuthNavigationContainerRender: React.ForwardRefRenderFunction<
    {}, // eslint-disable-line @typescript-eslint/ban-types
    NavigationContainerComponentProps
> = (props: NavigationContainerComponentProps, ref: any) => {
    const { children, extraRoutes, initialRouteName, ...other } = props;
    const securityState = useSecurityState();
    const securityActions = useSecurityActions();
    const injectedContext = useInjectedUIContext();

    React.useEffect(() => {
        const bootstrapAsync = async (): Promise<void> => {
            await injectedContext.authActions().initiateSecurity();
        };

        void bootstrapAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (securityState.isLoading) {
        // We haven't finished checking for the token yet
        return <SplashScreen mainImage={injectedContext.projectImage} />;
    }

    const ChangePasswordScreen = (
        <ChangePassword
            onChangePassword={injectedContext.authActions().changePassword}
            onCancel={securityActions.hideChangePassword}
            onChangeComplete={securityActions.onUserNotAuthenticated}
        />
    );

    const appShouldBeVisible = securityState.isAuthenticatedUser && !securityState.isShowingChangePassword;

    // Show the change password screen regardless of state if true
    // Show PreAuthContainer unless the user is authenticated
    // Show the application
    return (
        <NavigationContainer ref={ref} {...other}>
            {appShouldBeVisible ? (
                <>{children}</>
            ) : (
                <AuthUIInternalStore>
                    {securityState.isShowingChangePassword ? (
                        ChangePasswordScreen
                    ) : (
                        <PreAuthContainer extraRoutes={extraRoutes} initialRouteName={initialRouteName} />
                    )}
                </AuthUIInternalStore>
            )}
        </NavigationContainer>
    );
};

export const AuthNavigationContainer = React.forwardRef(AuthNavigationContainerRender);
