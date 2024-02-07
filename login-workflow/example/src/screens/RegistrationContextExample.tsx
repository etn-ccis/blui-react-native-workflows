import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/navigation';
import { Header } from '@brightlayer-ui/react-native-components';
import { UserMenuExample } from '../components/UserMenuExample';
import { toggleRTL } from './home';
import { useThemeContext } from '../context/ThemeContext';
import { SafeAreaView, View } from 'react-native';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { Text } from 'react-native-paper';
import { RegistrationContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { useApp } from '../context/AppContextProvider';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'RegistratonContextExample'>;
};

const RegistratonContextExample: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const { theme: themeType, setTheme } = useThemeContext();
    const theme = useExtendedTheme();
    // const app = useApp();

    return (
        <>
            <Header
                title={'Registration'}
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
                <View>
                    <Text>Hello</Text>
                    <RegistrationContextProvider
                        language={'en'}
                        actions={ProjectRegistrationUIActions()}
                        i18n={i18nAppInstance}
                        navigate={function (destination: string | number): void {
                            throw new Error('Function not implemented.');
                        }}
                        routeConfig={{
                            LOGIN: undefined,
                            FORGOT_PASSWORD: undefined,
                            RESET_PASSWORD: undefined,
                            REGISTER_INVITE: undefined,
                            REGISTER_SELF: undefined,
                            SUPPORT: undefined,
                        }}
                    >
                        <Text>Test</Text>
                    </RegistrationContextProvider>
                </View>
            </SafeAreaView>
        </>
    );
};
export default RegistratonContextExample;
