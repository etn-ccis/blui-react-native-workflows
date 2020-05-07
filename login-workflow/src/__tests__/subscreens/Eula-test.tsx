/**
 * @format
 */

import React from 'react';
import 'react-native';
import { mount } from 'enzyme';
import Eula from '../../subScreens/Eula';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Eula subScreen tested with enzyme', () => {
    function baseXML(
        onEulaChanged = (): void => {
            /* do nothing */
        }
    ): JSX.Element {
        return <Eula loadEula={jest.fn()} onEulaChanged={onEulaChanged} eulaError={'eulaError'} />;
    }

    it('renders correctly', () => {
        const rendered = renderer.create(baseXML()).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('test setProps eulaAccepted update of onEulaChanged returns true for isChecked', () => {
        const mockCallback = jest.fn();
        const component = mount(baseXML(mockCallback));

        component.setProps({ eulaAccepted: true });

        expect(component.find('Checkbox').at(0).prop('isChecked')).toEqual(true);
    });
});
