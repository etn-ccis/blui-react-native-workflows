/**
 * @format
 */

import React from 'react';
import 'react-native';
import { Login } from '../../screens/Login';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Nav
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();

// Theme
// import { ThemeProvider } from '@pxblue/react-native-components';
// import { blue as BlueTheme } from '@pxblue/react-native-themes';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { paperBlueTheme } from '../../helpers/paperBlueTheme';

// mock hooks
jest.mock('src/contexts/AccountUIContext', () => ({
    useAccountUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useAccountUIState: jest.fn().mockReturnValue({ login: { transitSuccess: true } }),
    AccountActions: { resetPasswordReset: jest.fn(() => true) },
}));

jest.mock('src/contexts/AuthUIContextProvider', () => ({
    useAuthUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useInjectedUIContext: jest.fn().mockReturnValue({ showSelfRegistration: true }),
}));

jest.mock('src/contexts/SecurityContextProvider', () => ({
    useSecurityState: jest.fn().mockReturnValue({ rememberMeDetails: { email: undefined, rememberMe: false } }),
}));

describe('Login screen tested with enzyme', () => {
    const act = renderer.act;

    function baseXML(): JSX.Element {
        return (
            // <PaperProvider theme={paperBlueTheme}>
            //     <ThemeProvider theme={BlueTheme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={(): any => ({
                            // eslint-disable-next-line react/display-name
                            header: (): JSX.Element => <></>,
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            //     </ThemeProvider>
            // </PaperProvider>
        );
    }

    it('renders correctly', async () => {
        const rendered = renderer.create(baseXML()).toJSON();

        await act(async () => {
            await Promise.resolve(rendered);
            expect(rendered).toBeTruthy();
        });
    });
});
