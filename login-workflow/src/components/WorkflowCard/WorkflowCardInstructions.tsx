import React from 'react';

import { StyleSheet, ViewStyle, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import { WorkflowCardInstructionProps } from './WorkflowCard.types';

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    container: ViewStyle;
    workflowCardInstructions: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            marginHorizontal: isTablet ? 24 : 16,
            paddingTop: isTablet ? 0 : 32,
            paddingBottom: isTablet ? 30 : 40,
        },
        workflowCardInstructions: {
            letterSpacing: 0,
        },
    });

/**
 * Component that renders the instructions content for the workflow card.
 *
 * @param {WorkflowCardInstructionProps} props - Props of WorkflowCardInstruction component
 *
 * @category Component
 */
export const WorkflowCardInstructions: React.FC<WorkflowCardInstructionProps> = (
    props: WorkflowCardInstructionProps
) => {
    const { instructions, divider = true, style, ...otherProps } = props;
    const { isTablet } = useScreenDimensions();
    const styles = makeStyles(isTablet);
    return instructions ? (
        <>
            <View style={[styles.container]}>
                {typeof instructions === 'string' ? (
                    <Text variant="bodyLarge" style={[styles.workflowCardInstructions, style]} {...otherProps}>
                        {instructions}
                    </Text>
                ) : (
                    instructions
                )}
            </View>
            {divider && <Divider bold />}
        </>
    ) : null;
};
