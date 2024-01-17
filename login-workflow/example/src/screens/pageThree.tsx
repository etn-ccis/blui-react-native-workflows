import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Header, IconFamily, InfoListItemProps, UserMenu } from '@brightlayer-ui/react-native-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { WorkflowCardBody, useSecurityActions } from '@brightlayer-ui/react-native-auth-workflow';
import { LocalStorage } from '../store/local-storage';
import { Avatar, HelperText, TextInput, useTheme } from 'react-native-paper';
import * as Colors from '@brightlayer-ui/colors';

const MenuIcon: IconFamily = { name: 'menu', direction: 'ltr' };
const LockIcon: IconFamily = { name: 'lock', direction: 'ltr' };
const ExitToAppIcon: IconFamily = { name: 'exit-to-app', direction: 'ltr' };

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'PageThree'>;
};

const PageThree: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useTheme();
    const [errorFilledText, setErrorFilledText] = React.useState('Hello');
    const [hasError, setHasError] = React.useState(true);
    // const defaultStyles = styles();
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
                title={'Page Three'}
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
            <SafeAreaView>
                <ScrollView>
                    <WorkflowCardBody>
                        <TextInput
                            label="TextInput"
                            mode="flat"
                            left={<TextInput.Icon icon="email" />}
                            right={<TextInput.Icon icon="menu-down" />}
                            value={errorFilledText}
                            underlineColor={theme.colors.surface}
                            onChangeText={(value: string): void => {
                                setErrorFilledText(value);
                                setHasError(value.length > 4);
                            }}
                            error={hasError}
                        />
                        <HelperText type="error" visible={hasError} style={{ marginBottom: 8 }}>
                            Error Message
                        </HelperText>
                    </WorkflowCardBody>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default PageThree;
