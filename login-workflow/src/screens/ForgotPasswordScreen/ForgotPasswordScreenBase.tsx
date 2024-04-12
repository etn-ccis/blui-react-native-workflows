import React, { useCallback, useState } from 'react';
import {
    ErrorManager,
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components';
import { ForgotPasswordScreenProps } from './types';
import { HelperText, TextInput } from 'react-native-paper';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';

/**
 * Component renders a screen with forgot password for support with the application.
 *
 * @param {ForgotPasswordScreenProps} props - props of Forgot Password Screen
 *
 * @category Component
 */
export const ForgotPasswordScreenBase: React.FC<React.PropsWithChildren<ForgotPasswordScreenProps>> = (props) => {
    const [emailInput, setEmailInput] = useState(props.initialEmailValue ?? '');

    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const {
        emailLabel,
        initialEmailValue = '',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        emailValidator = (email: string): boolean | string =>
            new RegExp(EMAIL_REGEX).test(email) ? true : 'Please enter a valid email',
        SuccessScreen,
        SuccessScreenProps: successScreenProps,
        showSuccessScreen,
        errorDisplayConfig,
        emailTextInputProps,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const validateEmail = (): boolean => typeof emailValidator(initialEmailValue) !== 'string';

    const [isEmailValid, setIsEmailValid] = useState(validateEmail);
    const [emailError, setEmailError] = useState(!validateEmail() ? emailValidator(initialEmailValue) : '');
    const [shouldValidateEmail, setShouldValidateEmail] = useState(initialEmailValue !== '' ?? validateEmail);

    const handleEmailInputChange = useCallback(
        (email: string) => {
            setEmailInput(email);
            const emailValidatorResponse = emailValidator(email);
            setIsEmailValid(typeof emailValidatorResponse === 'boolean' ? emailValidatorResponse : false);
            setEmailError(typeof emailValidatorResponse === 'string' ? emailValidatorResponse : '');
        },
        [emailValidator]
    );

    const getSuccessScreen = (
        _props: SuccessScreenProps,
        _successScreen?: (props: SuccessScreenProps) => JSX.Element
    ): JSX.Element => (_successScreen ? _successScreen(_props) : <SuccessScreenBase {..._props} />);

    return (
        <>
            {showSuccessScreen ? (
                getSuccessScreen(successScreenProps ?? {}, SuccessScreen)
            ) : (
                <WorkflowCard {...cardBaseProps}>
                    <WorkflowCardHeader {...headerProps} />
                    <WorkflowCardInstructions {...instructionsProps} />
                    <WorkflowCardBody>
                        <ErrorManager {...errorDisplayConfig}>
                            <TextInput
                                label={emailLabel}
                                value={emailInput}
                                mode="flat"
                                error={shouldValidateEmail && !isEmailValid}
                                autoCapitalize="none"
                                {...emailTextInputProps}
                                onBlur={(e): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    emailTextInputProps?.onBlur && emailTextInputProps.onBlur(e);
                                    setShouldValidateEmail(true);
                                }}
                                onChangeText={(email: string): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    emailTextInputProps?.onChangeText && emailTextInputProps.onChangeText(email);
                                    handleEmailInputChange(email);
                                }}
                                onSubmitEditing={(): void => {
                                    if (emailInput.length > 0 && isEmailValid && actionsProps.canGoNext) {
                                        actionsProps.onNext?.();
                                    }
                                }}
                            />
                            <HelperText type="error" visible={shouldValidateEmail}>
                                {emailError}
                            </HelperText>
                        </ErrorManager>
                    </WorkflowCardBody>
                    <WorkflowCardActions
                        {...actionsProps}
                        canGoNext={emailInput.length > 0 && isEmailValid && actionsProps.canGoNext}
                    />
                </WorkflowCard>
            )}
        </>
    );
};
