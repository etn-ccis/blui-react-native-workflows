import React, { ReactNode } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';
import { NavDrawerProps, NavigationDrawer } from './navigation-drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import PageOne from '../screens/pageOne';
import PageTwo from '../screens/pageTwo';
import PageThree from '../screens/pageThree';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
    Home: undefined;
    PageOne: undefined;
    PageTwo: undefined;
    NavigationDrawer: undefined;
    PageThree: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const CustomDrawerContent = (props: any): any => (
    <View style={{ height: '100%' }}>
        <NavigationDrawer {...props} />
    </View>
);

export const MainRouter = (): any => (
    <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ backgroundColor: 'transparent', width: 300, maxWidth: '80%' }}
        drawerContent={(props: NavDrawerProps): ReactNode => <CustomDrawerContent {...props} />}
    >
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="PageOne" component={PageOne} />
        <RootStack.Screen name="PageTwo" component={PageTwo} />
        <RootStack.Screen name="PageThree" component={PageThree} />
    </Drawer.Navigator>
);
