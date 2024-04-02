import { ReactNode } from 'react';
import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { IconSource } from '@brightlayer-ui/react-native-components/core/__types__';
import { EmptyStateProps } from '@brightlayer-ui/react-native-components';

export type SuccessScreenProps = WorkflowCardProps & {
    emptyStateProps: EmptyStateProps;

    /**
     * To display label for the button
     */
    dismissButtonLabel?: string;

    /**
     * The function to call when the dismiss button is clicked
     */
    canDismiss?: boolean | (() => boolean);

    /**
     * The function to call when user clicks button
     * @returns {void}
     */
    onDismiss?: () => void;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
