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

// mock hooks
jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useAccountUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useAccountUIState: jest.fn().mockReturnValue({ login: { transitSuccess: true } }),
    AccountActions: { resetPasswordReset: jest.fn(() => true) },
    useAuthUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useInjectedUIContext: jest.fn().mockReturnValue({ showSelfRegistration: true }),
    useSecurityState: jest.fn().mockReturnValue({ rememberMeDetails: { email: undefined, rememberMe: false } }),
}));

describe('Login screen tested with enzyme', () => {
    const act = renderer.act;

    function baseXML(): JSX.Element {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={(): any => ({
                            header: (): JSX.Element => <></>,
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
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
