import React from 'react';
import { DemoRegistrationWorkflowScreen, ErrorContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { AccountDetailsScreen } from './AccountDetails';

const DemoAccountDetails: React.FC = (): JSX.Element => (
    <DemoRegistrationWorkflowScreen>
        <ErrorContextProvider>
            <AccountDetailsScreen />
        </ErrorContextProvider>
    </DemoRegistrationWorkflowScreen>
);

export default DemoAccountDetails;
