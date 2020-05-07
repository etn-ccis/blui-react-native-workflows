/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';

// Components
import { Linking, View, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { CloseHeader } from '../components/CloseHeader';
import { Icon } from 'react-native-elements';

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
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = () =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: Colors.white['50'],
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
        },
    });

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
    StyleSheet.create({
        textSpacing: {
            marginVertical: 10,
        },
        headerText: {
            color: Colors.black['800'],
        },
        bodyText: {
            color: Colors.black['500'],
        },
    });

/**
 * Renders the contact support screen with a tappable contact email and contact phone.
 *
 * @category Component
 */
export default function ContactSupport(): JSX.Element {
    const { t } = useLanguageLocale();
    const navigation = useNavigation();
    const route = useRoute();

    const styles = makeStyles();
    const containerStyles = makeContainerStyles();

    // get the contactEmail and contactPhone from the route params
    const routeParams = route.params as ContactParams;
    const contactEmail = routeParams?.contactEmail ?? '';
    const contactPhone = routeParams?.contactPhone ?? '';

    return (
        <>
            <CloseHeader title={t('USER_MENU.CONTACT_US')} backAction={(): void => navigation.goBack()} />
            <SafeAreaView style={containerStyles.safeContainer}>
                <View>
                    <Icon
                        name={'chat-bubble-outline'}
                        containerStyle={containerStyles.iconContainer}
                        size={70}
                        color={Colors.blue['500']}
                    />

                    <View style={[containerStyles.containerMargins, containerStyles.containerSpacing]}>
                        <H6 style={[styles.headerText, styles.textSpacing]}>
                            {t('CONTACT_SUPPORT.GENERAL_QUESTIONS')}
                        </H6>
                        <Label style={[styles.bodyText, styles.textSpacing]}>
                            {t('CONTACT_SUPPORT.SUPPORT_MESSAGE')}
                            <Text
                                style={{ color: Colors.lightBlue['300'] }}
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
                            <Text
                                style={{ color: Colors.lightBlue['300'] }}
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
}
