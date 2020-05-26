/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';

// Components
import { View, Image, StyleSheet, SafeAreaView, ImageSourcePropType } from 'react-native';
import { LoginHeaderSplash } from '../components/LoginHeaderSplash';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = () =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: Colors.white['50'],
        },
        mainContainer: {
            flex: 1,
            marginHorizontal: 30,
            height: '82%',
        },
        topArea: {
            height: '18%',
        },
        bottomHalf: {
            height: '40%',
            paddingTop: 45,
            flex: 1,
            justifyContent: 'space-between',
        },
        inputAreas: {
            marginTop: 40,
            paddingTop: 0,
            paddingBottom: 40,
        },
        checkboxAndButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            alignItems: 'center',
            padding: 0,
            margin: 0,
            marginLeft: -10,
        },
        checkbox: {
            alignContent: 'flex-start',
            alignSelf: 'flex-start',
            margin: 0,
        },
    });

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
    StyleSheet.create({
        logoCyber: {
            height: 85,
            width: '100%',
            marginVertical: 20,
        },
        svg: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
        },
        signUpText: {
            fontSize: 20,
            alignSelf: 'center',
            paddingTop: 20,
            color: Colors.gray['300'],
        },
        clearButton: {
            fontSize: 16,
        },
    });

/**
 * Type for the properties of [[Splash]].
 *
 * @param mainImage (Optional) The top splash image.
 */

type SplashProps = {
    mainImage?: ImageSourcePropType;
};

/**
 * A splash area to be used on the top of a screen. Has a faint textured background and a mainImage.
 *
 * @category Component
 */
export const Splash: React.FC<SplashProps> = (props) => {
    const containerStyles = makeContainerStyles();
    const styles = makeStyles();

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <LoginHeaderSplash style={containerStyles.topArea} mainImage={props.mainImage} />

            <View style={containerStyles.mainContainer}>
                <View style={styles.logoCyber}>
                    <Image
                        resizeMethod="resize"
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../assets/images/cybersecurity_certified.png')}
                        style={styles.svg}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
