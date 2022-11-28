import 'react-native-gesture-handler';
import React from 'react';
import { Provider as ThemeProvider } from 'react-native-paper';
import { SafeAreaProvider /*, useSafeAreaInsets */ } from 'react-native-safe-area-context';
// import { ThemedButton as Button } from '@brightlayer-ui/react-native-components/themed';
import * as BLUIThemes from '@brightlayer-ui/react-native-themes';
import { MainRouter } from './src/navigation';
import { ProjectAuthUIActions } from './src/actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './src/actions/RegistrationUIActions';
import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
    // RegistrationData,
    i18n,
} from '@brightlayer-ui/react-native-auth-workflow';
import { useLinking } from '@react-navigation/native';
import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';
// import { Image, ScrollView, View } from 'react-native';
// import { Body1, H5, Header, Hero /*, wrapIcon*/, Spacer } from '@brightlayer-ui/react-native-components';
// import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { CustomAccountDetails, CustomAccountDetailsTwo } from './src/screens/CustomRegistrationForm';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Terms } from './src/screens/Terms';

// Imports for internationalization
// import { useTranslation } from 'react-i18next';

// Set the initial app language (load from settings, local storage, etc.)
// If you do not set the language, the default will be set based on the device language setting.
void i18n.changeLanguage('en');

// Uncomment these lines to add your app-specific translation resource
i18n.addResourceBundle('en', 'app', { BUTTONLABEL: 'Change Language' });
i18n.addResourceBundle('es', 'app', { BUTTONLABEL: '¡Cambia el idioma!' });
i18n.addResourceBundle('fr', 'app', { BUTTONLABEL: 'Changez de Langue' });
i18n.addResourceBundle('pt', 'app', { BUTTONLABEL: 'Mudar idioma' });

// Uncomment these lines to override workflow strings / translations
i18n.addResourceBundle('en', 'blui', { ACTIONS: { CREATE_ACCOUNT: 'Register now!' } }, true, true);
i18n.addResourceBundle('es', 'blui', { ACTIONS: { CREATE_ACCOUNT: '¡Regístrate ahora!' } }, true, true);
i18n.addResourceBundle('fr', 'blui', { ACTIONS: { CREATE_ACCOUNT: `S'inscrire maintenant!` } }, true, true);
i18n.addResourceBundle('pt', 'blui', { ACTIONS: { CREATE_ACCOUNT: `Registrar agora!` } }, true, true);

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

// const CloseIcon = wrapIcon({ IconClass: MatIcon, name: 'close' });
// const PersonIcon = wrapIcon({ IconClass: MatIcon, name: 'person' });

