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
import VerifyCodeScreenBaseExample from '../screens/VerifyCodeScreenBaseExample';
import DemoAccountDetails from '../screens/DemoAccountDetails';
import CreatePasswordScreenBaseExample from '../screens/CreatePasswordScreenBaseExample';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import SmokeTestExample from '../screens/SmokeTestExample';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
    Home: undefined;
    I18nExample: undefined;
    WorkFlowCardExample: undefined;
    RegistrationSuccessScreen: undefined;
    RegistrationProviderExample: undefined;
    NavigationDrawer: undefined;
    VerifyCodeScreenBaseExample: undefined;
    AccountDetailsBaseExample: undefined;
    CreatePasswordScreenBaseExample: undefined;
    CreateAccountBaseExample: undefined;
    SmokeTestExample: undefined;
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
            {/* <RootStack.Screen name="WorkFlowCardExample" component={WorkflowCardWrapper} /> */}
            <RootStack.Screen name="RegistrationSuccessScreen" component={RegistrationSuccessScreen} />
            <RootStack.Screen name="I18nExample" component={I18nExample} />
            {/* <RootStack.Screen
                name="RegistrationProviderExample"
                component={RegistrationProviderExample}
                options={{ gestureEnabled: false }}
            /> */}
            <RootStack.Screen
                name="RegistrationProviderExample"
                component={RegistrationProviderExample}
                // options={{ gestureEnabled: false, unmountOnBlur: true }}
                // listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}
            />
           
            <RootStack.Screen name="SmokeTestExample" component={WorkflowCardWrapper} />
        </Drawer.Navigator>
    </NavigationContainer>
);
