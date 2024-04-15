import React, { useState } from 'react';
import { LoginScreenProps, LoginScreenBase } from '@brightlayer-ui/react-native-auth-workflow';
import { Image } from 'react-native';

export const LoginBaseExample: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const [rememberMe, setRememberMe] = useState(false);
    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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
        onForgotPassword = (): void => console.log('forgot password pressed'),
        showSelfRegistration = true,
        selfRegisterInstructions = 'NEED ACCOUNT',
        selfRegisterButtonLabel = 'CREATE ACCOUNT',
        // eslint-disable-next-line no-console
        onSelfRegister = (): void => console.log('self registration pressed'),
        showContactSupport = true,
        contactSupportLabel = 'CONTACT',
        // eslint-disable-next-line no-console
        onContactSupport = (): void => console.log('self registration pressed'),
        showCyberSecurityBadge = true,
        header,
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
            onLogin={(user: string | undefined, pass: string | undefined): void =>
                // eslint-disable-next-line no-console
                console.log('loginPressed', user, pass)
            }
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
