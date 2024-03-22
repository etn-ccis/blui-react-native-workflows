import React, { useCallback, useEffect, useState } from 'react';
import { ResetPasswordScreenBase } from '@brightlayer-ui/react-native-auth-workflow';

export const ResetPasswordScreenBaseExample: React.FC = () => {
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [enable, setEnable] = useState(false);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    useEffect(() => {
        setEnable(passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput);
    }, [passwordInput, confirmInput]);

    return (
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
                canGoNext: enable,
            }}
            PasswordProps={{
                onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
                    updateFields(passwordData);
                },
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
};
