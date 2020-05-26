/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import { useRoute } from '@react-navigation/native';
import { useAccountUIState } from '../contexts/AccountUIContext';

// Components
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { CreatePassword } from './CreatePassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from '../components/Spinner';
import { SimpleDialog } from '../components/SimpleDialog';
import { ToggleButton } from '../components/ToggleButton';

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
        spaceBetween: {
            flexGrow: 1,
            justifyContent: 'space-between',
        },
        bottomButton: {
            backgroundColor: 'white',
            paddingTop: 10,
        },
    });

/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
    StyleSheet.create({
        bottomButton: {
            marginBottom: 10,
        },
    });

/**
 * Handle the press of the reset password button
 *
 * @param onResetPasswordPress   Handle the press of the reset password button.
 */
type ResetPasswordConfirmParams = {
    onResetPasswordPress: Function;
};

/**
 * Renders the screen with the reset password confirmation message
 * (contains 2 password inputs).
 *
 * @category Component
 */
export const ResetPasswordConfirm: React.FC = () => {
    const [password, setPassword] = React.useState('');
    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const { t } = useLanguageLocale();
    const authUIState = useAccountUIState();
    const route = useRoute();
    const routeParams = route.params as ResetPasswordConfirmParams;

    const containerStyles = makeContainerStyles();
    const styles = makeStyles();

    // Network state (setPassword)
    const setPasswordTransit = authUIState.setPassword.setPasswordTransit;
    const setPassowordIsInTransit = setPasswordTransit.transitInProgress;
    const setPasswordHasTransitError = setPasswordTransit.transitErrorMessage !== null;
    const setPasswordTransitErrorMessage = setPasswordTransit.transitErrorMessage;

    const onResetPasswordTap = (): void => {
        setHasAcknowledgedError(false);
        routeParams.onResetPasswordPress(password);
    };

    const spinner = setPassowordIsInTransit ? <Spinner /> : <></>;
    const canProgress = (): boolean => password.length > 0;
    const errorDialog = (
        <SimpleDialog
            title={'Error'}
            bodyText={setPasswordTransitErrorMessage}
            isVisible={setPasswordHasTransitError && !hasAcknowledgedError}
            onDismiss={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );
    return (
        <SafeAreaView style={containerStyles.safeContainer}>
            {spinner}
            {errorDialog}
            <KeyboardAwareScrollView>
                <CreatePassword onPasswordChanged={setPassword} />
            </KeyboardAwareScrollView>

            <View style={containerStyles.bottomButton}>
                <View style={[containerStyles.containerMargins]}>
                    <ToggleButton
                        text={t('FORMS.RESET_PASSWORD')}
                        disabled={!canProgress()}
                        style={styles.bottomButton}
                        onPress={onResetPasswordTap}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
