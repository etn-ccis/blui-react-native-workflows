import React, { useState, useCallback, useRef } from 'react';
import PasswordRequirements from './PasswordRequirements';
import { SetPasswordProps } from './types';
import { HelperText } from 'react-native-paper';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { ViewStyle, StyleSheet } from 'react-native';
import { is } from 'date-fns/locale';
import { defaultPasswordRequirements } from '../../constants';
import { useTranslation } from 'react-i18next';
import { PasswordTextField } from './PasswordTextField';



const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    passwordRequirementContainer: ViewStyle;
}> =>
    StyleSheet.create({
        passwordRequirementContainer: {
            marginTop: 8,
            marginBottom: isTablet ? 32 : 24,
        },
    });

    /**
 * Component that renders a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param onPasswordChange called when the new password or confirm new password fields value changes
 * @param initialNewPasswordValue initial value for the new password field
 * @param initialConfirmPasswordValue initial value for the confirm password field
 * @param passwordRequirements requirements to set password
 * @param newPasswordLabel label for the new password field (default = 'Password')
 * @param confirmPasswordLabel label for the confirm password field (default = 'Confirm')
 * @param passwordRef ref to forward to the password input.
 * @param confirmRef ref to forward to the confirm password input.
 * @param passwordNotMatchError text for showing message when passwords do not match.
 * @param onSubmit function to call when the form is submitted
 * @param passwordTextFieldProps props to pass to the password field.
 * @param confirmPasswordTextFieldProps props to pass to the confirm password field.
 *
 * @category Component
 */
export const SetPassword: React.FC<React.PropsWithChildren<SetPasswordProps>> = (props) => {
    const {
        newPasswordLabel = 'Password',
        initialNewPasswordValue = '',
        confirmPasswordLabel = 'Confirm',
        initialConfirmPasswordValue = '',
        passwordRequirements,
        onPasswordChange,
        children,
        passwordRef,
        confirmRef = useRef(null),
        passwordNotMatchError,
        onSubmit,
        passwordTextFieldProps,
        confirmPasswordTextFieldProps,
    } = props;
    const { t } = useTranslation();

    // Local State
    const [passwordInput, setPasswordInput] = useState(initialNewPasswordValue);
    const [confirmInput, setConfirmInput] = useState(initialConfirmPasswordValue);
    const isTablet = useScreenWidth();
    const defaultStyle = makeStyles(isTablet);
    const onPassChange = useCallback(
        (newPassword: any) => {
            setPasswordInput(newPassword);

            onPasswordChange?.({ password: newPassword, confirm: confirmInput });
        },
        [setPasswordInput, onPasswordChange, confirmInput]
    );

    const onConfirmChange = useCallback(
        (newConfirm: any) => {
            setConfirmInput(newConfirm);
            onPasswordChange?.({ password: passwordInput, confirm: newConfirm });
        },
        [setConfirmInput, onPasswordChange, passwordInput]
    );

    const hasConfirmPasswordError = useCallback(
        (): boolean => passwordInput.length !== 0 && confirmInput.length !== 0 && confirmInput !== passwordInput,
        [confirmInput, passwordInput]
    );

    const isValidPassword = useCallback((): boolean => {
        const requirementsToCheck = passwordRequirements?.length
          ? passwordRequirements
          : defaultPasswordRequirements(t);
        for (let i = 0; i < requirementsToCheck.length; i++) {
          if (!new RegExp(requirementsToCheck[i].regex).test(passwordInput)) return false;
        }
      
        return true;
      }, [passwordRequirements, passwordInput]);
    // const isValidPassword = useCallback((): boolean => {
    //     if (passwordRequirements?.length)
    //         for (let i = 0; i < passwordRequirements.length; i++) {
    //             if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
    //         }
    //     return true;
    // }, [passwordRequirements, passwordInput]);
    return (
        <>
            {children}
            <PasswordTextField
                data-testid="password"
                label={newPasswordLabel}
                value={passwordInput}
                ref={passwordRef}
                error={passwordInput !== '' && !isValidPassword()}
                {...passwordTextFieldProps}
                onChangeText={(text: string) => {
                    passwordTextFieldProps?.onChangeText && passwordTextFieldProps.onChangeText(text);
                    onPassChange(text);
                }}
                returnKeyType="next" // Show "next" button on keyboard
                onSubmitEditing={() => confirmRef.current?.focus()} // Focus on confirm field when "next" is pressed
            />
            <PasswordRequirements
                passwordText={passwordInput}
                passwordRequirements={passwordRequirements}
                style={defaultStyle.passwordRequirementContainer}
            />
            <PasswordTextField
                data-testid="confirm"
                label={confirmPasswordLabel}
                value={confirmInput}
                ref={confirmRef}
                error={hasConfirmPasswordError()}
                {...confirmPasswordTextFieldProps}
                onChangeText={(text: string) => {
                    // Call confirmPasswordTextFieldProps.onChange if provided
                    confirmPasswordTextFieldProps?.onChangeText && confirmPasswordTextFieldProps.onChangeText(text);
                    onConfirmChange(text);
                }}
                returnKeyType="done" // Show "next" button on keyboard
                onSubmitEditing={() => {
                    console.log(!hasConfirmPasswordError(), isValidPassword());
                    if (!hasConfirmPasswordError() && isValidPassword() && onSubmit) onSubmit();
                }}
            />
            <HelperText type="error" visible={hasConfirmPasswordError()} style={{ marginBottom: 8 }}>
                {passwordNotMatchError}
            </HelperText>
        </>
    );
};
