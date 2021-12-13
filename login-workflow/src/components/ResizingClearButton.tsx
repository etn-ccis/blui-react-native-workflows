/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleSheet, TouchableHighlight, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Body1 } from '@brightlayer-ui/react-native-components';

// Styles
import color from 'color';

/**
 * @ignore
 */
const makeStyles = (theme: ReactNativePaper.Theme, fontSize: number): Record<string, any> =>
    StyleSheet.create({
        container: {
            paddingVertical: 8,
            paddingHorizontal: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'transparent',
        },
        textButton: {
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: fontSize,
            color: theme.colors.primary,
            fontWeight: '500',
        },
    });

/**
 * @param title  The text to use inside of the button.
 * @param onPress  The function to handle the on press action.
 * @param style  (Optional) Custom style to style the button.
 * @param fontSize  (Optional) The font size of the text in the button. Default 16.
 * @param numberOfLines  (Optional) The number of lines of text in the button. Default 1.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 *
 */
export type ResizingClearButtonProps = {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    fontSize?: number;
    numberOfLines?: number;
    theme?: ReactNativePaper.Theme;
};

/**
 * Creates a transparent text button which handles text scaling (e.g. for long textual content).
 * The passed font size will be the size when the button is not width-constrained. Otherwise, the
 * text will shrink to fit the available space.
 *
 * @category Component
 */
export const ResizingClearButton: React.FC<ResizingClearButtonProps> = (props) => {
    const { title, onPress, style, fontSize = 16, numberOfLines = 1 } = props;
    const theme = useTheme(props.theme);
    const [currentFont, setCurrentFont] = React.useState(fontSize); // This is for Android

    const styles = makeStyles(theme, fontSize);

    return (
        <TouchableHighlight
            style={[styles.container]}
            underlayColor={color(theme.colors.primary).alpha(0.16).rgb().string()} // same transform used by RNP buttons
            onPress={(): void => {
                onPress();
            }}
            accessibilityRole={'button'}
        >
            <View style={style}>
                <Body1
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
                    {title}
                </Body1>
            </View>
        </TouchableHighlight>
    );
};
