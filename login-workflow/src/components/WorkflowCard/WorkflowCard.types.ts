import { DotStepperVariant } from '@brightlayer-ui/react-native-components';
import { ImageBackgroundProps, ImageSourcePropType, ViewProps } from 'react-native';
import { CardTitleProps, TextProps } from 'react-native-paper';

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

export type WorkflowCardHeaderProps = CardTitleProps;

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
     * @param {boolean} [showPrevious=true] - Boolean that indicates whether the previous button should be displayed
     */
    showPrevious?: boolean;

    /**
     *
     * @param {boolean} [showNext=true] - Boolean that indicates whether the next button should be displayed
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
    WorkflowCardActionsProps?: WorkflowCardActionsProps;
};
