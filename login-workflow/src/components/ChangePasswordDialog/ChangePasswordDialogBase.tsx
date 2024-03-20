import React, { useState } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { ChangePasswordDialogProps } from './types';
import { PasswordTextField, SetPassword } from '../SetPassword';
import { SuccessScreenBase, SuccessScreenProps } from '../../screens';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../WorkflowCard';
import { ErrorManager } from '../Error';
import { Text } from 'react-native-paper';

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
 * @param {ChangePasswordDialogProps} props - props of Change Password Base component 
 * 
 * @category Component
 */

export const ChangePasswordDialogBase: React.FC<ChangePasswordDialogProps> = (props) => {
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

    const [currentPassword, setCurrentPassword] = useState('');

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };

    const getSuccessScreen = (
        _props: SuccessScreenProps,
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element
    ): JSX.Element => (SuccessScreen ? SuccessScreen(_props) : <SuccessScreenBase {..._props} />);

    const handleChange = (text: string): void => {
        setCurrentPassword(text);
        currentPasswordChange?.(text);
    };

    return showSuccessScreen ? (
        getSuccessScreen(slotProps?.SuccessScreen || {}, slots?.SuccessScreen)
    ) : (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <SetPassword {...passwordProps}>
                        <PasswordTextField
                            testID="current-password"
                            style={[styles.textInput]}
                            label={currentPasswordLabel}
                            value={currentPassword}
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
            <WorkflowCardActions {...actionsProps} />
        </WorkflowCard>
    );
};
