/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @format
 */

import React from 'react';
import 'react-native';
import { mount } from 'enzyme';
import { ResetPassword } from '../../subScreens/ResetPassword';
import { Provider } from 'react-native-paper';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { TextInputHTMLAttributes } from '@brightlayer-ui/react-auth-shared';

// Nav
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// mock hooks
jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useAccountUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useAccountUIState: jest.fn().mockReturnValue({ forgotPassword: { transitSuccess: true } }),
    AccountActions: { resetPasswordReset: jest.fn(() => true) },
}));

describe('ResetPassword subScreen tested with enzyme', () => {
    function baseXML(): JSX.Element {
        return (
            <Provider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="ResetPassword" component={ResetPassword} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }

    it('renders correctly', () => {
        const rendered = renderer.create(baseXML()).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('should render one Instruction component', () => {
        const wrapper = mount(baseXML());
        expect(wrapper.find('Instruction')).toHaveLength(1);
    });

    it('should update email field on input', () => {
        const wrapper = mount(baseXML());

        (wrapper.find('TextInput').first().props() as TextInputHTMLAttributes).onChangeText!('some@email.com');
        wrapper.update();

        expect(wrapper.find('TextInput').first().prop('value')).toEqual('some@email.com');
    });

    it('test button enabled for valid email entry', () => {
        const wrapper = mount(baseXML());

        (wrapper.find('TextInput').first().props() as TextInputHTMLAttributes).onChangeText!('some@email.com');
        wrapper.update();
        const sendRequestButton = wrapper.find('Button').first();

        expect(wrapper.find('TextInput').first().prop('value')).toEqual('some@email.com');
        expect(sendRequestButton.prop('disabled')).toEqual(false);
    });

    it('test button disabled for invalid email entry', () => {
        const wrapper = mount(baseXML());

        (wrapper.find('TextInput').first().props() as TextInputHTMLAttributes).onChangeText!('gibberish');
        wrapper.update();
        const sendRequestButton = wrapper.find('Button').first();

        expect(wrapper.find('TextInput').first().prop('value')).toEqual('gibberish');
        expect(sendRequestButton.prop('disabled')).toEqual(true);
    });

    // it('good email entry snapshot', async () => {
    //     const component = mount(baseXML());

    //     await act(async () => {
    //         await Promise.resolve(component);
    //         await new Promise((resolve) => setImmediate(resolve));
    //         component.find('TextInput').at(0).props().onChangeText("some@email.com");
    //         component.update();
    //     });

    //     expect(component).toMatchSnapshot();
    // });

    // it('bad email entry snapshot', async () => {
    //     const component = mount(baseXML());

    //     await act(async () => {
    //         await Promise.resolve(component);
    //         await new Promise((resolve) => setImmediate(resolve));
    //         component.find('TextInput').at(0).props().onChangeText("not an email");
    //         component.update();
    //     });

    //     expect(component).toMatchSnapshot();
    // });
});
