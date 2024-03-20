import React, { ReactNode } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import { RegistrationWorkflow, RegistrationContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';
import Home from '../screens/home';
import { NavigationDrawer } from './navigation-drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import RegistrationProviderExample from '../screens/RegistrationProviderExample';
import AuthProviderExample from '../screens/AuthProviderExample';
import { Login } from '../screens/Login';
import { ForgotPasswordScreenBaseExample } from '../components/ForgotPasswordScreenBaseExample';

const getAuthState = (): any => ({
    isAuthenticated: true,
});
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const navigationRef = createNavigationContainerRef();

export type RootStackParamList = {
    Home: undefined;
    RegistrationProviderExample: undefined;
    AuthProviderExample: undefined;
    ForgotPasswordScreenBaseExample: undefined;
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
        <RootStack.Screen
            name="RegistrationProviderExample"
            component={RegistrationProviderExample}
            options={{ gestureEnabled: false }}
        />
        <RootStack.Screen
            name="AuthProviderExample"
            component={AuthProviderExample}
            options={{ gestureEnabled: false }}
        />
        <RootStack.Screen
            name="ForgotPasswordScreenBaseExample"
            component={ForgotPasswordScreenBaseExample}
            options={{ gestureEnabled: false }}
        />
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
                <Stack.Screen name="LOGIN" component={Login} />
            </Stack.Navigator>
        </RegistrationContextProvider>
    );
};
export const MainRouter = (): any => {
    const authState = getAuthState();
    // Retrieve data that you are storing about the logged-in status of the user

    return (
        <NavigationContainer ref={navigationRef}>
            {authState.isAuthenticated ? <AppRouter /> : <RegistrationRouter />}
        </NavigationContainer>
    );
};
