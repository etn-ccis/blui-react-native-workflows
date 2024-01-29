import React from 'react';
import { cleanup, render, screen } from '@testing-library/react-native';
import { WorkflowCard, WorkflowCardBody } from 'src/components';
import { Text } from 'react-native-paper';

describe('WorkflowCard Test', () => {
    afterEach(cleanup);
    it('WorkflowCard renders correctly', () => {
        render(
            <WorkflowCard>
                <WorkflowCardBody>
                    <Text>This is workflow card body content.</Text>
                </WorkflowCardBody>
            </WorkflowCard>
        ).toJSON();
        expect(render).toBeTruthy();
        expect(screen.getByText('This is workflow card body content.')).toBeTruthy();
    });
});
