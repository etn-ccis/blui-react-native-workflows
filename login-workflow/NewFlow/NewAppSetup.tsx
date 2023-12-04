
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';

const AuthContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const RegistrationContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const ForgotPasswordScreen: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const ResetPasswordScreen: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const ContactSupportScreen: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const LoginScreen: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;
const RegistrationWorkflow: React.FC<React.PropsWithChildren<any>> = ({ children }) => <>{children}</>;

let i18nAppInstance: any;
const navigate = (s: string) => {};
const LOGIN_WORKFLOW_ROUTES: any[] = [];

const Stack = createStackNavigator();

export const NewAppWithBoth: React.FC<React.PropsWithChildren> = () => (
    /** User sets up their own router — can be this style or using createStackNavigator.
     * Using createStackNavigator requires wrapping the contents in a layout element that
     * includes the below context providers for the workflow.
     **/
    <NavigationContainer>
        {/**
         * Each context provider (Auth & Registration) include their own i18n
         * instance and maintain their own separate translations  / resources
         * file. https://luxiyalu.com/how-to-have-multiple-instances-of-i18next-for-component-library/
         *
         * Auth Provider also needs to know what the different URLs are
         * for each page (configurable) and a navigation function to be able
         * to route to them.
         **/}

 {/* * Expected usage for someone who wants only the Authentication workflow */}
        <AuthContextProvider actions={{}} routeConfig={{}} navigate={navigate} language={'en'} i18n={i18nAppInstance}>
                <Stack.Navigator initialRouteName='Login'>
                    {/* Include the LOGIN workflow — the defaults for use
                    can be imported as an array, or you can customize what 
                    to include at the individual route level. The screens 
                    in this flow all live on different routes */}

                    {/* Import the default array exported by BLUI */}
                    {LOGIN_WORKFLOW_ROUTES}

                    {/* Customize the flow yourself — 4 possible routes */}
                    <Stack.Screen
                        name={'login'}
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name={'forgot-password'}
                        component={ForgotPasswordScreen}
                    />
                    <Stack.Screen
                        name={'reset-password'}
                        component={ResetPasswordScreen}
                    />
                    <Stack.Screen
                        name={'contact-support'}
                        component={ContactSupportScreen}
                    />

                    {/* Include the REGISTRATION workflow and customize to
                    your heart's content. */}
                    <Stack.Screen
                        name={'self-register'}
                        component={RegistrationWorkflow}
                    />
                </Stack.Navigator>
        </AuthContextProvider>


 {/* * Expected usage for someone who wants only the Registration workflow */}
        <RegistrationContextProvider registrationActions={{}}>
            <Stack.Navigator>
                <Stack.Screen
                    name={'register'}
                    component={RegistrationWorkflow}
                />
            </Stack.Navigator>
        </RegistrationContextProvider>
    </NavigationContainer>
);

