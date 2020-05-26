/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Label } from '@pxblue/react-native-components';
import { Button } from 'react-native-paper';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = (isOutlineOnly: boolean, isDisabled: boolean) =>
    StyleSheet.create({
        loginButton: {
            width: '100%',
            alignSelf: 'center',
            borderRadius: 2,
            borderColor: isOutlineOnly ? Colors.black['100'] : 'transparent',
        },
        label: {
            color: isOutlineOnly
                ? isDisabled
                    ? Colors.black['100']
                    : Colors.blue['500']
                : isDisabled
                ? Colors.gray['300']
                : Colors.white['50'],
        },
    });

/**
 * @param text  The text shown inside of the instruction
 * @param style  (Optional) Custom style to style the instruction.
 * @param isOutlineOnly  (Optional) If true, the buttom will not have a background colour, but an outline.
 * @param disabled  (Optional) If true, the button will be disabled.
 * @param onPress  Action to take when button is tapped.
 */
type ToggleButtonProps = {
    text: string;
    style?: StyleProp<ViewStyle>;
    isOutlineOnly?: boolean;
    disabled?: boolean;
    onPress: Function;
};

/**
 * Displays a PX Blue compliant button which may be disabled. Optionally present as an outline-only button.
 *
 * @category Component
 */
export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
    const isDisabled = props.disabled ?? false;
    const isOutlineOnly = props.isOutlineOnly ?? false;
    const styles = makeStyles(isOutlineOnly, isDisabled);

    return (
        <Button
            uppercase={false}
            mode={props.isOutlineOnly ? 'outlined' : 'contained'}
            style={[styles.loginButton, props.style]}
            disabled={isDisabled}
            onPress={(): void => props.onPress()}
        >
            <Label color="text" style={styles.label}>
                {props.text}
            </Label>
        </Button>
    );
};
