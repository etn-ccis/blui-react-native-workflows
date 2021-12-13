/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useCallback } from 'react';

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
import { Body1, H6 } from '@brightlayer-ui/react-native-components';

// Hooks
import { ScrollView } from 'react-native-gesture-handler';
import { SimpleDialog } from '../components/SimpleDialog';
import { useTheme } from 'react-native-paper';

// Shared Auth Logic
import {
    // Actions
    initialTransitState,
    transitSuccess,
    transitStart,
    transitFailed,
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
            height: '100%',
            backgroundColor: theme.colors.surface,
            marginBottom: 16,
            flex: 1,
            justifyContent: 'space-between',
        },
        mainContainer: {
            marginTop: 8,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            width: 'auto',
        },
        containerMargins: {
            marginHorizontal: 16,
        },
        containerSpacing: {
            marginVertical: 16,
        },
        iconContainer: {
            marginTop: 80,
            marginBottom: 32,
            alignSelf: 'center',
        },
    });

/**
 * @ignore
 */
const makeStyles = (theme: ReactNativePaper.Theme): Record<string, any> =>
    StyleSheet.create({
        inputMargin: {
            marginTop: 24,
        },
        sideBySideButtons: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingVertical: 8,
        },
        headerText: {},
        bodyText: {
            color: theme.colors.text,
        },
        textSpacing: {
            marginVertical: 8,
        },
        wideButton: {
            height: 60,
            paddingVertical: 8,
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
    theme?: ReactNativePaper.Theme;
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
    const { t } = useLanguageLocale();

    // styles
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles(theme);

    // for continuing to the next input
    const newPasswordRef = React.useRef<TextInput>(null);
    const goToNewPasswordInput = (): void => newPasswordRef?.current?.focus();

    const confirmInputRef = React.useRef<TextInput>(null);
    const goToConfirmInput = (): void => confirmInputRef?.current?.focus();

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
            if (!new RegExp(passwordRequirements[i].regex).test(newPasswordInput)) return false;
        }
        return confirmInput === newPasswordInput;
    }, [passwordRequirements, newPasswordInput, confirmInput]);

    const spinner = transitState.transitInProgress ? <Spinner hasHeader={false} /> : <></>;

    const changePassword = async (): Promise<void> => {
        try {
            setHasAcknowledgedError(false);
            setTransitState(transitStart());
            await props.onChangePassword(currentPasswordInput, newPasswordInput);
            setTransitState(transitSuccess());
        } catch (error) {
            setTransitState(transitFailed(error.message));
        }
    };

    const errorDialog = (
        <SimpleDialog
            title={t('blui:MESSAGES.ERROR')}
            bodyText={transitState.transitErrorMessage ?? ''}
            visible={transitState.transitErrorMessage !== null && !hasAcknowledgedError}
            onDismiss={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    let statusBar: JSX.Element = <></>;
    statusBar =
        Platform.OS === 'ios' ? (
            <StatusBar
                backgroundColor={theme.colors.primaryBase || theme.colors.primary}
                barStyle={theme.dark ? 'light-content' : 'dark-content'}
            />
        ) : (
            <StatusBar
                backgroundColor={theme.colors.primaryBase || theme.colors.primary}
                barStyle={theme.dark ? 'light-content' : 'dark-content'}
            />
        );

    return transitState.transitSuccess ? ( // if the password was changed
        <View style={{ flex: 1, height: '100%', backgroundColor: theme.colors.surface }}>
            <SafeAreaView style={[containerStyles.safeContainer, { flexGrow: 1 }]}>
                {statusBar}
                <View style={[containerStyles.mainContainer]}>
                    <ScrollView style={{ maxWidth: 600 }}>
                        <MatIcon
                            name={'check'}
                            color={theme.colors.placeholder}
                            style={containerStyles.iconContainer}
                            size={100}
                        />
                        <View style={[containerStyles.containerMargins, containerStyles.containerSpacing]}>
                            <H6 style={[styles.headerText, styles.textSpacing]}>
                                {t('blui:CHANGE_PASSWORD.PASSWORD_CHANGED')}
                            </H6>
                            <Body1 style={[styles.bodyText, styles.textSpacing]}>
                                {t('blui:CHANGE_PASSWORD.SUCCESS_MESSAGE')}
                            </Body1>
                        </View>
                    </ScrollView>
                </View>
                <View style={[styles.wideButton, containerStyles.containerMargins]}>
                    <View style={{ flex: 1 }}>
                        <ToggleButton
                            text={t('blui:ACTIONS.LOG_IN')}
                            style={{ marginHorizontal: 16 }}
                            onPress={(): void => props.onChangeComplete()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    ) : (
        // if the password hasn't been changed yet
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1, height: '100%', backgroundColor: theme.colors.surface }}
        >
            <SafeAreaView style={[containerStyles.safeContainer, { flexGrow: 1 }]}>
                {statusBar}
                {spinner}
                {errorDialog}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: 'auto',
                    }}
                >
                    <View style={{ maxWidth: 600 }}>
                        <Instruction text={t('blui:CHANGE_PASSWORD.PASSWORD_INFO')} />
                    </View>
                </View>
                <ScrollView>
                    <View style={[containerStyles.containerMargins, containerStyles.mainContainer]}>
                        <View style={{ width: '100%', maxWidth: 600 }}>
                            <TextInputSecure
                                label={t('blui:LABELS.CURRENT_PASSWORD')}
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
                                label={t('blui:LABELS.NEW_PASSWORD')}
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

                            <PasswordRequirements style={{ paddingTop: 8 }} passwordText={newPasswordInput} />

                            <TextInputSecure
                                ref={confirmInputRef}
                                label={t('blui:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD')}
                                value={confirmInput}
                                style={styles.inputMargin}
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                error={confirmInput !== '' && newPasswordInput !== confirmInput}
                                onChangeText={(text: string): void => setConfirmInput(text)}
                                onSubmitEditing={
                                    currentPasswordInput === '' || !areValidMatchingPasswords()
                                        ? undefined
                                        : changePassword
                                }
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                        <ToggleButton
                            text={t('blui:CHANGE_PASSWORD.CANCEL')}
                            outlined={true}
                            onPress={props.onCancel}
                        />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 8 }}>
                        <ToggleButton
                            text={t('blui:CHANGE_PASSWORD.UPDATE')}
                            disabled={currentPasswordInput === '' || !areValidMatchingPasswords()}
                            onPress={changePassword}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};
