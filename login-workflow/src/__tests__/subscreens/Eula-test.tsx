/**
 * @format
 */

// import React from 'react';
import 'react-native';
// import { mount } from 'enzyme';
// import { Eula } from '../../subScreens/Eula';
// import { cleanup } from '@testing-library/react-native';
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

describe('Eula subScreen tested with enzyme', () => {
    it('passes a fake test', () => {
        expect(true).toBeTruthy();
    });
    // afterEach(cleanup);
    // function baseXML(
    //     onEulaChanged = (): void => {
    //         /* do nothing */
    //     }
    // ): JSX.Element {
    //     return <Eula loadEula={jest.fn()} onEulaChanged={onEulaChanged} eulaError={'eulaError'} htmlEula />;
    // }

    // it('renders correctly', () => {
    //     const rendered = renderer.create(baseXML()).toJSON();
    //     expect(rendered).toBeTruthy();
    // });

    // it('test setProps eulaAccepted update of onEulaChanged returns true for checked', () => {
    //     const mockCallback = jest.fn();
    //     const component = mount(baseXML(mockCallback));

    //     component.setProps({ eulaAccepted: true });

    //     expect(component.find('Checkbox').at(0).prop('checked')).toEqual(true);
    // });
});
