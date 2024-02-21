import React, { useCallback, useState } from 'react';
import {
    CreateAccountScreenBase,
    CreateAccountScreenProps,
    useRegistrationWorkflowContext,
    useErrorManager,
    DemoRegistrationWorkflowScreen,
    ErrorContextProvider,
} from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';

const submit = (): void => {
    throw new Error('My Custom Error');
};
const DemoCreateAccountScreen: React.FC<CreateAccountScreenProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const navigation = useNavigation();
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        onClose: (): void => {
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens } = regWorkflow;

    const [emailInput, setEmailInput] = useState(screenData?.CreateAccount?.emailAddress || '');

    const { WorkflowCardHeaderProps, WorkflowCardInstructionProps, WorkflowCardActionsProps } = props;

    const onNext = useCallback(() => {
        try {
            void nextScreen({
                screenId: 'AccountDetails',
                values: { emailAddress: emailInput },
            });
            navigation.navigate('Home');
            submit();
        } catch (_error) {
            triggerError(_error as Error);
        }
    }, [emailInput, nextScreen, triggerError, navigation]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'CreateAccount',
            values: { emailAddress: emailInput },
        });
    }, [emailInput, previousScreen]);

    const workflowCardHeaderProps = {
        title: 'Create Account',
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: 'Please enter Valid Email',
        ...WorkflowCardInstructionProps,
    };

    const workflowCardActionsProps = {
        canGoNext: true,
        showNext: true,
        showPrevious: true,
        nextLabel: 'Next',
        previousLabel: 'Previous',
        totalSteps: totalScreens,
        currentStep: currentScreen,
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

    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const emailValidator = (emailinput: string): boolean | string => {
        if (!EMAIL_REGEX.test(emailinput)) {
            return 'enter a valid email';
        }
        return true;
    };
    const onEmailInputValueChange = (e: any): void => {
        setEmailInput(e);
    };

    return (
        <CreateAccountScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            emailLabel="Email Address"
            emailTextFieldProps={{ onChange: onEmailInputValueChange }}
            emailValidator={emailValidator}
            initialValue={emailInput}
            WorkflowCardActionsProps={workflowCardActionsProps}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};

export const CreateAccountScreen: React.FC = (): JSX.Element => (
    <DemoRegistrationWorkflowScreen>
        <ErrorContextProvider>
            <DemoCreateAccountScreen />
        </ErrorContextProvider>
    </DemoRegistrationWorkflowScreen>
);
