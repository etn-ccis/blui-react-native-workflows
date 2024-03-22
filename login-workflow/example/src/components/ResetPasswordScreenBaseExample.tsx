import React from 'react';
import { ResetPasswordScreenBase } from '@brightlayer-ui/react-native-auth-workflow';

export const ResetPasswordScreenBaseExample = () => (
    <ResetPasswordScreenBase
        WorkflowCardHeaderProps={{
            title: 'Reset Password',
        }}
        WorkflowCardInstructionProps={{
            instructions:
                'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
        }}
        WorkflowCardActionsProps={{
            showPrevious: true,
            previousLabel: 'Back',
            showNext: true,
            nextLabel: 'Next',
        }}
    />
);
