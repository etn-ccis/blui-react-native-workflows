/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Label } from '@pxblue/react-native-components';
import { Button, Theme, useTheme } from 'react-native-paper';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = (props: ToggleButtonProps, theme: Theme) =>
    StyleSheet.create({
        loginButton: {
            width: '100%',
            alignSelf: 'center',
            borderRadius: theme.roundness,
            borderColor: props.outlined ? Colors.black['100'] : 'transparent',
        },
        label: {
            color: props.outlined
                ? props.disabled
                    ? Colors.black['100']
                    : theme.colors.primary
                : props.disabled
                ? Colors.gray['300']
                : Colors.white['50'],
        },
    });

/**
 * @param text  The text shown inside of the instruction
 * @param style  (Optional) Custom style to style the instruction.
 * @param outlined  (Optional) If true, the buttom will not have a background colour, but an outline.
 * @param disabled  (Optional) If true, the button will be disabled.
 * @param onPress  Action to take when button is tapped.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type ToggleButtonProps = {
    text: string;
    style?: StyleProp<ViewStyle>;
    outlined?: boolean;
    disabled?: boolean;
    onPress: () => void;
    theme?: Theme;
};

/**
 * Displays a PX Blue compliant button which may be disabled. Optionally present as an outline-only button.
 *
 * @category Component
 */
export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
    const { text, style, outlined = false, disabled = false, onPress, theme: customTheme } = props;
    const theme = useTheme(customTheme);
    const styles = makeStyles(props, theme);

    return (
        <Button
            uppercase={false}
            mode={outlined ? 'outlined' : 'contained'}
            style={[styles.loginButton, style]}
            disabled={disabled}
            onPress={onPress}
        >
            <Label color="text" style={styles.label}>
                {text}
            </Label>
        </Button>
    );
};
