import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { ExampleHome } from './src/screens/ExampleHome';

import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
} from '@pxblue/react-native-auth-workflow';
import { ProjectAuthUIActions } from './src/actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './src/actions/RegistrationUIActions';

import { useLinking } from '@react-navigation/native';
import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';

import { /*Button,*/ Provider as ThemeProvider } from 'react-native-paper';
// import { H3 } from '@pxblue/react-native-components';

import * as PXBThemes from '@pxblue/react-native-themes';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Terms } from './src/screens/Terms';

const Stack = createStackNavigator();

export const AuthUIConfiguration: React.FC = (props) => {
    const securityContextActions = useSecurityActions();

    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            allowDebugMode={true}
            htmlEula={false}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            contactPhoneLink={'1-800-123-4567'}
            // showCybersecurityBadge={false}
            // showContactSupport={false}
            // showRememberMe={false}
            // loginFooter={(navigation: any) => (
            //     <Button style={{}} onPress={() => navigation.navigate('Terms')}>
            //         Terms of Service1
            //     </Button>
            // )}
            // loginHeader={<SafeAreaView><H3 style={{ marginLeft: 20 }}>My Project</H3></SafeAreaView>}
            // projectImage={require('./src/images/eaton.png')}
            // enableResetPassword={false}
            // showSelfRegistration={false}
            // enableInviteRegistration={false}
            // background={{
            //     backgroundImage: require('./src/images/eaton_stacked_logo.png'),
            //     // @ts-ignore
            //     backgroundColor: 'rgba(255,165,0,0.3)',
            //     backgroundSize: 120,
            // }}
        >
            {props.children}
        </AuthUIContextProvider>
    );
};

export const App: React.FC = () => {
    const ref = React.useRef(null);
    const { getInitialState } = useLinking(ref, authLinkMapping);
    const [initialState, setInitialState] = React.useState();
    React.useEffect(() => {
        resolveInitialState(getInitialState, setInitialState);
    }, [getInitialState]);

    return (
        <ThemeProvider theme={PXBThemes.blue}>
            <SecurityContextProvider>
                <AuthUIConfiguration>
                    <AuthNavigationContainer
                        initialState={initialState}
                        ref={ref}
                        // @ts-ignore
                        // extraRoutes={[<Stack.Screen key={'Terms-Screen'} name="Terms" component={Terms} />]}
                    >
                        <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
                            <Stack.Screen name="Home" component={ExampleHome} />
                        </Stack.Navigator>
                    </AuthNavigationContainer>
                </AuthUIConfiguration>
            </SecurityContextProvider>
        </ThemeProvider>
    );
};
