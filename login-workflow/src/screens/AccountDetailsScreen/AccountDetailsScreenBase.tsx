import React, { useCallback, useEffect, useRef } from 'react';
import { TextInput, Text } from 'react-native-paper';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import { AccountDetailsScreenProps } from './types';
import { ErrorManager } from '../../components';
import { StyleSheet, TextStyle } from 'react-native';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

const makeStyles = (
    theme?: ExtendedTheme
): StyleSheet.NamedStyles<{
    textInput: TextStyle;
    errorText: TextStyle;
}> =>
    StyleSheet.create({
        textInput: {
            marginTop: 24,
        },
        errorText: {
            color: theme?.colors.error,
            letterSpacing: 0,
        },
    });

/**
 * Props for ErrorText component which is used to display error text below the input field
 **/
type ErrorTextProps = {
    /**
     *  The text of the error.
     **/
    errorText: string | undefined;
};

/**
 * Component renders error text below the input field.
 * @param {ErrorTextProps} props - props for ErrorText component.
 */
const ErrorText: React.FC<ErrorTextProps> = (props) => {
    const { errorText } = props;
    const theme = useExtendedTheme();
    const styles = makeStyles(theme);

    return (
        <Text variant={'titleSmall'} style={[styles.errorText]}>
            {errorText}
        </Text>
    );
};

/**
 * Component renders a screen with account details information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param {AccountDetailsScreenProps} props - props for AccountDetails Screen Base component.
 *
 * @category Component
 */

export const AccountDetailsScreenBase: React.FC<AccountDetailsScreenProps> = (props) => {
    const {
        firstNameLabel,
        initialFirstName,
        firstNameValidator = (): void => {},
        firstNameTextInputProps,
        lastNameLabel,
        initialLastName,
        lastNameValidator = (): void => {},
        lastNameTextInputProps,
        errorDisplayConfig,
    } = props;
    const styles = makeStyles();

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const firstNameRef = useRef<any>(null);
    const lastNameRef = useRef<any>(null);

    const [firstNameInput, setFirstNameInput] = React.useState(initialFirstName ? initialFirstName : '');
    const [lastNameInput, setLastNameInput] = React.useState(initialLastName ? initialLastName : '');

    const [isFirstNameValid, setIsFirstNameValid] = React.useState(false);
    const [isLastNameValid, setIsLastNameValid] = React.useState(false);

    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');

    const [shouldValidateFirstName, setShouldValidateFirstName] = React.useState(false);
    const [shouldValidateLastName, setShouldValidateLastName] = React.useState(false);

    const handleFirstNameInputChange = useCallback(
        (firstName: string) => {
            setFirstNameInput(firstName);
            const firstNameValidatorResponse = firstNameValidator(firstName);

            setIsFirstNameValid(typeof firstNameValidatorResponse === 'boolean' ? firstNameValidatorResponse : false);
            setFirstNameError(typeof firstNameValidatorResponse === 'string' ? firstNameValidatorResponse : '');
        },
        [firstNameValidator]
    );

    const handleLastNameInputChange = useCallback(
        (lastName: string) => {
            setLastNameInput(lastName);
            const lastNameValidatorResponse = lastNameValidator(lastName);

            setIsLastNameValid(typeof lastNameValidatorResponse === 'boolean' ? lastNameValidatorResponse : false);
            setLastNameError(typeof lastNameValidatorResponse === 'string' ? lastNameValidatorResponse : '');
        },
        [lastNameValidator]
    );

    useEffect(() => {
        if (firstNameInput.length > 0) {
            setShouldValidateFirstName(true);
            handleFirstNameInputChange(firstNameInput);
        }
        if (lastNameInput.length > 0) {
            setShouldValidateLastName(true);
            handleLastNameInputChange(lastNameInput);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardInstructions {...instructionsProps} />
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <TextInput
                        testID="firstName"
                        mode="flat"
                        ref={firstNameRef}
                        label={firstNameLabel}
                        value={firstNameInput}
                        error={shouldValidateFirstName && !isFirstNameValid}
                        style={[styles.textInput]}
                        {...firstNameTextInputProps}
                        onChangeText={(text: string): void => {
                            // eslint-disable-next-line no-unused-expressions
                            firstNameTextInputProps?.onChangeText && firstNameTextInputProps.onChangeText(text);
                            handleFirstNameInputChange(text);
                        }}
                        onSubmitEditing={(): void => {
                            lastNameRef?.current?.focus();
                        }}
                        onBlur={(): void => setShouldValidateFirstName(true)}
                    />
                    {shouldValidateFirstName && <ErrorText errorText={firstNameError} />}
                    <TextInput
                        testID="lastName"
                        mode="flat"
                        ref={lastNameRef}
                        label={lastNameLabel}
                        value={lastNameInput}
                        error={shouldValidateLastName && !isLastNameValid}
                        style={[styles.textInput]}
                        {...lastNameTextInputProps}
                        onChangeText={(text: string): void => {
                            // eslint-disable-next-line no-unused-expressions
                            lastNameTextInputProps?.onChangeText && lastNameTextInputProps.onChangeText(text);
                            handleLastNameInputChange(text);
                        }}
                        onSubmitEditing={(): void => {
                            if (isFirstNameValid && isLastNameValid && actionsProps.canGoNext) actionsProps.onNext?.();
                        }}
                        onBlur={(): void => setShouldValidateLastName(true)}
                    />
                    {shouldValidateLastName && <ErrorText errorText={lastNameError} />}
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                canGoNext={actionsProps.canGoNext && isFirstNameValid && isLastNameValid}
            />
        </WorkflowCard>
    );
};
