import React from 'react';
import { ChangePasswordScreen } from '@brightlayer-ui/react-native-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { LocalStorage } from '../store/local-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export const ChangePassword = (): JSX.Element => {
    const app = useApp();
    const nav = useNavigation();
    const route = useRoute();
    const { params } = route;
    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        app.onUserNotAuthenticated();
    };

    return (
        <ChangePasswordScreen
            onFinish={(): void => logOut()}
            WorkflowCardHeaderProps={{
                onIconPress: (): void => {
                    console.log('routes', nav.getState()?.routes);
                    nav.navigate('AppProviderExample', { screen: params?.previousScreen });
                },
            }}
            showSuccessScreen
        />
    );
};
