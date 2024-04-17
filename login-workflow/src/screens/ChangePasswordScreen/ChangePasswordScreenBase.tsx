import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { ChangePasswordScreenProps } from './types';
import { PasswordTextField, SetPassword } from '../../components/SetPassword';
import { SuccessScreenBase, SuccessScreenProps } from '..';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components/WorkflowCard';
import { ErrorManager } from '../../components/Error';

const makeStyles = (): StyleSheet.NamedStyles<{
    textInput: TextStyle;
}> =>
    StyleSheet.create({
        textInput: {
            marginBottom: 24,
        },
    });

/**
 * Base Component that renders a textField to enter current password and a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param {ChangePasswordScreenProps} props - props of Change Password Base component
 *
 * @category Component
 */
export const ChangePasswordScreenBase: React.FC<ChangePasswordScreenProps> = (props) => {
    const {
        currentPasswordLabel,
        errorDisplayConfig,
        currentPasswordTextInputProps,
        currentPasswordChange,
        showSuccessScreen,
        slotProps,
        slots,
    } = props;

    const styles = makeStyles();

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const cardBodyProps = props.WorkflowCardBodyProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };

    const getSuccessScreen = (
        _props: SuccessScreenProps,
        // eslint-disable-next-line
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element
    ): JSX.Element => (SuccessScreen ? SuccessScreen(_props) : <SuccessScreenBase {..._props} />);

    const handleChange = (text: string): void => {
        currentPasswordChange?.(text);
    };

    return showSuccessScreen ? (
        getSuccessScreen(slotProps?.SuccessScreen || {}, slots?.SuccessScreen)
    ) : (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody {...cardBodyProps}>
                <ErrorManager {...errorDisplayConfig}>
                    <SetPassword {...passwordProps}>
                        <PasswordTextField
                            testID="blui-change-password-current-password-text-field"
                            style={[styles.textInput]}
                            label={currentPasswordLabel}
                            {...currentPasswordTextInputProps}
                            onChangeText={(text: string) => {
                                // eslint-disable-next-line no-unused-expressions
                                currentPasswordTextInputProps?.onChangeText &&
                                    currentPasswordTextInputProps.onChangeText(text);
                                handleChange(text);
                            }}
                            returnKeyType="done" // Show "next" button on keyboard
                        />
                    </SetPassword>
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions totalSteps={0} {...actionsProps} />
        </WorkflowCard>
    );
};
