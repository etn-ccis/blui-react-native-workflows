import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Header } from '@brightlayer-ui/react-native-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { DemoScreen, AuthContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { useThemeContext } from '../contexts/ThemeContext';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { UserMenuExample } from '../components/UserMenuExample';
import { useTranslation } from 'react-i18next';
import { toggleRTL } from './home';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigation } from '@react-navigation/native';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import i18nAppInstance from '../../translations/i18n';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'I18nExample'>;
};

const I18nExample: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useExtendedTheme();
    const { theme: themeType, setTheme } = useThemeContext();
    const { t } = useTranslation();
    const app = useApp();
    const nav = useNavigation();

    return (
        <>
            <Header
                title={'I18n Example'}
                icon={{ name: 'menu' }}
                onIconPress={(): void => {
                    navigation.openDrawer();
                }}
                actionItems={[
                    {
                        icon: { name: 'more' },
                        onPress: (): void => {},
                        component: (
                            <UserMenuExample
                                onToggleRTL={toggleRTL}
                                onToggleTheme={(): void => setTheme(themeType === 'light' ? 'dark' : 'light')}
                            />
                        ),
                    },
                ]}
            />
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
                <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 50,
                            paddingBottom: 50,
                        }}
                    >
                        <Text variant="headlineSmall">App Translations</Text>
                        <Text variant="bodyMedium">{`Registration Translations: ${t(
                            'bluiRegistration:REGISTRATION.STEPS.CREATE_ACCOUNT'
                        )}`}</Text>
                        <Text variant="bodyMedium">{`Common Translations: ${t('bluiCommon:ACTIONS.OKAY')}`}</Text>
                    </View>
                    <Text variant="headlineSmall">Workflow Package Translations</Text>
                    <DemoScreen />

                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 50,
                            paddingBottom: 50,
                        }}
                    >
                        <Text variant="headlineSmall">Auth Translations</Text>
                        <Text variant="bodyMedium">{`Auth Translations: ${t('bluiAuth:FORGOT_PASSWORD.ERROR')}`}</Text>
                        <Text variant="bodyMedium">{`Common Translations: ${t('bluiCommon:ACTIONS.OKAY')}`}</Text>
                    </View>
                </SafeAreaView>
            </AuthContextProvider>
        </>
    );
};

export default I18nExample;
