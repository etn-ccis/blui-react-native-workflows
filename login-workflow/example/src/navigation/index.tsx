import React, { ReactNode } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import { AuthContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import i18nAppInstance from '../../translations/i18n';
import { NavigationDrawer } from './navigation-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import { View } from 'react-native';
import { LoginBaseExample } from '../screens/LoginBaseExample';
import { ResetPasswordScreenBaseExample } from '../components/ResetPasswordScreenBaseExample';
import { ForgotPasswordScreenBaseExample } from '../components/ForgotPasswordScreenBaseExample';
import { ContactBaseExample } from '../screens/ContactBaseExample';
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
        backBehavior="none"
    >
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Locations" component={Locations} />
        <RootStack.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
);
const AuthRouter = (): any => {
    const app = useApp();
    return (
        <>
            <AuthContextProvider
                language={app.language}
                actions={ProjectAuthUIActions(app)}
                i18n={i18nAppInstance}
                navigate={navigationRef.navigate}
                routeConfig={{
                    LOGIN: 'Login',
                    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
                    RESET_PASSWORD: 'RESET_PASSWORD',
                    REGISTER_INVITE: 'REGISTER_INVITE',
                    REGISTER_SELF: 'REGISTER_SELF',
                    SUPPORT: 'SUPPORT',
                }}
            >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="LOGIN" component={LoginBaseExample} />
                    <Stack.Screen name="FORGOT_PASSWORD" component={ForgotPasswordScreenBaseExample} />
                    <Stack.Screen name="RESET_PASSWORD" component={ResetPasswordScreenBaseExample} />
                    <Stack.Screen name="SUPPORT" component={ContactBaseExample} />
                    {app.isAuthenticated && <Stack.Screen name="ChangePassword" component={ChangePassword} />}
                </Stack.Navigator>
            </AuthContextProvider>
        </>
    );
};

const RegistrationRouter = (): any => {
    const app = useApp();
    const navigation = useNavigation();
    const routes = {
        LOGIN: 'LOGIN',
        FORGOT_PASSWORD: undefined,
        RESET_PASSWORD: undefined,
        REGISTER_INVITE: 'REGISTER_INVITE',
        REGISTER_SELF: 'REGISTER_SELF',
        SUPPORT: undefined,
    };
    const RegistrationStack = createStackNavigator();
    return (
        <>
            <RegistrationContextProvider
                language={app.language}
                actions={ProjectRegistrationUIActions()}
                i18n={i18nAppInstance}
                routeConfig={routes}
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
                    <RegistrationStack.Screen name="REGISTER_SELF" component={Registration}></RegistrationStack.Screen>
                    <RegistrationStack.Screen
                        name="REGISTER_INVITE"
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
