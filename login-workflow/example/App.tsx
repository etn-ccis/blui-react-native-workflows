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

import { ThemeProvider } from '@pxblue/react-native-components';
import * as PXBThemes from '@pxblue/react-native-themes';

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
            // passwordRequirements={[
            //     {
            //         description: 'Has words',
            //         regex: /^.+$/,
            //     }
            // ]}
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
        <SecurityContextProvider>
            <AuthUIConfiguration>
                <AuthNavigationContainer initialState={initialState} ref={ref}>
                    <ThemeProvider theme={PXBThemes.blue}>
                        <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
                            <Stack.Screen name="Home" component={ExampleHome} />
                        </Stack.Navigator>
                    </ThemeProvider>
                </AuthNavigationContainer>
            </AuthUIConfiguration>
        </SecurityContextProvider>
    );
};
