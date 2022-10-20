/**
 * @packageDocumentation
 * @module Components
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

// Helpers
import { parseTextForJSX, ParsedJSXText } from '@brightlayer-ui/react-auth-shared';

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        b: {
            fontWeight: 'bold',
        },
        none: {},
    });

/**
 * @param parseableText  The text to be parsed.
 * @param textStyle?  (Optional) Custom text style to apply to the tagged sub text.
 */
type FormattedTextProps = {
    parseableText: string;
    textStyle?: StyleProp<TextStyle>;
};

/**
 * Takes text and applies a style to tagged sub text.
 *
 * @category Component
 */
export const FormattedText: React.FC<FormattedTextProps> = (props) => {
    const { parseableText, textStyle } = props;
    const [parsedTextArray, setTextArray] = useState<ParsedJSXText[]>([]);
    const styles = makeStyles();

    useEffect(() => {
        const parseableTextOrEmpty = parseableText ?? '';
        const result = parseTextForJSX(parseableTextOrEmpty);
        setTextArray(result);
    }, [parseableText, setTextArray]);

    return (
        <>
            {parsedTextArray.map((chunk, index) => (
                <Text key={index} style={[textStyle, styles[chunk.tag as 'b' | 'none']]}>
                    {chunk.text}
                </Text>
            ))}
        </>
    );
};
