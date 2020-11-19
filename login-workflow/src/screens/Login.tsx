/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';

// Components
import { Platform, View, StyleSheet, SafeAreaView, StatusBar, TextInput as ReactTextInput } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
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
import * as Colors from '@pxblue/colors';
import { Body1, H6 } from '@pxblue/react-native-components';

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
} from '@pxblue/react-auth-shared';

/**
 * @ignore
 */
const makeContainerStyles = (): Record<string, any> =>
    StyleSheet.create({
        mainContainer: {
            marginHorizontal: 20,
        },
        checkboxAndButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 0,
            margin: 0,
            marginLeft: -10,
        },
        checkbox: {
            alignContent: 'flex-start',
            alignSelf: 'flex-start',
            margin: 0,
        },
        spaceBetween: {
            flexGrow: 1,
            justifyContent: 'space-between',
        },
        loginButtonContainer: {
            flex: 1,
            maxWidth: '50%',
            alignSelf: 'flex-end',
            height: '100%',
            flexDirection: 'row',
        },
        topArea: {
            height: '20%',
            minHeight: 130,
            paddingTop: 40,
        },
        inputAreas: {
            flex: 3,
            justifyContent: 'space-evenly',
            minHeight: 200, // Space for error messages when visible (offsetting marginTops)
        },
        loginControls: {
            marginTop: 15,
        },
        bottomButtons: {
            flex: 2,
            justifyContent: 'space-around',
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
    const [rememberPassword, setRememberPassword] = React.useState(securityState.rememberMeDetails.rememberMe ?? false);
    const [emailInput, setEmailInput] = React.useState(securityState.rememberMeDetails.email ?? '');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const [debugMode, setDebugMode] = React.useState(false);

    const navigation = useNavigation();
    const { t } = useLanguageLocale();
    const authUIActions = useAccountUIActions();
    const authUIState = useAccountUIState();
    const authProps = useInjectedUIContext();

    const theme = useTheme(props.theme);
    const containerStyles = makeContainerStyles();
    const styles = makeStyles();

    const loginTapped = (): void => {
        setHasAcknowledgedError(false);
        authUIActions.actions.logIn(emailInput, passwordInput, rememberPassword);
    };

    const transitState = authUIState.login;
    const spinner = transitState.transitInProgress ? <Spinner hasHeader={false} /> : <></>;
    const hasTransitError = authUIState.login.transitErrorMessage !== null;
    const transitErrorMessage = authUIState.login.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const errorDialog = (
        <SimpleDialog
            title={t('MESSAGES.ERROR')}
            bodyText={t(transitErrorMessage)}
            visible={hasTransitError && !hasAcknowledgedError}
            onDismiss={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    // Construct the optional elements
    let contactEatonRepresentative: JSX.Element = (
        <ResizingClearButton
            title={t('MESSAGES.CONTACT')}
            style={{ width: '100%' }}
            onPress={(): void => navigation.navigate('SupportContact')}
        />
    );

    const confirmPasswordRef = React.useRef<ReactTextInput>(null);
    const goToNextInput = (): void => confirmPasswordRef?.current?.focus();

    const showSelfRegistration = authProps.showSelfRegistration ?? true; // enabled by default
    let createAccountOption: JSX.Element = <></>;
    if (showSelfRegistration || debugMode) {
        createAccountOption = (
            <View>
                <Body1 style={styles.signUpText}>{t('LABELS.NEED_ACCOUNT')}</Body1>
                {/* 
                // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920 */}
                <Button
                    mode={'text'}
                    labelStyle={styles.clearButton}
                    uppercase={false}
                    onPress={(): void => navigation.navigate('Registration')}
                >
                    <Body1 color="primary">{t('ACTIONS.CREATE_ACCOUNT')}</Body1>
                </Button>
            </View>
        );
    } else {
        contactEatonRepresentative = (
            <View style={{ alignSelf: 'center', flexShrink: 1 }}>
                <Body1 style={styles.signUpText}>{t('LABELS.NEED_ACCOUNT')}</Body1>
                <ResizingClearButton
                    title={t('MESSAGES.CONTACT')}
                    style={{ width: '100%' }}
                    onPress={(): void => navigation.navigate('SupportContact')}
                />
            </View>
        );
    }

    // Create buttons for debug mode
    const allowDebugMode = authProps.allowDebugMode ?? false; // don't allow debug mode by default
    let debugButton: JSX.Element = <></>;
    if (allowDebugMode) {
        debugButton = (
            // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920
            <Button
                mode={'contained'}
                style={{ position: 'absolute', top: 50, right: 20 }}
                onPress={(): void => setDebugMode(!debugMode)}
            >
                {'DEBUG'}
            </Button>
        );
    }

    let debugMessage: JSX.Element = <></>;
    if (debugMode) {
        debugMessage = (
            <H6 style={{ textAlign: 'center', lineHeight: 48, backgroundColor: Colors.yellow[500] }}>{'DEBUG MODE'}</H6>
        );
    }

    let testForgotPasswordDeepLinkButton: JSX.Element = <></>;
    if (debugMode) {
        testForgotPasswordDeepLinkButton = (
            <View style={{ alignSelf: 'center' }}>
                {/* 
                // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920 */}
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
                    [Test Forgot Password Email]
                </Button>
            </View>
        );
    }

    let testInviteRegisterButton: JSX.Element = <></>;
    if (debugMode) {
        testInviteRegisterButton = (
            <View style={{ alignSelf: 'center' }}>
                {/* 
                // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920 */}
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
            </View>
        );
    }

    let statusBar: JSX.Element = <></>;
    statusBar =
        Platform.OS === 'ios' ? (
            <StatusBar backgroundColor={theme.colors.primary} barStyle="dark-content" />
        ) : (
            <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        );

    return (
        <>
            {statusBar}
            {spinner}
            {errorDialog}
            <ScrollViewWithBackground
                bounces={false}
                contentContainerStyle={[containerStyles.spaceBetween, { backgroundColor: theme.colors.surface }]}
            >
                <LoginHeaderSplash style={containerStyles.topArea} mainImage={authProps.projectImage} />
                {debugButton}
                {debugMessage}
                <SafeAreaView style={[containerStyles.mainContainer, containerStyles.spaceBetween]}>
                    <View style={containerStyles.inputAreas}>
                        <TextInput
                            testID={'email-text-field'}
                            label={t('LABELS.EMAIL')}
                            value={emailInput}
                            keyboardType={'email-address'}
                            onChangeText={(text: string): void => setEmailInput(text)}
                            onSubmitEditing={(): void => {
                                goToNextInput();
                            }}
                            blurOnSubmit={false}
                            returnKeyType={'next'}
                            error={hasTransitError}
                            errorText={t('LOGIN.INCORRECT_CREDENTIALS')}
                        />
                        <TextInputSecure
                            testID={'password-text-field'}
                            ref={confirmPasswordRef}
                            label={t('LABELS.PASSWORD')}
                            value={passwordInput}
                            autoCapitalize={'none'}
                            onChangeText={(text: string): void => setPasswordInput(text)}
                            returnKeyType={'done'}
                            style={{ marginTop: 15 }}
                            error={hasTransitError}
                            errorText={t('LOGIN.INCORRECT_CREDENTIALS')}
                        />

                        <View style={containerStyles.loginControls}>
                            <View style={[containerStyles.checkboxAndButton]}>
                                <Checkbox
                                    label={t('ACTIONS.REMEMBER')}
                                    checked={rememberPassword}
                                    style={containerStyles.checkbox}
                                    onPress={(): void => setRememberPassword(!rememberPassword)}
                                />
                                <View style={[containerStyles.loginButtonContainer]}>
                                    <ToggleButton
                                        text={t('ACTIONS.LOG_IN')}
                                        disabled={!EMAIL_REGEX.test(emailInput) || !passwordInput}
                                        onPress={loginTapped}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={containerStyles.bottomButtons}>
                        {testForgotPasswordDeepLinkButton}
                        {testInviteRegisterButton}

                        <View>
                            {/* 
                            // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920 */}
                            <Button
                                mode={'text'}
                                labelStyle={styles.clearButton}
                                uppercase={false}
                                onPress={(): void => navigation.navigate('PasswordResetInitiation')}
                            >
                                <Body1 color="primary">{t('LABELS.FORGOT_PASSWORD')}</Body1>
                            </Button>
                        </View>

                        {createAccountOption}

                        {contactEatonRepresentative}

                        <CybersecurityBadge containerStyle={styles.securityBadge} />
                    </View>
                </SafeAreaView>
            </ScrollViewWithBackground>
        </>
    );
};
