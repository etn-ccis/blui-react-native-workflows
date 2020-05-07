/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Instruction } from '../components/Instruction';
import { Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';

// Styles
import * as Colors from '@pxblue/colors';

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
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
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
 */
type VerifyEmailProps = {
    verifyCodeChanged(email: string): void;
    onResendVerificationEmail(): void;
};

/**
 * Renders the content of the verify email screen for self-registration
 * (input for verification code and button to resend code).
 *
 * @category Component
 */
export default function VerifyEmail(props: VerifyEmailProps): JSX.Element {
    const { t } = useLanguageLocale();
    const [verifyCode, setVerifyCode] = React.useState('');

    React.useEffect(() => {
        props.verifyCodeChanged(verifyCode.length === 6 ? verifyCode : '');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verifyCode]);

    const containerStyles = makeContainerStyles();
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
                            onPress={(): void => props.onResendVerificationEmail()}
                            style={styles.inputMargin}
                        >
                            {t('SELF_REGISTRATION.VERIFY_EMAIL.RESEND')}
                        </Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
