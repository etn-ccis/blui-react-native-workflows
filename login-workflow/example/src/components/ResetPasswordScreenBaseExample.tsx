import React, { useCallback, useEffect, useState } from 'react';
import { ResetPasswordScreenBase, AuthContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigation } from '@react-navigation/native';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import i18nAppInstance from '../../translations/i18n';
import { useTranslation } from 'react-i18next';

export const ResetPasswordScreenBaseExample: React.FC = () => {
    const app = useApp();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [enable, setEnable] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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
        <AuthContextProvider
            language={app.language}
            actions={ProjectAuthUIActions(app)}
            i18n={i18nAppInstance}
            navigate={() => {}}
            routeConfig={{
                LOGIN: 'Home',
                FORGOT_PASSWORD: undefined,
                RESET_PASSWORD: undefined,
                REGISTER_INVITE: undefined,
                REGISTER_SELF: undefined,
                SUPPORT: undefined,
            }}
        >
            <ResetPasswordScreenBase
                WorkflowCardHeaderProps={{
                    title: 'Reset Password',
                    onIconPress: () => navigation.navigate('Home'),
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
                    totalSteps: 0,
                    onPrevious: () => navigation.navigate('Home'),
                    onNext: () => setShowSuccess(true),
                }}
                PasswordProps={{
                    onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
                        updateFields(passwordData);
                    },
                }}
                SuccessScreenProps={{
                    icon: { name: 'check-circle' },
                    messageTitle: t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE'),
                    message: t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE'),
                    WorkflowCardActionsProps: {
                        showPrevious: false,
                        fullWidthButton: true,
                        showNext: true,
                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                        onNext: (): void => {
                            navigation.navigate('Home');
                        },
                    },
                }}
                showSuccessScreen={showSuccess}
            />
        </AuthContextProvider>
    );
};
