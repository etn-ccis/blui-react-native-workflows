/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Hooks
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
} from '@brightlayer-ui/react-auth-shared';

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme, insets: any): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            // height: '100%',
            flexGrow: 1,
            backgroundColor: theme.colors.surface,
            marginBottom: insets.bottom,
        },
        mainContainer: {
            marginTop: 8,
            flex: 1,
        },
        scrollContainer: {
            flex: 1,
            alignContent: 'center',
        },
        scrollContentContainer: {
            alignSelf: 'center',
            maxWidth: 600,
        },
        containerMargins: {
            marginHorizontal: 16,
        },
    });

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        inputMargin: {
            marginTop: 24,
        },
        wideButton: {
            height: 60,
            paddingVertical: 8,
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
    onResetPasswordPress: (password: string) => void;
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
    const [hasEmailFormatError, setHasEmailFormatError] = React.useState(false);
    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const { t } = useLanguageLocale();
    const accountUIState = useAccountUIState();
    const route = useRoute();
    /*
        For some strange reason the SafeAreaView doesn't work as expected on this route and the button gets 
        pegged at the very bottom. If you switch the ResetPassword for the ResetPasswordSent component, it
        has the same behavior, despite looking fine on its own route. The insets hack seems to work ok for now.
    */
    const insets = useSafeAreaInsets();

    const routeParams = route.params as ResetPasswordParams;
    const containerStyles = makeContainerStyles(theme, insets);
    const styles = makeStyles();

    const isValidEmail = new RegExp(EMAIL_REGEX).test(emailInput);

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
            title={t('blui:MESSAGES.ERROR')}
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
            <KeyboardAwareScrollView
                style={containerStyles.scrollContainer}
                contentContainerStyle={[containerStyles.scrollContentContainer]}
            >
                <Instruction
                    text={t('blui:FORGOT_PASSWORD.INSTRUCTIONS', { replace: { phone: contactPhone } })}
                    style={containerStyles.containerMargins}
                />

                <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                    <TextInput
                        label={t('blui:LABELS.EMAIL')}
                        value={emailInput}
                        style={[styles.inputMargin]}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        onChangeText={(text: string): void => {
                            setEmailInput(text);
                            setHasEmailFormatError(false);
                        }}
                        error={hasTransitError || hasEmailFormatError}
                        errorText={
                            hasTransitError
                                ? t('blui:LOGIN.INCORRECT_CREDENTIALS')
                                : hasEmailFormatError
                                ? t('blui:MESSAGES.EMAIL_ENTRY_ERROR')
                                : ''
                        }
                        onBlur={(): void => {
                            if (emailInput.length > 0 && !EMAIL_REGEX.test(emailInput)) setHasEmailFormatError(true);
                        }}
                        onSubmitEditing={isValidEmail ? onResetPasswordTap : undefined}
                    />
                </View>
            </KeyboardAwareScrollView>
            <View style={[styles.wideButton, containerStyles.containerMargins]}>
                <View style={{ flex: 1 }}>
                    <ToggleButton
                        text={t('blui:FORMS.RESET_PASSWORD')}
                        disabled={!isValidEmail}
                        onPress={onResetPasswordTap}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
