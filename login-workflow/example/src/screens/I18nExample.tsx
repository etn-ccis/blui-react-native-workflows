import React from 'react';
import { SafeAreaView } from 'react-native';
import { Header } from '@brightlayer-ui/react-native-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { DemoScreen } from '@brightlayer-ui/react-native-auth-workflow';
import { useThemeContext } from '../context/ThemeContext';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { UserMenuExample } from '../components/UserMenuExample';
import { toggleRTL } from './home';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'I18nExample'>;
};

const I18nExample: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useExtendedTheme();
    const { theme: themeType, setTheme } = useThemeContext();

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
                <DemoScreen />
            </SafeAreaView>
        </>
    );
};

export default I18nExample;
