import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const getIsSignedIn = () => {
    // custom logic
    return false;
};
export const DemoWorkflow = () => {
    const isSignedIn = getIsSignedIn();
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                {isSignedIn ? (
                    <>
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </>
                )}
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};

function HomeScreen() {
    return <View />;
}

function ProfileScreen() {
    return <View />;
}

function SettingsScreen() {
    return <View />;
}

function SignInScreen() {
    return <View />;
}

function SignUpScreen() {
    return <View />;
}
