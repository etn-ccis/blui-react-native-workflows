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
} from 'react-native';
import { Avatar, Button, Divider, useTheme } from 'react-native-paper';
import { Body1, H4, Header, InfoListItemProps, UserMenu, wrapIcon } from '@brightlayer-ui/react-native-components';
import { Theme } from 'react-native-paper/lib/typescript/types';
// @ts-ignore
import Logo from '../../assets/images/Logo.svg';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { useSecurityActions } from '@brightlayer-ui/react-native-auth-workflow';
import { LocalStorage } from '../store/local-storage';
import * as Colors from '@brightlayer-ui/colors';

const MenuIcon = wrapIcon({ IconClass: MatIcon, name: 'menu', flip: false });
const LockIcon = wrapIcon({ IconClass: MatIcon, name: 'lock', flip: false });
const ExitToAppIcon = wrapIcon({ IconClass: MatIcon, name: 'exit-to-app', flip: false });

const styles = (
    theme: Theme
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
            color: theme.colors.text,
            padding: 8,
        },
    });

const OpenURLButton = (props: any): JSX.Element => {
    const { url, title } = props;
    const theme = useTheme();
    const defaultStyles = styles(theme);

    const handlePress = useCallback(async () => {
        await Linking.openURL(url);
    }, [url]);

    return (
        <Button
            onPress={(): Promise<void> => handlePress()}
            labelStyle={defaultStyles.openURLButtonText}
            uppercase={false}
        >
            {title}
        </Button>
    );
};

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const Home: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useTheme();
    const defaultStyles = styles(theme);
    const spinValue = new Animated.Value(0);
    const securityHelper = useSecurityActions();

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

    const changePassword = (): void => {
        securityHelper.showChangePassword();
    };

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    const menuItems: InfoListItemProps[] = [
        { title: 'Change Password', IconClass: LockIcon, onPress: (): void => changePassword() },
        { title: 'Log Out', IconClass: ExitToAppIcon, onPress: (): void => logOut() },
    ];

    return (
        <>
            <Header
                title={'Home Page'}
                backgroundColor={theme.dark ? Colors.black[800] : theme.colors.primary}
                navigation={{
                    icon: MenuIcon,
                    onPress: (): void => {
                        // @ts-ignore
                        navigation.openDrawer();
                    },
                }}
                actionItems={[
                    {
                        component: (
                            <UserMenu
                                iconColor={theme.dark ? Colors.black[200] : Colors.gray[500]}
                                menuItems={menuItems}
                                avatar={
                                    <Avatar.Text
                                        label="UN"
                                        size={40}
                                        color={Colors.blue[500]}
                                        style={{ backgroundColor: Colors.blue[50] }}
                                    />
                                }
                            />
                        ),
                    },
                ]}
            />
            <SafeAreaView style={defaultStyles.content}>
                <ScrollView>
                    <View style={defaultStyles.pxbLogoWrapper}>
                        <Animated.View style={[defaultStyles.pxbLogo, { transform: [{ rotate: spin }] }]}>
                            <Logo height={100} width={100} fill={'#007bc1'} />
                        </Animated.View>
                    </View>
                    <H4 style={defaultStyles.title}>Welcome to Brightlayer UI.</H4>
                    <Body1 style={defaultStyles.subtitle}>
                        Edit <Body1 style={defaultStyles.bold}>pages/home.tsx</Body1> and save to reload.
                    </Body1>
                    <Divider style={defaultStyles.divider} />
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
                        title={'Brightlayer UI React Native Component Library'}
                        url={'https://brightlayer-ui-components.github.io/react-native/'}
                    />
                    <OpenURLButton title={'Visit Us on GitHub'} url={'https://github.com/brightlayer-ui'} />
                    <OpenURLButton
                        title={'Design Pattern Source on GitHub'}
                        url={'https://github.com/brightlayer-ui/react-native-design-patterns'}
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
