/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Constants
import {
    SPECIAL_CHAR_REGEX,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
} from '../constants/index';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { TextInputSecure } from '../components/TextInputSecure';
import { Instruction } from '../components/Instruction';

// Styles
import * as Colors from '@pxblue/colors';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeContainerStyles = () =>
    StyleSheet.create({
        safeContainer: {
            backgroundColor: Colors.white['50'],
            marginBottom: 20,
            flex: 1,
        },
        mainContainer: {
            flex: 1,
        },
        containerMargins: {
            marginHorizontal: 20,
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
 * Handle the change of the password input.
 *
 * @param onPasswordChanged  Handle the change of the password input.
 */
type CreatePasswordProps = {
    onPasswordChanged(password: string): void;
};

/**
 * Renders the content of the Create Password screen (inputs for password and confirm password).
 *
 * @category Component
 */
export const CreatePassword: React.FC<CreatePasswordProps> = (props) => {
    const [passwordInput, setPasswordInput] = React.useState('');
    const [confirmInput, setConfirmInput] = React.useState('');
    const { t } = useLanguageLocale();

    const containerStyles = makeContainerStyles();
    const styles = makeStyles();

    const confirmPasswordRef = React.useRef<any>();
    const goToNextInput = (): void => confirmPasswordRef?.current?.focus();

    const areValidMatchingPasswords =
        new RegExp(SPECIAL_CHAR_REGEX).test(passwordInput) &&
        new RegExp(LENGTH_REGEX).test(passwordInput) &&
        new RegExp(NUMBERS_REGEX).test(passwordInput) &&
        new RegExp(UPPER_CASE_REGEX).test(passwordInput) &&
        new RegExp(LOWER_CASE_REGEX).test(passwordInput) &&
        confirmInput === passwordInput;

    React.useEffect(() => {
        props.onPasswordChanged(areValidMatchingPasswords ? passwordInput : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [passwordInput, confirmInput, areValidMatchingPasswords]); // ignore props

    return (
        <SafeAreaView style={[containerStyles.safeContainer, { flexGrow: 1 }]}>
            <ScrollView style={{ flexGrow: 1 }}>
                <Instruction text={t('CHANGE_PASSWORD.PASSWORD_INFO')} style={[containerStyles.containerMargins]} />

                <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                    <TextInputSecure
                        label={t('FORMS.PASSWORD')}
                        value={passwordInput}
                        style={styles.inputMargin}
                        autoCapitalize={'none'}
                        returnKeyType={'next'}
                        onChangeText={(text: string): void => setPasswordInput(text)}
                        onSubmitEditing={(): void => {
                            goToNextInput();
                        }}
                        blurOnSubmit={false}
                    />

                    <PasswordRequirements style={{ paddingTop: 10 }} passwordText={passwordInput} />

                    <TextInputSecure
                        ref={confirmPasswordRef}
                        label={t('FORMS.CONFIRM_PASSWORD')}
                        value={confirmInput}
                        style={styles.inputMargin}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        error={confirmInput !== '' && passwordInput !== confirmInput}
                        onChangeText={(text: string): void => setConfirmInput(text)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
