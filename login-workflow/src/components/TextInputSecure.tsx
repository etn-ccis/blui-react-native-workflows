/**
 * @packageDocumentation
 * @module Components
 */

import React, { useState } from 'react';

// Components
import { View, StyleSheet, TouchableOpacity, KeyboardTypeOptions, StyleProp, ViewStyle } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { Theme, useTheme } from 'react-native-paper';
import { TextInput } from './TextInput';

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

/**
 * @param label  The placeholder text to show inside of the text input.
 * @param value  The entered text in the text input
 * @param style  (Optional) Custom style to be applied to the text input.
 * @param keyboardType  (Optional) The keyboard type to use for keyboard when the text input is selected. Default 'default'.
 * @param autoCapitalize  (Optional) The style of auto capitalization to use for the text input. 'none', 'sentences', 'words', or 'characters'. Default 'none'.
 * @param returnKeyType  (Optional) The type of the return key on the keyboard. 'done', 'go', 'send', 'search', or 'next'. Default 'done'.
 * @param onChangeText  The function to handle the on change text action.
 * @param onSubmitEditing  (Optional) The function to handle the on submit editing action.
 * @param blurOnSubmit  (Optional) Blurs the text field when submitted. Default true.
 * @param error  (Optional) If the text input is currently in error state. Default false.
 * @param errorText  (Optional) The text to show if the text input is in error state.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type TextInputSecureRenderProps = {
    label: string;
    value: string;
    style?: StyleProp<ViewStyle>;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    returnKeyType?: 'done' | 'go' | 'send' | 'search' | 'next';
    onChangeText: Function;
    onSubmitEditing?: Function;
    blurOnSubmit?: boolean;
    error?: boolean;
    errorText?: string;
    theme?: Theme;
};

/**
 * Renders a secure text input with various configuration options such as errorText and custom style.
 * An eye icon appears next to the input to allow the text to be shown temporarily.
 *
 * @category Component
 */
export function TextInputSecureRender(props: TextInputSecureRenderProps, ref: any): JSX.Element {
    const theme = useTheme(props.theme);
    const [shouldShowText, setShouldShowText] = useState(true);

    // Necessary to allow use of ref (to pass focus to next TextInput on submit)
    const inputRef: any = React.useRef();
    React.useImperativeHandle(ref, () => ({
        focus: (): void => {
            inputRef.current.focus();
        },
    }));

    const styles = makeStyles();

    const enteredTextHandler = (input: string): void => {
        props.onChangeText(input);
    };

    return (
        <View style={props.style}>
            <TextInput
                ref={inputRef}
                label={props.label}
                value={props.value}
                style={styles.togglePadding}
                secureTextEntry={shouldShowText}
                keyboardType={props.keyboardType}
                autoCapitalize={props.autoCapitalize}
                returnKeyType={props.returnKeyType}
                onChangeText={enteredTextHandler}
                error={props.error}
                errorText={props.errorText}
                onSubmitEditing={(): void => {
                    if (props.onSubmitEditing) props.onSubmitEditing();
                }}
                blurOnSubmit={props.blurOnSubmit}
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
}
// Necessary to allow use of ref (to pass focus to next TextInput on submit)
export const TextInputSecure = React.forwardRef(TextInputSecureRender);
TextInputSecure.displayName = 'TextInputSecure'; // Set a display name for testing with shallow renders
