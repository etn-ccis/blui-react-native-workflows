import React from 'react';
import { ChangePasswordDialog } from './ChangePasswordDialog';
import { useApp } from '../contexts/AppContextProvider';
import { LocalStorage } from '../store/local-storage';
import { useNavigation } from '@react-navigation/native';

export const ChangePassword = (): JSX.Element => {
    const app = useApp();
    const { navigate } = useNavigation();
    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        app.onUserNotAuthenticated();
        navigate('Home');
    };

    return <ChangePasswordDialog onFinish={(): void => logOut()} showSuccessScreen />;
};
