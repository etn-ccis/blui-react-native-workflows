import React from 'react';
import { ChangePasswordScreen, AuthContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { LocalStorage } from '../store/local-storage';
import { useNavigation } from '@react-navigation/native';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import i18nAppInstance from '../../translations/i18n';

export const ChangePassword = (): JSX.Element => {
    const app = useApp();
    const nav = useNavigation();
    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        app.onUserNotAuthenticated();
        // app.setAuthenticated(false);
    };
    console.log('routes before', nav.getState()?.routes);
    return (
        <ChangePasswordScreen
            onFinish={(): void => logOut()}
            WorkflowCardHeaderProps={{
                onIconPress: (): void => {
                    console.log('routes', nav.getState()?.routes);
                    nav.goBack();
                },
            }}
            showSuccessScreen
        />
    );
};
