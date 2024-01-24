import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextStyle,
    ViewStyle,
    Animated,
    Easing,
    I18nManager,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Header } from '@brightlayer-ui/react-native-components';
import RNRestart from 'react-native-restart';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { UserMenuExample } from '../components/UserMenuExample';
import { useThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const styles = (
    theme: ExtendedTheme
): StyleSheet.NamedStyles<{
    content: ViewStyle;
    pxbLogoWrapper: ViewStyle;
    pxbLogo: ViewStyle;
    title: TextStyle;
    subtitle: TextStyle;
    bold: TextStyle;
    divider: ViewStyle;
    openURLButtonText: TextStyle;
}> =>
    StyleSheet.create({
        content: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        pxbLogoWrapper: {
            justifyContent: 'center',
            marginTop: 16,
        },
        pxbLogo: {
            alignSelf: 'center',
            height: 100,
            width: 100,
        },
        title: {
            textAlign: 'center',
            marginBottom: 16,
        },
        subtitle: {
            textAlign: 'center',
        },
        bold: {
            fontWeight: 'bold',
        },
        divider: {
            marginVertical: 24,
        },
        openURLButtonText: {
            color: theme.colors.primary,
            padding: 8,
        },
    });

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export const toggleRTL = (): void => {
    if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
    } else {
        I18nManager.forceRTL(true);
    }
    RNRestart.Restart();
};
const Home: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useExtendedTheme();
    const { t } = useTranslation();
    const { theme: themeType, setTheme } = useThemeContext();

    const defaultStyles = styles(theme);
    const spinValue = new Animated.Value(0);
    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
        })
    ).start();

    return (
        <>
            <Header
                title={`${t('TOOLBAR_MENU.HOME_PAGE')}`}
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
            <SafeAreaView style={defaultStyles.content}>
                <ScrollView>
                    <Button onPress={() => navigation.navigate('WorkFlowCardExample')}>
                        Workflow Card Body Exmaple
                    </Button>

                    <Button onPress={() => navigation.navigate('WorkflowCardActions')}>Workflow Card Actions</Button>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Home;
