import React from 'react';
import { ForgotPasswordScreenBase } from '@brightlayer-ui/react-native-auth-workflow';

export const ForgotPasswordScreenBaseExample: React.FC = () => (
    <ForgotPasswordScreenBase
        WorkflowCardHeaderProps={{
            title: 'Forgot Password',
        }}
        WorkflowCardInstructionProps={{
            instructions: 'Please enter the email address associated with the account',
        }}
        emailTextInputProps={{
            label: 'Email Address',
        }}
        WorkflowCardActionsProps={{
            showPrevious: true,
            previousLabel: 'Back',
            showNext: true,
            nextLabel: 'Next',
        }}
        successScreenProps={{
            messageTitle: 'Hello',
            canDismiss: true,
            dismissButtonLabel: 'OKay',
            message: 'Test',
            WorkflowCardActionsProps: {
                showNext: true,
                fullWidthButton: true,
            },
        }}
    />
);
