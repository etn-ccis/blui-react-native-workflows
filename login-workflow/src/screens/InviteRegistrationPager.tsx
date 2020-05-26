/**
 * @packageDocumentation
 * @module Screens
 */

import * as React from 'react';

// Nav
import { useNavigation, useRoute } from '@react-navigation/native';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import {
    RegistrationActions,
    useRegistrationUIState,
    useRegistrationUIActions,
} from '../contexts/RegistrationUIContext';
import i18n from '../data/translations/i18n';

// Screens
import Eula from '../subScreens/Eula';
import { CreatePassword as CreatePasswordScreen } from '../subScreens/CreatePassword';
import {
    AccountDetails as AccountDetailsScreen,
    AccountDetailInformation,
    emptyAccountDetailInformation,
} from '../subScreens/AccountDetails';
import RegistrationComplete from '../subScreens/RegistrationComplete';

// Components
import { View, StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { CloseHeader } from '../components/CloseHeader';
import { PageIndicator } from '../components/PageIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from '../components/Spinner';
import { SimpleDialog } from '../components/SimpleDialog';
import { ErrorState } from '../components/ErrorState';
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
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
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
 * @param verificationCode Token from an email deep link for verifying a request to create an account with a specific email.
 */
type InviteRegistrationPagerParams = {
    validationCode: string;
};

/**
 * Pager controlling the user registration via invitation screen flow.
 *
 * @category Component
 */
function InviteRegistrationPager(): JSX.Element {
    enum Pages /* eslint-disable no-shadow */ {
        Eula = 0,
        CreatePassword,
        AccountDetails,
        Complete,
        __LENGTH,
    }

    const { t } = useLanguageLocale();
    const navigation = useNavigation();
    const registrationState = useRegistrationUIState();
    const registrationActions = useRegistrationUIActions();

    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);

    const [eulaAccepted, setEulaAccepted] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [accountDetails, setAccountDetails] = React.useState<AccountDetailInformation | null>(null);
    const [eulaContent, setEulaContent] = React.useState<string>();
    const [currentPage, setCurrentPage] = React.useState(Pages.Eula);

    const viewPager = React.createRef<ViewPager>();

    const route = useRoute();
    const routeParams = route.params as InviteRegistrationPagerParams;
    const validationCode = routeParams?.validationCode ?? 'NoCodeEntered';

    // Reset registration and validation state on dismissal
    // eslint-disable-next-line arrow-body-style
    React.useEffect(() => {
        return (): void => {
            registrationActions.dispatch(RegistrationActions.registerUserReset());
            registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Network state (registration)
    const registrationTransit = registrationState.inviteRegistration.registrationTransit;
    const registrationIsInTransit = registrationTransit.transitInProgress;
    const hasRegistrationTransitError = registrationTransit.transitErrorMessage !== null;
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationState.inviteRegistration.registrationTransit.transitSuccess;

    React.useEffect(() => {
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

    React.useEffect(() => {
        if (!isValidationInTransit && !validationComplete && validationCode.length > 0) {
            setHasAcknowledgedError(false);
            registrationActions.actions.validateUserRegistrationRequest(validationCode);
        }
    }, [registrationState.inviteRegistration.validationTransit, validationCode]); // eslint-disable-line react-hooks/exhaustive-deps

    // Spinner - shows if either of registration of code validation are in progress
    const spinner = registrationIsInTransit || isValidationInTransit ? <Spinner /> : <></>;

    // View pager
    React.useEffect(() => {
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
    const containerStyles = makeContainerStyles();
    const styles = makeStyles();

    const errorDialog = (
        <SimpleDialog
            title={'Error'}
            bodyText={t(registrationTransitErrorMessage)}
            isVisible={hasRegistrationTransitError && !hasAcknowledgedError}
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

    const attemptRegistration = async (): Promise<void> => {
        setHasAcknowledgedError(false);
        try {
            await registrationActions.actions.completeRegistration(
                {
                    password: password,
                    accountDetails: accountDetails ?? emptyAccountDetailInformation,
                },
                validationCode
            );
        } catch {
            // do nothing
        }
    };

    const canProgress = (): boolean => {
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
    };

    const canGoBackProgress = (): boolean => {
        switch (currentPage) {
            case Pages.Eula:
                return false;
            case Pages.Complete:
                return false;
            default:
                return true;
        }
    };

    function advancePage(delta = 0): void {
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
                setCurrentPage(currentPage + delta);
            }
        }
    }

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
    React.useEffect(() => {
        const onBackPress = (): boolean => {
            if (isFirstStep) {
                navigation.navigate('Login');
            } else if (canGoBackProgress()) {
                advancePage(-1);
            } else if (isLastStep) {
                navigation.navigate('Login');
            }
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return (): void => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

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
                            style={{ width: 100 }}
                            isOutlineOnly={true}
                            disabled={!canGoBackProgress()}
                            onPress={(): void => advancePage(-1)}
                        />
                    </View>
                    <PageIndicator currentPage={currentPage} totalPages={Pages.__LENGTH} />
                    <View style={{ flex: 1 }}>
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
            </View>
        );
    }

    return validationSuccess && !isValidationInTransit ? (
        <View style={{ flex: 1 }}>
            {spinner}
            {errorDialog}

            <CloseHeader title={pageTitle()} backAction={(): void => navigation.goBack()} />
            <SafeAreaView style={[containerStyles.spaceBetween, { backgroundColor: 'white' }]}>
                <ViewPager
                    ref={viewPager}
                    initialPage={0}
                    scrollEnabled={false}
                    transitionStyle="scroll"
                    style={{ flex: 1 }}
                >
                    <Eula
                        eulaAccepted={eulaAccepted}
                        onEulaChanged={setEulaAccepted}
                        loadEula={loadAndCacheEula}
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
    ) : !validationComplete ? (
        <View style={{ flex: 1 }}>
            <CloseHeader title={pageTitle()} backAction={(): void => navigation.goBack()} />
            <Spinner />
        </View>
    ) : (
        <View style={{ flex: 1 }}>
            <CloseHeader title={pageTitle()} backAction={(): void => navigation.goBack()} />
            <ErrorState
                title={t('MESSAGES.FAILURE')}
                bodyText={validationTransitErrorMessage}
                icon={'report'}
                onPress={(): void => {
                    navigation.navigate('Login');
                }}
            />
        </View>
    );
}

export default InviteRegistrationPager;
