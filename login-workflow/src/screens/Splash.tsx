/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';

// Components
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { LoginHeaderSplash } from '../components/LoginHeaderSplash';
import { useTheme } from 'react-native-paper';

// Styles
import * as Colors from '@brightlayer-ui/colors';
// @ts-ignore
import CyberLogo from '../assets/images/cybersecurity_certified.png';

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
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
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        logoCyber: {
            height: 85,
            width: '100%',
            marginVertical: 16,
        },
        svg: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
        },
        signUpText: {
            fontSize: 20,
            alignSelf: 'center',
            paddingTop: 16,
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
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */

type SplashProps = {
    mainImage?: string | number;
    theme?: ReactNativePaper.Theme;
};

/**
 * A splash area to be used on the top of a screen. Has a faint textured background and a mainImage.
 *
 * @category Component
 */
export const Splash: React.FC<SplashProps> = (props) => {
    const theme = useTheme(props.theme);
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <LoginHeaderSplash style={containerStyles.topArea} mainImage={props.mainImage} />

            <View style={containerStyles.mainContainer}>
                <View style={styles.logoCyber}>
                    <Image resizeMethod="resize" source={CyberLogo} style={styles.svg} />
                </View>
            </View>
        </SafeAreaView>
    );
};
