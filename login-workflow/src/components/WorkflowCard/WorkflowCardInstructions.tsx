import React from 'react';

import { StyleSheet, ViewStyle, View } from 'react-native';
import { Divider, Text, TextProps } from 'react-native-paper';

export type WorkflowCardInstructionProps = Omit<TextProps<'bodyLarge'>, 'children' | 'theme' | 'variant'> & {
    instructions?: string | JSX.Element;
    divider?: boolean;
};

const makeStyles = (): StyleSheet.NamedStyles<{
    container: ViewStyle;
    workflowCardInstructions: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            marginHorizontal: 16,
            paddingTop: 32,
            paddingBottom: 40,
        },
        workflowCardInstructions: {
            letterSpacing: 0,
        },
    });

/**
 * Component that renders the instructions content for the workflow card.
 *
 * @param instructions text to display as instructions
 * @param divider whether or not to show a divider below the instructions
 *
 * @category Component
 */

export const WorkflowCardInstructions: React.FC<WorkflowCardInstructionProps> = (props) => {
    const { instructions, divider = true, style, ...otherProps } = props;
    const styles = makeStyles();

    return (
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
            {divider && <Divider />}
        </>
    );
};
