import React from 'react';
import { ChangePasswordDialog } from './ChangePasswordDialog';
import { useApp } from '../contexts/AppContextProvider';
import { LocalStorage } from '../store/local-storage';
// import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@react-navigation/native';

export const ChangePassword = (): JSX.Element => {
    const app = useApp();
    const {navigate} = useNavigation();
    const logOut = (): void => {
        app.setShowChangePasswordDialog(false);
        LocalStorage.clearAuthCredentials();
        app.onUserNotAuthenticated();
        navigate('Home');
    };

    return (
        <ChangePasswordDialog
            visible={true}
            onPrevious={(): void => app.setShowChangePasswordDialog(false)}
            onSubmit={(): void => app.setShowChangePasswordDialog(false)}
            onFinish={(): void => logOut()}
        />
    );
};
