import React, { MutableRefObject } from 'react';
import { StyleSheet, TextInput as ReactTextInput } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import { useAltTheme } from '../../contexts/AltThemeProvider/AltThemeProvider';
import _clonedeep from 'lodash.clonedeep';
import * as Colors from '@brightlayer-ui/colors';

const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        textInput: {
            backgroundColor: theme.dark ? Colors.black[800] : Colors.white[200],
        },
    });

// eslint-disable-next-line @typescript-eslint/ban-types
const ThemedTextInputRender: React.ForwardRefRenderFunction<{}, TextInputProps> = (
    props: TextInputProps,
    ref: MutableRefObject<{} | null> | ((instance: {} | null) => void) | null // eslint-disable-line @typescript-eslint/ban-types
) => {
    const inputRef = React.useRef<ReactTextInput>(null);
    React.useImperativeHandle(ref, () => ({
        focus: (): void => {
            if (inputRef && inputRef.current) inputRef.current.focus();
        },
    }));
    const { theme: customTheme, style = {}, ...otherProps } = props;
    const theme = useTheme(customTheme);
    const altTheme = useAltTheme();
    const defaultStyles = makeStyles(theme);

    // Merging blueDark colors.primary with blueDarkAlt theme so TextInput border is blueDark.colors.primary
    const darkTheme = _clonedeep(altTheme);
    if (darkTheme) darkTheme.colors.primary = theme.colors.primary;

    const themeToUse = theme.dark ? Object.assign({}, darkTheme, props.theme) : {};

    return (
        <TextInput
            // @ts-ignore
            ref={inputRef}
            style={[defaultStyles.textInput, style]}
            {...otherProps}
            theme={themeToUse}
        />
    );
};

export const ThemedTextInput = React.forwardRef(ThemedTextInputRender);
