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
const Stack = createStackNavigator();

// mock hooks
jest.mock('src/contexts/AccountUIContext', () => ({
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
    AccountActions: { resetPasswordReset: jest.fn(() => true) },
}));

describe('ResetPasswordConfirm subScreen tested with enzyme', () => {
    function baseXML(): JSX.Element {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="ResetPasswordConfirm"
                        component={ResetPasswordConfirm}
                        options={(): object => ({
                            // eslint-disable-next-line react/display-name
                            header: (): JSX.Element => <></>,
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
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
