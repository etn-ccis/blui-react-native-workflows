/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { StyleSheet, SafeAreaView } from 'react-native';
import CompleteSplash from './CompleteSplash';
import { ToggleButton } from '../components/ToggleButton';

// Styles
import * as Colors from '@pxblue/colors';

// Hooks
import { useNavigation } from '@react-navigation/native';
import { useLanguageLocale } from '../hooks/language-locale-hooks';

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
            zIndex: 2,
        },
        containerMargins: {
            marginHorizontal: 20,
        },
        buttonContainer: {
            bottom: 48,
            zIndex: 2,
            width: '90%',
            marginHorizontal: '5%',
        },
    });

/**
 * Renders the content of the notice of completed password reset screen.
 *
 * @category Component
 */
function ResetPasswordSuccess(): JSX.Element {
    const { t } = useLanguageLocale();
    const navigation = useNavigation();

    const containerStyles = makeContainerStyles();

    const titleText = t('PASSWORD_RESET.SUCCESS_MESSAGE');
    const bodyText = t('CHANGE_PASSWORD.SUCCESS_MESSAGE');

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <CompleteSplash boldTitle={titleText} bodyText={bodyText} icon={'vpn-key'} />

            <ToggleButton
                text={t('ACTIONS.DONE')}
                style={containerStyles.buttonContainer}
                onPress={(): void => navigation.navigate('Login')}
            />
        </SafeAreaView>
    );
}

export default ResetPasswordSuccess;
