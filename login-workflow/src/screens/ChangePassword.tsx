/**
 * @packageDocumentation
 * @module Screens
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
import { Platform, View, StyleSheet, SafeAreaView, StatusBar, TextInput } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { TextInputSecure } from '../components/TextInputSecure';
import { Instruction } from '../components/Instruction';
import { Spinner } from '../components/Spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ToggleButton } from '../components/ToggleButton';

// Styles
import * as Colors from '@pxblue/colors';
import { Label, H6 } from '@pxblue/react-native-components';

// Hooks
import { useSecurityActions } from '../contexts/SecurityContextProvider';
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { initialTransitState, transitSuccess, transitStart, transitFailed } from '../contexts/TransitState';
import { SimpleDialog } from '../components/SimpleDialog';
import { Theme, useTheme } from 'react-native-paper';

/**
 * @ignore
 */
const makeContainerStyles = (theme: Theme): Record<string, any> =>
    StyleSheet.create({
        safeContainer: {
            height: '100%',
            backgroundColor: theme.colors.surface,
            marginBottom: 20,
            flex: 1,
            justifyContent: 'space-between',
        },
        mainContainer: {
            flex: 1,
        },
        containerMargins: {
            marginHorizontal: 20,
        },
        containerSpacing: {
            marginVertical: 20,
        },
        iconContainer: {
            marginTop: 80,
            marginBottom: 30,
            alignSelf: 'center',
        },
    });

/**
 * @ignore
 */
const makeStyles = (theme: Theme): Record<string, any> =>
    StyleSheet.create({
        inputMargin: {
            marginTop: 40,
        },
        sideBySideButtons: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingVertical: 10,
        },
        headerText: {
            color: Colors.black['800'],
        },
        bodyText: {
            color: theme.colors.text,
        },
        textSpacing: {
            marginVertical: 10,
        },
        wideButton: {
            height: 60,
            paddingVertical: 10,
        },
    });

/**
 * @param onChangePassword  Function to handle change password action.
 * @param onCancel  Function to handle cancel action.
 * @param onChangeComplete  Function to handle the on change complete action.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type ChangePasswordProps = {
    onChangePassword: (oldPassword: string, newPassword: string) => Promise<void>;
    onCancel: () => void;
    onChangeComplete: () => void;
    theme?: Theme;
};

/**
 * Renders the content of the change password screen
 * (inputs current password, new password and confirm password).
 *
 * @category Component
 */
