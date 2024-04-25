import React from 'react';
import { Image } from 'react-native';
import { DebugComponent } from '../components/DebugComponent';
import { LoginScreenProps, LoginScreen } from '@brightlayer-ui/react-native-auth-workflow';

export const Login: React.FC<React.PropsWithChildren<LoginScreenProps>> = () => (
    <LoginScreen
        projectImage={
            <Image
                style={{ width: '100%' }}
                resizeMode="contain"
                source={require('../assets/images/eaton_stacked_logo.png')}
            />
        }
        header={<DebugComponent />}
    />
);
