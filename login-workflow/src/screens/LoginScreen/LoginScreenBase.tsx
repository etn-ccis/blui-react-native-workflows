import React, { useCallback, useRef, useState } from 'react';
import { LoginScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { ErrorManager, PasswordTextField } from '../../components';
import { Image, View, StyleSheet, ViewStyle, Keyboard } from 'react-native';
import { Button, Checkbox, HelperText, Text, TextInput } from 'react-native-paper';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    container: ViewStyle;
    projectImageWrapper: ViewStyle;
    inputFieldsWrapper: ViewStyle;
    usernameWrapper: ViewStyle;
    passwordWrapper: ViewStyle;
    rememberMeLoginRowWrapper: ViewStyle;
    rememberMeWrapper: ViewStyle;
    loginButtonWrapper: ViewStyle;
    rememberMeText: ViewStyle;
    loginButton: ViewStyle;
    forgotPasswordWrapper: ViewStyle;
    selfRegisterWrapper: ViewStyle;
    contactSupportWrapper: ViewStyle;
    footerWrapper: ViewStyle;
    cyberSecurityBadgeWrapper: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        projectImageWrapper: {
            display: 'flex',
            maxWidth: '100%',
            marginBottom: isTablet ? 24 : 16,
        },
        inputFieldsWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginVertical: isTablet ? 32 : 24,
        },
        usernameWrapper: {
            width: '100%',
            marginVertical: isTablet ? 32 : 24,
        },
        passwordWrapper: {
            width: '100%',
        },
        rememberMeLoginRowWrapper: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: isTablet ? 24 : 16,
            marginBottom: isTablet ? 32 : 24,
        },
        rememberMeWrapper: {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
        },
        loginButtonWrapper: {
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
        },
        rememberMeText: {
            display: 'flex',
            flex: 1,
        },
        loginButton: {
            width: '100%',
        },
        forgotPasswordWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginBottom: isTablet ? 32 : 24,
        },
        selfRegisterWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 4,
            alignContent: 'center',
            marginBottom: isTablet ? 32 : 24,
        },
        contactSupportWrapper: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: 4,
            alignContent: 'center',
            alignItems: 'center',
            marginBottom: isTablet ? 32 : 24,
        },
        footerWrapper: { display: 'flex', justifyContent: 'center' },
        cyberSecurityBadgeWrapper: { display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 2 },
    });

/**
 * Component that renders a login screen that prompts a user to enter a username and password to login.
 *
 * @param {LoginScreenProps} props - Props of Login Screen component
 *
 * @category Component
 */
