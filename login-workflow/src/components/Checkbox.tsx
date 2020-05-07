/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { CheckBox } from 'react-native-elements';

// Styles
import * as Colors from '@pxblue/colors';
import { blue as BlueTheme } from '@pxblue/react-native-themes';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
    StyleSheet.create({
        checkbox: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 0,
            margin: 0,
            alignSelf: 'stretch',
        },
        disabled: {
            opacity: 0.3,
        },
        textStyle: {
            fontSize: BlueTheme.sizes.medium,
            fontWeight: BlueTheme.fonts.regular.fontWeight,
            fontFamily: BlueTheme.fonts.regular.fontFamily,
        },
    });

/**
 * @param label  The label to show beside the checkbox.
 * @param style  (Optional) Custom style to style the checkbox.
 * @param textStyle  (Optional) Custom style to style the checkbox label.
 * @param isChecked  If the checkbox is checked or not.
 * @param onPress  The function to handle the on press action.
 * @param disabled  (Optional) If the checkbox should be disabled or not. False if not specified.
 */
type CheckboxProps = {
    label: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    isChecked: boolean;
    onPress: Function;
    disabled?: boolean;
};

/**
 * Creates a checkbox input with a label.
 *
 * @category Component
 */
export function Checkbox(props: CheckboxProps): JSX.Element {
    const styles = makeStyles();

    const checkedBox = (): void => {
        if (props.disabled === true) {
            return;
        }

        props.onPress();
    };

    // NOTE: Wrapped in View to address React Native bug. Opacity doesn't update on re-render until the CheckBox is tapped.
    return (
        <View style={props.disabled ? styles.disabled : undefined}>
            <CheckBox
                title={props.label}
                checked={props.isChecked}
                iconType="material"
                checkedIcon="check-box"
                uncheckedIcon="check-box-outline-blank"
                checkedColor={Colors.blue['500']}
                uncheckedColor={Colors.blue['500']}
                containerStyle={[styles.checkbox, props.style]}
                textStyle={[styles.textStyle, props.textStyle]}
                onPress={checkedBox}
            />
        </View>
    );
}
