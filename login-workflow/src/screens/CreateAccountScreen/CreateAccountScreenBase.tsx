import React, { useCallback, useEffect } from 'react';
import { CreateAccountScreenProps } from './types';
import {
    ErrorManager,
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
} from '../../components';
import { HelperText, TextInput } from 'react-native-paper';

/**
 * Base Component that renders a screen for the user to enter their email address to start the
 * account creation process.
 *
 * @param {CreateAccountScreenProps} props - Basic props of Create Account Screen Base component
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
    const cardBodyProps = props.WorkflowCardBodyProps || {};
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
            <WorkflowCardBody {...cardBodyProps}>
                <ErrorManager {...errorDisplayConfig}>
                    <TextInput
                        ref={inputRef}
                        testID="blui-create-account-email-text-input"
                        mode="flat"
                        keyboardType="email-address"
                        label={emailLabel}
                        value={emailInput}
                        error={shouldValidateEmail && !isEmailValid}
                        autoCapitalize="none"
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
                        onSubmitEditing={(): void => {
                            if (emailInput.length > 0 && isEmailValid && actionsProps.canGoNext)
                                actionsProps.onNext?.();
                        }}
                        returnKeyType="next"
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
