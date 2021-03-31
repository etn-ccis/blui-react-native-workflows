import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types';

/**
 * Map a Deep Link or Universal link to a screen in the application
 * https://reactnavigation.org/docs/deep-linking
 */

export const authLinkMapping: LinkingOptions = {
    prefixes: ['https://authui.com', 'authui://'],
    config: {
        screens: {
            Login: 'login',
            PasswordResetInitiation: {
                initialRouteName: 'Login',
                path: 'password/reset/initiate',
            },
            PasswordResetCompletion: {
                initialRouteName: 'Login',
                // email can be passed in as parameter if needed for the api
                path: 'password/reset/:code',
            },
            RegistrationInvite: {
                initialRouteName: 'Login',
                // email can be passed in as parameter if needed for the api
                path: 'invite/:code',
            },
            Registration: {
                initialRouteName: 'Login',
                // email can be passed in as parameter if needed for the api
                path: 'register/:code',
            },
            SupportContact: {
                initialRouteName: 'Login',
                path: 'support',
            },
        },
    },
};

/**
 * React Native boilerplate to get the initial state from open link, or fail after 150ms
 * @param getInitialState
 * @param setInitialState
 */
export const resolveInitialState = (getInitialState: () => any, setInitialState: (state: any) => void): void => {
    Promise.race([
        getInitialState(),
        new Promise((resolve) =>
            // Timeout in 150ms if `getInitialState` doesn't resolve
            // Workaround for https://github.com/facebook/react-native/issues/25675
            setTimeout(resolve, 150)
        ),
    ])
        .then((state) => {
            if (state !== undefined) {
                setInitialState(state);
            }
        })
        .catch((e) => {
            console.error(e);
        });
};
