import React from 'react';
import { ChangePasswordScreen } from '@brightlayer-ui/react-native-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { LocalStorage } from '../store/local-storage';
import { clearTokens, revokeAccessToken } from '@okta/okta-react-native';

export const ChangePassword = (): JSX.Element => {
    const app = useApp();
    const logOut = async (): Promise<void> => {
        LocalStorage.clearAuthCredentials();
        try {
            await revokeAccessToken();
            await clearTokens();
        } catch (_error) {
            // eslint-disable-next-line no-console
            console.log(_error as Error);
        }
        app.onUserNotAuthenticated();
        // below line is not need for okta workflow
        // app.setLoginData({ email: '', rememberMe: false });
    };

    const handleLogout = (): void => {
        logOut().catch((error) => {
            // Handle any errors here if needed
            console.error(error);
        });
    };

    return <ChangePasswordScreen onFinish={handleLogout} showSuccessScreen />;
};
