import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { IconSource } from '@brightlayer-ui/react-native-components/core/__types__';

export type SuccessScreenProps = WorkflowCardProps & {
    /**
     * @param {IconSource} icon - The icon to display in the header
     */
    icon?: IconSource;

    /**
     * @param {string} messageTitle - The title of the success message
     */
    messageTitle?: string;

    /**
     * @param {string} message - The success message to be displayed on the screen
     */
    message?: string;

    /**
     * @param {string} dismissButtonLabel - To display label for the button
     */
    dismissButtonLabel?: string;

    /**
     * @param {boolean | (()=>boolean)} canDismiss - The function to call when the dismiss button is clicked
     */
    canDismiss?: boolean | (() => boolean);

    /**
     * @param {()=>void} onDismiss - The function to call when user clicks button
     * @returns void
     */
    onDismiss?: () => void;

    /**
     * @param {ErrorManagerProps} errorDisplayConfig - The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * If true, the scroll view will be enabled for main content or else view will be enabled
     * @default false
     */
    scrollMainContent?: boolean;
};
