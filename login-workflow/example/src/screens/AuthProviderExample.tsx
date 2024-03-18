import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useApp } from '../contexts/AppContextProvider';
import i18nAppInstance from '../../translations/i18n';
import { AuthContextProvider, ErrorContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { RootStackParamList } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { ChangePassword } from './ChangePassword';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'RegistrationProviderExample'>;
};

const RegistrationProviderExample: React.FC<AppProps> = (): JSX.Element => {
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
                <ChangePassword />
            </ErrorContextProvider>
        </AuthContextProvider>
    );
};
export default RegistrationProviderExample;
