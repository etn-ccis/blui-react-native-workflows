import React, { useEffect } from 'react';
import { createConfig, getAccessToken, signInWithBrowser, EventEmitter } from '@okta/okta-react-native';
import { OktaLoginScreenProps } from './types';
import { OktaLoginScreenBase } from './OktaLoginScreenBase';
import { useAuthContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { useTranslation } from 'react-i18next';
import oktaConfig from '../../okta.config';

/**
 * Component that renders a okta login screen that prompts a user to redirect to okta login sign in page.
 *
 * @param {OktaLoginScreenProps} props - Props of okta Login Screen component
 *
 * @category Component
 */

export const OktaLoginScreen: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = (props) => {
    const { t } = useTranslation();
    const auth = useAuthContext();
    const { actions, navigate, routeConfig } = auth;
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const {
        loginButtonLabel = t('bluiCommon:ACTIONS.OKTA_SIGN_IN'),
        showForgotPassword = true,
        forgotPasswordLabel = t('bluiCommon:LABELS.FORGOT_PASSWORD'),
        onForgotPassword = (): void => navigate(routeConfig.FORGOT_PASSWORD as string),
        showSelfRegistration = true,
        selfRegisterInstructions = t('bluiCommon:LABELS.NEED_ACCOUNT'),
        selfRegisterButtonLabel = t('bluiCommon:ACTIONS.CREATE_ACCOUNT'),
        onSelfRegister = (): void => navigate(routeConfig.REGISTER_SELF as string),
        showContactSupport = true,
        contactSupportLabel = t('bluiCommon:MESSAGES.CONTACT'),
        onContactSupport = (): void => navigate(routeConfig.SUPPORT as string),
        showCyberSecurityBadge = true,
        projectImage,
        header,
        footer,
        cyberSecurityBadgeSize,
        oktaConfigObject,
    } = props;

    const createOktaConfig = async (): Promise<void> => {
        await createConfig(oktaConfigObject || oktaConfig);
    };

    useEffect(() => {
        void actions.initiateSecurity();

        EventEmitter.addListener('signInSuccess', () => {
            // eslint-disable-next-line no-console
            console.log('signInSuccess');
        });
        EventEmitter.addListener('signOutSuccess', () => {
            // eslint-disable-next-line no-console
            console.log('signOutSuccess');
        });
        EventEmitter.addListener('onError', (e: Event) => {
            // eslint-disable-next-line no-console
            console.log(e);
        });
        EventEmitter.addListener('onCancelled', (e: Event) => {
            // eslint-disable-next-line no-console
            console.log(e);
        });

        void createOktaConfig();

        return () => {
            EventEmitter.removeAllListeners('signInSuccess');
            EventEmitter.removeAllListeners('signOutSuccess');
            EventEmitter.removeAllListeners('onError');
            EventEmitter.removeAllListeners('onCancelled');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <OktaLoginScreenBase
            loginButtonLabel={loginButtonLabel}
            onLogin={
                (async (): Promise<void> => {
                    try {
                        await signInWithBrowser();
                    } catch (_error) {
                        triggerError(_error as Error);
                    } finally {
                        getAccessToken()// eslint-disable-next-line no-console
                            .then((token) => console.log(token))// eslint-disable-next-line no-console
                            .catch((error) => console.log('token error', error));
                    }
                }) as any
            }
            showForgotPassword={showForgotPassword}
            forgotPasswordLabel={forgotPasswordLabel}
            onForgotPassword={onForgotPassword}
            showSelfRegistration={showSelfRegistration}
            selfRegisterButtonLabel={selfRegisterButtonLabel}
            selfRegisterInstructions={selfRegisterInstructions}
            onSelfRegister={onSelfRegister}
            showContactSupport={showContactSupport}
            contactSupportLabel={contactSupportLabel}
            onContactSupport={onContactSupport}
            errorDisplayConfig={errorDisplayConfig}
            showCyberSecurityBadge={showCyberSecurityBadge}
            projectImage={projectImage}
            header={header}
            footer={footer}
            cyberSecurityBadgeSize={cyberSecurityBadgeSize}
        />
    );
};
