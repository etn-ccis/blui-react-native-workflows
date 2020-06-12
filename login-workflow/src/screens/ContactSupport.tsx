/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';

// Components
import { Linking, View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Theme, useTheme } from 'react-native-paper';
import { CloseHeader } from '../components/CloseHeader';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

// Styles
import * as Colors from '@pxblue/colors';
import { Label, H6 } from '@pxblue/react-native-components';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import { useNavigation, useRoute } from '@react-navigation/native';

// Types
import { ContactParams } from '../types/ContactParams';

/**
 * @ignore
 */
const makeContainerStyles = (theme: Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
            flex: 1,
            justifyContent: 'space-between',
        },
        mainContainer: {
            flex: 1,
            paddingTop: 20,
        },
        containerMargins: {
            marginHorizontal: 20,
        },
        containerSpacing: {
            marginVertical: 20,
        },
        iconContainer: {
            marginTop: 80,
            marginBottom: 30,
            alignSelf: 'center',
        },
    });

/**
 * @ignore
 */
const makeStyles = (theme: Theme): Record<string, any> =>
    StyleSheet.create({
        textSpacing: {
            marginVertical: 10,
        },
        headerText: {
            color: Colors.black['800'],
        },
        bodyText: {
            color: theme.colors.text,
        },
    });

/**
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type ContactSupportProps = {
    theme?: Theme;
};

/**
 * Renders the contact support screen with a tap-able contact email and contact phone.
 *
 * @category Component
 */
export const ContactSupport: React.FC<ContactSupportProps> = (props) => {
    const { t } = useLanguageLocale();
    const theme = useTheme(props.theme);
    const navigation = useNavigation();
    const route = useRoute();

    const styles = makeStyles(theme);
    const containerStyles = makeContainerStyles(theme);

    // get the contactEmail and contactPhone from the route params
    const routeParams = route.params as ContactParams;
    const contactEmail = routeParams?.contactEmail ?? '';
    const contactPhone = routeParams?.contactPhone ?? '';

    return (
        <>
            <CloseHeader title={t('USER_MENU.CONTACT_US')} backAction={(): void => navigation.goBack()} />
            <SafeAreaView style={containerStyles.safeContainer}>
                <View>
                    <MatIcon
                        name={'chat-bubble-outline'}
                        style={containerStyles.iconContainer}
                        size={70}
                        color={theme.colors.primary}
                    />

                    <View style={[containerStyles.containerMargins, containerStyles.containerSpacing]}>
                        <H6 style={[styles.headerText, styles.textSpacing]}>
                            {t('CONTACT_SUPPORT.GENERAL_QUESTIONS')}
                        </H6>
                        <Label style={[styles.bodyText, styles.textSpacing]}>
                            {t('CONTACT_SUPPORT.SUPPORT_MESSAGE')}
                            {/* 
                            // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920 */}
                            <Text
                                style={{ color: theme.colors.accent }}
                                onPress={(): Promise<void> => Linking.openURL(`mailto:${contactEmail}`)}
                            >
                                {contactEmail}
                            </Text>
                            .
                        </Label>
                    </View>
                    <View style={[containerStyles.containerMargins, containerStyles.containerSpacing]}>
                        <H6 style={[styles.headerText, styles.textSpacing]}>
                            {t('CONTACT_SUPPORT.EMERGENCY_SUPPORT')}
                        </H6>
                        <Label style={[styles.bodyText, styles.textSpacing]}>
                            {t('CONTACT_SUPPORT.TECHNICAL_ASSISTANCE')}
                            {/* 
                            // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920 */}
                            <Text
                                style={{ color: theme.colors.accent }}
                                onPress={(): Promise<void> => Linking.openURL(`tel:${contactPhone}`)}
                            >
                                {contactPhone}
                            </Text>
                            .
                        </Label>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};
