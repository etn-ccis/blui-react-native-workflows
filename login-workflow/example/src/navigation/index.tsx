import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View } from 'react-native';
import { NavigationDrawer } from './navigation-drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import WorkFlowCardBodyExample from '../screens/WorkFlowCardBodyExample';
import { WorkflowCardInstructions } from '@brightlayer-ui/react-native-auth-workflow';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

const Drawer = createDrawerNavigator();

export type RootStackParamList = {
    Home: undefined;
    WorkflowCardInstructions: undefined;
    WorkFlowCardBodyExample: undefined;
    NavigationDrawer: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const CustomDrawerContent = (props: any): any => (
    <View style={{ height: '100%' }}>
        <NavigationDrawer {...props} />
    </View>
);

const WorkflowCardInstructionsRenderer = (): JSX.Element => {
    const theme = useExtendedTheme();
    // TODO: Remove marginTop when we will use <WorkflowCardInstructions/> in WorkflowCard Example
    return (
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <WorkflowCardInstructions style={{ marginTop: 80 }} instructions={'Test Instructions'} />
        </View>
    );
};

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
            <RootStack.Screen name="WorkflowCardInstructions" component={WorkflowCardInstructionsRenderer} />
            <RootStack.Screen name="WorkFlowCardBodyExample" component={WorkFlowCardBodyExample} />
        </Drawer.Navigator>
    </NavigationContainer>
);
