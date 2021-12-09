/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

// Styles
import * as Colors from '@brightlayer-ui/colors';
import { useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        headerImageContainer: {
            width: '70%',
            maxWidth: 351,
            height: 90,
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 16,
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
            bottom: 8,
            padding: 8,
            width: '100%',
            height: '30%',
            overflow: 'hidden',
            resizeMode: 'cover',
            flex: 1,
            justifyContent: 'center',
            zIndex: -1,
        },
    });

/**
 * @param style  (Optional) Custom style to style the login header splash.
 * @param mainImage  (Optional) The image to show in the login header splash. Default 'eaton_stacked_logo.png'.
 */
type LoginHeaderSplashProps = {
    style?: StyleProp<ViewStyle>;
    mainImage?: number | string;
};

/**
 * A component used for a header area which contains a large image.
 *
 * @category Component
 */
export const LoginHeaderSplash: React.FC<LoginHeaderSplashProps> = (props) => {
    const { style, mainImage } = props;
    const { background = {} } = useInjectedUIContext();
    const theme = useTheme();
    const styles = makeStyles();

    return (
        <>
            <View style={[style]}>
                <View style={[styles.headerImageContainer]}>
                    <Image
                        resizeMethod="resize"
                        source={mainImage ?? require('../assets/images/eaton_stacked_logo.png')}
                        style={styles.headerImage}
                    />
                </View>
            </View>
            <Image
                resizeMethod="resize"
                source={background.backgroundImage ?? require('../assets/images/normal-background.png')}
                style={[
                    styles.splashBackgroundImage,
                    {
                        backgroundColor: background.backgroundColor ?? 'transparent',
                        height: background.backgroundSize ?? '30%',
                        tintColor: background.backgroundImage
                            ? undefined
                            : theme.dark
                            ? Colors.gray[800]
                            : Colors.gray[50],
                    },
                ]}
            />
        </>
    );
};
