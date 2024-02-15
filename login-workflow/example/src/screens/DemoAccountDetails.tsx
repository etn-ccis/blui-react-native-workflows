import React from 'react';
import { DemoRegistrationWorkflowScreen } from '@brightlayer-ui/react-native-auth-workflow';
import { AccountDetailsScreen } from './AccountDetails';

const DemoAccountDetails: React.FC = (): JSX.Element => (
    <DemoRegistrationWorkflowScreen>
        <AccountDetailsScreen />
    </DemoRegistrationWorkflowScreen>
);

export default DemoAccountDetails;
