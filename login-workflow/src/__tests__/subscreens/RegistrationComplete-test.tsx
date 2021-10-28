/**
 * @format
 */

import React from 'react';
import 'react-native';
import { RegistrationComplete } from '../../subScreens/RegistrationComplete';
import { cleanup } from '@testing-library/react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('RegistrationComplete subScreen tested with enzyme', () => {
    afterEach(cleanup);
    function baseXML(): JSX.Element {
        return (
            <RegistrationComplete
                firstName={'Marshall'}
                lastName={'Sutter'}
                email={'msutter@acmesteelco.com'}
                organization={'Acme Steel Co.'}
            />
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
