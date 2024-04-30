import React, { useState, useCallback, useEffect } from 'react';
import PasswordRequirements from './PasswordRequirements';
import { SetPasswordProps } from './types';
import { HelperText } from 'react-native-paper';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { defaultPasswordRequirements } from '../../constants';
import { useTranslation } from 'react-i18next';
import { PasswordTextField } from './PasswordTextField';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

const makeStyles = (
    isTablet: boolean,
    theme: ExtendedTheme
): StyleSheet.NamedStyles<{
    passwordRequirementContainer: ViewStyle;
    errorHelperText: TextStyle;
    successHelperText: TextStyle;
}> =>
    StyleSheet.create({
        passwordRequirementContainer: {
            marginTop: 8,
            marginBottom: isTablet ? 32 : 24,
        },
        errorHelperText: { marginBottom: 8 },
        successHelperText: { marginBottom: 8, color: theme.colors.success },
    });

/**
 * Component that renders a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param {SetPasswordProps} props - props of SetPassword component
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
        confirmRef,
        passwordNotMatchError,
        onSubmit,
        passwordTextFieldProps,
        confirmPasswordTextFieldProps,
    } = props;
    const { t } = useTranslation();

    // Local State
    const [passwordInput, setPasswordInput] = useState(initialNewPasswordValue);
    const [confirmInput, setConfirmInput] = useState(initialConfirmPasswordValue);
    const { isTablet } = useScreenDimensions();
    const theme = useExtendedTheme();
    const defaultStyle = makeStyles(isTablet, theme);

    useEffect(() => {
        setPasswordInput(initialNewPasswordValue);
        setConfirmInput(initialConfirmPasswordValue);
    }, [initialNewPasswordValue, initialConfirmPasswordValue]);

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
        const requirementsToCheck = passwordRequirements ? passwordRequirements : defaultPasswordRequirements(t);
        for (let i = 0; i < requirementsToCheck.length; i++) {
            if (!new RegExp(requirementsToCheck[i].regex).test(passwordInput)) return false;
        }

        return true;
    }, [passwordRequirements, t, passwordInput]);
    return (
        <>
            {children}
            <PasswordTextField
                testID="blui-set-password-password-text-field"
                label={newPasswordLabel}
                value={passwordInput}
                ref={passwordRef}
                error={passwordInput !== '' && !isValidPassword()}
                {...passwordTextFieldProps}
                onChangeText={(text: string) => {
                    // eslint-disable-next-line no-unused-expressions
                    passwordTextFieldProps?.onChangeText && passwordTextFieldProps.onChangeText(text);
                    onPassChange(text);
                }}
                returnKeyType="next" // Show "next" button on keyboard
                onSubmitEditing={() => confirmRef?.current?.focus()} // Focus on confirm field when "next" is pressed
            />
            <PasswordRequirements
                passwordText={passwordInput}
                passwordRequirements={passwordRequirements}
                style={defaultStyle.passwordRequirementContainer}
            />
            <PasswordTextField
                testID="blui-set-password-confirm-password-text-field"
                label={confirmPasswordLabel}
                value={confirmInput}
                ref={confirmRef}
                error={hasConfirmPasswordError()}
                {...confirmPasswordTextFieldProps}
                onChangeText={(text: string) => {
                    // eslint-disable-next-line no-unused-expressions
                    confirmPasswordTextFieldProps?.onChangeText && confirmPasswordTextFieldProps.onChangeText(text);
                    onConfirmChange(text);
                }}
                returnKeyType="done" // Show "next" button on keyboard
                onSubmitEditing={() => {
                    if (!hasConfirmPasswordError() && isValidPassword() && onSubmit) onSubmit();
                }}
            />
            {hasConfirmPasswordError() && (
                <HelperText type="error" visible={hasConfirmPasswordError()} style={defaultStyle.errorHelperText}>
                    {passwordNotMatchError || t('bluiCommon:FORMS.PASS_MATCH_ERROR')}
                </HelperText>
            )}
            {!hasConfirmPasswordError() && confirmInput !== '' && confirmInput === passwordInput && (
                <HelperText
                    type="info"
                    visible={!hasConfirmPasswordError() && confirmInput !== '' && confirmInput === passwordInput}
                    style={defaultStyle.successHelperText}
                >
                    {t('bluiCommon:FORMS.PASS_MATCH')}
                </HelperText>
            )}
        </>
    );
};
