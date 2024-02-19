import React, { useState } from 'react';
import { VerifyCodeScreenProps, VerifyCodeScreenBase } from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';

const VerifyCodeScreenBaseExample: React.FC<VerifyCodeScreenProps> = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const resendFun = (): void => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };
    return (
        <VerifyCodeScreenBase
            WorkflowCardBaseProps={{
                loading: loading,
            }}
            WorkflowCardHeaderProps={{
                title: 'Verify Code Screen Base',
            }}
            WorkflowCardInstructionProps={{
                instructions:
                    'A verification code has been sent to the email address you provided. Click the link or enter the code below to continue. This code is valid for 30 minutes.',
            }}
            verifyCodeInputLabel="Verification Code"
            resendLabel="Send Again"
            WorkflowCardActionsProps={{
                showPrevious: true,
                showNext: true,
                previousLabel: 'Back',
                nextLabel: 'Next',
                canGoNext: true,
                canGoPrevious: true,
                onPrevious: (): void => navigation.navigate('Home'),
            }}
            resendInstructions={"Didn't receive an email?"}
            onResend={resendFun}
            codeValidator={(code: string): boolean | string =>
                code?.length > 0 ? true : 'You must provide a valid code'
            }
        />
    );
};

export default VerifyCodeScreenBaseExample;
