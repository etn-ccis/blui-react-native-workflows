import { WorkflowCardBaseProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type OktaLoginScreenProps = WorkflowCardBaseProps & {
    // configure Login
    /**
     * The label for the login button
     */
    loginButtonLabel?: string;

    /**
     * Callback function that is called when the login button is clicked
     * @returns Promise<void> | void
     */
    onLogin?: () => Promise<void> | void;

    // configure Self Registration
    /**
     * whether or not to show the 'self registration' link
     */
    showSelfRegistration?: boolean;

    /**
     * The label for the 'self registration' link
     */
    selfRegisterButtonLabel?: string;

    /**
     * The instructions for the 'self registration' link
     */
    selfRegisterInstructions?: string;

    /**
     * The callback function that is called when the 'self registration' link is clicked
     * @returns void
     */
    onSelfRegister?: () => void;

    // configure Support
    /**
     * whether or not to show the 'contact support' link
     */
    showContactSupport?: boolean;

    /**
     * The label for the 'contact support' link
     */
    contactSupportLabel?: string;

    /**
     * The callback function that is called when the 'contact support' link is clicked
     * @returns void
     */
    onContactSupport?: () => void;

    // configure visual customizations
    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * whether or not to show the cyber security badge
     */
    showCyberSecurityBadge?: boolean;

    /**
     * The image to display at the top of the screen
     */
    projectImage?: React.ReactNode;

    /**
     * The header to display at the top of the screen
     */
    header?: JSX.Element;

    /**
     * The footer to display at the bottom of the screen
     */
    footer?: JSX.Element;

    /**
     * The size of the cyber security image
     */
    cyberSecurityBadgeSize?: {height?: number | string, width?: number | string};
};
