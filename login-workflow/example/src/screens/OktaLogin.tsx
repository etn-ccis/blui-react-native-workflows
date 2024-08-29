import React from 'react';
import { Image } from 'react-native';
import { OktaLoginScreenProps, OktaLoginScreen } from '@brightlayer-ui/react-native-auth-workflow';

export const OktaLogin: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = () => (
    <OktaLoginScreen
        projectImage={
            <Image
                style={{ width: '100%' }}
                resizeMode="contain"
                source={require('../assets/images/eaton_stacked_logo.png')}
            />
        }
    />
);
