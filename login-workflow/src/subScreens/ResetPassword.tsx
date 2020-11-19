/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Hooks
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Instruction } from '../components/Instruction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from '../components/Spinner';
import { SimpleDialog } from '../components/SimpleDialog';
import { ToggleButton } from '../components/ToggleButton';

// Shared Auth Logic
import {
    // Constants
    EMAIL_REGEX,
    // Hooks
    useLanguageLocale,
    useAccountUIState,
} from '@pxblue/react-auth-shared';

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
        },
        containerMargins: {
            marginHorizontal: 20,
        },
        spaceBetween: {
            flex: 1,
            justifyContent: 'space-between',
        },
    });

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        inputMargin: {
            marginTop: 40,
        },
        wideButton: {
            height: 60,
            paddingVertical: 10,
            justifyContent: 'space-between',
        },
    });

/**
 * Type for the reset password actions and strings.
 *
 * @param onResetPasswordPress  The function to handle reset password press.
 * @param contactPhone  The contact phone number string.
 */
type ResetPasswordParams = {
    onResetPasswordPress: Function;
    contactPhone: string;
};

/**
 * Handle the props for the Reset Password page.
 *
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type ResetPasswordProps = {
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the first reset password screen (input for email).
 *
 * @category Component
 */
export const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
    const theme = useTheme(props.theme);
    const [emailInput, setEmailInput] = React.useState('');
    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const { t } = useLanguageLocale();
    const accountUIState = useAccountUIState();
    const route = useRoute();
    const routeParams = route.params as ResetPasswordParams;
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    const isValidPassword = new RegExp(EMAIL_REGEX).test(emailInput);

    const onResetPasswordTap = (): void => {
        setHasAcknowledgedError(false);
        routeParams.onResetPasswordPress(emailInput);
    };

    // Network state (forgotPassword)
    const forgotPasswordTransit = accountUIState.forgotPassword;
    const isInTransit = forgotPasswordTransit.transitInProgress;
    const hasTransitError = forgotPasswordTransit.transitErrorMessage !== null;
    const transitErrorMessage = forgotPasswordTransit.transitErrorMessage;

    const contactPhone = routeParams?.contactPhone ?? '';

    const spinner = isInTransit ? <Spinner /> : <></>;

    const errorDialog = (
        <SimpleDialog
            title={t('MESSAGES.ERROR')}
            bodyText={t(transitErrorMessage ?? '')}
            visible={hasTransitError && !hasAcknowledgedError}
            onDismiss={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            {spinner}
            {errorDialog}
            <KeyboardAwareScrollView contentContainerStyle={containerStyles.spaceBetween}>
                <View style={{ flex: 1 }}>
                    <Instruction
                        text={t('FORGOT_PASSWORD.INSTRUCTIONS', { replace: { phone: contactPhone } })}
                        style={containerStyles.containerMargins}
                    />

                    <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                        <TextInput
                            label={t('LABELS.EMAIL')}
                            value={emailInput}
                            style={styles.inputMargin}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            onChangeText={(text: string): void => setEmailInput(text)}
                        />
                    </View>
                </View>
                <View style={[styles.wideButton, containerStyles.containerMargins]}>
                    <View style={{ flex: 1 }}>
                        <ToggleButton
                            text={t('FORMS.RESET_PASSWORD')}
                            disabled={!isValidPassword}
                            onPress={onResetPasswordTap}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
