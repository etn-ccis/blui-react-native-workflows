/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useEffect, useCallback, useState } from 'react';

// Nav
import { useNavigation, useRoute } from '@react-navigation/native';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import {
    RegistrationActions,
    useRegistrationUIActions,
    useRegistrationUIState,
} from '../contexts/RegistrationUIContext';
import { Theme, useTheme } from 'react-native-paper';

// Screens
import { Eula as EulaScreen } from '../subScreens/Eula';
import { CreateAccount as CreateAccountScreen } from '../subScreens/CreateAccount';
import { VerifyEmail as VerifyEmailScreen } from '../subScreens/VerifyEmail';
import { CreatePassword as CreatePasswordScreen } from '../subScreens/CreatePassword';
import {
    AccountDetails as AccountDetailsScreen,
    AccountDetailInformation as AccountDetailInformationScreen,
    emptyAccountDetailInformation,
} from '../subScreens/AccountDetails';
import { RegistrationComplete as RegistrationCompleteScreen } from '../subScreens/RegistrationComplete';
import { ExistingAccountComplete } from '../subScreens/ExistingAccountComplete';

// Components
import { View, StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { CloseHeader } from '../components/CloseHeader';
import { PageIndicator } from '../components/PageIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from '../data/translations/i18n';
import { useInjectedUIContext } from '../contexts/AuthUIContextProvider';

import { Spinner } from '../components/Spinner';
import { SimpleDialog } from '../components/SimpleDialog';
import { ToggleButton } from '../components/ToggleButton';

// Styles
import * as Colors from '@pxblue/colors';

/**
 * @ignore
 */
const makeContainerStyles = (theme: Theme): Record<string, any> =>
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
        fullFlex: {
            flex: 1,
            height: '100%',
        },
        topBorder: {
            borderTopColor: Colors.gray['200'],
            borderTopWidth: StyleSheet.hairlineWidth,
        },
        spaceBetween: {
            flexGrow: 1,
            justifyContent: 'space-between',
        },
    });

/**
 * @ignore
 */
const makeStyles = (): Record<string, any> =>
    StyleSheet.create({
        sideBySideButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
        },
        wideButton: {
            width: '100%',
            alignSelf: 'flex-end',
        },
    });

/**
 * Type for the properties of [[SelfRegistrationPager]].
 *
 * @param code Token from an email deep link for verifying a request to create an account with a specific email.
 * @param email Email associated with the code (optional) `?email=addr%40domain.com`.
 */
type SelfRegistrationPagerParams = {
    code?: string;
    email?: string;
};

/**
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type SelfRegistrationPagerProps = {
    theme?: Theme;
};

enum Pages {
    CreateAccount = 0,
    Eula,
    VerifyEmail,
    CreatePassword,
    AccountDetails,
    Complete,
    __LENGTH,
}

/**
 * Pager controlling the user self registration screen flow.
 * If the user taps on a deep link they will be taken
 *
 * @category Component
 */
