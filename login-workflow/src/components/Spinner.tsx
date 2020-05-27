/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { Platform, View, StyleSheet } from 'react-native';
import { ActivityIndicator, Portal, Theme, useTheme } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = (hasHeader: boolean) =>
    StyleSheet.create({
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    });

/**
 * @param hasHeader  If true, will allocate extra top space to not cover the header bar with the spinner.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type SpinnerProps = {
    hasHeader?: boolean;
    theme?: Theme;
};

/**
 * Creates an overlay with an activity indicator above the current hierarchy.
 *
 * @category Component
 */
export const Spinner: React.FC<SpinnerProps> = (props) => {
    const { hasHeader = true } = props;
    const theme = useTheme(props.theme);
    const styles = makeStyles(hasHeader);

    return (
        <Portal>
            <View style={styles.overlay}>
                <ActivityIndicator animating={true} color={theme.colors.primary} style={styles.activityIndicator} />
            </View>
        </Portal>
    );
};
