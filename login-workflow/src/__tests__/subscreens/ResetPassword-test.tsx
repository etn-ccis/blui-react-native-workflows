/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @format
 */

import React from 'react';
import 'react-native';
import { mount } from 'enzyme';
import ResetPassword from '../../subScreens/ResetPassword';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Theme
import { ThemeProvider } from '@pxblue/react-native-components';
import { blue as BlueTheme } from '@pxblue/react-native-themes';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperBlueTheme } from '../../helpers/paperBlueTheme';

import { TextInputHTMLAttributes } from '../../types/TextInputHTMLAttributes';

// Nav
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// mock hooks
jest.mock('src/contexts/AccountUIContext', () => ({
    useAccountUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useAccountUIState: jest.fn().mockReturnValue({ forgotPassword: { transitSuccess: true } }),
    AccountActions: { resetPasswordReset: jest.fn(() => true) },
}));

describe('ResetPassword subScreen tested with enzyme', () => {
    function baseXML(): JSX.Element {
        return (
            <PaperProvider theme={paperBlueTheme}>
                <ThemeProvider theme={BlueTheme}>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="ResetPassword" component={ResetPassword} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ThemeProvider>
            </PaperProvider>
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
