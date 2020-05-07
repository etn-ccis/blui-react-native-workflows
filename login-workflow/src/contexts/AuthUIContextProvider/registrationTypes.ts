/**
 * @packageDocumentation
 * @module AuthUIContextProvider
 */

import { AccountDetailInformation } from '../..';

/**
 * Registration Actions to be performed based on the user's actions. The application will create appropriate actions
 * (often API calls, local network storage, credential updates, etc.) based on the actionable needs of the user.
 * A MockRegistrationUIActions implementation is provided in the examples to start with during development.
 */
export type RegistrationUIActions = {
    /**
     * The user wants to complete an action but must first accept the EULA.
     * The application should retrieve an application-specific EULA for the user.
     *
     * @param language  The i18n language the user is requesting for the EULA text.
     *
     * @returns Resolve with EULA, otherwise reject with an error message.
     */
    loadEULA(language: string): Promise<string>;
    /**
     * The user has tapped on an email link inviting them to register with the application.
     * The application should validate the code provided by the link.
     *
     * @param validationCode  Registration code provided from the link.
     *
     * @returns Resolve when the code is valid, otherwise reject with an error message.
     */
    validateUserRegistrationRequest(validationCode: string): Promise<void>;
    /**
     * The user has been invited to register and has entered the necessary account and
     * password information.
     * The application should now complete the registration process given the user's data.
     *
     * Note: Upon resolution, the user will be brought back to the Login screen.
     *
     * @param userData  Account details and password entered by the user.
     * @param validationCode  Registration code provided from the invitation email link.
     *
     * @returns Resolve when account creation succeeds, otherwise reject with an error message.
     */
    completeRegistration(
        userData: {
            password: string;
            accountDetails: AccountDetailInformation;
        },
        validationCode: string
    ): Promise<{ email: string; organizationName: string }>;
};
