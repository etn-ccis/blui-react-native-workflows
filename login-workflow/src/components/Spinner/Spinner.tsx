import React from 'react';
import { Modal, View } from 'react-native';
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
        <Modal visible={visible} transparent animationType="fade" onRequestClose={() => {}}>
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                testID="spinner"
                {...otherProps}
            >
                <ActivityIndicator animating={visible} size="large" color={theme.colors.primary} />
            </View>
        </Modal>
    );
};
