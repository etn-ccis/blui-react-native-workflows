/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';

// Components
import { Linking, View, StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CloseHeader } from '../components/CloseHeader';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

// Styles
import { Body1, H6 } from '@brightlayer-ui/react-native-components';

// Hooks
import { useNavigation, useRoute } from '@react-navigation/native';

// Shared Auth Logic
import {
    // Types
    ContactParams,
    // Hooks
    useLanguageLocale,
} from '@brightlayer-ui/react-auth-shared';

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        mainContainer: {
            flex: 1,
            paddingTop: 16,
        },
        containerMargins: {
            marginHorizontal: 16,
        },
        containerSpacing: {
            marginVertical: 16,
        },
        iconContainer: {
            marginTop: 80,
            marginBottom: 32,
            alignSelf: 'center',
        },
    });

/**
 * @ignore
 */
const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        textSpacing: {
            marginVertical: 8,
        },
        headerText: {},
        bodyText: {
            color: theme.colors.text,
        },
    });

/**
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type ContactSupportProps = {
    theme?: ReactNativePaper.Theme;
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
    const contactPhoneLink = routeParams?.contactPhoneLink ?? '';

    // Navigate appropriately with the hardware back button on android
    React.useEffect(() => {
        const onBackPress = (): boolean => {
            navigation.navigate('Login');
            return true;
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return (): void => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <>
            <CloseHeader title={t('blui:USER_MENU.CONTACT_US')} backAction={(): void => navigation.navigate('Login')} />
            <SafeAreaView style={containerStyles.safeContainer}>
                <View style={{ maxWidth: 600 }}>
                    <MatIcon
                        name={'chat-bubble-outline'}
                        style={containerStyles.iconContainer}
                        size={70}
                        color={theme.colors.primary}
                    />

                    <View style={[containerStyles.containerMargins, containerStyles.containerSpacing]}>
                        <H6 style={[styles.headerText, styles.textSpacing]}>
                            {t('blui:CONTACT_SUPPORT.GENERAL_QUESTIONS')}
                        </H6>
                        <Body1 style={[styles.bodyText, styles.textSpacing]}>
                            {t('blui:CONTACT_SUPPORT.SUPPORT_MESSAGE')}
                            <Text
                                style={{ color: theme.colors.accent }}
                                onPress={(): Promise<void> => Linking.openURL(`mailto:${contactEmail}`)}
                            >
                                {contactEmail}
                            </Text>
                            .
                        </Body1>
                    </View>
                    <View style={[containerStyles.containerMargins, containerStyles.containerSpacing]}>
                        <H6 style={[styles.headerText, styles.textSpacing]}>
                            {t('blui:CONTACT_SUPPORT.EMERGENCY_SUPPORT')}
                        </H6>
                        <Body1 style={[styles.bodyText, styles.textSpacing]}>
                            {t('blui:CONTACT_SUPPORT.TECHNICAL_ASSISTANCE')}
                            <Text
                                style={{ color: theme.colors.accent }}
                                onPress={(): Promise<void> => Linking.openURL(`tel:${contactPhoneLink}`)}
                            >
                                {contactPhone}
                            </Text>
                            .
                        </Body1>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};
