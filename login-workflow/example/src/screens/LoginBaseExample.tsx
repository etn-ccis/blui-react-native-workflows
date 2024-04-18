import React from 'react';
import { Image } from 'react-native';
import { useApp } from '../contexts/AppContextProvider';
import i18nAppInstance from '../../translations/i18n';
import {
    LoginScreenProps,
    LoginScreen,
    AuthContextProvider,
    ErrorContextProvider,
} from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';

export const LoginBaseExample: React.FC<React.PropsWithChildren<LoginScreenProps>> = () => {
    const app = useApp();
    const nav = useNavigation();

    return (
        <AuthContextProvider
            language={app.language}
            actions={ProjectAuthUIActions(app)}
            i18n={i18nAppInstance}
            navigate={(destination: -1 | string) => {
                if (typeof destination === 'string') {
                    nav.navigate(destination);
                } else {
                    nav.goBack();
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
                <LoginScreen
                    projectImage={
                        <Image
                            style={{ width: '100%' }}
                            resizeMode="contain"
                            source={require('../assets/images/eaton_stacked_logo.png')}
                        />
                    }
                />
            </ErrorContextProvider>
        </AuthContextProvider>
    );
};
