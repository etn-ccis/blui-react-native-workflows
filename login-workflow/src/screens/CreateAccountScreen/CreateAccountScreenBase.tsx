import React, { useCallback, useEffect } from 'react';
import { CreateAccountScreenProps } from './types';
import {
    ErrorManager,
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components';
import { HelperText, TextInput } from 'react-native-paper';

/**
 * Component that renders a screen for the user to enter their email address to start the
 * account creation process.
 *
 * @param emailLabel label for the email field
 * @param initialValue initial value for the email text field
 * @param emailValidator function used to test the input for valid formatting
 * @param emailTextFieldProps props to pass to the email text field
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 *
 * @category Component
 */

export const CreateAccountScreenBase: React.FC<CreateAccountScreenProps & { inputRef?: any }> = (props) => {
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        emailValidator = (email: string): boolean | string => true,
        emailLabel,
        initialValue,
        emailTextFieldProps,
        inputRef,
        errorDisplayConfig,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [emailInput, setEmailInput] = React.useState(initialValue ? initialValue : '');
    const [isEmailValid, setIsEmailValid] = React.useState(emailValidator(initialValue ?? '') ?? false);
    const [emailError, setEmailError] = React.useState('');
    const [shouldValidateEmail, setShouldValidateEmail] = React.useState(false);

    const handleEmailInputChange = useCallback(
        (email: string) => {
            setEmailInput(email);
            const emailValidatorResponse = emailValidator(email);

            setIsEmailValid(typeof emailValidatorResponse === 'boolean' ? emailValidatorResponse : false);
            setEmailError(typeof emailValidatorResponse === 'string' ? emailValidatorResponse : '');
        },
        [emailValidator]
    );
    useEffect(() => {
        if (emailInput.length > 0) {
            setShouldValidateEmail(true);
            handleEmailInputChange(emailInput);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <TextInput
                        ref={inputRef}
                        testID="email-textinput"
                        mode="flat"
                        keyboardType="email-address"
                        label={emailLabel}
                        value={emailInput}
                        error={shouldValidateEmail && !isEmailValid}
                        {...emailTextFieldProps}
                        onChangeText={(text): void => {
                            // eslint-disable-next-line no-unused-expressions
                            emailTextFieldProps?.onChangeText && emailTextFieldProps.onChangeText(text);
                            handleEmailInputChange(text);
                        }}
                        onBlur={(e): void => {
                            // eslint-disable-next-line no-unused-expressions
                            emailTextFieldProps?.onBlur && emailTextFieldProps.onBlur(e);
                            setShouldValidateEmail(true);
                        }}
                    />
                    <HelperText type="error">{emailError}</HelperText>
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                canGoNext={(emailInput.length > 0 && isEmailValid && actionsProps.canGoNext) as any}
            ></WorkflowCardActions>
        </WorkflowCard>
    );
};
