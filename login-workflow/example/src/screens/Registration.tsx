import React from 'react';
import { RegistrationContextProvider, RegistrationWorkflow } from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';
import { createStackNavigator } from '@react-navigation/stack';
type CreatePasswordProps = {
    username?: any;
    password?: any;
};

export const Registration: React.FC<CreatePasswordProps> = () => {
    const navigation = useNavigation();
    const app = useApp();
    const routes = {
        LOGIN: 'LOGIN',
        FORGOT_PASSWORD: undefined,
        RESET_PASSWORD: undefined,
        REGISTER_INVITE: 'REGISTER_INVITE',
        REGISTER_SELF: 'REGISTER_SELF',
        SUPPORT: undefined,
    };
    const RegistrationStack = createStackNavigator();

    return (
        <RegistrationContextProvider
            language={app.language}
            actions={ProjectRegistrationUIActions()}
            i18n={i18nAppInstance}
            routeConfig={routes}
            navigate={(destination: -1 | string) => {
                if (typeof destination === 'string') {
                    navigation.navigate(destination);
                } else {
                    navigation.goBack();
                }
            }}
        >
            <RegistrationStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <RegistrationStack.Screen name="NESTED_REGISTER_INVITE">
                    {() => (
                        <RegistrationWorkflow
                            isInviteRegistration
                            initialRegistrationParams={{ code: '123', email: 'aa@aa.aa' }}
                        />
                    )}
                </RegistrationStack.Screen>
                <RegistrationStack.Screen name="NESTED_REGISTER_SELF">
                    {() => <RegistrationWorkflow />}
                </RegistrationStack.Screen>
            </RegistrationStack.Navigator>
        </RegistrationContextProvider>
    );
};
