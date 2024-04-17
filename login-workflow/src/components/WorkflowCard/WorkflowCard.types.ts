import { DotStepperVariant } from '@brightlayer-ui/react-native-components';
import { IconSource } from '@brightlayer-ui/react-native-components/core/__types__';
import { ImageBackgroundProps, ImageSourcePropType, ViewProps } from 'react-native';
import { CardContentProps, TextProps } from 'react-native-paper';

/**
 * Props for WorkflowCardBase component
 */
export type WorkflowCardBaseProps = ImageBackgroundProps & {
    /**
     *
     * If true, a blocking progress spinner will be displayed over the card
     * @default false
     *
     */
    loading?: boolean;
    /**
     *
     * A custom background to render behind the card
     * The supported formats are png, jpg, jpeg, bmp, gif, webp, psd (iOS only).
     */
    backgroundImage?: ImageSourcePropType;
};

/**
 * Props for WorkflowCardHeader component
 */
export type WorkflowCardHeaderProps = Omit<ViewProps, 'children'> & {
    /**
     * Text to display as title in Header
     */
    title?: string;
    /**
     * Text to display as subtitle in Header
     */
    subTitle?: string;
    /**
     * On press functionality for the icon
     * @returns {void}
     */
    onIconPress?: () => void;
    /**
     * The background color of Header
     * @default theme.colors.primaryContainer
     */
    backgroundColor?: string;
    /**
     * The text color of Header
     * For Mobile view @default theme.colors.onPrimaryContainer
     * For Tablet view @default theme.colors.onSurface
     */
    textColor?: string;
    /**
     * The icon color of Header
     * @default theme.colors.onSurface
     */
    iconColor?: string;
    /**
     * Icon to be shown on left side of Header
     * @default close
     */
    icon?: IconSource;
};

/**
 * Props for WorkflowCardInstruction component
 */
export type WorkflowCardInstructionProps = Omit<TextProps<'bodyLarge'>, 'children' | 'theme' | 'variant'> & {
    /**
     *
     * The text to display as instructions
     */
    instructions?: string | JSX.Element;
    /**
     * Whether or not to show a divider below the instructions
     * @default true
     */
    divider?: boolean;
};

/**
 * Props for WorkflowCardBody component
 */
export type WorkflowCardBodyProps = Partial<CardContentProps> & {
    /**
     * If true, the scroll view will be enabled otherwise view will be enabled
     * @default true
     */
    scrollable?: boolean;

    /**
     * Props for WorkflowCardInstructions component
     */
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
};

/**
 * Props for WorkflowCardActions component
 */
export type WorkflowCardActionsProps = ViewProps & {
    /**
     *
     * True to display a divider above workflow card action buttons
     * @default true
     */
    divider?: boolean;

    /**
     *
     * Boolean or function that indicates whether the next button should be enabled
     */
    canGoNext?: boolean | (() => boolean);

    /**
     *
     * Boolean or function that indicates whether the previous button should be enabled
     */
    canGoPrevious?: boolean | (() => boolean);

    /**
     *
     * Boolean that indicates whether the previous button should be displayed
     */
    showPrevious?: boolean;

    /**
     *
     * Boolean that indicates whether the next button should be displayed
     */
    showNext?: boolean;

    /**
     *
     * The label to display for the previous button
     */
    previousLabel?: string;

    /**
     *
     * The label to display for the next button
     */
    nextLabel?: string;

    /**
     * Function called when the previous button is clicked
     * @param {Object} [data] - data collected from the card / screen
     * @returns {void}
     */
    onPrevious?: (data?: { [key: string]: any }) => void;

    /**
     * Function that is called when the next button is clicked
     * @param {Object} [data] - data collected from the card / screen
     * @returns {void}
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
     * @default false
     */
    fullWidthButton?: boolean;

    /**
     * Which type of step indicator to use: dots: circles, progress: progress bar and text: text
     * @default 'dots'
     */
    stepperVariant?: DotStepperVariant;
};

/**
 * Props for WorkflowCard component
 */
export type WorkflowCardProps = {
    /**
     * Props for WorkflowCardBase component
     */
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    /**
     * Props for WorkflowCardHeader component
     */
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    /**
     * Props for WorkflowCardInstructions component
     */
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    /**
     * Props for WorkflowCardBody component
     */
    WorkflowCardBodyProps?: WorkflowCardBodyProps;
    /**
     * Props for WorkflowCardActions component
     */
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};
