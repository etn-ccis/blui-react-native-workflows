/**
 * @packageDocumentation
 * @module Components
 */

import React, { useState } from 'react';

// Components
import { View, StyleSheet, TouchableOpacity, TextInput as ReactTextInput } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { TextInput, TextInputRenderProps } from './TextInput';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
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
export const TextInputSecureRender: React.ForwardRefRenderFunction<{}, TextInputSecureRenderProps> = (
    props: TextInputSecureRenderProps,
    ref: any
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
                theme={theme}
                {...inputProps}
                secureTextEntry={shouldShowText}
            />
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.visibilityToggleTouchable}
                onPress={(): void => setShouldShowText(!shouldShowText)}
            >
                <MatIcon
                    name={shouldShowText ? 'visibility-off' : 'visibility'}
                    color={theme.colors.placeholder}
                    size={30}
                />
            </TouchableOpacity>
        </View>
    );
};
// Necessary to allow use of ref (to pass focus to next TextInput on submit)
export const TextInputSecure = React.forwardRef(TextInputSecureRender);
TextInputSecure.displayName = 'TextInputSecure'; // Set a display name for testing with shallow renders
