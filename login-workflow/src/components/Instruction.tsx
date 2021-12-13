/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { FormattedText } from './FormattedText';
import { Body1 } from '@brightlayer-ui/react-native-components';

// Styles
import * as Colors from '@brightlayer-ui/colors';
import { Divider, useTheme } from 'react-native-paper';
import Color from 'color';
/**
 * @ignore
 */
const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        padding: {
            paddingTop: 16,
            paddingBottom: 32,
        },
        divider: {
            height: 1,
            backgroundColor: theme.dark
                ? Color(Colors.black[200]).alpha(0.36).toString()
                : Color(Colors.black[500]).alpha(0.12).toString(),
        },
        mainText: {},
    });

/**
 * @param text  The text shown inside of the instruction
 * @param style  (Optional) Custom style to style the instruction.
 * @param hasBottomBorder  (Optional) Specify if the instruction should have a bottom border. Default true.
 */
type InstructionProps = {
    text: string;
    style?: StyleProp<ViewStyle>;
    hasBottomBorder?: boolean;
};

/**
 * Displays a block of text with a light grey underline beneath. This underline should extend to the edge of the screen,
 * so the props.style passed in will directly affect only the Text inside. Underline is visible by default, but can be
 * disabled by setting hasBottomBorder to false.
 *
 * @category Component
 */
export const Instruction: React.FC<InstructionProps> = (props) => {
    const { text, style, hasBottomBorder = true } = props;
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <>
            <View style={[styles.padding]}>
                <Body1 style={[styles.mainText, style]}>
                    <FormattedText parseableText={text} />
                </Body1>
            </View>
            {hasBottomBorder && <Divider style={styles.divider} />}
        </>
    );
};
