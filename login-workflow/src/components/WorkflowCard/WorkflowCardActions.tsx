import React from 'react';

import { Button, Divider } from 'react-native-paper';
import { StyleSheet, ViewStyle, View } from 'react-native';
import { WorkflowCardActionsProps } from './WorkflowCard.types';
import { MobileStepper } from '@brightlayer-ui/react-native-components';

const makeStyles = (
    fullWidthButton: boolean | undefined
): StyleSheet.NamedStyles<{
    button: ViewStyle;
    previousButton: ViewStyle;
    nextButton: ViewStyle;
}> =>
    StyleSheet.create({
        button: {
            width: fullWidthButton ? '100%' : 100,
        },
        previousButton: {
            alignSelf: 'flex-start',
        },
        nextButton: {
            alignSelf: 'flex-end',
        },
    });

/**
 * Component that renders the workflow card action elements used for all screen components.
 *
 * @param divider boolean value to display a divider above workflow card action buttons
 * @param canGoNext boolean or function that indicates whether the next button should be enabled
 * @param canGoPrevious boolean or function that indicates whether the previous button should be enabled
 * @param showPrevious boolean that indicates whether the previous button should be displayed
 * @param showNext boolean that indicates whether the next button should be displayed
 * @param previousLabel label to display for the previous button
 * @param nextLabel label to display for the next button
 * @param onPrevious function called when the previous button is clicked
 * @param onNext function that is called when the next button is clicked
 * @param currentStep current step in the registration workflow
 * @param totalSteps total number of steps in the registration workflow
 * @param fullWidthButton boolean that indicates whether a button should be full width
 * @param stepperVariant indicates which type of stepper indicator to use
 *
 * @category Component
 */

export const WorkflowCardActions: React.FC<WorkflowCardActionsProps> = (props) => {
    const {
        divider = true,
        canGoPrevious,
        showPrevious,
        previousLabel,
        onPrevious,
        canGoNext,
        showNext,
        nextLabel,
        onNext,
        currentStep = 0,
        totalSteps = 5,
        fullWidthButton,
        stepperVariant = 'dots',
        style,
        ...otherProps
    } = props;

    const defaultStyles = makeStyles(fullWidthButton);

    const showStepperDots = currentStep !== undefined && totalSteps !== undefined && !fullWidthButton;
    return (
        <View {...otherProps} style={style}>
            {divider && <Divider testID="workflow-card-action-divider" />}
            <MobileStepper
                styles={{
                    root: [{ flex: 0, justifyContent: 'space-between' }],
                    stepperContainer: !showStepperDots
                        ? {
                              display: 'none',
                          }
                        : { display: 'flex' },
                }}
                activeStep={currentStep}
                steps={totalSteps}
                leftButton={
                    showPrevious ? (
                        <Button
                            mode="outlined"
                            disabled={
                                canGoPrevious === false || (typeof canGoPrevious === 'function' && !canGoPrevious())
                            }
                            testID={'workflow-card-previous-button'}
                            style={[defaultStyles.previousButton, defaultStyles.button]}
                            onPress={onPrevious}
                        >
                            {previousLabel}
                        </Button>
                    ) : (
                        <View style={{ width: fullWidthButton ? 0 : 100 }} />
                    )
                }
                rightButton={
                    showNext ? (
                        <Button
                            mode="contained"
                            disabled={canGoNext === false || (typeof canGoNext === 'function' && !canGoNext())}
                            onPress={onNext}
                            testID={'workflow-card-next-button'}
                            style={[defaultStyles.nextButton, defaultStyles.button]}
                        >
                            {nextLabel}
                        </Button>
                    ) : (
                        <View style={{ width: fullWidthButton ? 0 : 100 }} />
                    )
                }
                variant={stepperVariant}
                data-testid={'workflow-card-stepper'}
            />
        </View>
    );
};
