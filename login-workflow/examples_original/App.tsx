import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
} from '@etn-sst/react-native-auth-ui';

import { ProjectAuthUIActions } from './src/actions/MockAuthUIActions';
import { ProjectRegistrationUIActions } from './src/actions/MockRegistrationUIActions';
import FakeHome from './src/screens/FakeHome';
import { useLinking } from '@react-navigation/native';
import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';

const Stack = createStackNavigator();

function AuthUIConfiguration(props: { children: JSX.Element }): JSX.Element {
    const securityContextActions = useSecurityActions();

    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            showSelfRegistration={true}
            allowDebugMode={true}
            contactEmail={'washingtonsupport@eaton.com'}
            contactPhone={'1-888-WAS-HELP'}
        >
            {props.children}
        </AuthUIContextProvider>
    );
}

export const App: React.FC = () => {
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
};
