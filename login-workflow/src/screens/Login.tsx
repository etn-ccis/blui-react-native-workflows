/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';

// Components
import { Platform, View, StyleSheet, SafeAreaView, StatusBar, TextInput as ReactTextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ThemedButton as Button } from '../components/themed/ThemedButton';

import { TextInput } from '../components/TextInput';
import { TextInputSecure } from '../components/TextInputSecure';
import { Checkbox } from '../components/Checkbox';
import { LoginHeaderSplash } from '../components/LoginHeaderSplash';
import { CybersecurityBadge } from '../components/CybersecurityBadge';
import { ScrollViewWithBackground } from '../components/ScrollViewWithBackground';
import { ResizingClearButton } from '../components/ResizingClearButton';
import { Spinner } from '../components/Spinner';
import { SimpleDialog } from '../components/SimpleDialog';
import { ToggleButton } from '../components/ToggleButton';

// Styles
import * as Colors from '@brightlayer-ui/colors';
import { Body1, H6 } from '@brightlayer-ui/react-native-components';

// Hooks
import { useNavigation } from '@react-navigation/native';

// Shared Auth Logic
import {
    // Constants
    EMAIL_REGEX,
    // Hooks
    useLanguageLocale,
    useAccountUIActions,
    useAccountUIState,
    useInjectedUIContext,
    useSecurityState,
    AccountActions,
} from '@brightlayer-ui/react-auth-shared';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * @ignore
 */
const makeContainerStyles = (insets: EdgeInsets): Record<string, any> =>
    StyleSheet.create({
        mainContainer: {
            marginHorizontal: 16,
        },
        checkboxAndButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 0,
            margin: 0,
        },
        checkbox: {
            flex: 1,
            alignContent: 'flex-start',
            alignSelf: 'flex-start',
            margin: 0,
            marginLeft: -10,
            marginRight: 16,
        },
        spaceBetween: {
            flexGrow: 1,
            justifyContent: 'space-between',
        },
        loginButtonContainer: {
            flex: 1,
            alignSelf: 'flex-end',
            height: '100%',
            flexDirection: 'row',
        },
        topArea: {
            minHeight: 130,
            paddingTop: insets.top + 16,
        },
        loginControls: {
            marginTop: 44,
            marginBottom: 40,
        },
    });

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        signUpText: {
            alignSelf: 'center',
            color: Colors.gray['300'],
        },
        clearButton: {
            fontSize: 16,
        },
        securityBadge: {
            height: 60,
            marginBottom: 16,
        },
    });

/**
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type LoginProps = {
    theme?: ReactNativePaper.Theme;
};

/**
 * Login screen with loading and error states, as well as "remember me" functionality to store a user's email between logins.
 * Requires being wrapped in an [[AuthNavigationContainer]] for access to global state and actions for authentication and registration.
 * Has a debug mode which shows buttons that allow direct access to the deep link flows (invite registration, set password from forgot password, etc.).
 *
 *
 * @category Component
 */

