import React, { useState } from 'react';
import { ForgotPasswordScreenBase } from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';

export const ForgotPasswordScreenBaseExample: React.FC = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [showSuccess, setShowSuccess] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <ForgotPasswordScreenBase
            WorkflowCardHeaderProps={{
                title: 'Forgot Password',
                onIconPress: () => navigation.navigate('LOGIN'),
            }}
            WorkflowCardInstructionProps={{
                instructions: 'Please enter the email address associated with the account',
            }}
            emailTextInputProps={{
                label: 'Email Address',
                onChangeText: (id) => setEmail(id),
            }}
            WorkflowCardActionsProps={{
                showPrevious: true,
                previousLabel: 'Back',
                showNext: true,
                nextLabel: 'Next',
                canGoNext: true,
                onPrevious: () => navigation.navigate('LOGIN'),
                onNext: () => setShowSuccess(true),
                totalSteps: 0,
            }}
            SuccessScreenProps={{
                icon: { name: 'check-circle' },
                messageTitle: t('bluiCommon:MESSAGES.EMAIL_SENT'),
                message: (
                    <Trans i18nKey={'bluiAuth:FORGOT_PASSWORD.LINK_SENT_ALT'} values={{ email: email }}>
                        <Text>
                            Link has been sent to <b>{email}</b>
                        </Text>
                    </Trans>
                ),
                WorkflowCardActionsProps: {
                    showPrevious: false,
                    fullWidthButton: true,
                    showNext: true,
                    nextLabel: t('bluiCommon:ACTIONS.DONE'),
                    onNext: (): void => {
                        navigation.navigate('LOGIN');
                        setShowSuccess(false);
                    },
                },
            }}
            showSuccessScreen={showSuccess}
        />
    );
};
