import React from 'react';
import { Button, Divider } from 'react-native-paper';
import { StyleSheet, ViewStyle, View } from 'react-native';
import { WorkflowCardActionsProps } from './WorkflowCard.types';
import { MobileStepper } from '@brightlayer-ui/react-native-components';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

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
 * @param {WorkflowCardActionsProps} props - props of WorkflowCardActions component
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
    const { isTablet } = useScreenDimensions();

    const showStepperDots = totalSteps !== 0 && !fullWidthButton;
    return (
        <View {...otherProps} style={style}>
            {divider && <Divider testID="blui-workflow-card-action-divider" bold />}
            <MobileStepper
                styles={{
                    root: [
                        {
                            flex: 0,
                            justifyContent: 'space-between',
                            paddingHorizontal: isTablet ? 8 : 0,
                            paddingVertical: isTablet ? 8 : 0,
                        },
                    ],
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
                            testID={'blui-workflow-card-actions-previous-button'}
                            style={[defaultStyles.previousButton, defaultStyles.button]}
                            onPress={onPrevious}
                            labelStyle={{ marginHorizontal: 10 }}
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
                            testID={'blui-workflow-card-actions-next-button'}
                            style={[defaultStyles.nextButton, defaultStyles.button]}
                            labelStyle={{ marginHorizontal: 10 }}
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