export const Login: React.FC<LoginProps> = (props) => {
    const securityState = useSecurityState();
    const {
        showSelfRegistration = true,
        allowDebugMode = false,
        projectImage,
        showCybersecurityBadge = true,
        showContactSupport = true,
        showRememberMe = true,
        enableResetPassword = true,
        loginActions,
        loginFooter,
        loginHeader,
    } = useInjectedUIContext();
    const navigation = useNavigation();
    const { t } = useLanguageLocale();
    const authUIActions = useAccountUIActions();
    const authUIState = useAccountUIState();

    // Styles
    const theme = useTheme(props.theme);
    const insets = useSafeAreaInsets();
    const containerStyles = makeContainerStyles(insets);
    const styles = makeStyles();

    // Local State
    const [rememberPassword, setRememberPassword] = React.useState(
        showRememberMe ? securityState.rememberMeDetails.rememberMe ?? false : false
    );
    const [emailInput, setEmailInput] = React.useState(
        showRememberMe ? securityState.rememberMeDetails.email ?? '' : ''
    );
    const [hasEmailFormatError, setHasEmailFormatError] = React.useState(false);
    const [passwordInput, setPasswordInput] = React.useState('');
    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const [debugMode, setDebugMode] = React.useState(false);

    const loginTapped = (): void => {
        setHasAcknowledgedError(false);
        void authUIActions.actions.logIn(emailInput, passwordInput, showRememberMe ? rememberPassword : false);
    };

    const transitState = authUIState.login;
    const spinner = transitState.transitInProgress ? <Spinner hasHeader={false} /> : <></>;
    const hasTransitError = authUIState.login.transitErrorMessage !== null;
    const transitErrorMessage = authUIState.login.transitErrorMessage ?? t('blui:MESSAGES.REQUEST_ERROR');
    const isInvalidCredentials =
        transitErrorMessage.replace('blui:', '') === 'LOGIN.INCORRECT_CREDENTIALS' ||
        transitErrorMessage.replace('blui:', '') === 'LOGIN.INVALID_CREDENTIALS';

    const errorDialog = (
        <SimpleDialog
            title={t('blui:MESSAGES.ERROR')}
            bodyText={t(transitErrorMessage)}
            visible={hasTransitError && !hasAcknowledgedError}
            onDismiss={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    // Construct the optional elements
    let contactEatonRepresentative: JSX.Element = showContactSupport ? (
        <ResizingClearButton
            title={t('blui:MESSAGES.CONTACT')}
            style={{ width: '100%' }}
            onPress={(): void => navigation.navigate('SupportContact')}
        />
    ) : (
        <></>
    );

    const confirmPasswordRef = React.useRef<ReactTextInput>(null);
    const goToNextInput = (): void => confirmPasswordRef?.current?.focus();

    let createAccountOption: JSX.Element = <></>;
    if (showSelfRegistration) {
        createAccountOption = (
            <View style={{ marginVertical: 32 }}>
                <Body1 style={styles.signUpText}>{t('blui:LABELS.NEED_ACCOUNT')}</Body1>
                <Button
                    mode={'text'}
                    labelStyle={styles.clearButton}
                    uppercase={false}
                    onPress={(): void => navigation.navigate('Registration')}
                >
                    <Body1 color="primary">{t('blui:ACTIONS.CREATE_ACCOUNT')}</Body1>
                </Button>
            </View>
        );
    } else {
        contactEatonRepresentative = showContactSupport ? (
            <View style={{ alignSelf: 'center', flexShrink: 1 }}>
                <Body1 style={styles.signUpText}>{t('blui:LABELS.NEED_ACCOUNT')}</Body1>
                <ResizingClearButton
                    title={t('blui:MESSAGES.CONTACT')}
                    style={{ width: '100%' }}
                    onPress={(): void => navigation.navigate('SupportContact')}
                />
            </View>
        ) : (
            <></>
        );
    }

    // Create buttons for debug mode
    let debugButton: JSX.Element = <></>;
    if (allowDebugMode) {
        debugButton = (
            <Button
                mode={'contained'}
                style={{ position: 'absolute', top: 50, right: 16 }}
                onPress={(): void => setDebugMode(!debugMode)}
            >
                {'DEBUG'}
            </Button>
        );
    }

    let debugMessage: JSX.Element = <></>;
    if (debugMode) {
        debugMessage = (
            <H6 style={{ textAlign: 'center', lineHeight: 48, backgroundColor: Colors.yellow[500], marginTop: 48 }}>
                {'DEBUG MODE'}
            </H6>
        );
    }

    const debugLinks = !debugMode ? null : (
        <View>
            <View style={{ alignSelf: 'center' }}>
                <Button
                    mode={'text'}
                    labelStyle={styles.clearButton}
                    uppercase={false}
                    onPress={(): void =>
                        navigation.navigate('RegistrationInvite', {
                            code: 'DEBUG_VALIDATION_CODE_DEADBEEF',
                        })
                    }
                >
                    [Test Invite Register]
                </Button>
                <Button
                    mode={'text'}
                    labelStyle={styles.clearButton}
                    uppercase={false}
                    onPress={(): void => navigation.navigate('Registration')}
                >
                    [Test Self Register]
                </Button>
                <Button
                    mode={'text'}
                    labelStyle={styles.clearButton}
                    uppercase={false}
                    onPress={(): void => navigation.navigate('PasswordResetInitiation')}
                >
                    [Test Forgot Password]
                </Button>
                <Button
                    mode={'text'}
                    labelStyle={styles.clearButton}
                    uppercase={false}
                    onPress={(): void =>
                        navigation.navigate('PasswordResetCompletion', {
                            code: 'DEBUG_VALIDATION_CODE_DEADBEEF',
                        })
                    }
                >
                    [Test Reset Password]
                </Button>
                <Button
                    mode={'text'}
                    labelStyle={styles.clearButton}
                    uppercase={false}
                    onPress={(): void => navigation.navigate('SupportContact')}
                >
                    [Test Contact Support]
                </Button>
            </View>
        </View>
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

    return (
        <>
            {statusBar}
            {spinner}
            {errorDialog}
            <ScrollViewWithBackground
                bounces={false}
                contentContainerStyle={[{ flexGrow: 1, backgroundColor: theme.colors.surface }]}
                keyboardShouldPersistTaps={'always'}
            >
                {loginHeader || <LoginHeaderSplash style={containerStyles.topArea} mainImage={projectImage} />}
                {debugButton}
                {debugMessage}
                {debugLinks}
                <SafeAreaView
                    style={[
                        containerStyles.mainContainer,
                        {
                            flexGrow: 1,
                            width: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        },
                    ]}
                >
                    <View style={[{ flexGrow: 1, maxWidth: 600 }]}>
                        <TextInput
                            testID={'email-text-field'}
                            label={t('blui:LABELS.EMAIL')}
                            value={emailInput}
                            keyboardType={'email-address'}
                            style={{ marginTop: 48 }}
                            onChangeText={(text: string): void => {
                                setEmailInput(text);
                                setHasEmailFormatError(false);
                                if (authUIState.login.transitErrorMessage !== null)
                                    authUIActions.dispatch(AccountActions.resetLogin());
                            }}
                            onSubmitEditing={(): void => {
                                goToNextInput();
                            }}
                            blurOnSubmit={false}
                            returnKeyType={'next'}
                            error={isInvalidCredentials || hasEmailFormatError}
                            errorText={
                                isInvalidCredentials
                                    ? t('blui:LOGIN.INCORRECT_CREDENTIALS')
                                    : hasEmailFormatError
                                    ? t('blui:MESSAGES.EMAIL_ENTRY_ERROR')
                                    : ''
                            }
                            onBlur={(): void => {
                                if (emailInput.length > 0 && !EMAIL_REGEX.test(emailInput))
                                    setHasEmailFormatError(true);
                            }}
                        />
                        <TextInputSecure
                            testID={'password-text-field'}
                            ref={confirmPasswordRef}
                            label={t('blui:LABELS.PASSWORD')}
                            value={passwordInput}
                            autoCapitalize={'none'}
                            onChangeText={(text: string): void => {
                                setPasswordInput(text);
                                if (authUIState.login.transitErrorMessage !== null)
                                    authUIActions.dispatch(AccountActions.resetLogin());
                            }}
                            returnKeyType={'done'}
                            style={{ marginTop: 44 }}
                            error={isInvalidCredentials}
                            errorText={t('blui:LOGIN.INCORRECT_CREDENTIALS')}
                            onSubmitEditing={!EMAIL_REGEX.test(emailInput) || !passwordInput ? undefined : loginTapped}
                        />

                        <View style={[containerStyles.loginControls]}>
                            <View style={[containerStyles.checkboxAndButton]}>
                                {showRememberMe && (
                                    <Checkbox
                                        label={t('blui:ACTIONS.REMEMBER')}
                                        checked={rememberPassword}
                                        style={[containerStyles.checkbox]}
                                        onPress={(): void => setRememberPassword(!rememberPassword)}
                                    />
                                )}
                                <View style={[containerStyles.loginButtonContainer]}>
                                    <ToggleButton
                                        text={t('blui:ACTIONS.LOG_IN')}
                                        disabled={!EMAIL_REGEX.test(emailInput) || !passwordInput}
                                        onPress={loginTapped}
                                    />
                                </View>
                            </View>
                        </View>
                        {loginActions && typeof loginActions === 'function' && loginActions(navigation)}
                        {loginActions && typeof loginActions !== 'function' && loginActions}
                        <View>
                            {enableResetPassword && (
                                <Button
                                    mode={'text'}
                                    labelStyle={styles.clearButton}
                                    uppercase={false}
                                    onPress={(): void => navigation.navigate('PasswordResetInitiation')}
                                >
                                    <Body1 color="primary">{t('blui:LABELS.FORGOT_PASSWORD')}</Body1>
                                </Button>
                            )}

                            {createAccountOption}
                            {contactEatonRepresentative}
                            {loginFooter && typeof loginFooter === 'function' && loginFooter(navigation)}
                            {loginFooter && typeof loginFooter !== 'function' && loginFooter}
                        </View>
                        {showCybersecurityBadge && <CybersecurityBadge containerStyle={styles.securityBadge} />}
                    </View>
                </SafeAreaView>
            </ScrollViewWithBackground>
        </>
    );
};
