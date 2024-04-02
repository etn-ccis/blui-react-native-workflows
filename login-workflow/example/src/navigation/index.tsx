import React, { ReactNode } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import { AuthContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import i18nAppInstance from '../../translations/i18n';
import { NavigationDrawer } from './navigation-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { View } from 'react-native';
import { Login } from '../screens/Login';
import { ResetPasswordScreenBaseExample } from '../components/ResetPasswordScreenBaseExample';
import { ForgotPasswordScreenBaseExample } from '../components/ForgotPasswordScreenBaseExample';
import { ContactBaseExample } from '../screens/ContactBaseExample';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { ChangePassword } from '../screens/ChangePassword';
import { Registration } from '../screens/Registration';
import Locations from '../screens/Locations';
import Dashboard from '../screens/Dashboard';

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
        <RootStack.Screen name="ChangePassword" component={ChangePassword} />
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
                    <Stack.Screen name="LOGIN" component={Login} />
                    <Stack.Screen name="FORGOT_PASSWORD" component={ForgotPasswordScreenBaseExample} />
                    <Stack.Screen name="RESET_PASSWORD" component={ResetPasswordScreenBaseExample} />
                    <Stack.Screen name="SUPPORT" component={ContactBaseExample} />
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
