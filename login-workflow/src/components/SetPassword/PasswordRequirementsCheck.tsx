import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Icon } from '@brightlayer-ui/react-native-components';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { PasswordRequirementsCheckProps } from './types';

export const PasswordRequirementsCheck: React.FC<PasswordRequirementsCheckProps> = ({ isChecked, label }) => {
    const theme = useExtendedTheme();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Icon
                source={{ name: isChecked ? 'check' : 'check' }}
                color={isChecked ? theme.colors.primary : theme.colors.disabled}
            />
            <Text style={{ marginLeft: 8 }}>{label}</Text>
        </View>
    );
};