export const SelfRegistrationPager: React.FC<SelfRegistrationPagerProps> = (props) => {
    const theme = useTheme(props.theme);
    const { t } = useLanguageLocale();

    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [password, setPassword] = useState('');
    const [accountDetails, setAccountDetails] = useState<AccountDetailInformationScreen | null>(null);
    // const [organization] = useState<string>(t('REGISTRATION.UNKNOWN_ORGANIZATION'));
    const [eulaContent, setEulaContent] = useState<string>();
    const [accountAlreadyExists, setAccountAlreadyExists] = useState<boolean>(false);
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);

    const navigation = useNavigation();
    const viewPager = React.createRef<ViewPager>();
    const registrationActions = useRegistrationUIActions();
    const registrationState = useRegistrationUIState();
    const injectedUIContext = useInjectedUIContext();

    const route = useRoute();
    const routeParams = route.params as SelfRegistrationPagerParams | undefined;
    const [verificationCode, setVerificationCode] = React.useState<string>(routeParams?.code ?? '');
    const [email, setEmail] = React.useState(routeParams?.email ?? '');

    useEffect(() => {
        if (typeof routeParams?.code === 'string') {
            setVerificationCode(routeParams.code);
            if (typeof routeParams?.email === 'string') {
                setEmail(routeParams?.email);
            }
        }
    }, [route.params, routeParams]);

    // Network state (registration)
    const codeRequestTransit = registrationState.inviteRegistration.codeRequestTransit;
    const codeRequestIsInTransit = codeRequestTransit.transitInProgress;
    const hasCodeRequestTransitError = codeRequestTransit.transitErrorMessage !== null;
    const codeRequestTransitErrorMessage = codeRequestTransit.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const codeRequestSuccess = codeRequestTransit.transitSuccess;
    // If there is a code and it is not confirmed, go to the verify screen
    useEffect((): void => {
        if (verificationCode && !codeRequestSuccess) {
            setCurrentPage(Pages.VerifyEmail);
        }
    }, [codeRequestSuccess, verificationCode]);

    const requestCode = useCallback(async (): Promise<void> => {
        registrationActions.dispatch(RegistrationActions.requestRegistrationCodeReset());
        setHasAcknowledgedError(false);
        try {
            await registrationActions.actions.requestRegistrationCode(email);
        } catch {
            // do nothing
        }
    }, [registrationActions, setHasAcknowledgedError, email]);

    // Network state (registration)
    const registrationTransit = registrationState.inviteRegistration.registrationTransit;
    const registrationIsInTransit = registrationTransit.transitInProgress;
    const hasRegistrationTransitError = registrationTransit.transitErrorMessage !== null;
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationTransit.transitSuccess;
    useEffect(() => {
        if (currentPage === Pages.AccountDetails && registrationSuccess) {
            setCurrentPage(Pages.Complete);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationSuccess]);
    useEffect(() => {
        if (currentPage === Pages.Eula && codeRequestSuccess) {
            setCurrentPage(Pages.VerifyEmail);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeRequestSuccess]);

    // Network state (invite code validation)
    const isValidationInTransit = registrationState.inviteRegistration.validationTransit.transitInProgress;
    const validationTransitErrorMessage = registrationState.inviteRegistration.validationTransit.transitErrorMessage;
    const hasValidationTransitError =
        registrationState.inviteRegistration.validationTransit.transitErrorMessage !== null;
    const validationSuccess = registrationState.inviteRegistration.validationTransit.transitSuccess;
    const validateCode = useCallback(async (): Promise<void> => {
        setHasAcknowledgedError(false);
        try {
            const registrationComplete = await registrationActions.actions.validateUserRegistrationRequest(
                verificationCode,
                email
            );
            if (registrationComplete) {
                setAccountAlreadyExists(true);
            }
        } catch {
            // do nothing
        }
    }, [setHasAcknowledgedError, registrationActions, verificationCode, email, setAccountAlreadyExists]);

    // Reset registration and validation state on dismissal
    useEffect(() => {
        if (hasAcknowledgedError) {
            if (hasCodeRequestTransitError)
                registrationActions.dispatch(RegistrationActions.requestRegistrationCodeReset());
            if (hasValidationTransitError)
                registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
            if (hasRegistrationTransitError) registrationActions.dispatch(RegistrationActions.registerUserReset());
            setHasAcknowledgedError(false);
        }
        return (): void => {
            registrationActions.dispatch(RegistrationActions.requestRegistrationCodeReset());
            registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
            registrationActions.dispatch(RegistrationActions.registerUserReset());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasAcknowledgedError]);

    useEffect(() => {
        if (currentPage === Pages.VerifyEmail && validationSuccess) {
            setCurrentPage(Pages.CreatePassword);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validationSuccess]);

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;
    // Spinner - shows if either of registration of code validation are in progress
    const spinner = registrationIsInTransit || isValidationInTransit || codeRequestIsInTransit ? <Spinner /> : <></>;

    // View pager
    useEffect(() => {
        if (currentPage === Pages.Complete) {
            // eslint-disable-next-line no-unused-expressions
            viewPager?.current?.setPageWithoutAnimation(currentPage);
        } else {
            // eslint-disable-next-line no-unused-expressions
            viewPager?.current?.setPage(currentPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, viewPager, registrationSuccess]);

    // Styling
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    // Network state (loading eula)
    const errorBodyText =
        (hasCodeRequestTransitError && codeRequestTransitErrorMessage) ||
        (hasValidationTransitError && validationTransitErrorMessage) ||
        (hasRegistrationTransitError && registrationTransitErrorMessage) ||
        registrationTransitErrorMessage;
    const errorDialog = (
        <SimpleDialog
            title={'Error'}
            bodyText={t(errorBodyText)}
            visible={
                !hasAcknowledgedError &&
                (hasRegistrationTransitError || hasValidationTransitError || hasCodeRequestTransitError)
            }
            onDismiss={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );
    const loadAndCacheEula = async (): Promise<void> => {
        if (!eulaContent) {
            try {
                const eulaText = await registrationActions.actions.loadEULA(i18n.language);
                setEulaContent(eulaText);
            } catch {
                // do nothing
            }
        }
    };

    // Pages
    const isLastStep = currentPage === Pages.__LENGTH - 1;
    const isFirstStep = currentPage === 0;

    const attemptRegistration = useCallback(async (): Promise<void> => {
        setHasAcknowledgedError(false);
        try {
            await registrationActions.actions.completeRegistration(
                {
                    password: password,
                    accountDetails: accountDetails ?? emptyAccountDetailInformation,
                },
                verificationCode,
                email
            );
        } catch {
            // do nothing
        }
    }, [setHasAcknowledgedError, registrationActions, password, accountDetails, verificationCode, email]);

    const canProgress = useCallback((): boolean => {
        switch (currentPage) {
            case Pages.CreateAccount:
                return email.length > 0;
            case Pages.Eula:
                return eulaAccepted;
            case Pages.VerifyEmail:
                return verificationCode.length === 6;
            case Pages.CreatePassword:
                return password.length > 0;
            case Pages.AccountDetails:
                return accountDetails !== null;
            case Pages.Complete:
                return true;
            default:
                return false;
        }
    }, [currentPage, email, eulaAccepted, verificationCode, password, accountDetails]);

    const canGoBackProgress = useCallback((): boolean => {
        switch (currentPage) {
            case Pages.VerifyEmail:
                return false;
            case Pages.CreateAccount:
                return false;
            case Pages.CreatePassword:
                return false;
            case Pages.Complete:
                return false;
            default:
                return true;
        }
    }, [currentPage]);

    const advancePage = useCallback(
        (delta = 0): void => {
            if (delta === 0) {
                return;
            } else if (isFirstStep && delta < 0) {
                navigation.navigate('Login');
            } else if (isLastStep && delta > 0) {
                navigation.navigate('Login');
            } else {
                // If this is the last user-entry step of the invite flow, it is time to make a network call
                // Check > 0 so advancing backwards does not risk going into the completion block
                if (currentPage === Pages.AccountDetails && !registrationSuccess && canProgress() && delta > 0) {
                    attemptRegistration();
                } else if (
                    currentPage === Pages.Eula &&
                    !codeRequestIsInTransit &&
                    canProgress() &&
                    (delta as number) > 0
                ) {
                    requestCode();
                } else if (
                    currentPage === Pages.VerifyEmail &&
                    !isValidationInTransit &&
                    canProgress() &&
                    (delta as number) > 0
                ) {
                    validateCode();
                } else {
                    setCurrentPage(currentPage + (delta as number));
                }
            }
        },
        [
            isFirstStep,
            isLastStep,
            navigation,
            currentPage,
            attemptRegistration,
            canProgress,
            codeRequestIsInTransit,
            isValidationInTransit,
            registrationSuccess,
            requestCode,
            validateCode,
        ]
    );

    const backLogic = useCallback((): void => {
        if (isFirstStep) {
            navigation.navigate('Login');
        } else if (canGoBackProgress()) {
            advancePage(-1);
        } else if (isLastStep) {
            navigation.navigate('Login');
        }
    }, [navigation, isFirstStep, isLastStep, canGoBackProgress, advancePage]);

    const pageTitle = (): string => {
        switch (currentPage) {
            case Pages.CreateAccount:
                return t('REGISTRATION.STEPS.CREATE_ACCOUNT');
            case Pages.Eula:
                return t('REGISTRATION.STEPS.LICENSE');
            case Pages.VerifyEmail:
                return t('REGISTRATION.STEPS.VERIFY_EMAIL');
            case Pages.CreatePassword:
                return t('REGISTRATION.STEPS.PASSWORD');
            case Pages.AccountDetails:
                return t('REGISTRATION.STEPS.ACCOUNT_DETAILS');
            case Pages.Complete:
                return t('REGISTRATION.STEPS.COMPLETE');
            default:
                return '';
        }
    };

    // Navigate appropriately with the hardware back button on android
    useEffect(() => {
        const onBackPress = (): boolean => {
            backLogic();
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return (): void => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [currentPage, advancePage, canGoBackProgress, isFirstStep, isLastStep, navigation, backLogic]);

    let buttonArea: JSX.Element;
    if (isLastStep) {
        buttonArea = (
            <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                <ToggleButton
                    text={t('ACTIONS.CONTINUE')}
                    style={{ width: '100%', alignSelf: 'flex-end' }}
                    onPress={(): void => advancePage(1)}
                />
            </View>
        );
    } else {
        buttonArea = (
            <View style={containerStyles.topBorder}>
                <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                    <View style={{ flex: 1 }}>
                        <ToggleButton
                            text={t('ACTIONS.BACK')}
                            style={{ width: 100, alignSelf: 'flex-start' }}
                            outlined={true}
                            disabled={!canGoBackProgress()}
                            onPress={(): void => advancePage(-1)}
                        />
                    </View>
                    <PageIndicator currentPage={currentPage} totalPages={Pages.__LENGTH} />
                    <View style={{ flex: 1 }}>
                        <ToggleButton
                            text={t('ACTIONS.NEXT')}
                            style={{ width: 100, alignSelf: 'flex-end' }}
                            disabled={!canProgress()}
                            onPress={(): void => advancePage(1)}
                        />
                    </View>
                </View>
            </View>
        );
    }

    return !accountAlreadyExists ? (
        <View style={{ flex: 1 }}>
            {spinner}
            {errorDialog}
            <CloseHeader title={pageTitle()} backAction={(): void => navigation.goBack()} />
            <SafeAreaView style={[containerStyles.spaceBetween, { backgroundColor: theme.colors.surface }]}>
                <ViewPager
                    ref={viewPager}
                    initialPage={0}
                    scrollEnabled={false}
                    transitionStyle="scroll"
                    style={{ flex: 1 }}
                >
                    <CreateAccountScreen onEmailChanged={setEmail} />
                    <EulaScreen
                        eulaAccepted={eulaAccepted}
                        onEulaChanged={setEulaAccepted}
                        loadEula={loadAndCacheEula}
                        htmlEula={injectedUIContext.htmlEula ?? false}
                        eulaError={loadEulaTransitErrorMessage}
                        eulaContent={eulaContent}
                    />
                    <VerifyEmailScreen
                        initialCode={verificationCode}
                        onVerifyCodeChanged={setVerificationCode}
                        onResendVerificationEmail={(): void => {
                            requestCode();
                        }}
                    />
                    <KeyboardAwareScrollView contentContainerStyle={[containerStyles.fullFlex]}>
                        <CreatePasswordScreen onPasswordChanged={setPassword} />
                    </KeyboardAwareScrollView>
                    <AccountDetailsScreen onDetailsChanged={setAccountDetails} />
                    <RegistrationCompleteScreen
                        firstName={accountDetails?.firstName ?? ''}
                        lastName={accountDetails?.lastName ?? ''}
                        email={registrationState.inviteRegistration.email ?? t('REGISTRATION.UNKNOWN_EMAIL')}
                        organization={
                            registrationState.inviteRegistration.organizationName ??
                            t('REGISTRATION.UNKNOWN_ORGANIZATION')
                        }
                    />
                </ViewPager>
                {buttonArea}
            </SafeAreaView>
        </View>
    ) : (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <CloseHeader title={t('REGISTRATION.STEPS.COMPLETE')} backAction={(): void => navigation.goBack()} />
            <SafeAreaView style={[containerStyles.safeContainer, { flex: 1 }]}>
                <View style={{ flex: 1 }}>
                    <ExistingAccountComplete />
                </View>
                <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                    <ToggleButton
                        text={t('ACTIONS.CONTINUE')}
                        style={{ width: '100%', alignSelf: 'flex-end' }}
                        onPress={(): void => navigation.navigate('Login')}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};
