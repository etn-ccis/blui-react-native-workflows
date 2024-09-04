import React, { ReactNode, useCallback } from 'react';
import { NavigationContainer, createNavigationContainerRef, useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import {
    AuthContextProvider,
    ContactSupportScreen,
    ResetPasswordScreen,
    RegistrationContextProvider,
    ForgotPasswordScreen,
    OktaAuthContextProvider,
} from '@brightlayer-ui/react-native-auth-workflow';
import i18nAppInstance from '../../translations/i18n';
import { NavigationDrawer } from './navigation-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, View } from 'react-native';

import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';

import { ChangePassword } from '../screens/ChangePassword';
import { Registration } from '../screens/Registration';
import { RegistrationInvite } from '../screens/RegistrationInvite';

import { Homepage } from '../screens/Homepage';
import Locations from '../screens/Locations';
import Dashboard from '../screens/Dashboard';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { OktaLogin } from '../screens/OktaLogin';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const LoginStack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export type RootStackParamList = {
    Homepage: undefined;
    Dashboard: undefined;
    Locations: undefined;
    NavigationDrawer: undefined;
};

const CustomDrawerContent = (props: any): any => (
    <View style={{ height: '100%' }}>
        <NavigationDrawer {...props} />
    </View>
);

const AuthRouter = (): any => {
    const app = useApp();
    const { email, rememberMe } = app.loginData;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const LoginNavigatorComponent = useCallback(
        () => (
            <LoginStack.Navigator screenOptions={{ headerShown: false }}>
                <LoginStack.Screen name="Login" component={OktaLogin} />
                <LoginStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <LoginStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                <LoginStack.Screen name="ContactSupport" component={ContactSupportScreen} />
            </LoginStack.Navigator>
        ),
        []
    );

    const DrawerNavigatorComponent = (): any => (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerStyle: { backgroundColor: 'transparent' },
            }}
            drawerContent={(props: any): ReactNode => <CustomDrawerContent {...props} />}
            backBehavior="history"
            initialRouteName="LoginScreen"
        >
            {!app.isAuthenticated && <Drawer.Screen name="LoginScreen" component={LoginNavigatorComponent} />}

            {app.isAuthenticated && (
                <>
                    <Drawer.Screen name="Homepage" component={Homepage} />
                    <Drawer.Screen name="Dashboard" component={Dashboard} />
                    <Drawer.Screen name="Locations" component={Locations} />

                    <Drawer.Screen
                        name="ContactSupport"
                        options={{
                            swipeEnabled: false,
                        }}
                        component={ContactSupportScreen}
                    />

                    <Drawer.Screen
                        name="ChangePassword"
                        options={{
                            swipeEnabled: false,
                        }}
                        component={ChangePassword}
                    />
                </>
            )}
        </Drawer.Navigator>
    );

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
                }}
                rememberMeDetails={{ email: rememberMe ? email : '', rememberMe: rememberMe }}
            >
                <OktaAuthContextProvider
                language={app.language}
                i18n={i18nAppInstance}
                navigate={(destination: -1 | string) => {
                    if (typeof destination === 'string') {
                        switch (destination) {
                            case 'SelfRegister':
                            case 'RegisterInvite':
                                navigation.navigate('RegistrationProviderExample', { screen: destination });
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
                }}
                >
                {DrawerNavigatorComponent()}
                </OktaAuthContextProvider>
            </AuthContextProvider>
        </>
    );
};

const RegistrationRouter = (): any => {
    const app = useApp();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const RegistrationStack = createNativeStackNavigator();

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
                        switch (destination) {
                            case 'SelfRegister':
                            case 'RegisterInvite':
                                navigation.navigate('RegistrationProviderExample', { screen: destination });
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
    const { height, width } = Dimensions.get('screen');
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={'AuthProviderExample'}
                screenOptions={{
                    headerShown: false,
                    orientation: width >= 768 && height >= 768 ? 'all' : 'portrait',
                }}
            >
                <Stack.Screen name="AuthProviderExample" component={AuthRouter} />
                <Stack.Screen name="RegistrationProviderExample" component={RegistrationRouter} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
