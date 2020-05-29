/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleSheet, ScrollViewProperties } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Theme, useTheme } from 'react-native-paper';

/**
 * @ignore
 */
const makeStyles = (spaceSize: number, topColor: string, bottomColor: string): Record<string, any> =>
    StyleSheet.create({
        scrollViewTopCover: {
            backgroundColor: topColor,
            position: 'absolute',
            height: spaceSize,
            top: -spaceSize,
            left: 0,
            right: 0,
        },
        scrollViewBottomCover: {
            backgroundColor: bottomColor,
            position: 'absolute',
            height: spaceSize,
            bottom: -spaceSize,
            left: 0,
            right: 0,
        },
    });

/**
 * @param topColor  (Optional) The color of the top area's background.
 * @param bottomColor  (Optional) The color of the bottom area's background.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
export type ScrollViewWithBackgroundProps = ScrollViewProperties & {
    topColor?: string;
    bottomColor?: string;
    theme?: Theme;
};

/**
 * Creates two absolutely-positioned Views behind a ScrollView in order to change the
 * background bounce colour (iOS).
 *
 * @category Component
 */
export const ScrollViewWithBackground: React.FC<ScrollViewWithBackgroundProps> = (props) => {
    const { topColor, bottomColor, children, theme: customTheme, ...other } = props;
    const theme = useTheme(customTheme);
    const styles = makeStyles(500, topColor ?? theme.colors.surface, bottomColor ?? theme.colors.surface);

    return (
        <ScrollView {...other}>
            <View style={styles.scrollViewTopCover} />
            <View style={styles.scrollViewBottomCover} />
            {children}
        </ScrollView>
    );
};
