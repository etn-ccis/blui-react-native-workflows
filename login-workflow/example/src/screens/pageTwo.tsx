import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { EmptyState, Header, IconFamily, InfoListItemProps, UserMenu } from '@brightlayer-ui/react-native-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { useSecurityActions } from '@brightlayer-ui/react-native-auth-workflow';
import { LocalStorage } from '../store/local-storage';
import { useTheme } from 'react-native-paper';
import { ThemedAvatar as Avatar } from '@brightlayer-ui/react-native-components/themed';
import * as Colors from '@brightlayer-ui/colors';

const Event: IconFamily = { name: 'event', direction: 'ltr' };
const MenuIcon: IconFamily = { name: 'menu', direction: 'ltr' };
const LockIcon: IconFamily = { name: 'lock', direction: 'ltr' };
const ExitToAppIcon: IconFamily = { name: 'exit-to-app', direction: 'ltr' };

const styles = (): StyleSheet.NamedStyles<{
    content: ViewStyle;
    scrollViewContent: ViewStyle;
}> =>
    StyleSheet.create({
        content: {
            flex: 1,
        },
        scrollViewContent: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'PageTwo'>;
};

const PageTwo: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useTheme();
    const defaultStyles = styles();
    const securityHelper = useSecurityActions();
    let statusBar: JSX.Element = <></>;

    statusBar =
        Platform.OS === 'ios' ? (
            <StatusBar
                backgroundColor={theme.colors?.primaryPalette?.main || theme.colors.primary}
                barStyle={theme.dark ? 'light-content' : 'dark-content'}
            />
        ) : (
            <StatusBar
                backgroundColor={theme.colors?.primaryPalette?.dark || theme.colors.primary}
                barStyle={theme.dark ? 'light-content' : 'dark-content'}
            />
        );

    const changePassword = (): void => {
        securityHelper.showChangePassword();
    };

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    const menuItems: InfoListItemProps[] = [
        { title: 'Change Password', icon: LockIcon, onPress: (): void => changePassword() },
        { title: 'Log Out', icon: ExitToAppIcon, onPress: (): void => logOut() },
    ];

    return (
        <>
            {statusBar}
            <Header
                title={'Page Two'}
                backgroundColor={theme.dark ? Colors.black[800] : theme.colors.primary}
                icon={MenuIcon}
                onIconPress={(): void => {
                    // @ts-ignore
                    navigation.openDrawer();
                }}
                actionItems={[
                    {
                        component: (
                            <UserMenu
                                menuItems={menuItems}
                                iconColor={theme.dark ? Colors.black[200] : Colors.gray[500]}
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
                <ScrollView contentContainerStyle={defaultStyles.scrollViewContent}>
                    <EmptyState
                        icon={Event}
                        title={'Coming Soon'}
                        description={'Replace this page with your own content'}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default PageTwo;
