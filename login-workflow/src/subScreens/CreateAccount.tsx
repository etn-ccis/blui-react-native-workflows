/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from '../components/TextInput';
import { Instruction } from '../components/Instruction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';

// Shared Auth Logic
import {
    // Constants
    EMAIL_REGEX,
    // Hooks
    useLanguageLocale,
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
            paddingBottom: 20,
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
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the content of the Create Account screen (input for email).
 *
 * @category Component
 */
export const CreateAccount: React.FC<CreateAccountProps> = (props) => {
    const theme = useTheme(props.theme);
    const [emailInput, setEmailInput] = React.useState('');
    const [hasEmailFormatError, setHasEmailFormatError] = React.useState(false);
    const { t } = useLanguageLocale();

    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

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
                        error={hasEmailFormatError}
                        errorText={hasEmailFormatError ? t('MESSAGES.EMAIL_ENTRY_ERROR') : ''}
                        onChangeText={(text: string): void => {
                            setEmailInput(text);
                            setHasEmailFormatError(false);
                            const validEmailOrEmpty = EMAIL_REGEX.test(text) ? text : '';
                            props.onEmailChanged(validEmailOrEmpty);
                        }}
                        onBlur={(): void => {
                            if (emailInput.length > 0 && !EMAIL_REGEX.test(emailInput)) setHasEmailFormatError(true);
                        }}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
