/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

import { View, Image, StyleSheet, ImageProps, StyleProp, ViewStyle } from 'react-native';
// @ts-ignore
import CyberLogo from '../assets/images/cybersecurity_certified.png';

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        logoCyber: {
            maxHeight: 85,
            width: '100%',
            margin: 0,
            padding: 0,
        },
        svg: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            margin: 0,
            padding: 0,
        },
    });

/**
 * @param style  (Optional) Custom style to style the Cybersecurity Badge.
 */
type CybersecurityBadgeProps = {
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageProps>;
};

/**
 * Creates a view containing the Cybersecurity Badge image.
 *
 * @category Component
 */
export const CybersecurityBadge: React.FC<CybersecurityBadgeProps> = (props) => {
    const styles = makeStyles();

    return (
        <View style={[styles.logoCyber, props.containerStyle]}>
            <Image resizeMethod="resize" source={CyberLogo} style={[styles.svg, props.imageStyle]} />
        </View>
    );
};
