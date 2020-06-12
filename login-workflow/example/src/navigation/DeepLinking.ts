import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types';

/**
 * Map a Deep Link or Universal link to a screen in the application
 * https://reactnavigation.org/docs/deep-linking
 * Test iOS simulator with `xcrun simctl openurl booted authui://invite/8k27jshInvite234Code`
 * Test Android with `adb shell am start -W -a android.intent.action.VIEW -d "authui://invite/8k27jshInvite234Code" com.shiverware.eaton.authui`
 * Test on device from browser `authui://invite/8k27jshInvite234Code`
 */
export const authLinkMapping: LinkingOptions = {
    prefixes: ['https://authui.com', 'authui://'],
    config: {
        Login: 'login',
        PasswordResetInitiation: 'password/reset/initiate',
        PasswordResetCompletion: 'password/reset/:verifyCode',
        RegistrationInvite: 'invite/:validationCode',
        Registration: 'register/:verificationCode',
        SupportContact: 'support',
    },
};

/**
 * React Native boilerplate to get the initial state from open link, or fail after 150ms
 * @param getInitialState
 * @param setInitialState
 */
export const resolveInitialState = (getInitialState: Function, setInitialState: Function): void => {
    Promise.race([
        getInitialState(),
        new Promise((resolve) =>
            // Timeout in 150ms if `getInitialState` doesn't resolve
            // Workaround for https://github.com/facebook/react-native/issues/25675
            setTimeout(resolve, 150)
        ),
    ])
        .catch((e) => {
            console.error(e);
        })
        .then((state) => {
            if (state !== undefined) {
                setInitialState(state);
            }
        });
};
