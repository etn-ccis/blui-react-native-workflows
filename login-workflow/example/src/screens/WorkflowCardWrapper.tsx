import React from 'react';
import SmokeTestExample from './SmokeTestExample';
import { ErrorContextProvider } from '@brightlayer-ui/react-native-auth-workflow';

export const WorkflowCardWrapper: React.FC = () => (
    <ErrorContextProvider>
        <SmokeTestExample />
    </ErrorContextProvider>
);
