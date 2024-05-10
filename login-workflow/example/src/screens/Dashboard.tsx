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
import { EmptyState, Header } from '@brightlayer-ui/react-native-components';
import RNRestart from 'react-native-restart';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { UserMenuComponent } from '../components/UserMenuComponent';
import { useThemeContext } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { IconFamily } from '@brightlayer-ui/react-native-components/core/__types__';
import { DrawerActions } from '@react-navigation/native';

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
    navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const toggleRTL = (): void => {
    if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
    } else {
        I18nManager.forceRTL(true);
    }
    RNRestart.Restart();
};
const Dashboard: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useExtendedTheme();
    const { t } = useTranslation();
    const { theme: themeType, setTheme } = useThemeContext();

    const defaultStyles = styles(theme);
    const spinValue = new Animated.Value(0);
    const Event: IconFamily = { family: 'material', name: 'event', direction: 'ltr' };
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
                title={`${t('DRAWER_MENU.DASHBOARD')}`}
                icon={{ name: 'menu' }}
                onIconPress={(): void => {
                    navigation.dispatch(DrawerActions.openDrawer());
                }}
                actionItems={[
                    {
                        icon: { name: 'more' },
                        onPress: (): void => {},
                        component: (
                            <UserMenuComponent
                                onToggleRTL={toggleRTL}
                                onToggleTheme={(): void => setTheme(themeType === 'light' ? 'dark' : 'light')}
                            />
                        ),
                    },
                ]}
            />
            <SafeAreaView style={defaultStyles.content}>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <EmptyState
                        icon={Event}
                        title={`${t('DRAWER_MENU.DASHBOARD')}`}
                        description={`${t('PAGE_DETAILS.AUTHORISED_MESSAGE')}`}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Dashboard;
