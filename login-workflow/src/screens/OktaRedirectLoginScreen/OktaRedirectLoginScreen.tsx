import React from 'react';
import { OktaLoginScreenProps } from './types';
import { OktaRedirectLoginScreenBase } from './OktaRedirectLoginScreenBase';
import { useOktaAuthContext } from '../../contexts';
import { useTranslation } from 'react-i18next';

/**
 * Component that renders a okta login screen that prompts a user to redirect to okta login sign in page.
 *
 * @param {OktaLoginScreenProps} props - Props of okta Login Screen component
 *
 * @category Component
 */

export const OktaRedirectLoginScreen: React.FC<React.PropsWithChildren<OktaLoginScreenProps>> = (props) => {
    const { t } = useTranslation();
    const { navigate, routeConfig } = useOktaAuthContext();

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
        onLogin,
    } = props;

    return (
        <OktaRedirectLoginScreenBase
            loginButtonLabel={loginButtonLabel}
            onLogin={onLogin}
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
            showCyberSecurityBadge={showCyberSecurityBadge}
            projectImage={projectImage}
            header={header}
            footer={footer}
            cyberSecurityBadgeSize={cyberSecurityBadgeSize}
        />
    );
};
