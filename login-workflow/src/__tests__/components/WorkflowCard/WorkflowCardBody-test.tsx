/**
 * @format
 */

import React from 'react';

import { cleanup } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { WorkflowCardBody } from 'src/components/WorkflowCard';
import { Text } from 'react-native-paper';

describe('WorkflowCardBody Test', () => {
    afterEach(cleanup);
    it('WorkflowCardBody renders correctly', () => {
        const rendered = renderer
            .create(
                <WorkflowCardBody>
                    <Text>This is workflow card body content.</Text>
                </WorkflowCardBody>
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });
});
