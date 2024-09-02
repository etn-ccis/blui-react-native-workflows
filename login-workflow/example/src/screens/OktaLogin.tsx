import React from 'react';
import { Image } from 'react-native';
import { OktaLoginScreenProps, OktaRedirectLoginScreen } from '@brightlayer-ui/react-native-auth-workflow';
import { getAccessToken, signInWithBrowser } from '@okta/okta-react-native';

export const OktaLogin: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = () => {
    const onLogin = async (): Promise<void> => {
        try {
            await signInWithBrowser();
        } catch (_error) {
            // eslint-disable-next-line no-console
            console.log(_error as Error);
        } finally {
            getAccessToken() // eslint-disable-next-line no-console
                .then((token) => console.log(token)) // eslint-disable-next-line no-console
                .catch((error) => console.log('token error', error));
        }
    };
    return (
        <OktaRedirectLoginScreen
            projectImage={
                <Image
                    style={{ width: '100%' }}
                    resizeMode="contain"
                    source={require('../assets/images/eaton_stacked_logo.png')}
                />
            }
            onLogin={onLogin}
        />
    );
};
