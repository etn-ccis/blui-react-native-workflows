import React from 'react';

import { StyleSheet, ViewStyle, View } from 'react-native';
import { Divider, Text, TextProps } from 'react-native-paper';
import { useScreenWidth } from '../../hooks/useScreenWidth';

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

const makeStyles = (
    isTablet: boolean
): StyleSheet.NamedStyles<{
    container: ViewStyle;
    workflowCardInstructions: ViewStyle;
}> =>
    StyleSheet.create({
        container: {
            marginHorizontal: isTablet ? 24 : 16,
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
    const isTablet = useScreenWidth();
    const styles = makeStyles(isTablet);
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
