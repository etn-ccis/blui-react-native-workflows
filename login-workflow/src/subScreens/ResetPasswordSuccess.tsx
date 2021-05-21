/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { StyleSheet, SafeAreaView } from 'react-native';
import { CompleteSplashScreen } from './CompleteSplash';
import { ToggleButton } from '../components/ToggleButton';
import { CloseHeader } from '../components/CloseHeader';
// Hooks
import { useNavigation } from '@react-navigation/native';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { useTheme } from 'react-native-paper';

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
    theme?: ReactNativePaper.Theme;
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

    const titleText = t('pxb:PASSWORD_RESET.SUCCESS_MESSAGE');
    const bodyText = t('pxb:CHANGE_PASSWORD.SUCCESS_MESSAGE');

    return (
        <>
            <CloseHeader
                title={t('pxb:FORMS.RESET_PASSWORD')}
                backAction={(): void => navigation.navigate('Login')}
                backgroundColor={theme.colors.primaryBase || theme.colors.primary}
            />
            <SafeAreaView style={containerStyles.safeContainer}>
                <CompleteSplashScreen boldTitle={titleText} bodyText={bodyText} icon={'vpn-key'} />

                <ToggleButton
                    text={t('pxb:ACTIONS.DONE')}
                    style={containerStyles.buttonContainer}
                    onPress={(): void => navigation.navigate('Login')}
                />
            </SafeAreaView>
        </>
    );
};
