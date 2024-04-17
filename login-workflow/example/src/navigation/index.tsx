import React, { ReactNode } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import {
    AuthContextProvider,
    ContactSupportScreen,
    ResetPasswordScreen,
} from '@brightlayer-ui/react-native-auth-workflow';
import i18nAppInstance from '../../translations/i18n';
import { NavigationDrawer } from './navigation-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { View } from 'react-native';
import { LoginBaseExample } from '../screens/LoginBaseExample';
import { ForgotPasswordScreenBaseExample } from '../components/ForgotPasswordScreenBaseExample';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { ChangePassword } from '../screens/ChangePassword';
import { Registration } from '../screens/Registration';
import Locations from '../screens/Locations';
import Dashboard from '../screens/Dashboard';

import { RegistrationContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { RegistrationInvite } from '../screens/RegistrationInvite';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const navigationRef = createNavigationContainerRef();

export type RootStackParamList = {
    Home: undefined;
    Dashboard: undefined;
    Locations: undefined;
    RegistrationProviderExample: undefined;
    AuthProviderExample: undefined;
    ResetPasswordScreenBaseExample: undefined;
    ForgotPasswordScreenBaseExample: undefined;
    Contact: undefined;
    ChangePassword: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const CustomDrawerContent = (props: any): any => (
    <View style={{ height: '100%' }}>
        <NavigationDrawer {...props} />
    </View>
);
const AppRouter = (): any => (
    <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
            drawerType: 'front',
            drawerStyle: { backgroundColor: 'transparent' },
        }}
        drawerContent={(props: any): ReactNode => <CustomDrawerContent {...props} />}
    >
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Locations" component={Locations} />
        <RootStack.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
);
const AuthRouter = (): any => {
    const app = useApp();
    const navigation = useNavigation();
    return (
        <>
            <AuthContextProvider
                language={app.language}
                actions={ProjectAuthUIActions(app)}
                i18n={i18nAppInstance}
                navigate={(destination: -1 | string) => {
                    if (typeof destination === 'string') {
                        navigation.navigate(destination);
                    } else {
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
                }}
            >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="Login"
                >
                    <Stack.Screen name="Login" component={LoginBaseExample} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreenBaseExample} />
                    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                    <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
                    {app.isAuthenticated && <Stack.Screen name="ChangePassword" component={ChangePassword} />}
                </Stack.Navigator>
            </AuthContextProvider>
        </>
    );
};

const RegistrationRouter = (): any => {
    const app = useApp();
    const navigation = useNavigation();
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
                }}
                navigate={(destination: -1 | string) => {
                    if (typeof destination === 'string') {
                        navigation.navigate(destination);
                    } else {
                        navigation.goBack();
                    }
                }}
            >
                <RegistrationStack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <RegistrationStack.Screen name="SelfRegister" component={Registration}></RegistrationStack.Screen>
                    <RegistrationStack.Screen
                        name="RegisterInvite"
                        component={RegistrationInvite}
                    ></RegistrationStack.Screen>
                </RegistrationStack.Navigator>
            </RegistrationContextProvider>
        </>
    );
};
export const MainRouter = (): any => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName="AuthProviderExample"
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
