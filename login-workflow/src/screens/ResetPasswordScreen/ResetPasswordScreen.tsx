import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ResetPasswordScreenProps } from './types';
import { useTranslation } from 'react-i18next';
import { useAuthContext, useErrorManager } from '../../contexts';
import { defaultPasswordRequirements } from '../../constants';
import { ResetPasswordScreenBase } from './ResetPasswordScreenBase';

/**
 * Component that renders a ResetPassword screen that allows a user to reset their password and shows a success message upon a successful password reset.
 *
 * @param {ResetPasswordScreenProps} props - props of ResetPasswordScreen
 *
 * @category Component
 */
export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = (props) => {
    const { t } = useTranslation();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const {
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardBodyProps,
        WorkflowCardActionsProps,
        PasswordProps,
        SuccessScreen,
        SuccessScreenProps,
        accountParams,
    } = props;

    const [passwordInput, setPasswordInput] = useState(PasswordProps?.initialNewPasswordValue ?? '');
    const [confirmInput, setConfirmInput] = useState(PasswordProps?.initialConfirmPasswordValue ?? '');
    const [hasVerifyCodeError, setHasVerifyCodeError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    const { actions, navigate, routeConfig } = useAuthContext();
    const passwordReqs = PasswordProps?.passwordRequirements ?? defaultPasswordRequirements(t);

    // eslint-disable-next-line
    const code = accountParams?.code!;
    const email = accountParams?.email;

    const verifyResetCode = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions.verifyResetCode(code, email);
        } catch (_error) {
            setHasVerifyCodeError(true);
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnNext = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions.setPassword(code, passwordInput, email);
            if (props.showSuccessScreen === false) {
                navigate(routeConfig.LOGIN as string);
            } else {
                setShowSuccessScreen(true);
            }
        } catch (_error) {
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [actions, code, passwordInput, email, triggerError, props.showSuccessScreen, navigate, routeConfig]);

    const areValidMatchingPasswords = useCallback((): boolean => {
        if (passwordReqs?.length === 0) {
            return confirmInput === passwordInput;
        }
        for (let i = 0; i < passwordReqs.length; i++) {
            if (!new RegExp(passwordReqs[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordReqs, passwordInput, confirmInput]);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    useEffect(() => {
        // eslint-disable-next-line
        verifyResetCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clearScreenData = (): void => {
        setPasswordInput('');
        setConfirmInput('');
    };

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiCommon:FORMS.RESET_PASSWORD'),
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
        showNext: true,
        showPrevious: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoNext: passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords(),
        totalSteps: 0,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void handleOnNext();
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            clearScreenData();
            navigate(routeConfig.LOGIN as string);
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    const passwordProps = {
        newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
        confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
        passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
        passwordRequirements: passwordReqs,
        passwordRef,
        confirmRef,
        ...PasswordProps,
        initialNewPasswordValue: passwordInput,
        initialConfirmPasswordValue: confirmInput,
        onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
            updateFields(passwordData);
            PasswordProps?.onPasswordChange?.(passwordData);
        },
        onSubmit: (): void => {
            if (areValidMatchingPasswords()) {
                void handleOnNext();
                WorkflowCardActionsProps?.onNext?.();
                PasswordProps?.onSubmit?.();
            }
        },
    };

    return (
        <ResetPasswordScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardBodyProps={workflowCardBodyProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            PasswordProps={passwordProps}
            showSuccessScreen={showSuccessScreen}
            SuccessScreen={SuccessScreen}
            SuccessScreenProps={{
                EmptyStateProps: {
                    icon: { name: 'check-circle' },
                    title: t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE'),
                    description: t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE'),
                },
                WorkflowCardActionsProps: {
                    showPrevious: false,
                    fullWidthButton: true,
                    showNext: true,
                    nextLabel: t('bluiCommon:ACTIONS.DONE'),
                    onNext: (): void => {
                        navigate(-1);
                        setShowSuccessScreen(false);
                        clearScreenData();
                    },
                },
                ...SuccessScreenProps,
            }}
            errorDisplayConfig={{
                ...errorDisplayConfig,
                onClose: hasVerifyCodeError
                    ? (): void => {
                          navigate(routeConfig.LOGIN as string);
                          // eslint-disable-next-line no-unused-expressions
                          errorDisplayConfig.onClose;
                      }
                    : errorDisplayConfig.onClose,
            }}
        />
    );
};
