import { CardActionsProps } from 'react-native-paper';

export type WorkflowCardActionsProps = Omit<CardActionsProps, 'children'> & {
    /**
     * True to display a divider above workflow card action buttons
     */
    divider?: boolean;

    /**
     * Boolean or function that indicates whether the next button should be enabled
     */
    canGoNext?: boolean | (() => boolean);

    /**
     * Boolean or function that indicates whether the previous button should be enabled
     */
    canGoPrevious?: boolean | (() => boolean);

    /**
     * Boolean that indicates whether the previous button should be displayed
     */
    showPrevious?: boolean;

    /**
     * Boolean that indicates whether the next button should be displayed
     */
    showNext?: boolean;

    /**
     * The label to display for the previous button
     */
    previousLabel?: string;

    /**
     * The label to display for the next button
     */
    nextLabel?: string;

    /**
     * Function called when the previous button is clicked
     * @param {Object} data - data collected from the card / screen
     * @returns void
     */
    onPrevious?: (data?: { [key: string]: any }) => void;

    /**
     * Function that is called when the next button is clicked
     * @param {Object} data - data collected from the card / screen
     * @returns void
     */
    onNext?: (data?: { [key: string]: any }) => void;

    /**
     * The current step in the registration workflow
     */
    currentStep?: number;

    /**
     * The total number of steps in the registration workflow
     */
    totalSteps?: number;

    /**
     * Boolean that indicates whether a button should be full width
     */
    fullWidthButton?: boolean;
};
