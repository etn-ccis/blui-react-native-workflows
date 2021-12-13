/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React, { useEffect } from 'react';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Instruction } from '../components/Instruction';
import { useTheme } from 'react-native-paper';
import { ThemedButton as Button } from '../components/themed/ThemedButton';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Hooks
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        scrollContainer: {
            flex: 1,
            alignContent: 'center',
        },
        scrollContentContainer: {
            alignSelf: 'center',
            maxWidth: 600,
        },
        mainContainer: {
            marginTop: 8,
            flex: 1,
        },
        containerMargins: {
            marginHorizontal: 16,
        },
        bottomButtonContainer: {
            position: 'absolute',
            bottom: 16,
            width: '100%',
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
    });

/**
 * Properties for the verify email component.
 *
 * @param initialCode  value used to initialize the code.
 * @param onVerifyCodeChanged  Handle the verify code change action. Called each time the code changes.
 * @param onResendVerificationEmail  Handle the press of the resend verification email.
 * @param onSubmit callback called when user submits on the last form field to advance the screen
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type VerifyEmailProps = {
    initialCode?: string;
    onVerifyCodeChanged(email: string): void;
    onResendVerificationEmail(): void;
    onSubmit?: () => void;
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the content of the verify email screen for self-registration
 * (input for verification code and button to resend code).
 *
 * @category Component
 */
export const VerifyEmail: React.FC<VerifyEmailProps> = (props) => {
    const { initialCode, onVerifyCodeChanged, onResendVerificationEmail, theme: customTheme } = props;
    const theme = useTheme(customTheme);
    const { t } = useLanguageLocale();
    const [verifyCode, setVerifyCode] = React.useState(initialCode ?? '');

    useEffect(() => {
        setVerifyCode(props.initialCode ?? '');
    }, [props.initialCode]);

    useEffect(() => {
        onVerifyCodeChanged(verifyCode || '');
    }, [verifyCode, onVerifyCodeChanged]);

    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <KeyboardAwareScrollView
                style={containerStyles.scrollContainer}
                contentContainerStyle={containerStyles.scrollContentContainer}
            >
                <Instruction
                    style={containerStyles.containerMargins}
                    text={t('blui:SELF_REGISTRATION.VERIFY_EMAIL.MESSAGE')}
                />

                <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                    <TextInput
                        label={t('blui:SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION')}
                        value={verifyCode}
                        style={styles.inputMargin}
                        keyboardType={'default'}
                        autoCapitalize={'none'}
                        onChangeText={setVerifyCode}
                        onSubmitEditing={verifyCode.length ? props.onSubmit : undefined}
                    />
                    <View style={{ flex: 1 }}>
                        <Button
                            uppercase={false}
                            mode={'contained'}
                            onPress={(): void => onResendVerificationEmail()}
                            style={styles.inputMargin}
                        >
                            {t('blui:SELF_REGISTRATION.VERIFY_EMAIL.RESEND')}
                        </Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
