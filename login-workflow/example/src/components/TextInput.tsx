import React, { MutableRefObject } from 'react';

// Components
import { View, StyleSheet, StyleProp, ViewStyle, TextInput as ReactTextInput, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ThemedTextInput } from '@brightlayer-ui/react-native-auth-workflow';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { Subtitle2 } from '@brightlayer-ui/react-native-components';

// Styles
import * as Colors from '@brightlayer-ui/colors';

/**
 * @ignore
 */
const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        textInput: {
            height: 70,
            fontSize: 18,
        },
        errorText: {
            position: 'absolute',
            bottom: -20,
            paddingLeft: 13,
            color: theme.colors.error,
        },
    });

/**
 * @param errorText  The text of the error.
 * @param style  (Optional) Custom style applied to the error text.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 **/
type ErrorTextProps = {
    errorText: string | undefined;
    style?: StyleProp<ViewStyle>;
    theme?: ReactNativePaper.Theme;
};

const ErrorText: React.FC<ErrorTextProps> = (props) => {
    const { errorText, style } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles(theme);

    return (
        <Subtitle2 style={[styles.errorText, style]} font={'regular'}>
            {errorText || null}
        </Subtitle2>
    );
};

/**
 * @param errorText  (Optional) The text to show if the text input is in error state.
 */
export type TextInputRenderProps = Omit<TextInputProps, 'theme'> & {
    errorText?: string;
    theme?: ReactNativePaper.Theme;
    testID?: string;
};

/**
 * Renders a text input with various configuration options such as errorText and custom style.
 *
 * @category Component
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const TextInputRender: React.ForwardRefRenderFunction<{}, TextInputRenderProps> = (
    props: TextInputRenderProps,
    ref: MutableRefObject<{} | null> | ((instance: {} | null) => void) | null // eslint-disable-line @typescript-eslint/ban-types
) => {
    const {
        style,
        keyboardType = 'default',
        autoCapitalize = 'none',
        returnKeyType = 'done',
        errorText,
        theme: customTheme,
        ...inputProps
    } = props;
    const theme = useTheme(customTheme);
    const styles = makeStyles(theme);

    // Necessary to allow use of ref (to pass focus to next TextInput on submit)
    const inputRef = React.useRef<ReactTextInput>(null);
    React.useImperativeHandle(ref, () => ({
        focus: (): void => {
            if (inputRef && inputRef.current) inputRef.current.focus();
        },
    }));

    const selectionColor = Platform.OS === 'android' ? Colors.blue['100'] : undefined;
    return (
        <View>
            {/* @ts-ignore `theme` is optional prop but the type thinks it's required */}
            <ThemedTextInput
                // @ts-ignore issue with refs on RNP input
                ref={inputRef}
                style={[styles.textInput, style]}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize} // TODO: (Open issue) Android not respecting autoCapitalize=words https://github.com/facebook/react-native/issues/8932
                returnKeyType={returnKeyType}
                textContentType={props.secureTextEntry ? 'oneTimeCode' : 'none'} // "oneTimeCode" is workaround to avoid iOS 12 "strong password" autofill overlay on secure input password fields (ISSUE TRACKING: https://github.com/facebook/react-native/issues/21911)
                underlineColor={Colors.gray['100']}
                selectionColor={selectionColor}
                {...inputProps}
            />
            {props.error ? <ErrorText errorText={errorText} /> : null}
        </View>
    );
};
// Necessary to allow use of ref (to pass focus to next TextInput on submit)
export const TextInput = React.forwardRef(TextInputRender);
TextInput.displayName = 'TextInput'; // Set a display name for testing with shallow renders
