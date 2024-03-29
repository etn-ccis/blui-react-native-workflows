import React, { useCallback, useState } from 'react';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody } from '@brightlayer-ui/react-native-auth-workflow';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';

type CreatePasswordProps = {
    username?: any;
    password?: any;
};

export const Login: React.FC<CreatePasswordProps> = (props) => {
    const app = useApp();
    const nav = useNavigation();
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
            </WorkflowCardBody>
            <WorkflowCardActions showNext nextLabel="Login" onNext={onNext} totalSteps={0} divider={false} />
        </WorkflowCard>
    );
};
