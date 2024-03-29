import React from 'react';
import { ChangePasswordScreen } from '@brightlayer-ui/react-native-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { LocalStorage } from '../store/local-storage';
import { useNavigation } from '@react-navigation/native';

export const ChangePassword = (): JSX.Element => {
    const app = useApp();
    // const { navigate } = useNavigation();
    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        app.onUserNotAuthenticated();
    };

    return <ChangePasswordScreen onFinish={(): void => logOut()} showSuccessScreen />;
};
