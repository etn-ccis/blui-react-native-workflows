import React, { useCallback, useState } from 'react';
import { CreateAccountScreenProps } from './types';
import { CreateAccountScreenBase } from './CreateAccountScreenBase';
import { useRegistrationWorkflowContext, useRegistrationContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX } from '../../constants';

/**
 * Component that manages the display of error messages. Can be configured to display a dialog, a message box, or neither.
 *
 * @param {CreateAccountScreenProps} props - Props of Error Manager
 *
 * @category Component
 */


export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = (props) => {
    const { t } = useTranslation();
    const { actions } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, totalScreens, currentScreen } = regWorkflow;
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
            setIsLoading(false);
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
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: t('bluiRegistration:SELF_REGISTRATION.INSTRUCTIONS'),
        ...WorkflowCardInstructionProps,
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

    const onEmailInputValueChange = (e: any): void => {
        setEmailInputValue(e);
    };

    return (
        <CreateAccountScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            emailLabel={emailLabel}
            initialValue={
                screenData.CreateAccount.emailAddress.length > 0 ? screenData.CreateAccount.emailAddress : initialValue
            }
            emailTextFieldProps={{ ...emailTextFieldProps, onChangeText: onEmailInputValueChange }}
            emailValidator={emailValidator}
            WorkflowCardActionsProps={workflowCardActionsProps}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