export const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
    const theme = useTheme(props.theme);
    const [currentPasswordInput, setCurrentPasswordInput] = React.useState('');
    const [newPasswordInput, setNewPasswordInput] = React.useState('');
    const [confirmInput, setConfirmInput] = React.useState('');
    const [transitState, setTransitState] = React.useState(initialTransitState);
    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const securityHelper = useSecurityActions();
    const { t } = useLanguageLocale();

    // styles
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles(theme);

    // for continuing to the next input
    const newPasswordRef = React.useRef<TextInput>(null);
    const goToNewPasswordInput = (): void => newPasswordRef?.current?.focus();

    const confirmInputRef = React.useRef<TextInput>(null);
    const goToConfirmInput = (): void => confirmInputRef?.current?.focus();

    const areValidMatchingPasswords =
        new RegExp(SPECIAL_CHAR_REGEX).test(newPasswordInput) &&
        new RegExp(LENGTH_REGEX).test(newPasswordInput) &&
        new RegExp(NUMBERS_REGEX).test(newPasswordInput) &&
        new RegExp(UPPER_CASE_REGEX).test(newPasswordInput) &&
        new RegExp(LOWER_CASE_REGEX).test(newPasswordInput) &&
        confirmInput === newPasswordInput;

    const spinner = transitState.transitInProgress ? <Spinner hasHeader={false} /> : <></>;

    const changePassword = async (): Promise<void> => {
        try {
            setHasAcknowledgedError(false);
            setTransitState(transitStart());
            await props.onChangePassword(currentPasswordInput, newPasswordInput);
            setTransitState(transitSuccess());
        } catch (error) {
            setTransitState(transitFailed(error.errorMessage));
        }
    };

    const errorDialog = (
        <SimpleDialog
            title={'Error'} // TODO: Translate
            bodyText={transitState.transitErrorMessage}
            visible={transitState.transitErrorMessage !== null && !hasAcknowledgedError}
            onDismiss={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    let statusBar: JSX.Element = <></>;
    statusBar =
        Platform.OS === 'ios' ? (
            <StatusBar backgroundColor={theme.colors.primary} barStyle="dark-content" />
        ) : (
            <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        );

    return transitState.transitSuccess ? ( // if the password was changed
        <SafeAreaView style={[containerStyles.safeContainer, { flexGrow: 1 }]}>
            {statusBar}
            <View style={[containerStyles.mainContainer]}>
                <ScrollView>
                    <MatIcon
                        name={'check'}
                        color={theme.colors.placeholder}
                        style={containerStyles.iconContainer}
                        size={100}
                    />
                    <View style={[containerStyles.containerMargins, containerStyles.containerSpacing]}>
                        <H6 style={[styles.headerText, styles.textSpacing]}>{t('CHANGE_PASSWORD.PASSWORD_CHANGED')}</H6>
                        <Label style={[styles.bodyText, styles.textSpacing]}>
                            {t('CHANGE_PASSWORD.SUCCESS_MESSAGE')}
                        </Label>
                    </View>
                </ScrollView>
                <View style={[styles.wideButton, containerStyles.containerMargins]}>
                    <View style={{ flex: 1 }}>
                        <ToggleButton
                            text={t('ACTIONS.LOG_IN')}
                            style={{ marginHorizontal: 20 }}
                            onPress={securityHelper.onUserNotAuthenticated}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    ) : (
        // if the password hasn't been changed yet
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, height: '100%' }}>
            <SafeAreaView style={[containerStyles.safeContainer, { flexGrow: 1 }]}>
                {statusBar}
                {spinner}
                {errorDialog}
                <Instruction text={t('CHANGE_PASSWORD.PASSWORD_INFO')} style={[containerStyles.containerMargins]} />
                <ScrollView>
                    <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                        <TextInputSecure
                            label={t('LABELS.CURRENT_PASSWORD')}
                            value={currentPasswordInput}
                            style={styles.inputMargin}
                            autoCapitalize={'none'}
                            returnKeyType={'next'}
                            onChangeText={(text: string): void => setCurrentPasswordInput(text)}
                            onSubmitEditing={(): void => {
                                goToNewPasswordInput();
                            }}
                            blurOnSubmit={false}
                        />

                        <TextInputSecure
                            label={t('LABELS.NEW_PASSWORD')}
                            ref={newPasswordRef}
                            value={newPasswordInput}
                            style={styles.inputMargin}
                            autoCapitalize={'none'}
                            returnKeyType={'next'}
                            onChangeText={(text: string): void => setNewPasswordInput(text)}
                            onSubmitEditing={(): void => {
                                goToConfirmInput();
                            }}
                            blurOnSubmit={false}
                        />

                        <PasswordRequirements style={{ paddingTop: 10 }} passwordText={newPasswordInput} />

                        <TextInputSecure
                            ref={confirmInputRef}
                            label={t('CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD')}
                            value={confirmInput}
                            style={styles.inputMargin}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            error={confirmInput !== '' && newPasswordInput !== confirmInput}
                            onChangeText={(text: string): void => setConfirmInput(text)}
                        />
                    </View>
                </ScrollView>
                <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                    <View style={{ flex: 1, paddingRight: 5 }}>
                        <ToggleButton
                            text={t('CHANGE_PASSWORD.CANCEL')}
                            outlined={true}
                            onPress={(): void => securityHelper.hideChangePassword()}
                        />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 5 }}>
                        <ToggleButton
                            text={t('CHANGE_PASSWORD.UPDATE')}
                            disabled={currentPasswordInput === '' || !areValidMatchingPasswords}
                            onPress={changePassword}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};
