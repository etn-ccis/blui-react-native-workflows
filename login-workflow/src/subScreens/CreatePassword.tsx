/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React, { useCallback } from 'react';

// Components
import { View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { TextInputSecure } from '../components/TextInputSecure';
import { Instruction } from '../components/Instruction';
import { useTheme } from 'react-native-paper';

// Hooks
import { ScrollView } from 'react-native-gesture-handler';

// Shared Auth Logic
import {
    // Constants
    SPECIAL_CHAR_REGEX,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
    // Types
    PasswordRequirement,
    // Hooks
    useLanguageLocale,
    useInjectedUIContext,
} from '@brightlayer-ui/react-auth-shared';

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            backgroundColor: theme.colors.surface,
            marginBottom: 16,
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        mainContainer: {
            flex: 1,
        },
        containerMargins: {
            marginHorizontal: 16,
        },
    });

/**
 * Handle the change of the password input.
 *
 * @param onPasswordChanged  Handle the change of the password input.
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type CreatePasswordProps = {
    onPasswordChanged(password: string): void;
    onSubmit?: () => void;
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the content of the Create Password screen (inputs for password and confirm password).
 *
 * @category Component
 */
export const CreatePassword: React.FC<CreatePasswordProps> = (props) => {
    const theme = useTheme(props.theme);
    const [passwordInput, setPasswordInput] = React.useState('');
    const [confirmInput, setConfirmInput] = React.useState('');
    const { t } = useLanguageLocale();

    const containerStyles = makeContainerStyles(theme);

    const confirmPasswordRef = React.useRef<TextInput>(null);
    const goToNextInput = (): void => confirmPasswordRef?.current?.focus();

    const defaultRequirements: PasswordRequirement[] = [
        {
            regex: LENGTH_REGEX,
            description: t('blui:PASSWORD_REQUIREMENTS.LENGTH'),
        },
        {
            regex: NUMBERS_REGEX,
            description: t('blui:PASSWORD_REQUIREMENTS.NUMBERS'),
        },
        {
            regex: UPPER_CASE_REGEX,
            description: t('blui:PASSWORD_REQUIREMENTS.UPPER'),
        },
        {
            regex: LOWER_CASE_REGEX,
            description: t('blui:PASSWORD_REQUIREMENTS.LOWER'),
        },
        {
            regex: SPECIAL_CHAR_REGEX,
            description: t('blui:PASSWORD_REQUIREMENTS.SPECIAL'),
        },
    ];
    const { passwordRequirements = defaultRequirements } = useInjectedUIContext();

    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordRequirements, passwordInput, confirmInput]);

    React.useEffect(() => {
        props.onPasswordChanged(areValidMatchingPasswords() ? passwordInput : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [passwordInput, confirmInput, areValidMatchingPasswords]); // ignore props

    return (
        <SafeAreaView style={[containerStyles.safeContainer, { flexGrow: 1 }]}>
            <View style={{ width: '100%', maxWidth: 600 }}>
                <ScrollView style={{ flexGrow: 1 }}>
                    <Instruction
                        text={t('blui:CHANGE_PASSWORD.PASSWORD_INFO')}
                        style={[containerStyles.containerMargins]}
                    />

                    <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                        <TextInputSecure
                            label={t('blui:FORMS.PASSWORD')}
                            value={passwordInput}
                            style={{ marginTop: 32 }}
                            autoCapitalize={'none'}
                            returnKeyType={'next'}
                            onChangeText={(text: string): void => setPasswordInput(text)}
                            onSubmitEditing={(): void => {
                                goToNextInput();
                            }}
                            blurOnSubmit={false}
                        />

                        <PasswordRequirements style={{ paddingTop: 8 }} passwordText={passwordInput} />

                        <TextInputSecure
                            ref={confirmPasswordRef}
                            label={t('blui:FORMS.CONFIRM_PASSWORD')}
                            value={confirmInput}
                            style={{ marginTop: 24 }}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            error={confirmInput !== '' && passwordInput !== confirmInput}
                            onChangeText={(text: string): void => setConfirmInput(text)}
                            onSubmitEditing={areValidMatchingPasswords() ? props.onSubmit : undefined}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
