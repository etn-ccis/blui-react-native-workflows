import { ErrorManagerProps } from '../Error';

export type RegistrationWorkflowProps = {
    /**
     *
     * @param {number} [initialScreenIndex=0] - The initial screen index to start the registration workflow from
     */
    initialScreenIndex?: number;

    /**
     *
     * @param {JSX.Element} [successScreen] - The success screen to display upon successful registration
     */
    successScreen?: JSX.Element;

    /**
     *
     * @param {boolean} [isInviteRegistration=false] - boolean when true verifies validateUserRegistrationRequest for verifyCode
     */
    isInviteRegistration?: boolean;

    /**
     *
     * @param {JSX.Element} [existingAccountSuccessScreen] - Component to display for the success screen if the account already exists.
     */
    existingAccountSuccessScreen?: JSX.Element;

    /**
     *
     * @param {ErrorManagerProps} [errorDisplayConfig] - The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * Set initial values for VerifyCode and Create Account Screen
     * @param {string} initialRegistrationParams.code - code to populate in VerifyCode screen
     * @param {string} initialRegistrationParams.email - email address to populate in  Create Account Screen
     */
    initialRegistrationParams?: {
        code?: string;
        email?: string;
    };
};
