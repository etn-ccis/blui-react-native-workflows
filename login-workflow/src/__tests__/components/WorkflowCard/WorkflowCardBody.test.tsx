/**
 * @format
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react-native';
import { WorkflowCardBody } from 'src/components/WorkflowCard/WorkflowCardBody';
import { Text } from 'react-native-paper';

describe('WorkflowCardBody Test', () => {
    afterEach(cleanup);
    it('WorkflowCardBody renders correctly', () => {
        render(
            <WorkflowCardBody>
                <Text>This is workflow card body content.</Text>
            </WorkflowCardBody>
        ).toJSON();
        expect(render).toBeTruthy();
        expect(screen.getByText('This is workflow card body content.')).toBeTruthy();
    });
});
