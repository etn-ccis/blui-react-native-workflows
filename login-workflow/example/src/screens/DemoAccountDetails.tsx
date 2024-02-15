import React, { useCallback, useState } from 'react';
import {
    AccountDetailsScreenBase,
    AccountDetailsScreenProps,
    useRegistrationWorkflowContext,
    DemoRegistrationWorkflowScreen,
} from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const navigation = useNavigation();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens } = regWorkflow;

    const [firstName, setFirstName] = useState('firstName');
    const [lastName, setLastName] = useState('lastName');

    const onNext = useCallback(() => {
        void nextScreen({
            screenId: 'AccountDetails',
            values: { firstName: firstName, lastName: lastName },
        });
        navigation.navigate('Home');
    }, [firstName, lastName, nextScreen, navigation]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'AccountDetails',
            values: { firstName: firstName, lastName: lastName },
        });
    }, [firstName, lastName, previousScreen]);

    const {
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        firstNameLabel = 'First Name',
        lastNameLabel = 'Last Name',
        firstNameValidator = (name: string): boolean | string => {
            if (name?.length > 5) {
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
        <DemoRegistrationWorkflowScreen>
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
            />
        </DemoRegistrationWorkflowScreen>
    );
};
