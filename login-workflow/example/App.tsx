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

import { Provider as ThemeProvider } from 'react-native-paper';
import { Body1 } from '@pxblue/react-native-components';

import * as PXBThemes from '@pxblue/react-native-themes';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export const AuthUIConfiguration: React.FC = (props) => {
    const securityContextActions = useSecurityActions();

    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            // showSelfRegistration={false}
            allowDebugMode={true}
            htmlEula={false}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            contactPhoneLink={'1-800-123-4567'}

            // showCybersecurityBadge={false}
            // showContactSupport={false}
            // showRememberMe={false}

            // TODO
        // projectImage={require('./src/assets/images/some_image.png')}
        // background={{
        //     backgroundImage: `url(${topology})`,
        //     backgroundColor: 'orange',
        //     backgroundSize: '50%',
        // }}
        
        
        // enableResetPassword={false}
        // enableInviteRegistration={true}
        
        // loginFooter={
        //     <>
        //         <Typography variant="body2" color={'primary'}>
        //             <Link to={'/fake-route'}>GO SOMEWHERE</Link>
        //         </Typography>
        //         <Typography variant="body2" color={'primary'}>
        //             <Link to={'/fake-route-two'}>GO SOMEWHERE 2</Link>
        //         </Typography>
        //     </>
        // }
        loginHeader={<SafeAreaView><Body1 style={{}}>My Project</Body1></SafeAreaView>}
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

                    // extraRoutes={
                    //     <>
                    //         <Route path={'/fake-route'}>
                    //             <Typography>FAKE ROUTE</Typography>
                    //         </Route>
                    //         <Route path={'/fake-route-two'}>
                    //             <Typography>FAKE ROUTE TWO</Typography>
                    //         </Route>
                    //     </>
                    // }
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
