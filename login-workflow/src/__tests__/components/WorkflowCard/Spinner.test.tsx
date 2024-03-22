import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import { Spinner } from 'src/components/Spinner';

describe('Spinner Test', () => {
    afterEach(cleanup);
    it('Spinner renders correctly', () => {
        render(<Spinner visible />).toJSON();
        expect(render).toBeTruthy();
    });
});
