/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useState, useEffect, useCallback } from 'react';

// Nav
import { useNavigation, useRoute } from '@react-navigation/native';

// Screens
import { Eula as EulaScreen } from '../subScreens/Eula';
import { CreatePassword as CreatePasswordScreen } from '../subScreens/CreatePassword';
import {
    AccountDetails as AccountDetailsScreen,
    AccountDetailInformation,
    emptyAccountDetailInformation,
} from '../subScreens/AccountDetails';
import { RegistrationComplete } from '../subScreens/RegistrationComplete';
import { ExistingAccountComplete } from '../subScreens/ExistingAccountComplete';

// Components
import { View, StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import { Theme, useTheme } from 'react-native-paper';
import ViewPager from '@react-native-community/viewpager';
import { CloseHeader } from '../components/CloseHeader';
import { PageIndicator } from '../components/PageIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from '../components/Spinner';
import { SimpleDialog } from '../components/SimpleDialog';
import { ErrorState } from '../components/ErrorState';
import { ToggleButton } from '../components/ToggleButton';
import i18n from '../translations/i18n';

// Styles
import * as Colors from '@pxblue/colors';

// Shared Auth Logic
import {
    // Actions
    RegistrationActions,
    useRegistrationUIState,
    useRegistrationUIActions,
    // Hooks
    useLanguageLocale,
    useInjectedUIContext,
} from '@pxblue/react-auth-shared';

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
 * Type for the properties of [[InviteRegistrationPager]].
 *
 * @param code Token from an email deep link for verifying a request to create an account with a specific email.
 * @param email (Optional) Email associated with the code `?email=addr%40domain.com`.
 */
type InviteRegistrationPagerParams = {
    code: string;
    email?: string;
};

/**
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type InviteRegistrationPagerProps = {
    theme?: Theme;
};

enum Pages {
    Eula = 0,
    CreatePassword,
    AccountDetails,
    Complete,
    __LENGTH,
}

/**
 * Pager controlling the user registration via invitation screen flow.
 *
 * @category Component
 */
export const InviteRegistrationPager: React.FC<InviteRegistrationPagerProps> = (props) => {
    const { t } = useLanguageLocale();
    const navigation = useNavigation();
    const registrationState = useRegistrationUIState();
    const registrationActions = useRegistrationUIActions();
    const injectedUIContext = useInjectedUIContext();
    const theme = useTheme(props.theme);

    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [password, setPassword] = useState('');
    const [accountDetails, setAccountDetails] = useState<AccountDetailInformation | null>(null);
    const [eulaContent, setEulaContent] = useState<string>();
    const [currentPage, setCurrentPage] = useState(Pages.Eula);
    const [accountAlreadyExists, setAccountAlreadyExists] = React.useState<boolean>(false);

    const viewPager = React.createRef<ViewPager>();

    const route = useRoute();
    const routeParams = route.params as InviteRegistrationPagerParams;
    const validationCode = routeParams?.code ?? 'NoCodeEntered';
    const validationEmail = routeParams?.email;

    // Reset registration and validation state on dismissal
    useEffect(
        () => (): void => {
            registrationActions.dispatch(RegistrationActions.registerUserReset());
            registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // Network state (registration)
    const registrationTransit = registrationState.inviteRegistration.registrationTransit;
    const registrationIsInTransit = registrationTransit.transitInProgress;
    const hasRegistrationTransitError = registrationTransit.transitErrorMessage !== null;
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationState.inviteRegistration.registrationTransit.transitSuccess;

    useEffect(() => {
        if (currentPage === Pages.AccountDetails && registrationSuccess) {
            setCurrentPage(Pages.Complete);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationSuccess]);

    // Network state (invite code validation)
    const isValidationInTransit = registrationState.inviteRegistration.validationTransit.transitInProgress;
    const validationTransitErrorMessage = registrationState.inviteRegistration.validationTransit.transitErrorMessage;
    const validationSuccess = registrationState.inviteRegistration.validationTransit.transitSuccess;
    const validationComplete = registrationState.inviteRegistration.validationTransit.transitComplete;

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;

    const validateCode = useCallback(async (): Promise<void> => {
        setHasAcknowledgedError(false);
        try {
            const registrationComplete = await registrationActions.actions.validateUserRegistrationRequest(
                validationCode,
                validationEmail
            );
            if (registrationComplete) {
                setAccountAlreadyExists(true);
            }
        } catch {
            // do nothing
        }
    }, [setHasAcknowledgedError, registrationActions, validationCode, validationEmail, setAccountAlreadyExists]);

    useEffect(() => {
        if (!isValidationInTransit && !validationComplete && validationCode.length > 0) {
            validateCode();
        }
    }, [registrationState.inviteRegistration.validationTransit, validationCode, validateCode, validationEmail]); // eslint-disable-line react-hooks/exhaustive-deps

    // Spinner - shows if either of registration of code validation are in progress
    const spinner = registrationIsInTransit || isValidationInTransit ? <Spinner /> : <></>;

    // View pager
    useEffect(() => {
        if (viewPager && viewPager.current) {
            if (currentPage === Pages.Complete) {
                viewPager.current.setPageWithoutAnimation(currentPage);
            } else {
                viewPager.current.setPage(currentPage);
            }
        }
    }, [currentPage, viewPager, registrationSuccess]);

    // Styling
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    const errorDialog = (
        <SimpleDialog
            title={t('MESSAGES.ERROR')}
            bodyText={t(registrationTransitErrorMessage)}
            visible={hasRegistrationTransitError && !hasAcknowledgedError}
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
                validationCode,
                validationEmail
            );
        } catch {
            // do nothing
        }
    }, [registrationActions, setHasAcknowledgedError, accountDetails, password, validationCode, validationEmail]);

    const canProgress = useCallback((): boolean => {
        switch (currentPage) {
            case Pages.Eula:
                return eulaAccepted;
            case Pages.CreatePassword:
                return password.length > 0;
            case Pages.AccountDetails:
                return accountDetails !== null;
            case Pages.Complete:
                return true;
            default:
                return false;
        }
    }, [currentPage, accountDetails, eulaAccepted, password]);

    const canGoBackProgress = useCallback((): boolean => {
        switch (currentPage) {
            case Pages.Eula:
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
                } else {
                    setCurrentPage(currentPage + (delta as number));
                }
            }
        },
        [
            isFirstStep,
            navigation,
            isLastStep,
            currentPage,
            registrationSuccess,
            canProgress,
            attemptRegistration,
            setCurrentPage,
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
        if (isValidationInTransit) {
            return t('MESSAGES.LOADING');
        } else if (validationTransitErrorMessage !== null) {
            return t('MESSAGES.ERROR');
        }
        switch (currentPage) {
            case Pages.Eula:
                return t('REGISTRATION.STEPS.LICENSE');
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
    }, [currentPage, canGoBackProgress, advancePage, isFirstStep, isLastStep, navigation, backLogic]);

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

    return !accountAlreadyExists && validationSuccess && !isValidationInTransit ? (
        <View style={{ flex: 1 }}>
            {spinner}
            {errorDialog}

            <CloseHeader title={pageTitle()} backAction={(): void => navigation.navigate('Login')} />
            <SafeAreaView style={[containerStyles.spaceBetween, { backgroundColor: theme.colors.surface }]}>
                <ViewPager
                    ref={viewPager}
                    initialPage={0}
                    scrollEnabled={false}
                    transitionStyle="scroll"
                    style={{ flex: 1 }}
                >
                    <EulaScreen
                        eulaAccepted={eulaAccepted}
                        onEulaChanged={setEulaAccepted}
                        loadEula={loadAndCacheEula}
                        htmlEula={injectedUIContext.htmlEula ?? false}
                        eulaError={loadEulaTransitErrorMessage}
                        eulaContent={eulaContent}
                    />
                    <KeyboardAwareScrollView contentContainerStyle={[containerStyles.fullFlex]}>
                        <CreatePasswordScreen onPasswordChanged={setPassword} />
                    </KeyboardAwareScrollView>
                    <AccountDetailsScreen onDetailsChanged={setAccountDetails} />
                    <RegistrationComplete
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
    ) : accountAlreadyExists ? (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <CloseHeader
                title={t('REGISTRATION.STEPS.COMPLETE')}
                backAction={(): void => navigation.navigate('Login')}
            />
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
    ) : !validationComplete ? (
        <View style={{ flex: 1 }}>
            <CloseHeader title={pageTitle()} backAction={(): void => navigation.navigate('Login')} />
            <Spinner />
        </View>
    ) : (
        <View style={{ flex: 1 }}>
            <CloseHeader title={pageTitle()} backAction={(): void => navigation.navigate('Login')} />
            <ErrorState
                title={t('MESSAGES.FAILURE')}
                bodyText={validationTransitErrorMessage}
                onPress={(): void => {
                    navigation.navigate('Login');
                }}
            />
        </View>
    );
};
