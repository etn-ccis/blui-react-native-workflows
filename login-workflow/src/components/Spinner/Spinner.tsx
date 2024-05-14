import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { SpinnerProps } from './types';

/**
 * Component that renders a indeterminate circular progress spinner atop a semi-transparent white background.
 *
 * @param {SpinnerProps} props - Props of Spinner component
 *
 * @category Component
 */
export const Spinner: React.FC<SpinnerProps> = (props) => {
    const { visible, ...otherProps } = props;
    const theme = useExtendedTheme();

    return (
        <View
            style={{
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                backgroundColor: `rgba(255,255,255,${theme.dark ? 0.15 : 0.75})`,
            }}
            testID="blui-spinner"
            {...otherProps}
        >
            <ActivityIndicator animating={visible} size="large" color={theme.colors.primary} />
        </View>
    );
};
