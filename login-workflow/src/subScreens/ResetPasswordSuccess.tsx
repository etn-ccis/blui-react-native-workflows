/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { StyleSheet, SafeAreaView } from 'react-native';
import { CompleteSplashScreen } from './CompleteSplash';
import { ToggleButton } from '../components/ToggleButton';

// Styles
import * as Colors from '@pxblue/colors';

// Hooks
import { useNavigation } from '@react-navigation/native';
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import { Theme, useTheme } from 'react-native-paper';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = (theme: Theme) =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
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
 * Handle the props for the Reset Password Success page.
 *
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type ResetPasswordSuccessProps = {
    theme?: Theme;
};

/**
 * Renders the content of the notice of completed password reset screen.
 *
 * @category Component
 */
export const ResetPasswordSuccess: React.FC<ResetPasswordSuccessProps> = (props) => {
    const theme = useTheme(props.theme);
    const { t } = useLanguageLocale();
    const navigation = useNavigation();

    const containerStyles = makeContainerStyles(theme);

    const titleText = t('PASSWORD_RESET.SUCCESS_MESSAGE');
    const bodyText = t('CHANGE_PASSWORD.SUCCESS_MESSAGE');

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <CompleteSplashScreen boldTitle={titleText} bodyText={bodyText} icon={'vpn-key'} />

            <ToggleButton
                text={t('ACTIONS.DONE')}
                style={containerStyles.buttonContainer}
                onPress={(): void => navigation.navigate('Login')}
            />
        </SafeAreaView>
    );
};
