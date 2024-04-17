import React, { useState } from 'react';
import { LoginScreenProps, LoginScreenBase } from '@brightlayer-ui/react-native-auth-workflow';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import { DebugComponent } from '../components/DebugComponent';

export const LoginBaseExample: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const [rememberMe, setRememberMe] = useState(false);
    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const navigation = useNavigation();
    const app = useApp();

    const {
        usernameLabel = 'EMAIL',
        usernameTextFieldProps,
        usernameValidator = (username: string): string | boolean => {
            if (!EMAIL_REGEX.test(username)) {
                return 'EMAIL ERROR';
            }
            return true;
        },
        initialUsernameValue = '',
        passwordLabel = 'PASSWORD',
        passwordTextFieldProps,
        passwordValidator = (password: string): string | boolean => {
            if (password.length < 1) {
                return 'PASSWORD REQUIRED ERROR';
            }
            return true;
        },
        showRememberMe = true,
        rememberMeLabel = 'Remember Me',
        rememberMeInitialValue = rememberMe,
        onRememberMeChanged = (value: boolean): void => {
            setRememberMe(value);
        },
        loginButtonLabel = 'LOG IN',
        showForgotPassword = true,
        forgotPasswordLabel = 'FORGOT PASSWORD',
        // eslint-disable-next-line no-console
        onForgotPassword = (): void => {
            navigation.navigate('ForgotPassword');
        },
        showSelfRegistration = true,
        selfRegisterInstructions = 'NEED ACCOUNT',
        selfRegisterButtonLabel = 'CREATE ACCOUNT',
        // eslint-disable-next-line no-console
        onSelfRegister = (): void => {
            navigation.navigate('RegistrationProviderExample', { screen: 'SelfRegister' });
        },
        showContactSupport = true,
        contactSupportLabel = 'CONTACT',
        // eslint-disable-next-line no-console
        onContactSupport = (): void => {
            navigation.navigate('ContactSupport');
        },
        showCyberSecurityBadge = true,
        header = <DebugComponent />,
        footer,
    } = props;

    return (
        <LoginScreenBase
            loading={false}
            usernameLabel={usernameLabel}
            usernameTextFieldProps={usernameTextFieldProps}
            usernameValidator={usernameValidator}
            initialUsernameValue={initialUsernameValue}
            passwordLabel={passwordLabel}
            passwordTextFieldProps={passwordTextFieldProps}
            passwordValidator={passwordValidator}
            showRememberMe={showRememberMe}
            rememberMeLabel={rememberMeLabel}
            rememberMeInitialValue={rememberMeInitialValue}
            onRememberMeChanged={onRememberMeChanged}
            loginButtonLabel={loginButtonLabel}
            onLogin={(user: string | undefined, pass: string | undefined): void => {
                app.onUserAuthenticated({
                    email: 'Test@test.com',
                    userId: user || '',
                    rememberMe: false,
                });
                // eslint-disable-next-line no-console
                console.log('LoginBaseExample onLogin', user, pass);
                navigation.navigate('AppProviderExample');
            }}
            showForgotPassword={showForgotPassword}
            forgotPasswordLabel={forgotPasswordLabel}
            onForgotPassword={onForgotPassword}
            showSelfRegistration={showSelfRegistration}
            selfRegisterButtonLabel={selfRegisterButtonLabel}
            selfRegisterInstructions={selfRegisterInstructions}
            onSelfRegister={onSelfRegister}
            showContactSupport={showContactSupport}
            contactSupportLabel={contactSupportLabel}
            onContactSupport={onContactSupport}
            showCyberSecurityBadge={showCyberSecurityBadge}
            projectImage={
                <Image
                    style={{ width: '100%' }}
                    resizeMode="contain"
                    source={require('../assets/images/eaton_stacked_logo.png')}
                />
            }
            header={header}
            footer={footer}
        />
    );
};
