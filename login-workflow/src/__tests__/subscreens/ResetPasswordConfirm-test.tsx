/**
 * @format
 */

import React from 'react';
import 'react-native';
import { ResetPasswordConfirm } from '../../subScreens/ResetPasswordConfirm';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Nav
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
const Stack = createStackNavigator();

// mock hooks
jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useAccountUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useAccountUIState: jest.fn().mockReturnValue({
        setPassword: {
            setPasswordTransit: {
                transitId: null,
                transitErrorMessage: null,
                transitInProgress: false,
                transitComplete: false,
                transitSuccess: false,
            },
        },
    }),
    useAuthUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useInjectedUIContext: jest.fn().mockReturnValue({ showSelfRegistration: true }),
    AccountActions: { resetPasswordReset: jest.fn(() => true) },
}));

describe('ResetPasswordConfirm subScreen tested with enzyme', () => {
    function baseXML(): JSX.Element {
        return (
            <Provider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="ResetPasswordConfirm"
                            component={ResetPasswordConfirm}
                            options={(): { header: () => JSX.Element } => ({
                                header: (): JSX.Element => <></>,
                            })}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }

    it('renders correctly', () => {
        const rendered = renderer.create(baseXML()).toJSON();
        expect(rendered).toBeTruthy();
    });

    // it('snapshot', async () => {
    //     const component = mount(baseXML());
    //     expect(component).toMatchSnapshot();
    // });
});
