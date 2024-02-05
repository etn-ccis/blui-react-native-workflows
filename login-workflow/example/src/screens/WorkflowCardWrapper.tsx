import React from 'react';
import WorkFlowCardExample from './WorkFlowCardExample';
import { ErrorContextProvider } from '@brightlayer-ui/react-native-auth-workflow';

export const WorkflowCardWrapper: React.FC = () => (
    <ErrorContextProvider>
        <WorkFlowCardExample />
    </ErrorContextProvider>
);
