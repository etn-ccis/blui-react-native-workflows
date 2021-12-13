/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleProp, ViewStyle } from 'react-native';
import { Checkbox as PaperCheckbox, useTheme } from 'react-native-paper';
import { Body1 } from '@brightlayer-ui/react-native-components';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * @param label  The label to show beside the checkbox.
 * @param style  (Optional) Custom style to style the checkbox.
 * @param checked  If the checkbox is checked or not.
 * @param onPress  The function to handle the on press action.
 * @param disabled  (Optional) If the checkbox should be disabled or not. False if not specified.
 * @param theme  (Optional) react-native-paper theme partial to style the component.
 */
type CheckboxProps = {
    label: string;
    style?: StyleProp<ViewStyle>;
    checked: boolean;
    onPress: () => void;
    disabled?: boolean;
    theme?: ReactNativePaper.Theme;
};

/**
 * Creates a checkbox input with a label.
 *
 * @category Component
 */
export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const theme = useTheme(props.theme);
    const { disabled, onPress, checked, label, style } = props;

    const checkedBox = (): void => {
        if (disabled === true) {
            return;
        }
        onPress();
    };

    // NOTE: Wrapped in View to address React Native bug. Opacity doesn't update on re-render until the CheckBox is tapped.
    return (
        <View style={[style, props.disabled ? { opacity: 0.3 } : undefined]}>
            <TouchableOpacity
                style={[{ flexDirection: 'row', alignItems: 'center' }]}
                onPress={checkedBox}
                activeOpacity={1}
            >
                <PaperCheckbox.Android
                    status={checked ? 'checked' : 'unchecked'}
                    color={theme.colors.primary}
                    uncheckedColor={theme.colors.primary}
                />
                <Body1 style={{ flex: 1, marginLeft: 4 }}>{label}</Body1>
            </TouchableOpacity>
        </View>
    );
};
