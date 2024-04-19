import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../contexts/AppContextProvider';
import { DebugComponent } from '../components/DebugComponent';
import { LoginScreenProps, LoginScreen, ErrorContextProvider } from '@brightlayer-ui/react-native-auth-workflow';
import { de } from 'date-fns/locale';

export const LoginBaseExample: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const app = useApp();
    const nav = useNavigation();

    return (
        <ErrorContextProvider>
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
        </ErrorContextProvider>
    );
};
