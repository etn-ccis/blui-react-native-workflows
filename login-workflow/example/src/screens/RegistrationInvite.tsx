import React from 'react';
import { RegistrationWorkflow } from '@brightlayer-ui/react-native-auth-workflow';
export const RegistrationInvite: React.FC = () => (
    <RegistrationWorkflow isInviteRegistration initialRegistrationParams={{ code: '123', email: 'aa@aa.aa' }} />
);
