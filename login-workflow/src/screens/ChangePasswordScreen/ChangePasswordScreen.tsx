import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultPasswordRequirements } from '../../constants';
import { ChangePasswordScreenProps } from './types';
import { useAuthContext, useErrorManager } from '../../contexts';
import { ChangePasswordScreenBase } from './ChangePasswordScreenBase';

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = (props) => {
    const { t } = useTranslation();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const {
        currentPasswordLabel = t('bluiCommon:LABELS.CURRENT_PASSWORD'),
        PasswordProps,
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardBodyProps,
        WorkflowCardActionsProps,
        currentPasswordTextInputProps,
        onFinish,
        slots = {},
        slotProps = {},
    } = props;

    const [currentInput, setCurrentInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const { actions, navigate } = useAuthContext();
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const passwordRequirements = defaultPasswordRequirements(t);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    const areValidMatchingPasswords = useCallback((): boolean => {
        if (PasswordProps?.passwordRequirements?.length === 0) {
            return confirmInput === passwordInput;
        }
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [PasswordProps?.passwordRequirements?.length, passwordRequirements, passwordInput, confirmInput]);

    const checkPasswords =
        currentInput !== '' && passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords();

    const changePasswordSubmit = useCallback(async () => {
        if (checkPasswords) {
            try {
                setIsLoading(true);
                await actions.changePassword(currentInput, passwordInput);
                if (props.showSuccessScreen === false) {
                    onFinish?.();
                } else {
                    setShowSuccessScreen(true);
                }
            } catch (_error) {
                triggerError(_error as Error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [
        checkPasswords,
        currentInput,
        passwordInput,
        actions,
        setIsLoading,
        onFinish,
        props.showSuccessScreen,
        triggerError,
    ]);

    const clearScreenData = (): void => {
        setCurrentInput('');
        setConfirmInput('');
        setPasswordInput('');
    };

    const passwordProps = {
        newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
        confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
        passwordRef,
        confirmRef,
        initialNewPasswordValue: passwordInput,
        initialConfirmPasswordValue: confirmInput,
        passwordRequirements,
        passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
        ...PasswordProps,
        onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
            updateFields(passwordData);
            PasswordProps?.onPasswordChange?.(passwordData);
        },
        onSubmit: async (): Promise<void> => {
            await changePasswordSubmit();
            PasswordProps?.onSubmit?.();
        },
    };

    const onNext = async (): Promise<void> => {
        await changePasswordSubmit();
    };

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiAuth:CHANGE_PASSWORD.PASSWORD'),
        onIconPress: (): void => {
            clearScreenData();
            navigate(-1);
        },
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO'),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardBodyProps = {
        WorkflowCardInstructionProps: workflowCardInstructionProps,
        ...WorkflowCardBodyProps,
    };

    const workflowCardActionsProps = {
        showPrevious: false,
        fullWidthButton: true,
        showNext: true,
        nextLabel: t('bluiCommon:ACTIONS.SUBMIT'),
        canGoNext: passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords(),
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void onNext();
            WorkflowCardActionsProps?.onNext?.();
        },
    };

    return (
        <ChangePasswordScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardBodyProps={workflowCardBodyProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            currentPasswordLabel={currentPasswordLabel}
            currentPasswordChange={(currentPwd): void => {
                setCurrentInput(currentPwd);
                props?.currentPasswordChange?.(currentPwd);
            }}
            enableButton={checkPasswords}
            PasswordProps={passwordProps}
            currentPasswordTextInputProps={{ ...currentPasswordTextInputProps, value: currentInput }}
            slots={slots}
            slotProps={{
                SuccessScreen: {
                    EmptyStateProps: {
                        icon: { family: 'material', name: 'check-circle' },
                        title: t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE'),
                        description: t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE'),
                    },
                    onDismiss: (): void => {
                        onFinish?.();
                    },
                    WorkflowCardActionsProps: {
                        showPrevious: false,
                        fullWidthButton: true,
                        showNext: true,
                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                        onNext: (): void => {
                            onFinish?.();
                            setShowSuccessScreen(false);
                            clearScreenData();
                        },
                    },
                    ...slotProps.SuccessScreen,
                },
            }}
            showSuccessScreen={showSuccessScreen}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
