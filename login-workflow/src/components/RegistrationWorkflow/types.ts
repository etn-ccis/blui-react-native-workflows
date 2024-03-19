import { ErrorManagerProps } from '../Error';

/**
 * Props for RegistrationWorkflow component which includes screens related to user sign-up / registration
 */
export type SharedRegistrationWorkflowProps = {
    /**
     * The initial screen index to start the registration workflow from
     * @default 0
     */
    initialScreenIndex?: number;

    /**
     * The success screen to display upon successful registration
     */
    successScreen?: JSX.Element;

    /**
     * Component to display for the success screen if the account already exists.
     */
    existingAccountSuccessScreen?: JSX.Element;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};

export type SelfRegistrationWorkflowProps = SharedRegistrationWorkflowProps & {
    /**
     * Boolean when true verifies validateUserRegistrationRequest for verifyCode
     */
    isInviteRegistration?: false;
};

export type InviteRegistrationWorkflowProps = SharedRegistrationWorkflowProps & {
    /**
     * Boolean when true verifies validateUserRegistrationRequest for verifyCode
     */
    isInviteRegistration: true;

    /**
     * Set initial values for VerifyCode and Create Account Screen
     */
    initialRegistrationParams: {
        /**
         * code to populate in VerifyCode screen
         */
        code: string;
        /**
         * email address to populate in Create Account Screen
         */
        email: string;
    };
};

export type RegistrationWorkflowProps = SelfRegistrationWorkflowProps | InviteRegistrationWorkflowProps;
