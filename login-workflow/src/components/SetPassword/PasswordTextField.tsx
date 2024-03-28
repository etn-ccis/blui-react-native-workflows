import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

/**
 * Component that renders textfield with a visibility toggle. The toggle changes the
 * input from hidden to visible.
 *
 * @param {TextInputProps} props - all props will be passed to the underlying TextField component
 *
 * @category Component
 */
export const PasswordTextField: React.FC<TextInputProps> = forwardRef((props, ref) => {
    const { ...otherProps } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextInput
            ref={ref}
            testID="textfield"
            secureTextEntry={!showPassword}
            mode="flat"
            label="Password"
            right={
                <TextInput.Icon
                    testID="toggle-button"
                    icon={showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                    mode="outlined"
                />
            }
            {...otherProps}
        />
    );
});
