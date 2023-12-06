/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React, { useCallback } from 'react';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from '../../../components/TextInput';
import { Instruction } from '../../../components/Instruction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';

// Shared Auth Logic
import {
    // Constants
    EMAIL_REGEX,
    // Hooks
    useLanguageLocale,
} from '@brightlayer-ui/react-auth-shared';
import { useNavigation, useRoute } from '@react-navigation/native';

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
            width: '100%',
            maxWidth: 600,
        },
        mainContainer: {
            flex: 1,
            marginTop: 8,
            paddingBottom: 16,
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
 * Handle the change of any of the email inputs.
 *
 * @param onEmailChanged  Handle the change of any of the email inputs.
 * @param onSubmit callback called when user submits on the last form field to advance the screen
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type CreateAccountProps = {
    initialEmail: string;
    onEmailChanged(email: string): void;
    onSubmit?: () => void;
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the content of the Create Account screen (input for email).
 *
 * @category Component
 */
export const DemoCreateAccountScreen: React.FC<CreateAccountProps> = (props) => {
    const theme = useTheme(props.theme);
    const route = useRoute();
    const { eulaAccepted } = route.params as any;
    const [emailInput, setEmailInput] = React.useState(props.initialEmail ?? '');
    const [hasEmailFormatError, setHasEmailFormatError] = React.useState(false);
    const { t } = useLanguageLocale();
const navigation = useNavigation();
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    // const onEmailChanged = useCallback((changedEmail: string) => {
    //     setEmailInput(changedEmail);
    // }, []);

    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            <KeyboardAwareScrollView
                style={containerStyles.scrollContainer}
                contentContainerStyle={containerStyles.scrollContentContainer}
            >
                <Instruction style={containerStyles.containerMargins} text={t('blui:SELF_REGISTRATION.INSTRUCTIONS')} />

                <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                    <TextInput
                        label={eulaAccepted}
                        value={emailInput}
                        style={styles.inputMargin}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        error={hasEmailFormatError}
                        errorText={hasEmailFormatError ? t('blui:MESSAGES.EMAIL_ENTRY_ERROR') : ''}
                        onChangeText={(text: string): void => {
                            setEmailInput(text);
                            setHasEmailFormatError(false);
                            const validEmailOrEmpty = EMAIL_REGEX.test(text) ? text : '';
                            // onEmailChanged(validEmailOrEmpty);
                        }}
                        onBlur={(): void => {
                            if (emailInput.length > 0 && !EMAIL_REGEX.test(emailInput)) setHasEmailFormatError(true);
                        }}
                        onSubmitEditing={
                            emailInput.length > 0 && EMAIL_REGEX.test(emailInput) ? navigation.navigate('Screen2', {email: emailInput}) : undefined
                        }
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
