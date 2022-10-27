import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { EmptyState, Header, IconFamily, InfoListItemProps, UserMenu } from '@brightlayer-ui/react-native-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { useSecurityActions } from '@brightlayer-ui/react-native-auth-workflow';
import { LocalStorage } from '../store/local-storage';
import { Avatar } from 'react-native-paper';
import * as Colors from '@brightlayer-ui/colors';

const Event: IconFamily = { name: 'event', direction: 'rtl' };
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
    const defaultStyles = styles();
    const securityHelper = useSecurityActions();

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
            <Header
                title={'Page Two'}
                icon={MenuIcon}
                onIconPress={(): void => {
                    navigation.openDrawer();
                }}
                actionItems={[
                    {
                        component: (
                            <UserMenu
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
