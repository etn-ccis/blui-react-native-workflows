import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext, useApp } from './Guard/GuardContextProvider';
import * as React from 'react';

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

function HomeScreen() {
const { setIsAutheisAuthenticated, isAuthenticated } = useApp();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Button
            title="Logout"
            onPress={() => {
                setIsAutheisAuthenticated(false);
            }}
        />
    </View>
  );
}

function LoginScreen({ navigation }) {
    const { setIsAutheisAuthenticated, isAuthenticated } = useApp();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
   
    return (<View>
    <Text>Email</Text>
    <TextInput style={styles.input} onChangeText={setEmail} />
    <Text>Password</Text>
    <TextInput style={styles.input} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />
    <Button
        title="Enable authentication"
        onPress={() => {
            setIsAutheisAuthenticated(!isAuthenticated);
        }}
    />
     <Button
        title="Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
</View>)
}

function ProfileScreen() {
    return <View>
    <Text>Profile Screen</Text>
</View>
}


function ContactScreen() {
    return <View>
    <Text>Contact Screen</Text>
</View>
}

const Stack = createNativeStackNavigator();

function App() {
  const navigationRef = useNavigationContainerRef();
  const [isAuthenticated, setIsAutheisAuthenticated] = React.useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAutheisAuthenticated }}>
    <NavigationContainer ref={navigationRef} onUnhandledAction={(error) => {
      console.log("Using Fallback", error)
      navigationRef.navigate("Contact")
    }}>
      <Stack.Navigator initialRouteName="Home">
        {isAuthenticated ? 
        <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </> : 
        <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
        </>}
      </Stack.Navigator>
    </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
