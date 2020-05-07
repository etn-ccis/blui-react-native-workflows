/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, Image, StyleSheet, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
    StyleSheet.create({
        headerImageContainer: {
            width: '70%',
            maxWidth: 351,
            height: 90,
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 20,
            marginTop: '1%',
        },
        headerImage: {
            width: '100%',
            resizeMode: 'contain',
        },
        splashBackgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 10,
            padding: 5,
            width: '100%',
            height: '30%',
            overflow: 'hidden',
            resizeMode: 'cover',
            flex: 1,
            justifyContent: 'center',
            tintColor: Colors.gray['50'],
            zIndex: -1,
        },
    });

/**
 * @param style  (Optional) Custom style to style the login header splash.
 * @param mainImage  (Optional) The image to show in the login header splash. Default 'eaton_stacked_logo.png'.
 */
type LoginHeaderSplashProps = {
    style?: StyleProp<ViewStyle>;
    mainImage?: ImageSourcePropType;
};

/**
 * A component used for a header area which contains a large image.
 *
 * @category Component
 */
export function LoginHeaderSplash(props: LoginHeaderSplashProps): JSX.Element {
    const styles = makeStyles();

    return (
        <>
            <View style={props.style}>
                <View style={styles.headerImageContainer}>
                    <Image
                        resizeMethod="resize"
                        source={props.mainImage ?? require('../assets/images/eaton_stacked_logo.png')}
                        style={styles.headerImage}
                    />
                </View>
            </View>
            <Image
                resizeMethod="resize"
                source={require('../assets/images/normal-background.png')}
                style={styles.splashBackgroundImage}
            />
        </>
    );
}
