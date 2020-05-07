/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Instruction } from '../components/Instruction';
import { Icon } from 'react-native-elements';
import { ToggleButton } from '../components/ToggleButton';

// Styles
import * as Colors from '@pxblue/colors';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import { useNavigation, useRoute } from '@react-navigation/native';

// Types
import { ResetPasswordParams } from '../types/ResetPasswordParams';

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
        },
        containerMargins: {
            marginHorizontal: 20,
        },
        iconContainer: {
            marginTop: 60,
            marginBottom: 20,
        },
    });

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
    StyleSheet.create({
        wideButton: {
            height: 60,
            paddingVertical: 10,
        },
    });

/**
 * Renders the screen with the reset password sent message.
 *
 * @category Component
 */
export default function ResetPasswordSent(): JSX.Element {
    const { t } = useLanguageLocale();
    const navigation = useNavigation();
    const route = useRoute();

    const containerStyles = makeContainerStyles();
    const styles = makeStyles();

    const routeParams = route.params as ResetPasswordParams;
    const email = routeParams?.email ?? '';

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <View>
                <Icon
                    name={'mail-outline'}
                    containerStyle={containerStyles.iconContainer}
                    size={100}
                    color={Colors.gray['500']}
                />

                <Instruction
                    text={t('FORGOT_PASSWORD.LINK_SENT', {
                        replace: { email: email },
                    })}
                    style={containerStyles.containerMargins}
                    hasBottomBorder={false}
                />
            </View>

            <View style={[styles.wideButton, containerStyles.containerMargins]}>
                <View style={{ flex: 1 }}>
                    <ToggleButton text={t('ACTIONS.DONE')} onPress={(): void => navigation.navigate('Login')} />
                </View>
            </View>
        </SafeAreaView>
    );
}
