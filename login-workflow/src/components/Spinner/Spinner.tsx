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
                // height: '100%',
                // width: '100%',
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                // backgroundColor: theme.dark ? 'rgba(0,0,0,0.6)' : 'rgba(255, 255, 255, 0.6)',
                position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F5FCFF88',
            }}
            testID="spinner"
            {...otherProps}
        >
            <ActivityIndicator animating={visible} size="large" color={theme.colors.primary}/>
        </View>
    );
};
