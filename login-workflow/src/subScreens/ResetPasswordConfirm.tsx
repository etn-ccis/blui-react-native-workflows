/**
 * @packageDocumentation
 * @module Sub-Screens
 */

import React from 'react';

// Hooks
import { useNavigation, useRoute } from '@react-navigation/native';
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
} from '@brightlayer-ui/react-auth-shared';
import { CloseHeader } from '../components/CloseHeader';

/**
 * @ignore
 */
const makeContainerStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            // height: '100%',
            flex: 1,
            backgroundColor: theme.colors.surface,
        },
        mainContainer: {
            flex: 1,
        },
        containerMargins: {
            marginHorizontal: 16,
        },
        spaceBetween: {
            flexGrow: 1,
            justifyContent: 'space-between',
        },
        bottomButton: {
            backgroundColor: theme.colors.surface,
            paddingTop: 8,
        },
    });

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        bottomButton: {
            marginBottom: 8,
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
    const navigation = useNavigation();
    const routeParams = route.params as ResetPasswordConfirmParams;

    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    // Network state (setPassword)
    const setPasswordTransit = authUIState.setPassword.setPasswordTransit;
    const setPasswordIsInTransit = setPasswordTransit.transitInProgress;
    const setPasswordHasTransitError = setPasswordTransit.transitErrorMessage !== null;
    const setPasswordTransitErrorMessage = setPasswordTransit.transitErrorMessage;

    const onResetPasswordTap = (): void => {
        setHasAcknowledgedError(false);
        routeParams.onResetPasswordPress(password);
    };

    const spinner = setPasswordIsInTransit ? <Spinner /> : <></>;
    const canProgress = (): boolean => password.length > 0;
    const errorDialog = (
        <SimpleDialog
            title={t('blui:MESSAGES.ERROR')}
            bodyText={t(setPasswordTransitErrorMessage ?? '')}
            visible={setPasswordHasTransitError && !hasAcknowledgedError}
            onDismiss={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );
    return (
        <View style={{ height: '100%' }}>
            {spinner}
            {errorDialog}
            <CloseHeader
                title={t('blui:FORMS.RESET_PASSWORD')}
                backAction={(): void => navigation.navigate('Login')}
                // backgroundColor={(theme.dark ? theme.colors.actionPalette.active : theme.colors.primary) || theme.colors.primary}
            />
            <SafeAreaView style={containerStyles.safeContainer}>
                <KeyboardAwareScrollView>
                    <CreatePassword
                        onPasswordChanged={setPassword}
                        onSubmit={canProgress() ? onResetPasswordTap : undefined}
                    />
                </KeyboardAwareScrollView>

                <View style={containerStyles.bottomButton}>
                    <View style={[containerStyles.containerMargins]}>
                        <ToggleButton
                            text={t('blui:FORMS.RESET_PASSWORD')}
                            disabled={!canProgress()}
                            style={styles.bottomButton}
                            onPress={onResetPasswordTap}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};
