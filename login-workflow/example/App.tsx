import 'react-native-gesture-handler';
import React from 'react';
import { /*Button,*/ Provider as ThemeProvider } from 'react-native-paper';
import * as PXBThemes from '@pxblue/react-native-themes';
import { MainRouter } from './src/navigation';
import { ProjectAuthUIActions } from './src/actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './src/actions/RegistrationUIActions';
import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
} from '@pxblue/react-native-auth-workflow';
import { useLinking } from '@react-navigation/native';
import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { H3 } from '@pxblue/react-native-components';
// import { CustomAccountDetails, CustomAccountDetailsTwo } from './src/screens/CustomRegistrationForm';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Terms } from './src/screens/Terms';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ReactNativePaper {
        // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
        interface ThemeColors {
            primaryBase: string;
            textSecondary: string;
        }
        // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
        interface ThemeFonts {
            bold: ThemeFont;
        }
    }
}

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
            // customAccountDetails={[
            //     { component: CustomAccountDetails },
            //     { title: 'Job Info', instructions: 'Enter your employment information below.', component: CustomAccountDetailsTwo },
            // ]}
            // showCybersecurityBadge={false}
            // showContactSupport={false}
            // showRememberMe={false}
            // loginFooter={(navigation: any): JSX.Element => (
            //     <Button style={{}} onPress={(): void => navigation.navigate('Terms')}>
            //         Terms of Service
            //     </Button>
            // )}
            // loginActions={(navigation: any): JSX.Element => <Button style={{}}>Log In With Google</Button>}
            // loginHeader={<SafeAreaView><H3 style={{ marginLeft: 20 }}>My Project</H3></SafeAreaView>}
            // projectImage={require('./src/images/eaton.png')}
            // enableResetPassword={false}
            // showSelfRegistration={false}
            // enableInviteRegistration={false}
            // background={{
            //     backgroundImage: require('./src/images/eaton_stacked_logo.png'),
            //     // @ts-ignore
            //     backgroundColor: 'rgba(255,165,0,0.3)',
            //     backgroundSize: '100%',
            // }}
            customRegistrationSuccessScreen={
                <View style={{ flex: 1 }}>
                    <SafeAreaView>
                        <H3>Congratulations! You have made it to the custom success screen! yay!</H3>
                    </SafeAreaView>
                </View>
            }
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
                        // initialRouteName={'Terms'}
                        ref={ref}
                        // @ts-ignore
                        // extraRoutes={[<Stack.Screen key={'Terms-Screen'} name="Terms" component={Terms} />]}
                    >
                        <MainRouter />
                    </AuthNavigationContainer>
                </AuthUIConfiguration>
            </SecurityContextProvider>
        </ThemeProvider>
    );
};
export default App;
