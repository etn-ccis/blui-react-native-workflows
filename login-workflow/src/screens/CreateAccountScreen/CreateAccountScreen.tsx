import React, { useCallback, useState } from 'react';
import { CreateAccountScreenProps } from './types';
import { CreateAccountScreenBase } from './CreateAccountScreenBase';
import { useRegistrationWorkflowContext, useRegistrationContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX, timeOutDelay } from '../../constants';

/**
 * Component that renders a screen for the user to enter their email address to start the
 * account creation process.
 *
 * @param {CreateAccountScreenProps} props - Props of Create Account Screen component
 *
 * @category Component
 */
export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = (props) => {
    const { t } = useTranslation();
    const { actions, navigate } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, resetScreenData, screenData, totalScreens, currentScreen } = regWorkflow;
    const [emailInputValue, setEmailInputValue] = useState(screenData.CreateAccount.emailAddress);
    const [isLoading, setIsLoading] = useState(false);
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const onNext = useCallback(async () => {
        try {
            setIsLoading(true);
            await actions?.requestRegistrationCode?.(emailInputValue);
            void nextScreen({
                screenId: 'CreateAccount',
                values: { emailAddress: emailInputValue },
            });
        } catch (_error) {
            triggerError(_error as Error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, timeOutDelay);
        }
    }, [actions, emailInputValue, nextScreen, triggerError]);

    const onPrevious = (): void => {
        previousScreen({
            screenId: 'CreateAccount',
            values: { emailAddress: emailInputValue },
        });
    };

    const {
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardBodyProps,
        WorkflowCardActionsProps,
        emailLabel = t('bluiCommon:LABELS.EMAIL'),
        initialValue = screenData.CreateAccount.emailAddress,
        emailValidator = (email: string): boolean | string => {
            if (!EMAIL_REGEX.test(email)) {
                return t('bluiCommon:MESSAGES.EMAIL_ENTRY_ERROR');
            }
            return true;
        },
        emailTextFieldProps,
    } = props;

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.CREATE_ACCOUNT'),
        onIconPress: (): void => {
            navigate(-1);
            resetScreenData();
        },
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: t('bluiRegistration:SELF_REGISTRATION.INSTRUCTIONS'),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardBodyProps = {
        WorkflowCardInstructionProps: workflowCardInstructionProps,
        ...WorkflowCardBodyProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        showPrevious: true,
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoPrevious: true,
        canGoNext: true,
        currentStep: currentScreen,
        totalSteps: totalScreens,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void onNext();
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            void onPrevious();
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    const emailInputProps = {
        ...emailTextFieldProps,
        onChangeText: (email: string): void => {
            // eslint-disable-next-line
            emailTextFieldProps?.onChangeText && emailTextFieldProps?.onChangeText(email);
            setEmailInputValue(email);
        },
    };

    return (
        <CreateAccountScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardBodyProps={workflowCardBodyProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            emailLabel={emailLabel}
            initialValue={
                screenData.CreateAccount.emailAddress.length > 0 ? screenData.CreateAccount.emailAddress : initialValue
            }
            emailTextFieldProps={emailInputProps}
            emailValidator={emailValidator}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
