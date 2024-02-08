import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Header } from '@brightlayer-ui/react-native-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { DemoScreen } from '@brightlayer-ui/react-native-auth-workflow';
import { useThemeContext } from '../context/ThemeContext';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { UserMenuExample } from '../components/UserMenuExample';
import { useTranslation } from 'react-i18next';
import { toggleRTL } from './home';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'I18nExample'>;
};

const I18nExample: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useExtendedTheme();
    const { theme: themeType, setTheme } = useThemeContext();
    const { t } = useTranslation();
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
            </SafeAreaView>
        </>
    );
};

export default I18nExample;
