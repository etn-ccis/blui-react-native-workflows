import * as React from 'react';
import { Text, TextInput, View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthGuard } from './AuthGuard';
import { GuestGuard } from './GuestGuard';
import { useNavigation } from '@react-navigation/native';
import { AppContext, useApp } from './Guard/GuardContextProvider';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

function SplashScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Getting token...</Text>
            <ActivityIndicator size="large" />
        </View>
    );
}

function HomeScreen() {
    const { setIsAutheisAuthenticated, isAuthenticated } = useApp();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Logout"
                onPress={() => {
                    setIsAutheisAuthenticated(false);
                }}
            />
        </View>
    );
}

function SimpleSignInScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();
    const { setIsAutheisAuthenticated, isAuthenticated } = useApp();

    return (
        <View>
            <Text>Email</Text>
            <TextInput style={styles.input} onChangeText={setEmail} />
            <Text>Password</Text>
            <TextInput style={styles.input} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />
            <Button
                title="Toggle authentication"
                onPress={() => {
                    setIsAutheisAuthenticated(!isAuthenticated);
                }}
            />

            {/* <Button
                title="Sign In"
                onPress={() => {
                    navigation.navigate('HomePage');
                }}
            /> */}
        </View>
    );
}

export default function App() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isAuthenticated, setIsAutheisAuthenticated] = React.useState(false);
    import * as React from 'react';
    import { Text, TextInput, View, Button, ActivityIndicator, StyleSheet } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import { AuthGuard } from './AuthGuard';
    import { GuestGuard } from './GuestGuard';
    import { useNavigation } from '@react-navigation/native';
    import { AppContext, useApp } from './Guard/GuardContextProvider';
    
    const Stack = createStackNavigator();
    
    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
    });
    
    function SplashScreen() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Getting token...</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    
    function HomeScreen() {
        const { setIsAutheisAuthenticated, isAuthenticated } = useApp();
    
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Logout"
                    onPress={() => {
                        setIsAutheisAuthenticated(false);
                    }}
                />
            </View>
        );
    }
    
    function SimpleSignInScreen() {
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const navigation = useNavigation();
        const { setIsAutheisAuthenticated, isAuthenticated } = useApp();
    
        return (
            <View>
                <Text>Email</Text>
                <TextInput style={styles.input} onChangeText={setEmail} />
                <Text>Password</Text>
                <TextInput style={styles.input} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />
                <Button
                    title="Toggle authentication"
                    onPress={() => {
                        setIsAutheisAuthenticated(!isAuthenticated);
                    }}
                />
    
                {/* <Button
                    title="Sign In"
                    onPress={() => {
                        navigation.navigate('HomePage');
                    }}
                /> */}
            </View>
        );
    }
    
    export default function App() {
        const [isLoading, setIsLoading] = React.useState(false);
        const [isAuthenticated, setIsAutheisAuthenticated] = React.useState(false);
    
    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAutheisAuthenticated }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SignIn">
                    {isAuthenticated ? (
                        <>
                        <Stack.Screen
                            name="HomePage"
                            component={HomeScreen}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={() => (
                                <AuthGuard fallbackScreen={<SimpleSignInScreen />} isAuthenticated={isAuthenticated}>
                                    <View />
                                </AuthGuard>
                            )}
                        />
                        </>
                    ) :
                    <Stack.Screen
                        name="SignIn"
                        component={() => (
                                <SimpleSignInScreen />
                        )}
                    />}
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}
