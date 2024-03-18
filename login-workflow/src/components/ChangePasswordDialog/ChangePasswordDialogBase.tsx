import React, { useEffect, useState } from 'react';
import { ChangePasswordDialogProps } from './types';
import { SetPassword } from '../SetPassword';
import { PasswordTextField } from '../SetPassword';
import { BasicDialog } from '../Dialog';
import { Spinner } from '../Spinner';
import { SuccessScreenBase, SuccessScreenProps } from '../../screens';
import { Dialog, Divider, Text, Button } from 'react-native-paper';
/**
 * Component that renders a dialog with textField to enter current password and a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param dialogTitle title to display in the dialog
 * @param dialogDescription description to display in the dialog
 * @param currentPasswordLabel label to display for the current password field
 * @param previousLabel label to display for the previous button
 * @param nextLabel label to display for the next button
 * @param currentPasswordChange called when the current password field changes
 * @param enableButton boolean to enable and disable the button
 * @param onFinish function called when the button is clicked on success screen
 * @param onSubmit callback function to call when the form is submitted
 * @param onPrevious called when the previous button is clicked
 * @param sx styles passed to the underlying root component
 * @param loading boolean that indicates whether the loading spinner should be displayed
 * @param currentPasswordTextInputProps props to pass to the current password field.
 * @param showSuccessScreen boolean that determines whether to show the success screen or not
 * @param slots used for ChangePasswordDialog SuccessScreen props
 * @param slotProps props that will be passed to the SuccessScreen component
 *
 * @category Component
 */

export const ChangePasswordDialogBase: React.FC<ChangePasswordDialogProps> = (props) => {
    const {
        visible,
        dialogTitle,
        dialogDescription,
        currentPasswordLabel,
        previousLabel,
        nextLabel,
        enableButton,
        currentPasswordChange,
        onSubmit,
        onPrevious,
        ErrorDialogProps,
        PasswordProps,
        loading,
        currentPasswordTextInputProps,
        showSuccessScreen,
        slots,
        slotProps,
    } = props;
    const [currentPassword, setCurrentPassword] = useState('');
    const [buttonState, setButtonState] = useState(true);

    const handleChange = (event: any): void => {
        const { value } = event.target;
        setCurrentPassword(value);
        currentPasswordChange?.(value);
    };

    useEffect(() => {
        setButtonState(!enableButton);
    }, [enableButton]);

    const getSuccessScreen = (
        _props: SuccessScreenProps,
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element
    ): JSX.Element =>
        SuccessScreen ? (
            SuccessScreen(_props)
        ) : (
            <SuccessScreenBase />
        );

    return (
        <Dialog visible={visible} >
            <Spinner data-testid="blui-spinner" visible={loading} />
            {showSuccessScreen ? (
                getSuccessScreen(slotProps?.SuccessScreen || {}, slots?.SuccessScreen)
            ) : (
                <>
                    <BasicDialog {...ErrorDialogProps} />
                    <Dialog.Title>
                        {dialogTitle}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text>{dialogDescription}</Text>
                        <Divider />
                        <SetPassword {...PasswordProps}>
                            <PasswordTextField
                                // id="current-password"
                                label={currentPasswordLabel}
                                value={currentPassword}
                                {...currentPasswordTextInputProps}
                                onChangeText={(text): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    currentPasswordTextInputProps?.onChangeText &&
                                        currentPasswordTextInputProps.onChangeText(text);
                                    handleChange(text);
                                }}
                                onSubmitEditing={(e): void => {
                                    if (PasswordProps?.passwordRef?.current) {
                                        PasswordProps?.passwordRef.current.focus();
                                    }
                                }}
                            />
                        </SetPassword>
                    </Dialog.Content>
                    <Divider />
                    <Dialog.Actions >
                        <>
                            <Button mode="outlined" onPress={onPrevious}>
                                {previousLabel}
                            </Button>
                            <Button
                                mode="contained"
                                disabled={buttonState}
                                onPress={(): void => {
                                    void onSubmit?.();
                                }}
                            >
                                {nextLabel}
                            </Button>
                        </>
                    </Dialog.Actions>
                </>
            )}
        </Dialog>
    );
};
