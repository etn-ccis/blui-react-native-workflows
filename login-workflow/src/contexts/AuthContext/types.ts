/**
 * @packageDocumentation
 * @module AuthContext
 */

import { i18n } from 'i18next';
import { RouteConfig } from '../../types';
import { ErrorContextProviderProps } from '../ErrorContext/types';

export type AuthUIActions = {
    /**
     * A function to initialize the application security state
     * @returns Promise<void>
     */
    initiateSecurity: () => Promise<void>;

    /**
     * A function to perform a login with the user's credentials
     * @param {string} email - Email address the user entered into the UI
     * @param {string} password - Password the user entered into the UI
     * @param {boolean} rememberMe - Indicates whether the user's email should be remembered on success
     * @returns Promise<void>
     */
    logIn: (email: string, password: string, rememberMe: boolean) => Promise<void>;

    /**
     * A function to reset password for the user
     * @param {string} email - Email address the user entered into the UI
     * @returns Promise<void>
     */
    forgotPassword: (email: string) => Promise<void>;

    /**
     * A function to validate reset password code
     * @param {string} code - Password reset code from a reset password link
     * @param {string} email - Email if it was passed from the reset link
     * @returns Promise<void>
     */
    verifyResetCode: (code: string, email?: string) => Promise<void>;

    /**
     * A function to set password for an account
     * @param {string} code - Password reset code from a link
     * @param {string} password - New Password the user entered into the UI
     * @param {string} email - Email if it was passed from the reset link
     * @returns Promise<void>
     */
    setPassword: (code: string, password: string, email?: string) => Promise<void>;

    /**
     * A function to change the user's password
     * @param {string} oldPassword - The user's current password as entered into the UI
     * @param {string} newPassword - The user's new password as entered into the UI
     * @returns Promise<void>
     */
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
};

export type AuthContextProviderProps = {
    /**
     * Defines the API calls / functions to execute when certain actions are performed in the UI (such as pressing the Login button)
     */
    actions: AuthUIActions;

    /**
     * Configures the language displayed on the screens
     */
    language: string;

    /**
     * A function that is used to navigate to a new URL. This is used to navigate to the various screens of the workflow
     * @param {-1 | string} destination - The URL to navigate to. If -1 is passed, the workflow will navigate to the previous screen
     * @returns void
     */
    navigate: (destination: -1 | string) => void;

    /**
     * Object describing the URLs you are using for the relevant routes so the workflow can correctly navigate between screens
     */
    routeConfig: RouteConfig;

    /**
     * An optional i18n object that is used to translate the UI. This is only needed if you want to use custom translation keys / languages inside any of the workflow screens
     */
    i18n?: i18n;

    rememberMeDetails?: {
        /**
         * Email address to show in the email field of Login after logout.
         */
        email?: string;
        /**
         * When true, the user's email will be in the email field of Login.
         */
        rememberMe?: boolean;
    };

    /**
     * An object that is used to configure error handling within the workflow.
     */
    errorConfig?: ErrorContextProviderProps;
};
