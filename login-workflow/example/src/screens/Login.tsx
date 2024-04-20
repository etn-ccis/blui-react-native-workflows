import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DebugComponent } from '../components/DebugComponent';
import { LoginScreenProps, LoginScreen } from '@brightlayer-ui/react-native-auth-workflow';

export const Login: React.FC<React.PropsWithChildren<LoginScreenProps>> = () => {
    const navigation = useNavigation();

    return (
        <LoginScreen
            projectImage={
                <Image
                    style={{ width: '100%' }}
                    resizeMode="contain"
                    source={require('../assets/images/eaton_stacked_logo.png')}
                />
            }
            header={<DebugComponent />}
            onLogin={() => {
                navigation.navigate('AppProviderExample', { screen: 'Home' });
            }}
            onSelfRegister={() => {
                navigation.navigate('RegistrationProviderExample', { screen: 'Registration' });
            }}
        />
    );
};
