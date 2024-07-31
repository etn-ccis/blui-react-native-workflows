import React from 'react';
import { Image } from 'react-native';
import { OktaLoginScreenProps, OktaLoginScreenBase } from '@brightlayer-ui/react-native-auth-workflow';

export const Login: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = () => (
    <OktaLoginScreenBase
        projectImage={
            <Image
                style={{ width: '100%' }}
                resizeMode="contain"
                source={require('../assets/images/eaton_stacked_logo.png')}
            />
        }
        showSelfRegistration={true}
        showContactSupport={true}
        showCyberSecurityBadge={true}
        onLogin={() => console.log('Login Pressed')}
        onSelfRegister={() => console.log('Self Register Pressed')}
        onContactSupport={() => console.log('Contact Support Pressed')}
    />
);
