import React, { useState } from 'react';
import {
    CreateAccountScreenBase,
    CreateAccountScreenProps,
    
} from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';


export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = (props) => {
    const navigation = useNavigation();

    const [emailInput, setEmailInput] = useState('');

    const { WorkflowCardHeaderProps, WorkflowCardInstructionProps, WorkflowCardActionsProps } = props;

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
        ...WorkflowCardActionsProps,
        onNext: (): void => {},
        onPrevious: (): void => {
            navigation.navigate('Home')
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
            emailLabel="Email"
            emailTextFieldProps={{ onChange: onEmailInputValueChange, mode:'outlined' }}
            emailValidator={emailValidator}
            initialValue={emailInput}
            WorkflowCardActionsProps={workflowCardActionsProps}
        />

    );
};



