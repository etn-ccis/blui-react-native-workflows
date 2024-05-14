import React from 'react';
import { cleanup, render, screen } from '@testing-library/react-native';
import { WorkflowCardInstructions } from 'src/components/WorkflowCard/WorkflowCardInstructions';

describe('WorkflowCardInstructions Test', () => {
    afterEach(cleanup);
    it('WorkflowCardInstructions renders correctly', () => {
        render(<WorkflowCardInstructions instructions={'Test Instructions'} />).toJSON();
        expect(render).toBeTruthy();
        expect(screen.getByText('Test Instructions')).toBeTruthy();
    });
});
