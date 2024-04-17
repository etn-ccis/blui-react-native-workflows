import React from 'react';
import {
    ForgotPasswordScreen,
    AuthContextProvider,
    ErrorContextProvider,
} from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import i18nAppInstance from '../../translations/i18n';

export const ForgotPasswordScreenBaseExample: React.FC = () => {
    const app = useApp();
    const navigation = useNavigation();

    return (
        <AuthContextProvider
            language={app.language}
            actions={ProjectAuthUIActions(app)}
            i18n={i18nAppInstance}
            navigate={(destination: -1 | string) => {
                if (typeof destination === 'string') {
                    navigation.navigate(destination);
                } else {
                    navigation.goBack();
                }
            }}
            routeConfig={{
                LOGIN: 'Home',
                FORGOT_PASSWORD: undefined,
                RESET_PASSWORD: undefined,
                REGISTER_INVITE: undefined,
                REGISTER_SELF: undefined,
                SUPPORT: undefined,
            }}
        >
            <ErrorContextProvider>
                <ForgotPasswordScreen />
            </ErrorContextProvider>
        </AuthContextProvider>
    );
};
