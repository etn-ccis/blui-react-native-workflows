import React, { useCallback, useState } from 'react';
import {
    AccountDetailsScreenBase,
    AccountDetailsScreenProps,
    useRegistrationWorkflowContext,
    useErrorManager,
} from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';

const submit = (): void => {
    throw new Error('My Custom Error');
};

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = (props) => {
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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const onNext = useCallback((): void => {
        try {
            void nextScreen({
                screenId: 'AccountDetails',
                values: { firstName, lastName },
            });
            navigation.navigate('Home');
            submit();
        } catch (_error) {
            triggerError(_error as Error);
        }
    }, [firstName, lastName, triggerError, navigation, nextScreen]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'AccountDetails',
            values: { firstName, lastName },
        });
    }, [firstName, lastName, previousScreen]);

    const {
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        firstNameLabel = 'First Name',
        lastNameLabel = 'Last Name',
        firstNameValidator = (name: string): boolean | string => {
            if (name?.length > 0) {
                return true;
            }
            return 'first name error';
        },
        lastNameValidator = (name: string): boolean | string => {
            if (name?.length > 0) {
                return true;
            }
            return 'last name error';
        },
        firstNameTextInputProps,
        lastNameTextInputProps,
        initialFirstName = screenData.AccountDetails.firstName,
        initialLastName = screenData.AccountDetails.lastName,
    } = props;

    const workflowCardHeaderProps = {
        title: 'Account Details',
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: 'Please enter your first and last name',
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

    const onFirstNameInputChange = (text: any): void => {
        setFirstName(text);
    };
    const onLastNameInputChange = (text: any): void => {
        setLastName(text);
    };

    return (
        <AccountDetailsScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            initialFirstName={firstName.length > 0 ? firstName : initialFirstName}
            initialLastName={lastName.length > 0 ? lastName : initialLastName}
            firstNameLabel={firstNameLabel}
            firstNameTextInputProps={{ ...firstNameTextInputProps, onChangeText: onFirstNameInputChange }}
            firstNameValidator={firstNameValidator}
            lastNameLabel={lastNameLabel}
            lastNameTextInputProps={{ ...lastNameTextInputProps, onChangeText: onLastNameInputChange }}
            lastNameValidator={lastNameValidator}
            WorkflowCardActionsProps={workflowCardActionsProps}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
