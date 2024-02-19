import React, { useCallback, useEffect } from 'react';
import { VerifyCodeScreenProps } from './types';
import {
    ErrorManager,
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components';
import { HelperText, Text, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

/**
 * Component that renders a screen that prompts a user to enter the confirmation code
 * that was sent to the email address that they used to register.
 *
 * @param codeValidator function that validates the code text field
 * @param onResend function that is called when the resend link/button is clicked
 * @param resendInstructions text to display ahead of the resend link/button
 * @param resendLabel text to display for the resend link/button
 * @param initialValue the initial value for the code text field
 * @param verifyCodeInputLabel the label for the code text field
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 * @param verifyCodeTextFieldProps props to pass to the verify code field.
 *
 * @category Component
 */
export const VerifyCodeScreenBase: React.FC<React.PropsWithChildren<VerifyCodeScreenProps>> = (props) => {
    const {
        codeValidator,
        onResend,
        resendInstructions,
        resendLabel,
        verifyCodeInputLabel,
        initialValue,
        errorDisplayConfig,
        verifyCodeTextInputProps,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [verifyCode, setVerifyCode] = React.useState(initialValue ?? '');
    const [shouldValidateCode, setShouldValidateCode] = React.useState(false);
    const [isCodeValid, setIsCodeValid] = React.useState(codeValidator ? codeValidator(initialValue ?? '') : false);
    const [codeError, setCodeError] = React.useState('');

    const theme = useExtendedTheme();

    const handleVerifyCodeInputChange = useCallback(
        (code: string) => {
            setVerifyCode(code);
            if (codeValidator) {
                const validatorResponse = codeValidator(code);
                setIsCodeValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
                setCodeError(typeof validatorResponse === 'string' ? validatorResponse : '');
            }
        },
        [codeValidator]
    );

    useEffect(() => {
        if (verifyCode.length > 0) {
            setShouldValidateCode(true);
            handleVerifyCodeInputChange(verifyCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnNext = (): void => {
        const { onNext } = actionsProps;
        if (onNext) onNext({ code: verifyCode });
    };

    const handleOnPrevious = (): void => {
        const { onPrevious } = actionsProps;
        if (onPrevious) onPrevious({ code: verifyCode });
    };

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader title={''} onIconPress={handleOnPrevious} {...headerProps} />
            <WorkflowCardInstructions {...instructionsProps} />
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <TextInput
                        label={verifyCodeInputLabel}
                        mode="flat"
                        value={verifyCode}
                        onChangeText={handleVerifyCodeInputChange}
                        error={shouldValidateCode && !isCodeValid}
                        maxLength={6}
                        {...verifyCodeTextInputProps}
                        onBlur={(e): void => {
                            // eslint-disable-next-line no-unused-expressions
                            verifyCodeTextInputProps?.onBlur && verifyCodeTextInputProps.onBlur(e);
                            setShouldValidateCode(true);
                        }}
                    />
                    <HelperText type="error" visible={shouldValidateCode}>
                        {codeError}
                    </HelperText>
                    <View>
                        <Text>
                            {resendInstructions}{' '}
                            <Text style={{ color: theme.colors.primary }} onPress={onResend}>
                                {resendLabel}
                            </Text>
                        </Text>
                    </View>
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                canGoNext={(verifyCode.length > 5 && isCodeValid && actionsProps.canGoNext) as any}
                onNext={handleOnNext}
                onPrevious={handleOnPrevious}
            />
        </WorkflowCard>
    );
};
