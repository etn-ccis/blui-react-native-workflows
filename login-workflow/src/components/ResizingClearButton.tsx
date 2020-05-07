/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleSheet, TouchableHighlight, StyleProp, ViewStyle } from 'react-native';
import { Label } from '@pxblue/react-native-components';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = (fontSize: number) =>
    StyleSheet.create({
        container: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'transparent',
        },
        textButton: {
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: fontSize,
            color: Colors.blue['500'],
            fontWeight: '500',
        },
    });

/**
 * @param title  The text to use inside of the button.
 * @param onPress  The function to handle the on press action.
 * @param style  (Optional) Custom style to style the button.
 * @param fontSize  (Optional) The font size of the text in the button. Default 16.
 * @param numberOfLines  (Optional) The number of lines of text in the button. Default 1.
 */
export type ResizingClearButtonProps = {
    title: string;
    onPress: Function;
    style?: StyleProp<ViewStyle>;
    fontSize?: number;
    numberOfLines?: number;
};

/**
 * Creates a transparent text button which handles text scaling (e.g. for long textual content).
 * The passed font size will be the size when the button is not width-constrained. Otherwise, the
 * text will shrink to fit the available space.
 *
 * @category Component
 */
export function ResizingClearButton(props: ResizingClearButtonProps): JSX.Element {
    const fontSize = props.fontSize ?? 16;
    const numberOfLines = props.numberOfLines ?? 1;
    const [currentFont, setCurrentFont] = React.useState(fontSize); // This is for Android

    const styles = makeStyles(fontSize);

    return (
        <TouchableHighlight
            style={[styles.container]}
            underlayColor={Colors.blue['50']}
            onPress={(): void => {
                props.onPress();
            }}
            accessibilityRole={'button'}
        >
            <View style={props.style}>
                <Label
                    allowFontScaling={true} // iOS only
                    adjustsFontSizeToFit // iOS only
                    numberOfLines={1}
                    color="primary"
                    style={[styles.textButton, { fontSize: currentFont }]}
                    // @ts-ignore  ** This is to ignore TypeScript not finding the perfectly valid onTextLayout property of Text for React Native version 0.62 https://reactnative.dev/docs/text#ontextlayout
                    onTextLayout={(event: any): void => {
                        // Android Only
                        const { lines } = event.nativeEvent;
                        if (lines.length > numberOfLines) {
                            setCurrentFont(currentFont - 1);
                        }
                    }}
                >
                    {props.title}
                </Label>
            </View>
        </TouchableHighlight>
    );
}
