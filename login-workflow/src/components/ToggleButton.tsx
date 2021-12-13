/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Body1 } from '@brightlayer-ui/react-native-components';
import { useTheme } from 'react-native-paper';
import { ThemedButton as Button } from '../components/themed/ThemedButton';

// Styles
import * as Colors from '@brightlayer-ui/colors';

/**
 * @ignore
 */
const makeStyles = (props: ToggleButtonProps, theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        loginButton: {
            width: '100%',
            alignSelf: 'center',
            borderRadius: theme.roundness,
            borderColor: props.disabled ? theme.colors.disabled : props.outlined ? theme.colors.primary : 'transparent',
        },
        label: {
            color: props.disabled ? theme.colors.disabled : props.outlined ? theme.colors.primary : Colors.white[50],
        },
    });

/**
 * @param text  The text shown inside of the button
 * @param style  (Optional) Custom style to style the button.
 * @param outlined  (Optional) If true, the button will not have a background color, but an outline.
 * @param disabled  (Optional) If true, the button will be disabled.
 * @param onPress  Action to take when button is tapped.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
export type ToggleButtonProps = {
    text: string;
    style?: StyleProp<ViewStyle>;
    outlined?: boolean;
    disabled?: boolean;
    onPress: () => void;
    theme?: ReactNativePaper.Theme;
};

/**
 * Displays a Brightlayer UI compliant button which may be disabled. Optionally present as an outline-only button.
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
            <Body1 color="text" style={styles.label}>
                {text}
            </Body1>
        </Button>
    );
};
