import React, { ReactNode } from 'react';
import { NavigationContainer, createNavigationContainerRef, useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import {
    AuthContextProvider,
    ContactSupportScreen,
    ResetPasswordScreen,
    RegistrationContextProvider,
    ForgotPasswordScreen,
} from '@brightlayer-ui/react-native-auth-workflow';
import i18nAppInstance from '../../translations/i18n';
import { NavigationDrawer } from './navigation-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';

import { Login } from '../screens/Login';
import { ChangePassword } from '../screens/ChangePassword';
import { Registration } from '../screens/Registration';
import { RegistrationInvite } from '../screens/RegistrationInvite';

import { Homepage } from '../screens/Homepage';
import Locations from '../screens/Locations';
import Dashboard from '../screens/Dashboard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const navigationRef = createNavigationContainerRef();

export type RootStackParamList = {
    Homepage: undefined;
    Dashboard: undefined;
    Locations: undefined;
    NavigationDrawer: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const CustomDrawerContent = (props: any): any => (
    <View style={{ height: '100%' }}>
        <NavigationDrawer {...props} />
    </View>
);
const AppRouter = (): any => {
    const app = useApp();
    return (
        <Drawer.Navigator
            initialRouteName="Homepage"
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerStyle: { backgroundColor: 'transparent' },
            }}
            drawerContent={(props: any): ReactNode => <CustomDrawerContent {...props} />}
        >
            {app.isAuthenticated && <RootStack.Screen name="Homepage" component={Homepage} />}
            {app.isAuthenticated && <RootStack.Screen name="Dashboard" component={Dashboard} />}
            {app.isAuthenticated && <RootStack.Screen name="Locations" component={Locations} />}
        </Drawer.Navigator>
    );
};
const AuthRouter = (): any => {
    const app = useApp();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    return (
        <>
            <AuthContextProvider
                language={app.language}
                actions={ProjectAuthUIActions(app)}
                i18n={i18nAppInstance}
                navigate={(destination: -1 | string) => {
                    if (typeof destination === 'string') {
                        switch (destination) {
                            case 'SelfRegister':
                            case 'RegisterInvite':
                                navigation.navigate('RegistrationProviderExample', { screen: destination });
                                break;
                            case 'Home':
                                navigation.navigate('AppProviderExample', { screen: destination });
                                break;
                            default:
                                navigation.navigate(destination);
                                break;
                        }
                    } else if (destination === -1) {
                        navigation.goBack();
                    }
                }}
                routeConfig={{
                    LOGIN: 'Login',
                    FORGOT_PASSWORD: 'ForgotPassword',
                    RESET_PASSWORD: 'ResetPassword',
                    REGISTER_INVITE: 'RegisterInvite',
                    REGISTER_SELF: 'SelfRegister',
                    SUPPORT: 'ContactSupport',
                    LANDING_PAGE: 'Home',
                }}
            >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="Login"
                >
                    {!app.isAuthenticated && <Stack.Screen name="Login" component={Login} />}
                    {!app.isAuthenticated && <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />}
                    {!app.isAuthenticated && <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />}
                    <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
                    {app.isAuthenticated && <Stack.Screen name="ChangePassword" component={ChangePassword} />}
                </Stack.Navigator>
            </AuthContextProvider>
        </>
    );
};

const RegistrationRouter = (): any => {
    const app = useApp();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const RegistrationStack = createStackNavigator();
    return (
        <>
            <RegistrationContextProvider
                language={app.language}
                actions={ProjectRegistrationUIActions()}
                i18n={i18nAppInstance}
                routeConfig={{
                    LOGIN: 'Login',
                    FORGOT_PASSWORD: 'ForgotPassword',
                    RESET_PASSWORD: 'ResetPassword',
                    REGISTER_INVITE: 'RegisterInvite',
                    REGISTER_SELF: 'SelfRegister',
                    SUPPORT: 'ContactSupport',
                    LANDING_PAGE: 'Home',
                }}
                navigate={(destination: -1 | string) => {
                    if (typeof destination === 'string') {
                        switch (destination) {
                            case 'SelfRegister':
                            case 'RegisterInvite':
                                navigation.navigate('RegistrationProviderExample', { screen: destination });
                                break;
                            case 'Home':
                                navigation.navigate('AppProviderExample', { screen: destination });
                                break;
                            default:
                                navigation.navigate(destination);
                                break;
                        }
                    } else if (destination === -1) {
                        navigation.goBack();
                    }
                }}
            >
                <RegistrationStack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="SelfRegister"
                >
                    {!app.isAuthenticated && (
                        <RegistrationStack.Screen
                            name="SelfRegister"
                            component={Registration}
                        ></RegistrationStack.Screen>
                    )}
                    {!app.isAuthenticated && (
                        <RegistrationStack.Screen
                            name="RegisterInvite"
                            component={RegistrationInvite}
                        ></RegistrationStack.Screen>
                    )}
                </RegistrationStack.Navigator>
            </RegistrationContextProvider>
        </>
    );
};
export const MainRouter = (): any => {
    const app = useApp();
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={app.isAuthenticated ? 'AppProviderExample' : 'AuthProviderExample'}
                screenOptions={{
                    headerShown: false,
                    animationEnabled: false,
                }}
            >
                <Stack.Screen name="AppProviderExample" component={AppRouter} />
                <Stack.Screen name="AuthProviderExample" component={AuthRouter} />
                <Stack.Screen name="RegistrationProviderExample" component={RegistrationRouter} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
