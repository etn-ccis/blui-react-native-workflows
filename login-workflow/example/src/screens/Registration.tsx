import React, { useCallback, useState } from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    RegistrationContextProvider,
    RegistrationWorkflow,
} from '@brightlayer-ui/react-native-auth-workflow';
import { Button, TextInput } from 'react-native-paper';
import { createNavigationContainerRef, useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import { View } from 'react-native';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
type CreatePasswordProps = {
    username?: any;
    password?: any;
};

export const Registration: React.FC<CreatePasswordProps> = (props) => {
    // const app = useApp();
    const navigation = useNavigation();
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const app = useApp();
    const routes = {
        LOGIN: 'LOGIN',
        FORGOT_PASSWORD: undefined,
        RESET_PASSWORD: undefined,
        REGISTER_INVITE: 'REGISTER_INVITE',
        REGISTER_SELF: 'REGISTER_SELF',
        SUPPORT: undefined,
    };
    const Stack = createStackNavigator();
    // const Drawer = createDrawerNavigator();
    // const navigationRef = createNavigationContainerRef();
    const onNext = useCallback(() => {
        app.setAuthenticated(true);
    }, []);

    return (
        <RegistrationContextProvider
            language={app.language}
            actions={ProjectRegistrationUIActions()}
            i18n={i18nAppInstance}
            routeConfig={routes}
            // navigate={navigationRef.navigate}
            navigate={(destination: -1 | string) => {
                if (typeof destination === 'string') {
                    navigation.navigate(destination);
                } else {
                    navigation.goBack();
                }
            }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="REGISTER_SELF_NEW"
            >
                <Stack.Screen name="REGISTER_INVITE_NEW">
                    {() => (
                        <RegistrationWorkflow
                            isInviteRegistration
                            initialRegistrationParams={{ code: '123', email: 'aa@aa.aa' }}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="REGISTER_SELF_NEW">{() => <RegistrationWorkflow />}</Stack.Screen>
            </Stack.Navigator>
        </RegistrationContextProvider>
    );
};
