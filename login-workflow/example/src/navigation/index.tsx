import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';
import { NavigationDrawer } from './navigation-drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import { WorkflowCardWrapper } from '../screens/WorkflowCardWrapper';
import RegistrationProviderExample from '../screens/RegistrationProviderExample';
import I18nExample from '../screens/I18nExample';
import { RegistrationSuccessScreen } from '../screens/RegistrationSuccessScreen';
import RegistrationContextExample from '../screens/RegistrationContextExample';
import VerifyCodeScreenBaseExample from '../screens/VerifyCodeScreenBaseExample';
import DemoAccountDetails from '../screens/DemoAccountDetails';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
    Home: undefined;
    I18nExample: undefined;
    WorkFlowCardExample: undefined;
    RegistrationSuccessScreen: undefined;
    RegistrationProviderExample: undefined;
    NavigationDrawer: undefined;
    RegistratonContextExample: undefined;
    VerifyCodeScreenBaseExample: undefined;
    AccountDetailsBaseExample: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const CustomDrawerContent = (props: any): any => (
    <View style={{ height: '100%' }}>
        <NavigationDrawer {...props} />
    </View>
);

export const MainRouter = (): any => (
    <NavigationContainer>
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
            <RootStack.Screen name="WorkFlowCardExample" component={WorkflowCardWrapper} />
            <RootStack.Screen name="RegistrationSuccessScreen" component={RegistrationSuccessScreen} />
            <RootStack.Screen name="I18nExample" component={I18nExample} />
            <RootStack.Screen name="RegistratonContextExample" component={RegistrationContextExample} />
            <RootStack.Screen name="RegistrationProviderExample" component={RegistrationProviderExample} />
            <RootStack.Screen name="VerifyCodeScreenBaseExample" component={VerifyCodeScreenBaseExample} />
            <RootStack.Screen name="AccountDetailsBaseExample" component={DemoAccountDetails} />
        </Drawer.Navigator>
    </NavigationContainer>
);
