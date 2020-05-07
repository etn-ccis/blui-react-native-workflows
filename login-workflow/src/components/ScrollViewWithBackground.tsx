/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = (spaceSize: number, topColor: string, bottomColor: string) =>
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
 */
export type ScrollViewWithBackgroundProps = {
    topColor?: string;
    bottomColor?: string;
};

/**
 * Creates two absolutely-positioned Views behind a ScrollView in order to change the
 * background bounce colour (iOS).
 *
 * @category Component
 */
export const ScrollViewWithBackground = ({ children, ...props }: any & ScrollViewWithBackgroundProps): JSX.Element => {
    const styles = makeStyles(500, props.topColor ?? 'white', props.bottomColor ?? 'white');

    return (
        <ScrollView {...props}>
            <View style={styles.scrollViewTopCover} />
            <View style={styles.scrollViewBottomCover} />
            {children}
        </ScrollView>
    );
};
