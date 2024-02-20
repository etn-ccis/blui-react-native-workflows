import React from 'react';
import { cleanup, render, screen } from '@testing-library/react-native';
import { WorkflowCardFinishState } from 'src/components/WorkflowCard/WorkflowCardFinishState';
import '@testing-library/react-native/extend-expect';

describe('WorkflowCardFinishState Test', () => {
    afterEach(cleanup);
    it('WorkflowCardFinishState renders correctly', () => {
        render(<WorkflowCardFinishState title="Finish" />).toJSON();
        expect(render).toBeTruthy();
        expect(screen.getByText('Finish')).toBeOnTheScreen();
    });
});
