/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Checkbox as PaperCheckbox, Theme, useTheme } from 'react-native-paper';
import { Body } from '@pxblue/react-native-components';

/**
 * @param label  The label to show beside the checkbox.
 * @param style  (Optional) Custom style to style the checkbox.
 * @param textStyle  (Optional) Custom style to style the checkbox label.
 * @param isChecked  If the checkbox is checked or not.
 * @param onPress  The function to handle the on press action.
 * @param disabled  (Optional) If the checkbox should be disabled or not. False if not specified.
 * @param theme  (Optional) react-native-paper theme partial to style the component.
 */
type CheckboxProps = {
    label: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    isChecked: boolean;
    onPress: Function;
    disabled?: boolean;
    theme?: Theme;
};

/**
 * Creates a checkbox input with a label.
 *
 * @category Component
 */
export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const theme = useTheme(props.theme);

    const checkedBox = (): void => {
        if (props.disabled === true) {
            return;
        }
        props.onPress();
    };

    // NOTE: Wrapped in View to address React Native bug. Opacity doesn't update on re-render until the CheckBox is tapped.
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center' }, props.disabled ? { opacity: 0.3 } : undefined]}>
            <PaperCheckbox.Android
                status={props.isChecked ? 'checked' : 'unchecked'}
                color={theme.colors.primary}
                uncheckedColor={theme.colors.primary}
                onPress={checkedBox}
            />
            <Body>{props.label}</Body>
        </View>
    );
};
