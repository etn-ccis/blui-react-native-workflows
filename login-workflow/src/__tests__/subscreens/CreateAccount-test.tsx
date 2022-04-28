/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @format
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateAccount } from '../../subScreens/CreateAccount';
import { cleanup } from '@testing-library/react-native';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { TextInputHTMLAttributes } from '@brightlayer-ui/react-auth-shared';

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }: any): any => children;
    return { KeyboardAwareScrollView };
});

describe('CreateAccount subScreen tested with enzyme', () => {
    afterEach(cleanup);
    const act = renderer.act;

    function baseXML(
        onEmailChanged = (): void => {
            /* do nothing */
        }
    ): JSX.Element {
        return <CreateAccount onEmailChanged={onEmailChanged} initialEmail={''} />;
    }

    it('renders correctly', () => {
        const rendered = renderer.create(baseXML()).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('should render one Instruction component', () => {
        const wrapper = shallow(baseXML());
        expect(wrapper.find('Instruction')).toHaveLength(1);
    });

    it('should update email field on input', () => {
        const container = mount(baseXML());

        (container.find('TextInput').first().props() as TextInputHTMLAttributes).onChangeText!('some@email.com');
        container.update();

        expect(container.find('TextInput').first().prop('value')).toEqual('some@email.com');
    });

    it('test async useEffect update of onEmailChanged returns an email when email is valid', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));
            (component.find('TextInput').at(0).props() as TextInputHTMLAttributes).onChangeText!('some@email.com');
            component.update();
        });

        expect(component.find('TextInput').at(0).prop('value')).toEqual('some@email.com');
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith('some@email.com');
    });

    it('test async useEffect update of onEmailChanged returns empty string for invalid email', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));
            (component.find('TextInput').at(0).props() as TextInputHTMLAttributes).onChangeText!('bademail');
            component.update();
        });

        expect(component.find('TextInput').at(0).prop('value')).toEqual('bademail');
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith('');
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
    //         component.find('TextInput').at(0).props().onChangeText("bademail");
    //         component.update();
    //     });

    //     expect(component).toMatchSnapshot();
    // });
});
