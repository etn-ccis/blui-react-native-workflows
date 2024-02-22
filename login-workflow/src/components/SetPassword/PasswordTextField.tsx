import React, { forwardRef, useState } from 'react';
import { TextStyle, StyleSheet } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

/**
 * Component that renders textfield with a visibility toggle. The toggle changes the
 * input from hidden to visible.
 *
 * @param props all props will be passed to the underlying TextField component
 *
 * @category Component
 */
const makeStyles = (): StyleSheet.NamedStyles<{
    textinput: TextStyle;
}> =>
    StyleSheet.create({
        textinput: {
            // flex: 1,
        },
    });
export const PasswordTextField: React.FC<TextInputProps> = forwardRef((props, ref) => {
    const { ...otherProps } = props;
    const [showPassword, setShowPassword] = useState(false);
    const defaultStyle = makeStyles();
    return (
        <TextInput
            ref={ref}
            testID="textfield"
            style={defaultStyle.textinput}
            secureTextEntry={!showPassword}
            mode="flat"
            label="Password"
            right={
                <TextInput.Icon
                    testID="toggle-button"
                    icon={showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                />
            }
            {...otherProps}
        />
    );
});
