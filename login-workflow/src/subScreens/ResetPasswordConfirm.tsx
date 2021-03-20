/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Hooks
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

// Components
import { View, StyleSheet, SafeAreaView, LogBox } from 'react-native';
import { CreatePassword } from './CreatePassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from '../components/Spinner';
import { SimpleDialog } from '../components/SimpleDialog';
import { ToggleButton } from '../components/ToggleButton';

// Shared Auth Logic
import {
    // Hooks
    useLanguageLocale,
    useAccountUIState,
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
        },
        containerMargins: {
            marginHorizontal: 20,
        },
        spaceBetween: {
            flexGrow: 1,
            justifyContent: 'space-between',
        },
        bottomButton: {
            backgroundColor: theme.colors.surface,
            paddingTop: 10,
        },
    });

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
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
    onResetPasswordPress: (password: string) => void;
};

// Suppress function as initial parameter ResetPasswordConfirmParams yellowbox errors
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

/**
 * Handle the props for the Reset Password Confirm page.
 *
 * @param theme (Optional) react-native-paper theme partial for custom styling.
 */
type ResetPasswordConfirmProps = {
    theme?: ReactNativePaper.Theme;
};

/**
 * Renders the screen with the reset password confirmation message
 * (contains 2 password inputs).
 *
 * @category Component
 */
export const ResetPasswordConfirm: React.FC<ResetPasswordConfirmProps> = (props) => {
    const theme = useTheme(props.theme);
    const [password, setPassword] = React.useState('');
    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const { t } = useLanguageLocale();
    const authUIState = useAccountUIState();
    const route = useRoute();
    const routeParams = route.params as ResetPasswordConfirmParams;

    const containerStyles = makeContainerStyles(theme);
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
            title={t('MESSAGES.ERROR')}
            bodyText={t(setPasswordTransitErrorMessage ?? '')}
            visible={setPasswordHasTransitError && !hasAcknowledgedError}
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
                <CreatePassword
                    onPasswordChanged={setPassword}
                    onSubmit={canProgress() ? onResetPasswordTap : undefined}
                />
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
