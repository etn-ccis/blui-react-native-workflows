/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = () =>
    StyleSheet.create({
        iconContainer: {
            flex: 1,
            justifyContent: 'center',
        },
    });

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = (iconSize: number) =>
    StyleSheet.create({
        circleIconBackground: {
            marginTop: 20,
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize / 2,
            backgroundColor: Colors.blue['500'],
            justifyContent: 'center',
            alignSelf: 'center',
        },
    });

/**
 * @param icon  (Optional) Icon to use in the icon splash component. Icon 'vpn-key' used if not specified.
 * @param style  (Optional) Custom style to style the icon splash.
 * @param iconSize  (Optional) Size to use for the icon. Size of 90 is used if not specified.
 */
type IconSplashProps = {
    icon?: string;
    style?: StyleProp<ViewStyle>;
    iconSize?: number;
};

/**
 * Renders a white icon on a blue circular background, as commonly used on flow success screens.
 *
 * @category Component
 */
export function IconSplash(props: IconSplashProps): JSX.Element {
    const BASE_SIZE = 90;
    const containerStyles = makeContainerStyles();
    const styles = makeStyles(props.iconSize ?? BASE_SIZE);

    let smallSize = BASE_SIZE * 0.55;
    if (props.iconSize) {
        smallSize = props.iconSize * 0.55;
    }

    return (
        <View style={[containerStyles.iconContainer, props.style]}>
            <Icon
                name={props.icon ?? 'vpn-key'}
                containerStyle={styles.circleIconBackground}
                size={smallSize}
                color={Colors.white['50']}
            />
        </View>
    );
}
