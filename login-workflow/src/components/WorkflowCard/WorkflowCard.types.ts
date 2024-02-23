import { DotStepperVariant } from '@brightlayer-ui/react-native-components';
import { IconSource } from '@brightlayer-ui/react-native-components/core/__types__';
import { ImageBackgroundProps, ImageSourcePropType, ViewProps } from 'react-native';
import { CardContentProps, TextProps } from 'react-native-paper';

export type WorkflowCardBaseProps = ImageBackgroundProps & {
    /**
     *
     * @param {boolean} [loading=false] - If true, a blocking progress spinner will be displayed over the card
     *
     */
    loading?: boolean;
    /**
     *
     * @param {ImageSourcePropType} [backgroundImage] - A custom background to render behind the card
     */
    backgroundImage?: ImageSourcePropType;
};

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
     */
    onIconPress?: () => void;
    /**
     * The background color of Header
     * @default theme.colors.primary
     */
    backgroundColor?: string;
    /**
     * The text color of Header
     * @default theme.colors.onPrimary
     */
    textColor?: string;
    /**
     * The icon color of Header
     * @default theme.colors.onPrimary
     */
    iconColor?: string;
    /**
     * Icon to be shown on left side of Header
     * @default close
     */
    icon?: IconSource;
};

export type WorkflowCardInstructionProps = Omit<TextProps<'bodyLarge'>, 'children' | 'theme' | 'variant'> & {
    /**
     *
     * @param {string | JSX.Element} [instructions] - The text to display as instructions
     */
    instructions?: string | JSX.Element;
    /**
     *
     * @param {boolean} [divider=true] - Whether or not to show a divider below the instructions
     */
    divider?: boolean;
};

export type WorkflowCardBodyProps = CardContentProps & {
    /**
     * If true, the scroll view will be enabled otherwise view will be enabled
     * @default true
     */
    scrollable?: boolean;
};

export type WorkflowCardActionsProps = ViewProps & {
    /**
     *
     * @param {boolean} [divider=true] - True to display a divider above workflow card action buttons
     *
     */
    divider?: boolean;

    /**
     *
     * @param {boolean | (() => boolean)} [canGoNext] - Boolean or function that indicates whether the next button should be enabled
     */
    canGoNext?: boolean | (() => boolean);

    /**
     *
     * @param {boolean | (() => boolean)} [canGoPrevious] - Boolean or function that indicates whether the previous button should be enabled
     */
    canGoPrevious?: boolean | (() => boolean);

    /**
     *
     * @param {boolean} [showPrevious] - Boolean that indicates whether the previous button should be displayed
     */
    showPrevious?: boolean;

    /**
     *
     * @param {boolean} [showNext] - Boolean that indicates whether the next button should be displayed
     */
    showNext?: boolean;

    /**
     *
     * @param {string} [previousLabel] - The label to display for the previous button
     */
    previousLabel?: string;

    /**
     *
     * @param {string} [nextLabel] - The label to display for the next button
     */
    nextLabel?: string;

    /**
     * Function called when the previous button is clicked
     * @param {Object} [data] - data collected from the card / screen
     * @returns void
     */
    onPrevious?: (data?: { [key: string]: any }) => void;

    /**
     * Function that is called when the next button is clicked
     * @param {Object} [data] - data collected from the card / screen
     * @returns void
     */
    onNext?: (data?: { [key: string]: any }) => void;

    /**
     *
     * @param {number} [currentStep=0] - The current step in the registration workflow
     */
    currentStep?: number;

    /**
     *
     * @param {number} [totalSteps=5] - The total number of steps in the registration workflow
     */
    totalSteps?: number;

    /**
     *
     * @param {boolean} [fullWidthButton=false] - Boolean that indicates whether a button should be full width
     */
    fullWidthButton?: boolean;
    /**
     *
     * @param {DotStepperVariant} [stepperVariant='dots'] - Which type of step indicator to use: dots: circles, progress: progress bar and text: text
     */
    stepperVariant?: DotStepperVariant;
};

export type WorkflowCardProps = {
    WorkflowCardBaseProps?: WorkflowCardBaseProps;
    WorkflowCardHeaderProps?: WorkflowCardHeaderProps;
    WorkflowCardInstructionProps?: WorkflowCardInstructionProps;
    WorkflowCardBodyProps?: WorkflowCardBodyProps;
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};
