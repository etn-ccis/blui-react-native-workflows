import React from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { Icon } from '@brightlayer-ui/react-native-components';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { PasswordRequirementsCheckProps } from './types';
const makeStyles = (): StyleSheet.NamedStyles<{
    label: TextStyle;
}> =>
    StyleSheet.create({
        label: {
            marginLeft: 8,
        },
    });

/**
 * Component to update password requirements.
 *
 * @param {PasswordRequirementsCheckProps} props - props of PasswordRequirementsCheck component
 *
 * @category Component
 */

export const PasswordRequirementsCheck: React.FC<PasswordRequirementsCheckProps> = ({ isChecked, label }) => {
    const theme = useExtendedTheme();
    const defaultStyle = makeStyles();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Icon source={{ name: 'check' }} color={isChecked ? theme.colors.primary : theme.colors.disabled} />
            <Text variant="bodySmall" style={defaultStyle.label}>
                {label}
            </Text>
        </View>
    );
};
