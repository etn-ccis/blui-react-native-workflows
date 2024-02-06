import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';
import { NavigationDrawer } from './navigation-drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import WorkFlowCardExample from '../screens/WorkFlowCardExample';
import I18nExample from '../screens/I18nExample';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
    Home: undefined;
    I18nExample: undefined;
    WorkFlowCardExample: undefined;
    NavigationDrawer: undefined;
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
            }}
            drawerContent={(props: any): ReactNode => <CustomDrawerContent {...props} />}
        >
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="WorkFlowCardExample" component={WorkFlowCardExample} />
            <RootStack.Screen name="I18nExample" component={I18nExample} />
        </Drawer.Navigator>
    </NavigationContainer>
);
