import React from 'react';
import { Image } from 'react-native';
import {
    OktaAuthContextProvider,
    OktaLoginScreenProps,
    OktaRedirectLoginScreen,
} from '@brightlayer-ui/react-native-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import i18nAppInstance from '../../translations/i18n';
import oktaConfig from '../../okta.config';

export const OktaLogin: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = () => {
    const app = useApp();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <OktaAuthContextProvider
            language={app.language}
            i18n={i18nAppInstance}
            navigate={(destination: -1 | string) => {
                if (typeof destination === 'string') {
                    switch (destination) {
                        case 'SelfRegister':
                        case 'RegisterInvite':
                            navigation.navigate('RegistrationProviderExample', { screen: destination });
                            break;
                        default:
                            navigation.navigate(destination);
                            break;
                    }
                } else if (destination === -1) {
                    navigation.goBack();
                }
            }}
            routeConfig={{
                LOGIN: 'Login',
                FORGOT_PASSWORD: 'ForgotPassword',
                RESET_PASSWORD: 'ResetPassword',
                REGISTER_INVITE: 'RegisterInvite',
                REGISTER_SELF: 'SelfRegister',
                SUPPORT: 'ContactSupport',
            }}
        >
            <OktaRedirectLoginScreen
                projectImage={
                    <Image
                        style={{ width: '100%' }}
                        resizeMode="contain"
                        source={require('../assets/images/eaton_stacked_logo.png')}
                    />
                }
                // eslint-disable-next-line
                oktaConfigObject={oktaConfig.oidc}
            />
        </OktaAuthContextProvider>
    );
};
