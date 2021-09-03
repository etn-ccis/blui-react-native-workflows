/**
 * @format
 */

import React from 'react';
import 'react-native';
import { CompleteSplashScreen } from '../../subScreens/CompleteSplash';
import { cleanup } from '@testing-library/react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('CompleteSplash subScreen tested with enzyme', () => {
    afterEach(cleanup);
    function baseXML(): JSX.Element {
        return <CompleteSplashScreen boldTitle={'Some bold title'} bodyText={'Some body text'} />;
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
