/**
 * @format
 */

import React from 'react';

import { cleanup } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { WorkflowCardInstructions } from 'src/components/WorkflowCard';

describe('WorkflowCardInstructions Test', () => {
    afterEach(cleanup);
    it('WorkflowCardInstructions renders correctly', () => {
        const rendered = renderer.create(<WorkflowCardInstructions instructions={'Test Instructions'} />).toJSON();
        expect(rendered).toBeTruthy();
    });
});
