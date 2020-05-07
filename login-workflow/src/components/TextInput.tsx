/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, Text, StyleSheet, KeyboardTypeOptions, StyleProp, ViewStyle } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
    StyleSheet.create({
        textInput: {
            height: 70,
            fontSize: 18,
            backgroundColor: Colors.white['200'],
        },
        errorText: {
            position: 'absolute',
            bottom: -20,
            paddingLeft: 13,
            color: Colors.red['500'],
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
 * @param secureTextEntry  (Optional) Obscures text input. Default false.
 * @param error  (Optional) If the text input is currently in error state. Default false.
 * @param errorText  (Optional) The text to show if the text input is in error state.
 */
type TextInputRenderProps = {
    label: string;
    value: string;
    style?: StyleProp<ViewStyle>;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    returnKeyType?: 'done' | 'go' | 'send' | 'search' | 'next';
    onChangeText: Function;
    onSubmitEditing?: Function;
    blurOnSubmit?: boolean;
    secureTextEntry?: boolean;
    error?: boolean;
    errorText?: string;
};

/**
 * Renders a text input with various configuration options such as errorText and custom style.
 *
 * @category Component
 */
function TextInputRender(props: TextInputRenderProps, ref: any): JSX.Element {
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
        <View>
            <PaperTextInput
                ref={inputRef}
                label={props.label}
                value={props.value}
                style={[styles.textInput, props.style]}
                keyboardType={props.keyboardType ?? 'default'}
                autoCapitalize={props.autoCapitalize ?? 'none'} // TODO: (Open issue) Android not respecting autoCapitalize=words https://github.com/facebook/react-native/issues/8932
                returnKeyType={props.returnKeyType ?? 'done'}
                secureTextEntry={props.secureTextEntry ?? false}
                textContentType={props.secureTextEntry ? 'oneTimeCode' : 'none'} // "oneTimeCode" is workaround to avoid iOS 12 "strong password" autofill overlay on secure input password fields (ISSUE TRACKING: https://github.com/facebook/react-native/issues/21911)
                onChangeText={enteredTextHandler}
                error={props.error || false}
                underlineColor={Colors.gray['100']}
                onSubmitEditing={(): void => {
                    if (props.onSubmitEditing) props.onSubmitEditing();
                }}
                blurOnSubmit={props.blurOnSubmit}
            />
            {props.error ? <ErrorText errorText={props.errorText} /> : null}
        </View>
    );
}
// Necessary to allow use of ref (to pass focus to next TextInput on submit)
export const TextInput = React.forwardRef(TextInputRender);
TextInput.displayName = 'TextInput'; // Set a display name for testing with shallow renders

/**
 * @param errorText  The text of the error.
 * @param style  (Optional) Custom style applied to the error text.
 **/
type ErrorTextProps = {
    errorText: string | undefined;
    style?: StyleProp<ViewStyle>;
};

function ErrorText(props: ErrorTextProps): JSX.Element | null {
    const styles = makeStyles();

    return <Text style={styles.errorText}>{props.errorText || null}</Text>;
}
