import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { ExampleHome } from './src/screens/ExampleHome';

import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
} from '@pxblue/react-native-auth-workflow';
import AuthUIActions from './src/actions/AuthUIActions';
import RegistrationUIActions from './src/actions/RegistrationUIActions';

import { useLinking } from '@react-navigation/native';
import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';

import { Provider as ThemeProvider } from 'react-native-paper';

const Stack = createStackNavigator();

export function AuthUIConfiguration(props: { children: JSX.Element }): JSX.Element {
    const securityContextActions = useSecurityActions();

    return (
        <AuthUIContextProvider
            authActions={AuthUIActions(securityContextActions)}
            registrationActions={RegistrationUIActions}
            showSelfRegistration={true}
            allowDebugMode={true}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            // projectImage={require('./src/assets/images/some_image.png')}
        >
            {props.children}
        </AuthUIContextProvider>
    );
}

export const App: React.FC = () => {
    const ref = React.useRef(null);
    const { getInitialState } = useLinking(ref, authLinkMapping);
    const [initialState, setInitialState] = React.useState();
    React.useEffect(() => {
        resolveInitialState(getInitialState, setInitialState);
    }, [getInitialState]);

    return (
        <ThemeProvider /*theme={PXBThemes.blue}*/>
            <SecurityContextProvider>
                <AuthUIConfiguration>
                    <AuthNavigationContainer initialState={initialState} ref={ref}>
                        <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
                            <Stack.Screen name="Home" component={ExampleHome} />
                        </Stack.Navigator>
                    </AuthNavigationContainer>
                </AuthUIConfiguration>
            </SecurityContextProvider>
        </ThemeProvider>
    );
};
