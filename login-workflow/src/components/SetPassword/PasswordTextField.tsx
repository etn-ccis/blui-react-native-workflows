import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

/**
 * Component that renders textfield with a visibility toggle. The toggle changes the
 * input from hidden to visible.
 *
 * @param props all props will be passed to the underlying TextField component
 *
 * @category Component
 */

export const PasswordTextField: React.FC<React.PropsWithChildren<TextInputProps> & { icon?: React.ReactNode }> =
    forwardRef((props, ref) => {
        const { ...otherProps } = props;
        const [showPassword, setShowPassword] = useState(false);

        return (
            <TextInput
                ref={ref}
                style={{ flex: 1 }}
                secureTextEntry={!showPassword}
                mode="flat"
                label="Password"
                right={
                    <TextInput.Icon
                        icon={showPassword ? 'eye' : 'eye-off'}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                {...otherProps}
            />
        );
    });
