/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Instruction } from '../components/Instruction';
import { Button, Theme, useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';

/**
 * @ignore
 */
const makeContainerStyles = (theme: Theme): Record<string, any> =>
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
        bottomButtonContainer: {
            position: 'absolute',
            bottom: 20,
            width: '100%',
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
    });

/**
 * Properties for the verify email component.
 *
 * @param verifyCodeChanged  Handle the verify code change action.
 * @param onResendVerificationEmail  Handle the press of the resend verification email.
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type VerifyEmailProps = {
    verifyCodeChanged(email: string): void;
    onResendVerificationEmail(): void;
    theme?: Theme;
};

/**
 * Renders the content of the verify email screen for self-registration
 * (input for verification code and button to resend code).
 *
 * @category Component
 */
export const VerifyEmail: React.FC<VerifyEmailProps> = (props) => {
    const { verifyCodeChanged, onResendVerificationEmail, theme: customTheme } = props;
    const theme = useTheme(customTheme);
    const { t } = useLanguageLocale();
    const [verifyCode, setVerifyCode] = React.useState('');

    React.useEffect(() => {
        verifyCodeChanged(verifyCode.length === 6 ? verifyCode : '');
    }, [verifyCode, verifyCodeChanged]);

    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <KeyboardAwareScrollView>
                <Instruction
                    style={containerStyles.containerMargins}
                    text={t('SELF_REGISTRATION.VERIFY_EMAIL.MESSAGE')}
                />

                <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                    <TextInput
                        label={t('SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION')}
                        value={verifyCode}
                        style={styles.inputMargin}
                        keyboardType={'number-pad'}
                        autoCapitalize={'none'}
                        onChangeText={setVerifyCode}
                    />
                    <View style={{ flex: 1 }}>
                        <Button
                            uppercase={false}
                            mode={'contained'}
                            onPress={(): void => onResendVerificationEmail()}
                            style={styles.inputMargin}
                        >
                            {t('SELF_REGISTRATION.VERIFY_EMAIL.RESEND')}
                        </Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
