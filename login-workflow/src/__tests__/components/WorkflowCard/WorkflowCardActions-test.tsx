import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import { WorkflowCardActions } from 'src/components/WorkflowCard/WorkflowCardActions';

describe('WorkflowCardActions Test', () => {
    afterEach(cleanup);
    it('WorkflowCardActions renders correctly', () => {
        render(<WorkflowCardActions nextLabel="Next" previousLabel="Previous" />).toJSON();
        expect(render).toBeTruthy();
    });
});
