/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { FormattedText } from './FormattedText';
import { Label } from '@pxblue/react-native-components';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        padding: {
            paddingVertical: 30,
        },
        bottomBorder: {
            borderBottomWidth: 1,
            borderBottomColor: Colors.white['900'],
        },
        mainText: {
            color: Colors.black['500'],
        },
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
    const styles = makeStyles();

    return (
        <View style={[styles.padding, hasBottomBorder ? styles.bottomBorder : null]}>
            <Label style={[styles.mainText, style]}>
                <FormattedText parseableText={text} />
            </Label>
        </View>
    );
};
