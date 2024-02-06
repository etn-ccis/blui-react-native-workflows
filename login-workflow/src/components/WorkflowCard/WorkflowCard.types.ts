import { DotStepperVariant } from '@brightlayer-ui/react-native-components';
import { ImageBackgroundProps, ImageSourcePropType, ViewProps } from 'react-native';
import { CardTitleProps, TextProps } from 'react-native-paper';

export type WorkflowCardBaseProps = ImageBackgroundProps & {
    /**
     * If true, a blocking progress spinner will be displayed over the card
     */
    loading?: boolean;
    /**
     * A custom background to render behind the card
     */
    backgroundImage?: ImageSourcePropType;
};

export type WorkflowCardHeaderProps = CardTitleProps;

export type WorkflowCardInstructionProps = Omit<TextProps<'bodyLarge'>, 'children' | 'theme' | 'variant'> & {
    /**
     * The text to display as instructions
     */
    instructions?: string | JSX.Element;
    /**
     * Whether or not to show a divider below the instructions
     * @default true
     */
    divider?: boolean;
};

export type WorkflowCardActionsProps = ViewProps & {
    /**
     * True to display a divider above workflow card action buttons
     * @default true
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
     * @default 0
     */
    currentStep?: number;

    /**
     * The total number of steps in the registration workflow
     * @default 5
     */
    totalSteps?: number;

    /**
     * Boolean that indicates whether a button should be full width
     */
    fullWidthButton?: boolean;
    /** Which type of step indicator to use:
     * - dots: circles
     * - progress: progress bar
     * - text: text
     *
     * @default: 'dots'
     */
    stepperVariant?: DotStepperVariant;
};

export type WorkflowCardProps = {
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};
