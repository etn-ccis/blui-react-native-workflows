import React from 'react';
import { ChangePasswordScreen } from '@brightlayer-ui/react-native-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { LocalStorage } from '../store/local-storage';

export const ChangePassword = (): JSX.Element => {
    const app = useApp();
    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        app.onUserNotAuthenticated();
        app.setLoginData({ email: '', rememberMe: false });
    };

    return <ChangePasswordScreen onFinish={(): void => logOut()} showSuccessScreen />;
};
