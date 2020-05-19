import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
} from '@etn-sst/react-native-auth-ui';

import { default as MockAuthUIActions } from './src/actions/MockAuthUIActions';
import { default as MockRegistrationUIActions } from './src/actions/MockRegistrationUIActions';
import FakeHome from './src/screens/FakeHome';
import { useLinking } from '@react-navigation/native';
import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';

const Stack = createStackNavigator();

function AuthUIConfiguration(props: { children: JSX.Element }): JSX.Element {
    const securityContextActions = useSecurityActions();

    return (
        <AuthUIContextProvider
            authActions={MockAuthUIActions(securityContextActions)}
            registrationActions={MockRegistrationUIActions}
            showSelfRegistration={true}
            allowDebugMode={true}
            contactEmail={'washingtonsupport@eaton.com'}
            contactPhone={'1-888-WAS-HELP'}
        >
            {props.children}
        </AuthUIContextProvider>
    );
}

export default function App(): JSX.Element {
    const ref = React.useRef();

    // Setup deep links. Check DeepLinking file for path to screen mapping
    // @ts-ignore
    const { getInitialState } = useLinking(ref, authLinkMapping);
    const [initialState, setInitialState] = React.useState();
    React.useEffect(() => {
        resolveInitialState(getInitialState, setInitialState);
    }, [getInitialState]);

    return (
        <SecurityContextProvider>
            <AuthUIConfiguration>
                <AuthNavigationContainer initialState={initialState} ref={ref}>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={FakeHome} />
                    </Stack.Navigator>
                </AuthNavigationContainer>
            </AuthUIConfiguration>
        </SecurityContextProvider>
    );
}
