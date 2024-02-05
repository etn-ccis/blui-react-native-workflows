import React from 'react';
import { View, ViewProps } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

export type SpinnerProps = ViewProps & {
    /**
     * True if the spinner should be displayed, false to render nothing
     */
    visible?: boolean;
};

/**
 * Component that renders a indeterminate circular progress spinner atop a semi-transparent white background.
 *
 * @param visible True if the spinner should be displayed, false to render nothing
 *
 * @category Component
 */
export const Spinner: React.FC<SpinnerProps> = (props) => {
    const { visible, ...otherProps } = props;
    const theme = useExtendedTheme();

    return (
        <View
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            {...otherProps}
        >
            <ActivityIndicator animating={visible} size="large" color={theme.colors.primary} />
        </View>
    );
};
