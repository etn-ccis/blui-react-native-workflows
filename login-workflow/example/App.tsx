import * as React from 'react';
import { Text, TextInput, View, Button, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
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
            <Button
                title="Sign In"
                onPress={() => {
                    navigation.navigate('Profile', {username: 'john'});
                    // navigation.reset({
                    //         index: 1,
                    //         routes: [{name: 'Profile'}],
                    //     });
                  }}
            />
        </View>
    );
}

function FallbackScreen(){
    const { setIsAutheisAuthenticated, isAuthenticated } = useApp();
    const navigation = useNavigation();

    return <View>
        <Text>Fallback Screen</Text>
        <Button
                title="Toggle authentication"
                onPress={() => {
                    setIsAutheisAuthenticated(!isAuthenticated);
                }}
            />

            <Button
                title="Profile"
                onPress={() => {
                    navigation.navigate('Profile');
                }}
            />

    </View>
}

export default function App() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isAuthenticated, setIsAutheisAuthenticated] = React.useState(false);
    const navigationRef = useNavigationContainerRef();
const [fallbackScreen, setFallbackScreen] = React.useState('');

React.useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      const route = url.replace(/.*?:\/\//g, '');
      const routeName = route.split('/')[0];

      if (routeName === 'profile') {
        const username = route.split('/')[1];
        navigationRef.navigate('Profile', { username });
        // navigation.navigate('Profile', { username });
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    // return () => {
    //   Linking.removeEventListener('url', handleDeepLink);
    // };
  }, []);
//   console.log('navigationRef', navigationRef.getCurrentRoute()?.name)

//   React.useEffect(()=> {
//   console.log('navigationRef', navigationRef.getCurrentRoute()?.name)

// // const routes: any = appRoutes.map((route)=>{route.name});
// // CommonActions.reset({index: 0, routes})

//   }, [])

const appRoutes = [
    {
        name: 'HomePage',
        component: HomeScreen
    },
    {
        name: 'Profile',
        component: () => (
            <AuthGuard fallbackUrl={'FallbackScreen'} isAuthenticated={isAuthenticated} setFallbackScreen={setFallbackScreen} >
                <View />
            </AuthGuard>
        )
    },
    {
        name: 'SignIn',
        component: SimpleSignInScreen
    },
    {
        name: 'FallbackScreen',
        component: FallbackScreen
    },
]

const routeNames: any = appRoutes.map((route)=>({'name': route.name}));
    
    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAutheisAuthenticated }}>

            <NavigationContainer ref={navigationRef}
            onStateChange={()=> {
                // const routes: any = routeNames.map((route)=>{route.name});
                console.log('Console', routeNames)

                if(navigationRef.getCurrentRoute()?.name === 'Profile')
                {
                    navigationRef.reset({index: 0, routes: routeNames})
                }
            }}
            >
                <Stack.Navigator initialRouteName="SignIn"
                screenOptions={{
                    headerShown: false,
                  }}
                  
                >
                    {
                        appRoutes.map((route)=> {
                            console.log('route::', route)
                            return<Stack.Screen key={route.name} name={route.name} component={route.component} />})
                    }
                    {/* <Stack.Screen
                            name="HomePage"
                            component={HomeScreen}
                        />
                        <Stack.Screen
                            name={"Profile"}
                            component={() => (
                                <AuthGuard fallbackUrl={'SignIn'} isAuthenticated={isAuthenticated} setFallbackScreen={setFallbackScreen} >
                                    <View />
                                </AuthGuard>
                            )}
                            options={({ route }: {route: any}) => ({ title: route?.params?.username })}
                        />
                        <Stack.Screen
                            name="SignIn"
                            component={SimpleSignInScreen}
                        />
                        <Stack.Screen
                            name="FallbackScreen"
                            component={FallbackScreen}
                        /> */}
                </Stack.Navigator>
            </NavigationContainer>

        </AppContext.Provider>
    );
}
