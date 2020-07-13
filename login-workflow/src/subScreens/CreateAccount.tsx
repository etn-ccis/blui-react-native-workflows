/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Constants
import { EMAIL_REGEX } from '@pxblue/react-auth-shared ';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Instruction } from '../components/Instruction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Theme, useTheme } from 'react-native-paper';

// Hooks
import { useLanguageLocale } from '@pxblue/react-auth-shared ';

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
 * Handle the change of any of the email inputs.
 *
 * @param onEmailChanged  Handle the change of any of the email inputs.
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type CreateAccountProps = {
    onEmailChanged(email: string): void;
    theme?: Theme;
};

/**
 * Regular expression used to validate email.
 */
const emailRegex = new RegExp(EMAIL_REGEX);

/**
 * Returns true if the email is valid against the emailRegext
 */
function isValidEmail(text: string): boolean {
    return emailRegex.test(text);
}

/**
 * Renders the content of the Create Account screen (input for email).
 *
 * @category Component
 */
export const CreateAccount: React.FC<CreateAccountProps> = (props) => {
    const theme = useTheme(props.theme);
    const [emailInput, setEmailInput] = React.useState('');
    const { t } = useLanguageLocale();

    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();
    const onChangeText = (text: string): void => {
        setEmailInput(text);
        const validEmailOrEmpty = isValidEmail(text) ? text : '';
        props.onEmailChanged(validEmailOrEmpty);
    };

    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <KeyboardAwareScrollView>
                <Instruction style={containerStyles.containerMargins} text={t('SELF_REGISTRATION.INSTRUCTIONS')} />

                <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                    <TextInput
                        label={t('LABELS.EMAIL')}
                        value={emailInput}
                        style={styles.inputMargin}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        error={showEmailError}
                        errorText={t('MESSAGES.EMAIL_ENTRY_ERROR')}
                        onChangeText={onChangeText}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
