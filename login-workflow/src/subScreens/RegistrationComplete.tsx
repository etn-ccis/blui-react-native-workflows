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
 * Type to represent the content of the registration complete component.
 *
 * @param firstName  The first name string.
 * @param lastName  The last name string.
 * @param email  The email string.
 * @param organization  The organization string.
 */
type RegistrationCompleteProps = {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
};

/**
 * Renders the content of the notice of completed account creation screen
 * (textual content referring to user's email, name, and organization).
 *
 * @category Component
 */
export const RegistrationComplete: React.FC<RegistrationCompleteProps> = (props) => {
    const { t } = useLanguageLocale();

    const welcomeTitle = `${t('blui:MESSAGES.WELCOME')}, ${props.firstName} ${props.lastName}!`;
    const bodyText = t('blui:REGISTRATION.SUCCESS_MESSAGE', {
        replace: { email: props.email, organization: props.organization },
    });

    return <CompleteSplashScreen boldTitle={welcomeTitle} bodyText={bodyText} icon={'person'} />;
};