export const AuthUIConfiguration: React.FC = (props) => {
    const securityContextActions = useSecurityActions();
    // const safeAreaInset = useSafeAreaInsets();
    // const { t } = useTranslation();
    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            allowDebugMode={true}
            htmlEula={false}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            contactPhoneLink={'1-800-123-4567'}
            // loginErrorDisplayConfig={{ mode: 'message-box', position: 'top' }}
            customAccountDetails={[
                { component: CustomAccountDetails },
                {
                    title: 'Job Info',
                    instructions: 'Enter your employment information below.',
                    component: CustomAccountDetailsTwo,
                },
            ]}
            // loginType={'username'}
            // disablePagerAnimation={true}
            // registrationConfig={{
            //     firstName: {
            //         maxLength: 30,
            //     },
            //     lastName: {
            //         maxLength: 30,
            //     },
            // }}
            // showCybersecurityBadge={false}
            // showContactSupport={false}
            // showRememberMe={false}
            // loginFooter={(navigation: any): JSX.Element => (
            //     <Button style={{}} onPress={(): void => navigation.navigate('Terms')}>
            //         Terms of Service
            //     </Button>
            // )}
            // loginFooter={
            //     <View style={{ alignItems: 'center' }}>
            //         <Button
            //             onPress={(): void => {
            //                 void i18n.changeLanguage('en');
            //             }}
            //         >
            //             {`${t('BUTTONLABEL')}-EN`}
            //         </Button>
            //         <Button
            //             onPress={(): void => {
            //                 void i18n.changeLanguage('es');
            //             }}
            //         >
            //             {`${t('BUTTONLABEL')}-ES`}
            //         </Button>
            //         <Button
            //             onPress={(): void => {
            //                 void i18n.changeLanguage('fr');
            //             }}
            //         >
            //             {`${t('BUTTONLABEL')}-FR`}
            //         </Button>
            //     </View>
            // }
            // loginActions={(navigation: any): JSX.Element => <Button style={{}}>Log In With Google</Button>}
            // loginHeader={<SafeAreaView><H3 style={{ marginLeft: 16 }}>My Project</H3></SafeAreaView>}
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
            // registrationSuccessScreen={(
            //     navigation: any,
            //     registrationData: RegistrationData | undefined
            // ): JSX.Element => (
            //     <View style={{ backgroundColor: '#fff', maxHeight: '100%' }}>
            //         <Header
            //             title={'Custom Title!'}
            //             navigation={{
            //                 icon: <MatIcon name="close" />,
            //                 onPress: (): void => navigation.navigate('Login'),
            //             }}
            //         />
            //         <ScrollView
            //             style={{
            //                 height: '100%',
            //             }}
            //             contentContainerStyle={{
            //                 flexGrow: 1,
            //             }}
            //         >
            //             <Image style={{ position: 'absolute' }} source={require('./assets/images/blue_waves.png')} />
            //             <View
            //                 style={{
            //                     height: '100%',
            //                     backgroundColor: 'transparent',
            //                 }}
            //             >
            //                 <View style={{ justifyContent: 'center', height: 200 }}>
            //                     <Hero
            //                         label=""
            //                         icon={<MatIcon name="person" size={48} color={'#fff'} />}
            //                         iconBackgroundColor={'#007bc1'}
            //                         styles={{ iconWrapper: { width: 90, height: 90, borderRadius: 90 } }}
            //                     />
            //                 </View>
            //                 <View
            //                     style={{
            //                         marginHorizontal: 16,
            //                         flex: 1,
            //                         marginBottom: safeAreaInset.bottom,
            //                     }}
            //                 >
            //                     <View>
            //                         <H5 style={{ marginBottom: 32 }}>
            //                             Congratulations, {registrationData?.accountDetails?.firstName}!
            //                         </H5>
            //                         <Body1 style={{ marginBottom: 16 }}>
            //                             You made it to the custom success screen! Yay!
            //                         </Body1>
            //                         {registrationData?.email && (
            //                             <Body1>We sent an introductory email to {registrationData.email}.</Body1>
            //                         )}
            //                     </View>
            //                     <Spacer />
            //                     <Button mode="contained" onPress={(): void => navigation.navigate('Login')}>
            //                         <Body1 style={{ color: '#fff' }}>Continue</Body1>
            //                     </Button>
            //                 </View>
            //             </View>
            //         </ScrollView>
            //     </View>
            // )}
            // accountAlreadyExistsScreen={(navigation: any): JSX.Element => (
            //     <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}>
            //         <Header
            //             title={'Custom Title!'}
            //             navigation={{
            //                 icon: CloseIcon,
            //                 onPress: (): void => navigation.navigate('Login'),
            //             }}
            //         />
            //         <View style={{ flex: 1, width: '100%', height: '100%', zIndex: 2 }}>
            //             <View style={{ flex: 1 }}>
            //                 <Image
            //                     style={{ position: 'absolute' }}
            //                     source={require('./assets/images/blue_waves.png')}
            //                 />
            //             </View>
            //             <ScrollView style={{ height: '100%', backgroundColor: 'transparent' }}>
            //                 <View style={{ flex: 1, justifyContent: 'center', height: 200 }}>
            //                     <Hero
            //                         label=""
            //                         IconClass={PersonIcon}
            //                         iconSize={48}
            //                         iconColor={'#fff'}
            //                         iconBackgroundColor={'#007bc1'}
            //                         styles={{ iconWrapper: { width: 90, height: 90, borderRadius: 90 } }}
            //                     />
            //                 </View>
            //                 <SafeAreaView
            //                     style={{
            //                         flex: 1,
            //                         marginHorizontal: 16,
            //                         height: '100%',
            //                         backgroundColor: 'transparent',
            //                     }}
            //                 >
            //                     <H5 style={{ marginBottom: 32 }}>Congratulations!</H5>
            //                     <Body1 style={{ marginBottom: 16 }}>
            //                         You made it to the custom account already exists success screen! Yay!
            //                     </Body1>
            //                     <Button
            //                         mode="contained"
            //                         onPress={(): void => navigation.navigate('Login')}
            //                         style={{ marginTop: 32 }}
            //                     >
            //                         <Body1 style={{ color: '#fff' }}>Continue</Body1>
            //                     </Button>
            //                 </SafeAreaView>
            //             </ScrollView>
            //         </View>
            //     </View>
            // )}
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
        <ThemeProvider theme={BLUIThemes.blue}>
            <SecurityContextProvider>
                <SafeAreaProvider>
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
                </SafeAreaProvider>
            </SecurityContextProvider>
        </ThemeProvider>
    );
};

// export const App: React.FC = () => <View/>
export default App;
