/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import { IconSplash } from '../components/IconSplash';
import { FormattedText } from '../components/FormattedText';
import { Theme, useTheme } from 'react-native-paper';

// Styles
import * as Colors from '@pxblue/colors';
import { Body, H6 } from '@pxblue/react-native-components';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = () =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: 'transparent',
        },
        backgroundAndContentWrapper: {
            width: '100%',
            height: '100%',
            zIndex: 2, // For Android to render correctly
        },
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
        },
        containerMargins: {
            marginHorizontal: 20,
        },
        textContainer: {
            flex: 2,
        },
        iconContainer: {
            flex: 1,
            justifyContent: 'center',
        },
    });

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = (theme: theme) =>
    StyleSheet.create({
        headerText: {
            color: Colors.black['800'],
        },
        bodyText: {
            color: theme.colors.text,
        },
        textSpacing: {
            marginVertical: 10,
        },
        backgroundImage: {
            position: 'absolute',
        },
        circleIconBackground: {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignSelf: 'center',
        },
    });

/**
 * Type for the properties of the complete splash component.
 *
 * @param boldTitle  The bold title text.
 * @param bodyText  The body text.
 * @param icon  (Optional) The optional icon to show on the slash. Default 'blue_waves.png'.
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type CompleteSplashScreenProps = {
    boldTitle: string;
    bodyText: string;
    icon?: string;
    theme?: Theme;
};

/**
 * Renders the content of the notice of completed account creation / password reset screen.
 *
 * @category Component
 */
export const CompleteSplashScreen: React.FC<CompleteSplashScreenProps> = (props) => {
    const theme = useTheme(props.theme);
    const containerStyles = makeContainerStyles();
    const styles = makeStyles(theme);

    return (
        <View style={containerStyles.backgroundAndContentWrapper}>
            <Image style={styles.backgroundImage} source={require('../assets/images/blue_waves.png')} />
            <ScrollView style={[containerStyles.safeContainer]}>
                <SafeAreaView style={[containerStyles.safeContainer]}>
                    <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                        <IconSplash style={{ height: 200 }} icon={props.icon ?? 'person'} />

                        <View style={containerStyles.textContainer}>
                            <H6 style={[styles.headerText, styles.textSpacing]}>{props.boldTitle}</H6>
                            <Body style={[styles.bodyText, styles.textSpacing]}>
                                <FormattedText parseableText={props.bodyText} />
                            </Body>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};
