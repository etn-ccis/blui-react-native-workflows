import React, { useCallback, useRef, useState } from 'react';
import { LoginScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
// import cyberSecurityBadge from '../../assets/images/cybersecurity_certified.png';
import { PasswordTextField } from '../../components';
import {ErrorManager} from '../../components';
import { Image, View } from 'react-native';
import { Button, Checkbox, HelperText, Text, TextInput } from 'react-native-paper';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

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

    const handleLogin = (): void => {
        if (onLogin) void onLogin(username, password, rememberMe);
    };

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

    const handleLoginSubmit = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === 'Enter' && isFormValid()) {
            void handleLogin();
        }
    };

    return (
        <WorkflowCard testID={'root'} {...otherProps}>
            <WorkflowCardBody>
                {header}
                <View
                    style={{ display: 'flex', maxWidth: '100%',marginBottom:isTablet ? 24 : 16 }}
                    testID={'projectImageWrapper'}
                >
                    {projectImage}
                </View>

                <ErrorManager {...errorDisplayConfig}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            marginVertical:isTablet ? 32 : 24
                        }}
                        testID={'inputFieldsWrapper'}
                    >
                        <View
                            style={{
                                width: '100%',
                                marginVertical:isTablet ? 32 : 24
                            }}
                        >
                            <TextInput
                                testID={'usernameTextField'}
                                label={usernameLabel || 'Username'}
                                value={username}
                                error={shouldValidateUsername && !isUsernameValid}
                                mode="flat"
                                {...usernameTextFieldProps}
                                onChangeText={(e): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    usernameTextFieldProps?.onChangeText && usernameTextFieldProps.onChangeText(e);
                                    handleUsernameInputChange(e);
                                }}
                                onSubmitEditing={(e: any): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    usernameTextFieldProps?.onSubmitEditing && usernameTextFieldProps.onSubmitEditing(e);
                                    if (e.key === 'Enter' && passwordField.current) passwordField.current.focus();
                                }}
                                onBlur={(e): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    usernameTextFieldProps?.onBlur && usernameTextFieldProps.onBlur(e);
                                    setShouldValidateUsername(true);
                                }}
                            />
                            {shouldValidateUsername && !isUsernameValid && <HelperText type="error">{usernameError}</HelperText>}

                        </View>
                        <View
                            style={{
                                width: '100%',
                               }}
                        >
                            <PasswordTextField
                                ref={passwordField}
                                testID={'passwordTextField'}
                                label={passwordLabel || 'Password'}
                                mode='flat'
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
                                    passwordTextFieldProps?.onSubmitEditing && passwordTextFieldProps.onSubmitEditing(e);
                                    handleLoginSubmit(e);
                                }}
                                onBlur={(e): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    passwordTextFieldProps?.onBlur && passwordTextFieldProps.onBlur(e);
                                    setShouldValidatePassword(true);
                                }}
                            />
                            {shouldValidatePassword && !isPasswordValid && <HelperText type="error">{passwordError}</HelperText>}
                        </View>
                    </View>
                </ErrorManager>
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'center',
                        flexDirection:'row',
                        marginTop:isTablet ? 24 : 16,
                        marginBottom:isTablet ? 32 : 24,
                    }}
                    testID={'rememberMeLoginRowWrapper'}
                >
                    {showRememberMe && (
                        <View
                            style={{
                                display: 'flex',
                                flex:1,
                                alignItems: 'center',
                                flexDirection:'row'
                            }}
                            testID={'rememberMeWrapper'}
                        >
                            <Checkbox.Android
                                status={rememberMe?'checked' : 'unchecked'}
                                onPress={() => handleRememberMeChanged(!rememberMe)}
                                testID={'rememberMeCheckbox'}
                            />
                            <Text
                                variant='bodyLarge'
                                testID={'rememberMeLabel'}
                            >
                                {rememberMeLabel || 'Remember Me'}
                            </Text>
                        </View>
                    )}
                    <View
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'flex-end',
                            width: showRememberMe ? 'auto' : '100%',
                        }}
                        testID={'loginButtonWrapper'}
                    >
                        <Button
                            testID={'loginButton'}
                            onPress={handleLogin}
                            disabled={!isFormValid()}
                            mode='contained'
                            style={{
                                width: '100%',
                            }}
                        >
                            {loginButtonLabel || 'Log In'}
                        </Button>
                    </View>
                </View>

                {showForgotPassword && (
                    <View
                        style={{ display: 'flex', justifyContent: 'center',alignContent:'center', alignItems: 'center', marginBottom:isTablet ? 32 : 24, }}
                        testID={'forgotPasswordWrapper'}
                    >
                        <Text
                            variant='labelLarge'
                            style={{color:theme.colors.primary}}
                            onPress={handleForgotPassword}
                            testID={'forgotPasswordLabel'}
                        >
                            {forgotPasswordLabel || 'Forgot your password?'}
                        </Text>
                    </View>
                )}

                {showSelfRegistration && (
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            marginTop: 4,
                            alignContent: 'center',
                            marginBottom:isTablet ? 32 : 24,
                        }}
                        testID={'selfRegisterWrapper'}
                    >
                        <Text
                            variant='bodyMedium'

                            testID={'selfRegisterInstructionLabel'}
                        >
                            {selfRegisterInstructions || 'Need an account?'}
                        </Text>
                        <Text
                            variant='labelLarge'
                            style={{color:theme.colors.primary}}
                            onPress={handleSelfRegister}
                            testID={'selfRegisterLabel'}
                        >
                            {selfRegisterButtonLabel || 'Register now!'}
                        </Text>
                    </View>
                )}

                {showContactSupport && (
                    <View
                        style={{ display: 'flex', justifyContent: 'center', marginTop: 4, alignContent:'center', alignItems: 'center',marginBottom:isTablet ? 32 : 24, }}
                        testID={'contactSupportWrapper'}
                    >
                        <Text
                            variant='labelLarge'
                            style={{color:theme.colors.primary}}
                            onPress={handleContactSupport}
                            testID={'contactSupportLabel'}
                        >
                            {contactSupportLabel || 'Contact Support'}
                        </Text>
                    </View>
                )}

                <View style={{ display: 'flex', justifyContent: 'center' }}>{footer}</View>

                {showCyberSecurityBadge && (
                    <View
                        style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
                        testID={'cyberSecurityBadgeWrapper'}
                    >
                        <Image style={{width:'100%'}} resizeMode='contain' source={require('../../assets/images/cybersecurity_certified.png')}/>
                    </View>
                )}
            </WorkflowCardBody>
        </WorkflowCard>
    );
};
