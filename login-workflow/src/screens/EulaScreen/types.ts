import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';
import { CheckboxItemProps } from 'react-native-paper';

type CheckboxProps = Omit<CheckboxItemProps, 'label' | 'status'>;

export type EulaScreenProps = WorkflowCardProps & {
    /**
     * The content to render for the EULA. Can be a plain string or HTML
     */
    eulaContent?: string | JSX.Element;

    /**
     * The label for the EULA checkbox
     */
    checkboxLabel?: string;

    /**
     * Used to set checkbox props
     */
    checkboxProps?: CheckboxProps;

    /**
     * The EULA should be rendered as HTML
     * @default false
     */
    html?: boolean;

    /**
     * Used to pre-populate the checked/unchecked checkbox when the screen loads
     * @default false
     */
    initialCheckboxValue?: boolean;

    /**
     * Function called when the checkbox clicked
     * @param {boolean} accepted - verify Eula accepted
     * @returns {void}
     */
    onEulaAcceptedChange?: (accepted: boolean) => void;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;

    refreshConfig?: {
        /**
         * Function to refresh Eula content
         * @returns {void}
         */
        onRefresh?: () => void;
        /**
         * the refresh button to be rendered
         */
        showRefreshButton?: boolean;
        /**
         * Label of refresh button
         */
        refreshButtonLabel?: string;
    };
};
