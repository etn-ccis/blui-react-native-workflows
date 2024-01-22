import React, { useCallback } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Linking,
    TextStyle,
    ViewStyle,
    View,
    Animated,
    Easing,
    I18nManager,
} from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
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

const OpenURLButton = (props: any): JSX.Element => {
    const { url, title } = props;
    const theme = useExtendedTheme();
    const defaultStyles = styles(theme);

    const handlePress = useCallback(async () => {
        await Linking.openURL(url);
    }, [url]);

    return (
        <Button onPress={(): void => handlePress()} labelStyle={defaultStyles.openURLButtonText} uppercase={false}>
            {title}
        </Button>
    );
};

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

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

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
                    <View style={defaultStyles.pxbLogoWrapper}>
                        <Animated.View style={[defaultStyles.pxbLogo, { transform: [{ rotate: spin }] }]}>
                            {/* <Logo height={100} width={100} fill={'#007bc1'} /> */}
                        </Animated.View>
                    </View>
                    <Text style={defaultStyles.title} variant="headlineSmall">
                        Welcome to Brightlayer UI
                    </Text>
                    <Text style={defaultStyles.subtitle} variant="titleLarge">
                        Edit <Text style={defaultStyles.bold}>screens/home.tsx</Text> and save to reload
                    </Text>
                    <Divider style={defaultStyles.divider} />
                    <Button onPress={() => navigation.navigate('WorkflowCardInstructions')}>
                        Workflow Card Instructions
                    </Button>
                    <OpenURLButton title={'Brightlayer UI Documentation'} url={'https://brightlayer-ui.github.io/'} />
                    <OpenURLButton
                        title={'React Native Getting Started Guide'}
                        url={'https://brightlayer-ui.github.io/development/frameworks-mobile/react-native'}
                    />
                    <OpenURLButton
                        title={'Design Pattern Descriptions'}
                        url={'https://brightlayer-ui.github.io/patterns'}
                    />
                    <OpenURLButton
                        title={'React Native Component Library'}
                        url={'https://brightlayer-ui-components.github.io/react-native/'}
                    />
                    <OpenURLButton title={'Visit Us on GitHub'} url={'https://github.com/etn-ccis?q=blui'} />
                    <OpenURLButton
                        title={'Design Pattern Source on GitHub'}
                        url={'https://github.com/etn-ccis/blui-react-native-design-patterns'}
                    />
                    <OpenURLButton title={'Release Roadmap'} url={'https://brightlayer-ui.github.io/roadmap'} />
                    <OpenURLButton
                        title={'Send Feedback or Suggestions'}
                        url={'https://brightlayer-ui.github.io/community/contactus'}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Home;
