import React, { useCallback, useState } from 'react';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody } from '@brightlayer-ui/react-native-auth-workflow';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import { View } from 'react-native';

type CreatePasswordProps = {
    username?: any;
    password?: any;
};

export const Login: React.FC<CreatePasswordProps> = (props) => {
    const app = useApp();
    const navigation = useNavigation();
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const onNext = useCallback(() => {
        app.setAuthenticated(true);
    }, []);

    return (
        <WorkflowCard>
            <WorkflowCardBody>
                <TextInput
                    label="Username"
                    mode="flat"
                    value={usernameInput}
                    onChangeText={(value) => setUsernameInput(value)}
                    style={{
                        marginBottom: 16,
                    }}
                />
                <TextInput
                    label="Password"
                    mode="flat"
                    value={passwordInput}
                    onChangeText={(value) => setPasswordInput(value)}
                    secureTextEntry
                />
                <View>
                    <View style={{ alignSelf: 'center' }}>
                        <Button
                            mode={'text'}
                            labelStyle={{ fontSize: 16 }}
                            uppercase={false}
                            onPress={(): void => {
                                navigation.navigate('REGISTER_INVITE', { screen: 'NESTED_REGISTER_INVITE' });
                            }}
                        >
                            [Test Invite Register]
                        </Button>
                        <Button
                            mode={'text'}
                            labelStyle={{ fontSize: 16 }}
                            uppercase={false}
                            onPress={(): void => {
                                navigation.navigate('REGISTER_SELF', { screen: 'NESTED_REGISTER_SELF' });
                            }}
                        >
                            [Test Self Register]
                        </Button>
                        <Button
                            mode={'text'}
                            labelStyle={{ fontSize: 16 }}
                            uppercase={false}
                            // onPress={(): void => navigation.navigate('PasswordResetInitiation')}
                        >
                            [Test Forgot Password]
                        </Button>
                        <Button
                            mode={'text'}
                            labelStyle={{ fontSize: 16 }}
                            uppercase={false}
                            // onPress={(): void =>
                            //     // navigation.navigate('PasswordResetCompletion', {
                            //     //     code: 'DEBUG_VALIDATION_CODE_DEADBEEF',
                            //     // })
                            // }
                        >
                            [Test Reset Password]
                        </Button>
                        <Button
                            mode={'text'}
                            labelStyle={{ fontSize: 16 }}
                            uppercase={false}
                            // onPress={(): void => navigation.navigate('SupportContact')}
                        >
                            [Test Contact Support]
                        </Button>
                    </View>
                </View>
            </WorkflowCardBody>
            <WorkflowCardActions showNext nextLabel="Login" onNext={onNext} totalSteps={0} divider={false} />
        </WorkflowCard>
    );
};
