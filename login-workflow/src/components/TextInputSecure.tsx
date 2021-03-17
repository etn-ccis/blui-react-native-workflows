/**
 * @packageDocumentation
 * @module Components
 */

import React, { useState, MutableRefObject } from 'react';

// Components
import { View, StyleSheet, TextInput as ReactTextInput } from 'react-native';
import { useTheme, TextInput as PaperTextInput } from 'react-native-paper';
import { TextInput, TextInputRenderProps } from './TextInput';

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        togglePadding: {
            paddingRight: 50,
        },
        visibilityToggleTouchable: {
            position: 'absolute',
            right: 10,
            bottom: 10,
            height: 50,
            width: 50,
            padding: 5,
            flex: 1,
            justifyContent: 'center',
        },
    });

type TextInputSecureRenderProps = TextInputRenderProps;

/**
 * Renders a secure text input with various configuration options such as errorText and custom style.
 * An eye icon appears next to the input to allow the text to be shown temporarily.
 *
 * @category Component
 */
export const TextInputSecureRender: React.ForwardRefRenderFunction<
    {}, // eslint-disable-line @typescript-eslint/ban-types
    TextInputSecureRenderProps
> = (
    props: TextInputSecureRenderProps,
    ref: MutableRefObject<{} | null> | ((instance: {} | null) => void) | null // eslint-disable-line @typescript-eslint/ban-types
) => {
    const { style, theme: customTheme, ...inputProps } = props;
    const theme = useTheme(customTheme);
    const styles = makeStyles();

    const [shouldShowText, setShouldShowText] = useState(true);

    // Necessary to allow use of ref (to pass focus to next TextInput on submit)
    const inputRef = React.useRef<ReactTextInput>(null);

    React.useImperativeHandle(ref, () => ({
        focus: (): void => {
            if (inputRef && inputRef.current) inputRef.current.focus();
        },
    }));

    return (
        <View style={style}>
            <TextInput
                ref={inputRef}
                style={styles.togglePadding}
                {...inputProps}
                secureTextEntry={shouldShowText}
                right={
                    <PaperTextInput.Icon
                        name={shouldShowText ? 'eye-off' : 'eye'}
                        color={theme.colors.placeholder}
                        onPress={(): void => setShouldShowText(!shouldShowText)}
                    />
                }
            />
        </View>
    );
};
// Necessary to allow use of ref (to pass focus to next TextInput on submit)
export const TextInputSecure = React.forwardRef(TextInputSecureRender);
TextInputSecure.displayName = 'TextInputSecure'; // Set a display name for testing with shallow renders
