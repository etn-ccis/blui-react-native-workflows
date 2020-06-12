/**
 * @packageDocumentation
 * @module AuthUIContextProvider
 */

import { AuthUIActions } from './authTypes';
import { RegistrationUIActions } from './registrationTypes';
import { ImageSourcePropType } from 'react-native';
import { PasswordRequirement } from '../../types/ResetPasswordParams';

/**
 * The application provides various action functions and properties
 * to the authentication user interface. These properties are set
 * from this type.
 */
type AuthUIContextProviderProps = {
    /**
     * Provides application actions for the user's authentication needs.
     */
    authActions: () => AuthUIActions;
    /**
     * Provides application actions for the user's registration needs.
     */
    registrationActions: () => RegistrationUIActions;
    /**
     * When true, shows the Create Account button to allow for self registration.
     *
     * Default: true
     */
    showSelfRegistration?: boolean;
    /**
     * When true, presents a button to access link based flows.
     *
     * Default: false
     */
    allowDebugMode?: boolean;
    /**
     * Title of the application.
     */
    title?: string;
    /**
     * Array of password strength requirements.
     */
    passwordRequirements?: PasswordRequirement[];
    /**
     * Project image shown on splash screen and login screen.
     *
     * Dimensions of the image should be 534w x 152h with a transparent background.
     * Differently sized images may not render properly on all devices.
     *
     * Default: Provides an example project image.
     */
    projectImage?: ImageSourcePropType;
    /**
     * Contact email to be shown for support.
     *
     * Default: Provides a fake email.
     */
    contactEmail?: string;
    /**
     * Contact phone number to be shown for support.
     *
     * Default: Provides a fake phone number.
     */
    contactPhone?: string;
};

export type { AuthUIContextProviderProps, AuthUIActions, RegistrationUIActions };
