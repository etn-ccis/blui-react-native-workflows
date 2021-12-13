/**
 * @packageDocumentation
 * @module Sub-Screens
 */
import React from 'react';
// Components
import { CompleteSplashScreen } from './CompleteSplash';
// Hooks
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
/**
 * Renders the content of the notice of completed account creation screen.
 *
 * @category Component
 */
export const ExistingAccountComplete = (): JSX.Element => {
    const { t } = useLanguageLocale();
    const welcomeTitle = `${t('blui:MESSAGES.WELCOME')}!`;
    const bodyText = `${t('blui:REGISTRATION.SUCCESS_EXISTING')}`;
    return <CompleteSplashScreen boldTitle={welcomeTitle} bodyText={bodyText} icon={'person'} />;
};
