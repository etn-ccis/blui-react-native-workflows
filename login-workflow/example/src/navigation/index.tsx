import React, { ReactNode } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import {
    RegistrationWorkflow,
    RegistrationContextProvider,
    AuthContextProvider,
} from '@brightlayer-ui/react-native-auth-workflow';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';
import { NavigationDrawer } from './navigation-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { View } from 'react-native';
import AuthProviderExample from '../screens/AuthProviderExample';
import { Login } from '../screens/Login';
import { ForgotPasswordScreenBaseExample } from '../components/ForgotPasswordScreenBaseExample';
import RegistrationProviderExample from '../screens/RegistrationProviderExample';
import { ContactBaseExample } from '../screens/ContactBaseExample';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { ChangePassword } from '../screens/ChangePassword';
import { Registration } from '../screens/Registration';

const getAuthState = (): any => ({
    isAuthenticated: true,
});
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const navigationRef = createNavigationContainerRef();

export type RootStackParamList = {
    Home: undefined;
    Dashboard: undefined;
    Locations: undefined;
    RegistrationProviderExample: undefined;
    AuthProviderExample: undefined;
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
        <RootStack.Screen name="ChangePassword" component={ChangePassword} />
    </Drawer.Navigator>
);
const RegistrationRouter = (): any => {
    const app = useApp();
    const routes = {
        LOGIN: 'LOGIN',
        FORGOT_PASSWORD: undefined,
        RESET_PASSWORD: undefined,
        REGISTER_INVITE: 'REGISTER_INVITE',
        REGISTER_SELF: 'REGISTER_SELF',
        SUPPORT: undefined,
    };
    return (
        <RegistrationContextProvider
            language={app.language}
            actions={ProjectRegistrationUIActions()}
            i18n={i18nAppInstance}
            routeConfig={routes}
            navigate={navigationRef.navigate}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="REGISTER_INVITE">
                    {() => (
                        <RegistrationWorkflow
                            isInviteRegistration
                            initialRegistrationParams={{ code: '123', email: 'aa@aa.aa' }}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="REGISTER_SELF">{() => <RegistrationWorkflow />}</Stack.Screen>
            </Stack.Navigator>
        </RegistrationContextProvider>
    );
};
const AuthRouter = (): any => {
    const app = useApp();
    const routes = {
        LOGIN: 'LOGIN',
        FORGOT_PASSWORD: undefined,
        RESET_PASSWORD: undefined,
        REGISTER_INVITE: 'REGISTER_INVITE',
        REGISTER_SELF: 'REGISTER_SELF',
        SUPPORT: undefined,
    };
    return (
        <>
            <AuthContextProvider
                language={app.language}
                actions={ProjectAuthUIActions(app)}
                i18n={i18nAppInstance}
                navigate={navigationRef.navigate}
                routeConfig={{
                    LOGIN: 'Login',
                    FORGOT_PASSWORD: undefined,
                    RESET_PASSWORD: undefined,
                    REGISTER_INVITE: undefined,
                    REGISTER_SELF: 'REGISTER_SELF',
                    SUPPORT: undefined,
                }}
            >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="LOGIN" component={Login} />
                    <Stack.Screen name="REGISTER_SELF" component={Registration} />
                    <Stack.Screen name="REGISTER_INVITE" component={Registration} />
                </Stack.Navigator>
            </AuthContextProvider>
        </>
    );
};
export const MainRouter = (): any => {
    const app = useApp();
    // Retrieve data that you are storing about the logged-in status of the user

    return (
        <NavigationContainer ref={navigationRef}>
            {app.isAuthenticated ? (
                <AppRouter />
            ) : (
                <>
                    <AuthRouter />
                </>
            )}
        </NavigationContainer>
    );
};
