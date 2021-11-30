/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import { IconSplash } from '../components/IconSplash';
import { FormattedText } from '../components/FormattedText';
import { useTheme } from 'react-native-paper';

// Styles
import { Body1, H6 } from '@brightlayer-ui/react-native-components';

/**
 * @ignore
 */
const makeContainerStyles = (): Record<string, any> =>
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
            marginHorizontal: 16,
        },
        textContainer: {
            flex: 2,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        iconContainer: {
            flex: 1,
            justifyContent: 'center',
        },
    });

/**
 * @ignore
 */
const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        headerText: {},
        bodyText: {},
        textSpacing: {
            marginVertical: 8,
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: 150,
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
 * @param icon  (Optional) The optional icon to show on the slash. Default 'waves.png'.
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type CompleteSplashScreenProps = {
    boldTitle: string;
    bodyText: string;
    icon?: string;
    theme?: ReactNativePaper.Theme;
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
            <Image
                resizeMethod={'resize'}
                resizeMode={'cover'}
                style={[styles.backgroundImage]}
                source={require('../assets/images/waves.png')}
            />
            <ScrollView style={[containerStyles.safeContainer]}>
                <SafeAreaView style={[containerStyles.safeContainer]}>
                    <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                        <IconSplash style={{ height: 150 }} icon={props.icon ?? 'person'} />

                        <View style={containerStyles.textContainer}>
                            <View style={{ width: '100%', maxWidth: 600 }}>
                                <H6 style={[styles.headerText, styles.textSpacing]}>{props.boldTitle}</H6>
                                <Body1 style={[styles.bodyText, styles.textSpacing]}>
                                    <FormattedText parseableText={props.bodyText} />
                                </Body1>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};
