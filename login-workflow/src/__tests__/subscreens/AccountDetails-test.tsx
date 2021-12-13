/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @format
 */

import React from 'react';
import 'react-native';
import { shallow, mount } from 'enzyme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { AccountDetails, AccountDetailInformation } from '../../subScreens/AccountDetails';
import { TextInputHTMLAttributes } from '@brightlayer-ui/react-auth-shared';

jest.mock('@brightlayer-ui/react-auth-shared', () => ({
    ...jest.requireActual('@brightlayer-ui/react-auth-shared'),
    useAuthUIActions: (): any => ({ dispatch: jest.fn(() => true) }),
    useInjectedUIContext: jest.fn().mockReturnValue({
        registrationConfig: {
            firstName: {
                maxLength: 30,
            },
            lastName: {
                maxLength: 30,
            },
        },
    }),
}));

describe('AccountDetails subScreen tested with enzyme', () => {
    const act = renderer.act;

    function baseXML(
        onDetailsChanged = (): void => {
            /* do nothing */
        }
    ): JSX.Element {
        return <AccountDetails onDetailsChanged={onDetailsChanged} />;
    }

    it('renders correctly', () => {
        const rendered = renderer.create(baseXML()).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('should render one Instruction component', () => {
        const wrapper = shallow(baseXML());
        expect(wrapper.find('Instruction')).toHaveLength(1);
    });

    it('should render two TextInput components', () => {
        const wrapper = shallow(baseXML());
        expect(wrapper.find('TextInput')).toHaveLength(2);
    });

    it('test async useEffect update of onDetailsChanged returns AccountDetailInformation for good first and last name', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));

            // TextInput's are high level and wrap paper's component of the same name
            // There are 4 internal TextInputs per our TextInput
            // That's why position 0 and 4 are used to check the first 2 TextInputs
            (component.find('TextInput').at(0).props() as TextInputHTMLAttributes).onChangeText!('First Name');
            (component.find('TextInput').at(4).props() as TextInputHTMLAttributes).onChangeText!('Last Name');
            component.update();
        });

        const accDetails: AccountDetailInformation = { firstName: 'First Name', lastName: 'Last Name' };

        expect(component.find('TextInput').at(0).prop('value')).toEqual('First Name');
        expect(component.find('TextInput').at(4).prop('value')).toEqual('Last Name');
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenCalledWith(accDetails);
        expect(mockCallback.mock.calls[2][0]).toStrictEqual(accDetails); // The final call is the final state from the useEffect hook
    });

    it('test async useEffect update of onDetailsChanged returns null for empty first name but good last name', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));
            (component.find('TextInput').at(0).props() as TextInputHTMLAttributes).onChangeText!('');
            (component.find('TextInput').at(4).props() as TextInputHTMLAttributes).onChangeText!('Last Name');
            component.update();
        });

        expect(component.find('TextInput').at(0).prop('value')).toEqual('');
        expect(component.find('TextInput').at(4).prop('value')).toEqual('Last Name');
        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenCalledWith(null);
        expect(mockCallback.mock.calls[1][0]).toStrictEqual(null); // The final call is the final state from the useEffect hook
    });

    it('test async useEffect update of onDetailsChanged returns null for good first name but empty last name', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));
            (component.find('TextInput').at(0).props() as TextInputHTMLAttributes).onChangeText!('First Name');
            (component.find('TextInput').at(4).props() as TextInputHTMLAttributes).onChangeText!('');
            component.update();
        });

        expect(component.find('TextInput').at(0).prop('value')).toEqual('First Name');
        expect(component.find('TextInput').at(4).prop('value')).toEqual('');
        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenCalledWith(null);
        expect(mockCallback.mock.calls[1][0]).toStrictEqual(null); // The final call is the final state from the useEffect hook
    });

    it('test async useEffect update of onDetailsChanged returns null for empty first name and last name', async () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        await act(async () => {
            await Promise.resolve(component);
            await new Promise((resolve) => setImmediate(resolve));
            (component.find('TextInput').at(0).props() as TextInputHTMLAttributes).onChangeText!('');
            (component.find('TextInput').at(4).props() as TextInputHTMLAttributes).onChangeText!('');
            component.update();
        });

        expect(component.find('TextInput').at(0).prop('value')).toEqual('');
        expect(component.find('TextInput').at(4).prop('value')).toEqual('');
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith(null);
        expect(mockCallback.mock.calls[0][0]).toStrictEqual(null); // The final call is the final state from the useEffect hook
    });

    // it('good entry snapshot', async () => {
    //     const component = mount(baseXML());

    //     await act(async () => {
    //         await Promise.resolve(component);
    //         await new Promise((resolve) => setImmediate(resolve));
    //         component.find('TextInput').at(0).props().onChangeText('First Name');
    //         component.find('TextInput').at(4).props().onChangeText('Last Name');
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
    //         component.find('TextInput').at(4).props().onChangeText('');
    //         component.update();
    //     });

    //     expect(component).toMatchSnapshot();
    // });
});
