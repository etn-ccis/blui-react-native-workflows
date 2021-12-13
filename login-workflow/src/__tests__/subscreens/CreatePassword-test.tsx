/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @format
 */

import React from 'react';
import 'react-native';
import { shallow, mount } from 'enzyme';
import { CreatePassword } from '../../subScreens/CreatePassword';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { TextInputHTMLAttributes } from '@brightlayer-ui/react-auth-shared';

jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useAuthUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useInjectedUIContext: jest.fn().mockReturnValue({ showSelfRegistration: true }),
}));

describe('CreatePassword subScreen tested with enzyme', () => {
    const act = renderer.act;

    function baseXML(
        onPasswordChanged = (): void => {
            /* do nothing */
        }
    ): JSX.Element {
        return <CreatePassword onPasswordChanged={onPasswordChanged} />;
    }

    it('renders correctly', () => {
        const rendered = renderer.create(baseXML()).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('should render one Instruction component', () => {
        const wrapper = shallow(baseXML());
        expect(wrapper.find('Instruction')).toHaveLength(1);
    });

    it('should render two TextInputSecure components', () => {
        const wrapper = shallow(baseXML());
        expect(wrapper.find('TextInputSecure')).toHaveLength(2);
    });

    it('should render one PasswordRequirements component', () => {
        const wrapper = shallow(baseXML());
        expect(wrapper.find('PasswordRequirements')).toHaveLength(1);
    });

    it('should update password field on input', () => {
        const container = mount(baseXML());

        (container.find('TextInputSecure').first().props() as TextInputHTMLAttributes).onChangeText!('somenewpassword');
        container.update();

        expect(container.find('TextInputSecure').first().prop('value')).toEqual('somenewpassword');
    });

    it('should update confirm field on input', () => {
        const container = mount(baseXML());

        (container.find('TextInputSecure').at(1).props() as TextInputHTMLAttributes).onChangeText!('somenewpassword');
        container.update();

        expect(container.find('TextInputSecure').at(1).prop('value')).toEqual('somenewpassword');
    });

    it('test async useEffect update of onPasswordChanged returns non empty password for matching strong passwords', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));
            (component.find('TextInputSecure').at(0).props() as TextInputHTMLAttributes).onChangeText!('qwQW12!@');
            (component.find('TextInputSecure').at(1).props() as TextInputHTMLAttributes).onChangeText!('qwQW12!@');
            component.update();
        });

        expect(component.find('TextInputSecure').at(0).prop('value')).toEqual('qwQW12!@');
        expect(component.find('TextInputSecure').at(1).prop('value')).toEqual('qwQW12!@');
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenCalledWith('qwQW12!@');
        expect(mockCallback.mock.calls[2][0]).toBe('qwQW12!@'); // The final call is the final state from the useEffect hook
    });

    it('test async useEffect update of onPasswordChanged returns empty string for matching weak passwords', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));
            (component.find('TextInputSecure').at(0).props() as TextInputHTMLAttributes).onChangeText!('weakpass');
            (component.find('TextInputSecure').at(1).props() as TextInputHTMLAttributes).onChangeText!('weakpass');
            component.update();
        });

        expect(component.find('TextInputSecure').at(0).prop('value')).toEqual('weakpass');
        expect(component.find('TextInputSecure').at(1).prop('value')).toEqual('weakpass');
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenLastCalledWith('');
        expect(mockCallback.mock.calls[2][0]).toBe(''); // The final call is the final state from the useEffect hook
    });

    it('test async useEffect update of onPasswordChanged returns empty string for non-matching strong passwords', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));
            (component.find('TextInputSecure').at(0).props() as TextInputHTMLAttributes).onChangeText!('qwQW12!@');
            (component.find('TextInputSecure').at(1).props() as TextInputHTMLAttributes).onChangeText!('weWE23@#');
            component.update();
        });

        expect(component.find('TextInputSecure').at(0).prop('value')).toEqual('qwQW12!@');
        expect(component.find('TextInputSecure').at(1).prop('value')).toEqual('weWE23@#');
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenLastCalledWith('');
        expect(mockCallback.mock.calls[2][0]).toBe(''); // The final call is the final state from the useEffect hook
    });

    // it('strong password entry snapshot', async () => {
    //     const component = mount(baseXML());

    //     await act(async () => {
    //         await Promise.resolve(component);
    //         await new Promise((resolve) => setImmediate(resolve));
    //         component.find('TextInputSecure').at(0).props().onChangeText("qwQW12!@");
    //         component.find('TextInputSecure').at(1).props().onChangeText("qwQW12!@");
    //         component.update();
    //     });

    //     expect(component).toMatchSnapshot();
    // });

    // it('weak password entry snapshot', async () => {
    //     const component = mount(baseXML());

    //     await act(async () => {
    //         await Promise.resolve(component);
    //         await new Promise((resolve) => setImmediate(resolve));
    //         component.find('TextInputSecure').at(0).props().onChangeText("weakpass");
    //         component.find('TextInputSecure').at(1).props().onChangeText("weakpass");
    //         component.update();
    //     });

    //     expect(component).toMatchSnapshot();
    // });
});
