/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { Platform, View, StyleSheet } from 'react-native';
import { Portal, useTheme } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ThemedActivityIndicator as ActivityIndicator } from '@brightlayer-ui/react-native-components/themed';
import { Body1 } from '@brightlayer-ui/react-native-components';
/**
 * @ignore
 */
const makeStyles = (theme: ReactNativePaper.Theme, hasHeader: boolean): Record<string, any> =>
    StyleSheet.create({
        overlay: {
            backgroundColor: theme.dark ? 'rgba(0,0,0,0.6)' : 'rgba(255, 255, 255, 0.6)',
            position: 'absolute',
            top: Platform.OS === 'ios' ? getStatusBarHeight() + (hasHeader ? 56 : 0) : hasHeader ? 56 : 0,
            bottom: 0,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            marginBottom: Platform.OS === 'ios' ? getStatusBarHeight() + (hasHeader ? 56 : 0) : hasHeader ? 56 : 0,
        },
        loadingText: {
            marginTop: 16,
            marginBottom: Platform.OS === 'ios' ? getStatusBarHeight() + (hasHeader ? 56 : 0) : hasHeader ? 56 : 0,
        },
    });

/**
 * @param hasHeader  If true, will allocate extra top space to not cover the header bar with the spinner.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type SpinnerProps = {
    hasHeader?: boolean;
    theme?: ReactNativePaper.Theme;
    loadingText?: string;
};

/**
 * Creates an overlay with an activity indicator above the current hierarchy.
 *
 * @category Component
 */
export const Spinner: React.FC<SpinnerProps> = (props) => {
    const { hasHeader = true, loadingText } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles(theme, hasHeader);

    return (
        <Portal>
            <View style={styles.overlay}>
                <ActivityIndicator animating={true} style={!loadingText ? styles.activityIndicator : null} />
                {loadingText && <Body1 style={[styles.loadingText]}>{loadingText}</Body1>}
            </View>
        </Portal>
    );
};