export const LoginScreenBase: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const {
        usernameLabel,
        usernameTextFieldProps,
        usernameValidator,
        initialUsernameValue,
        passwordLabel,
        passwordTextFieldProps,
        passwordValidator,
        showRememberMe,
        rememberMeLabel,
        rememberMeInitialValue,
        onRememberMeChanged,
        loginButtonLabel,
        onLogin,
        showForgotPassword,
        forgotPasswordLabel,
        onForgotPassword,
        showSelfRegistration,
        selfRegisterButtonLabel,
        selfRegisterInstructions,
        onSelfRegister,
        showContactSupport,
        contactSupportLabel,
        onContactSupport,
        errorDisplayConfig,
        showCyberSecurityBadge,
        projectImage,
        header,
        footer,
        cyberSecurityBadgeSize,
        ...otherProps
    } = props;

    const theme = useExtendedTheme();
    const { isTablet } = useScreenDimensions();
    const [username, setUsername] = React.useState<string>(initialUsernameValue || '');
    const [password, setPassword] = React.useState<string>('');
    const [rememberMe, setRememberMe] = React.useState<boolean | undefined>(rememberMeInitialValue);

    const [shouldValidateUsername, setShouldValidateUsername] = React.useState<boolean>(false);
    const [shouldValidatePassword, setShouldValidatePassword] = React.useState<boolean>(false);

    const passwordField = useRef<any>(null);

    const [isUsernameValid, setIsUsernameValid] = useState(usernameValidator ? usernameValidator(username) : true);
    const [isPasswordValid, setIsPasswordValid] = useState(passwordValidator ? passwordValidator(password) : true);

    const [usernameError, setUsernameError] = useState(isUsernameValid === true ? '' : isUsernameValid);
    const [passwordError, setPasswordError] = useState(isPasswordValid === true ? '' : isPasswordValid);
    const defaultStyles = makeStyles(isTablet);
    const handleUsernameInputChange = useCallback(
        (value: string) => {
            setUsername(value);
            const validatorResponse = usernameValidator?.(value);

            setIsUsernameValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
            setUsernameError(typeof validatorResponse === 'string' ? validatorResponse : '');
        },
        [usernameValidator]
    );

    const handlePasswordInputChange = useCallback(
        (value: string) => {
            setPassword(value);
            const validatorResponse = passwordValidator?.(value);

            setIsPasswordValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
            setPasswordError(typeof validatorResponse === 'string' ? validatorResponse : '');
        },
        [passwordValidator]
    );

    const handleForgotPassword = (): void => {
        if (onForgotPassword) onForgotPassword();
    };

    const handleSelfRegister = (): void => {
        if (onSelfRegister) onSelfRegister();
    };

    const handleContactSupport = (): void => {
        if (onContactSupport) onContactSupport();
    };

    const handleRememberMeChanged = (value: boolean): void => {
        Keyboard.dismiss();
        if (onRememberMeChanged) {
            onRememberMeChanged(value);
            setRememberMe(value);
        }
    };

    const isFormValid = (): boolean =>
        typeof isUsernameValid === 'boolean' &&
        isUsernameValid &&
        typeof isPasswordValid === 'boolean' &&
        isPasswordValid;

    const handleLogin = (): void => {
        Keyboard.dismiss();
        if (isFormValid() && onLogin) void onLogin(username, password, rememberMe);
    };
    const handleLoginSubmit = (): void => {
        if (isFormValid()) {
            handleLogin();
        }
    };

    return (
        <WorkflowCard testID="blui-login-workflow-card" {...otherProps}>
            <WorkflowCardBody>
                {header}
                <View style={defaultStyles.projectImageWrapper} testID="blui-login-project-image-wrapper">
                    {projectImage}
                </View>

                <ErrorManager {...errorDisplayConfig}>
                    <View style={defaultStyles.inputFieldsWrapper} testID="blui-login-input-fields-wrapper">
                        <View style={defaultStyles.usernameWrapper}>
                            <TextInput
                                testID={'blui-login-username-text-field'}
                                label={usernameLabel || 'Username'}
                                value={username}
                                error={shouldValidateUsername && !isUsernameValid}
                                autoCapitalize="none"
                                mode="flat"
                                {...usernameTextFieldProps}
                                onChangeText={(e): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    usernameTextFieldProps?.onChangeText && usernameTextFieldProps.onChangeText(e);
                                    handleUsernameInputChange(e);
                                }}
                                onSubmitEditing={(e: any): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    usernameTextFieldProps?.onSubmitEditing &&
                                        usernameTextFieldProps.onSubmitEditing(e);
                                    if (passwordField.current) passwordField.current.focus();
                                }}
                                onBlur={(e): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    usernameTextFieldProps?.onBlur && usernameTextFieldProps.onBlur(e);
                                    setShouldValidateUsername(true);
                                }}
                            />
                            {shouldValidateUsername && !isUsernameValid && (
                                <HelperText type="error">{usernameError}</HelperText>
                            )}
                        </View>
                        <View style={defaultStyles.passwordWrapper}>
                            <PasswordTextField
                                ref={passwordField}
                                testID={'blui-login-password-text-field'}
                                label={passwordLabel || 'Password'}
                                mode="flat"
                                value={password}
                                error={shouldValidatePassword && !isPasswordValid}
                                {...passwordTextFieldProps}
                                onChangeText={(e: any): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    passwordTextFieldProps?.onChange && passwordTextFieldProps.onChange(e);
                                    handlePasswordInputChange(e);
                                }}
                                onSubmitEditing={(e: any): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    passwordTextFieldProps?.onSubmitEditing &&
                                        passwordTextFieldProps.onSubmitEditing(e);
                                    handleLoginSubmit();
                                }}
                                onBlur={(e): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    passwordTextFieldProps?.onBlur && passwordTextFieldProps.onBlur(e);
                                    setShouldValidatePassword(true);
                                }}
                            />
                            {shouldValidatePassword && !isPasswordValid && (
                                <HelperText type="error">{passwordError}</HelperText>
                            )}
                        </View>
                    </View>
                </ErrorManager>
                <View style={defaultStyles.rememberMeLoginRowWrapper} testID={'blui-login-remember-me-row-wrapper'}>
                    {showRememberMe && (
                        <View style={defaultStyles.rememberMeWrapper} testID={'blui-login-remember-me-wrapper'}>
                            <Checkbox.Android
                                status={rememberMe ? 'checked' : 'unchecked'}
                                onPress={() => handleRememberMeChanged(!rememberMe)}
                                testID={'blui-login-remember-me-checkbox'}
                            />
                            <Text
                                variant="bodyLarge"
                                testID={'blui-login-remember-me-login'}
                                style={defaultStyles.rememberMeText}
                            >
                                {rememberMeLabel || 'Remember Me'}
                            </Text>
                        </View>
                    )}
                    <View
                        style={[
                            defaultStyles.loginButtonWrapper,
                            {
                                width: showRememberMe ? 'auto' : '100%',
                            },
                        ]}
                        testID={'blui-login-login-button-wrapper'}
                    >
                        <Button
                            testID={'blui-login-login-button'}
                            onPress={handleLogin}
                            disabled={!isFormValid()}
                            mode="contained"
                            style={defaultStyles.loginButton}
                        >
                            {loginButtonLabel || 'Log In'}
                        </Button>
                    </View>
                </View>

                {showForgotPassword && (
                    <View style={defaultStyles.forgotPasswordWrapper} testID={'blui-login-forgot-password-wrapper'}>
                        <Text
                            variant="labelLarge"
                            style={{ color: theme.colors.primary }}
                            onPress={handleForgotPassword}
                            testID={'blui-login-forgot-password-label'}
                        >
                            {forgotPasswordLabel || 'Forgot your password?'}
                        </Text>
                    </View>
                )}

                {showSelfRegistration && (
                    <View style={defaultStyles.selfRegisterWrapper} testID={'blui-login-self-register-wrapper'}>
                        <Text variant="bodyMedium" testID={'blui-login-self-register-instruction-label'}>
                            {selfRegisterInstructions || 'Need an account?'}
                        </Text>
                        <Text
                            variant="labelLarge"
                            style={{ color: theme.colors.primary }}
                            onPress={handleSelfRegister}
                            testID={'blui-login-self-register-label'}
                        >
                            {selfRegisterButtonLabel || 'Register now!'}
                        </Text>
                    </View>
                )}

                {showContactSupport && (
                    <View style={defaultStyles.contactSupportWrapper} testID={'blui-login-contact-support-wrapper'}>
                        <Text
                            variant="labelLarge"
                            style={{ color: theme.colors.primary }}
                            onPress={handleContactSupport}
                            testID={'blui-login-contact-support-label'}
                        >
                            {contactSupportLabel || 'Contact Support'}
                        </Text>
                    </View>
                )}

                <View style={defaultStyles.footerWrapper}>{footer}</View>

                {showCyberSecurityBadge && (
                    <View
                        style={defaultStyles.cyberSecurityBadgeWrapper}
                        testID={'blui-login-cyber-security-badge-wrapper'}
                    >
                        <Image
                            style={{ ...cyberSecurityBadgeSize }}
                            resizeMode="contain"
                            source={require('../../assets/images/cybersecurity_certified.png')}
                        />
                    </View>
                )}
            </WorkflowCardBody>
        </WorkflowCard>
    );
};
