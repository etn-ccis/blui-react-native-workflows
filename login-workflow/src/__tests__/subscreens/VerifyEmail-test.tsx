/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @format
 */

import React from 'react';
import 'react-native';
import { shallow, mount } from 'enzyme';
import { VerifyEmail } from '../../subScreens/VerifyEmail';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { TextInputHTMLAttributes } from '@brightlayer-ui/react-auth-shared';

describe('VerifyEmail subScreen tested with enzyme', () => {
    const act = renderer.act;

    function baseXML(
        onVerifyCodeChanged = (): void => {
            /* do nothing */
        },
        onResendVerificationEmail = (): void => {
            /* do nothing */
        }
    ): JSX.Element {
        return (
            <VerifyEmail
                onVerifyCodeChanged={onVerifyCodeChanged}
                onResendVerificationEmail={onResendVerificationEmail}
            />
        );
    }

    it('renders correctly', () => {
        const rendered = renderer.create(baseXML()).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('should render one Instruction component', () => {
        const wrapper = shallow(baseXML());
        expect(wrapper.find('Instruction')).toHaveLength(1);
    });

    it('should render one TextInput components', () => {
        const wrapper = shallow(baseXML());
        expect(wrapper.find('TextInput')).toHaveLength(1);
    });

    it('test async useEffect update of onVerifyCodeChanged returns code for entry', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));

            (component.find('TextInput').at(0).props() as TextInputHTMLAttributes).onChangeText!('123456');
            component.update();
        });

        expect(component.find('TextInput').at(0).prop('value')).toEqual('123456');
        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenCalledWith('123456');
        expect(mockCallback.mock.calls[1][0]).toBe('123456'); // The final call is the final state from the useEffect hook
    });

    // it('good entry snapshot', async () => {
    //     const component = mount(baseXML());

    //     await act(async () => {
    //         await Promise.resolve(component);
    //         await new Promise((resolve) => setImmediate(resolve));
    //         component.find('TextInput').at(0).props().onChangeText('123456');
    //         component.update();
    //     });

    //     expect(component).toMatchSnapshot();
    // });

    // it('bad entry snapshot', async () => {
    //     const component = mount(baseXML());

    //     await act(async () => {
    //         await Promise.resolve(component);
    //         await new Promise((resolve) => setImmediate(resolve));
    //         component.find('TextInput').at(0).props().onChangeText('');
    //         component.update();
    //     });

    //     expect(component).toMatchSnapshot();
    // });
});
