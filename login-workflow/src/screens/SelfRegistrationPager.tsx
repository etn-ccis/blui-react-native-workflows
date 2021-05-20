/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useEffect, useCallback, useState, ComponentType } from 'react';

// Nav
import { useNavigation, useRoute } from '@react-navigation/native';

// Hooks
import { useTheme } from 'react-native-paper';

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
import ViewPager from 'react-native-pager-view';
import { CloseHeader } from '../components/CloseHeader';
import { PageIndicator } from '../components/PageIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from '../components/Spinner';
import { SimpleDialog } from '../components/SimpleDialog';
import { ToggleButton } from '../components/ToggleButton';
import i18n from '../translations/i18n';

// Styles
import * as Colors from '@pxblue/colors';

// Shared Auth Logic
import {
    // Actions
    RegistrationActions,
    // Hooks
    useLanguageLocale,
    useInjectedUIContext,
    useRegistrationUIActions,
    useRegistrationUIState,
    CustomAccountDetails,
    CustomRegistrationForm,
    AccountDetailsFormProps,
} from '@pxblue/react-auth-shared';
import { CustomRegistrationDetailsGroup, RegistrationPage } from '../types';
import { Instruction } from '../components/Instruction';

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
    theme?: ReactNativePaper.Theme;
};

/**
 * Pager controlling the user self registration screen flow.
 * If the user taps on a deep link they will be taken
 *
 * @category Component
 */
export const SelfRegistrationPager: React.FC<SelfRegistrationPagerProps> = (props) => {
    const { t } = useLanguageLocale();
    const navigation = useNavigation();
    const registrationActions = useRegistrationUIActions();
    const registrationState = useRegistrationUIState();
    const injectedUIContext = useInjectedUIContext();
    const theme = useTheme(props.theme);

    // Styling
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    // Local state
    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [password, setPassword] = useState('');
    const [accountDetails, setAccountDetails] = useState<AccountDetailInformationScreen | null>(null);
    const [customAccountDetails, setCustomAccountDetails] = useState<CustomRegistrationDetailsGroup | null>({});
    const [eulaContent, setEulaContent] = useState<string>();
    const [accountAlreadyExists, setAccountAlreadyExists] = useState<boolean>(false);
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const viewPager = React.createRef<ViewPager>();

    const route = useRoute();
    const routeParams = route.params as SelfRegistrationPagerParams | undefined;
    const [verificationCode, setVerificationCode] = React.useState<string>(routeParams?.code ?? '');
    const [email, setEmail] = React.useState(routeParams?.email ?? '');
    const customSuccess = injectedUIContext.registrationSuccessScreen;
    const customAccountAlreadyExists = injectedUIContext.accountAlreadyExistsScreen;

    // pre-populate values from the route params
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
    const codeRequestTransitErrorMessage = codeRequestTransit.transitErrorMessage ?? t('pxb:MESSAGES.REQUEST_ERROR');
    const codeRequestSuccess = codeRequestTransit.transitSuccess;

    // Network state (registration)
    const registrationTransit = registrationState.inviteRegistration.registrationTransit;
    const registrationIsInTransit = registrationTransit.transitInProgress;
    const hasRegistrationTransitError = registrationTransit.transitErrorMessage !== null;
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('pxb:MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationTransit.transitSuccess;

    // Network state (invite code validation)
    const isValidationInTransit = registrationState.inviteRegistration.validationTransit.transitInProgress;
    const validationTransitErrorMessage = registrationState.inviteRegistration.validationTransit.transitErrorMessage;
    const hasValidationTransitError =
        registrationState.inviteRegistration.validationTransit.transitErrorMessage !== null;
    const validationSuccess = registrationState.inviteRegistration.validationTransit.transitSuccess;

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;

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

    const requestCode = useCallback(async (): Promise<void> => {
        registrationActions.dispatch(RegistrationActions.requestRegistrationCodeReset());
        setHasAcknowledgedError(false);
        try {
            await registrationActions.actions.requestRegistrationCode(email);
        } catch {
            // do nothing
        }
    }, [registrationActions, setHasAcknowledgedError, email]);

    // Page Definitions
    const customDetails = injectedUIContext.customAccountDetails || [];
    const FirstCustomPage: ComponentType<AccountDetailsFormProps> | null =
        customDetails.length > 0 && customDetails[0] ? customDetails[0].component : null;
    const RegistrationPages: RegistrationPage[] = [
        {
            name: 'CreateAccount',
            pageTitle: t('pxb:REGISTRATION.STEPS.CREATE_ACCOUNT'),
            pageBody: (
                <CreateAccountScreen
                    key={'CreateAccountPage'}
                    onEmailChanged={setEmail}
                    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
                    onSubmit={(): void => advancePage(1)}
                />
            ),
            canGoForward: email.length > 0,
            canGoBack: true,
        },
        {
            name: 'Eula',
            pageTitle: t('pxb:REGISTRATION.STEPS.LICENSE'),
            pageBody: (
                <EulaScreen
                    key={'EulaPage'}
                    eulaAccepted={eulaAccepted}
                    onEulaChanged={setEulaAccepted}
                    loadEula={loadAndCacheEula}
                    htmlEula={injectedUIContext.htmlEula ?? false}
                    eulaError={loadEulaTransitErrorMessage}
                    eulaContent={eulaContent}
                />
            ),
            canGoForward: eulaAccepted,
            canGoBack: false,
        },
        {
            name: 'VerifyEmail',
            pageTitle: t('pxb:REGISTRATION.STEPS.VERIFY_EMAIL'),
            pageBody: (
                <VerifyEmailScreen
                    key={'VerifyEmailPage'}
                    initialCode={verificationCode}
                    onVerifyCodeChanged={setVerificationCode}
                    onResendVerificationEmail={(): void => {
                        void requestCode();
                    }}
                    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
                    onSubmit={(): void => advancePage(1)}
                />
            ),
            canGoForward: verificationCode.length > 0,
            canGoBack: false,
        },
        {
            name: 'CreatePassword',
            pageTitle: t('pxb:REGISTRATION.STEPS.PASSWORD'),
            pageBody: (
                <KeyboardAwareScrollView key={'CreatePasswordPage'} contentContainerStyle={[containerStyles.fullFlex]}>
                    <CreatePasswordScreen
                        onPasswordChanged={setPassword}
                        /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
                        onSubmit={(): void => advancePage(1)}
                    />
                </KeyboardAwareScrollView>
            ),
            canGoForward: password.length > 0,
            canGoBack: false,
        },
        {
            name: 'AccountDetails',
            pageTitle: t('pxb:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
            pageBody: (
                <AccountDetailsScreen
                    key={'AccountDetailsPage'}
                    onDetailsChanged={setAccountDetails}
                    onSubmit={
                        FirstCustomPage
                            ? (): void => {
                                  /* TODO Focus first field in custom page */
                              }
                            : accountDetails !== null // && accountDetails.valid
                            ? /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
                              (): void => advancePage(1)
                            : undefined
                    }
                >
                    {FirstCustomPage && (
                        <FirstCustomPage
                            onDetailsChanged={(details: CustomAccountDetails | null, valid: boolean): void => {
                                setCustomAccountDetails({
                                    ...(customAccountDetails || {}),
                                    0: { values: details || {}, valid },
                                });
                            }}
                            initialDetails={customAccountDetails?.[0]?.values}
                            /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
                            onSubmit={customAccountDetails?.[0]?.valid ? (): void => advancePage(1) : undefined}
                        />
                    )}
                </AccountDetailsScreen>
            ),
            canGoForward: accountDetails !== null, // &&
            // accountDetails.valid,
            canGoBack: true,
        },
    ]
        .concat(
            // Custom injected pages
            customDetails
                .slice(1)
                .filter((item: CustomRegistrationForm | null) => item !== null)
                // @ts-ignore there won't be any nulls after we filter them
                .map((page: CustomRegistrationForm, i: number) => {
                    const PageComponent = page.component;
                    return {
                        name: `CustomPage${i + 1}`,
                        pageTitle: page.title || t('pxb:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
                        pageBody: (
                            <SafeAreaView key={`CustomDetailsPage_${i + 1}`}>
                                <KeyboardAwareScrollView>
                                    {page.instructions && (
                                        <Instruction text={page.instructions} style={{ marginHorizontal: 20 }} />
                                    )}
                                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                                        <PageComponent
                                            onDetailsChanged={(
                                                details: CustomAccountDetails | null,
                                                valid: boolean
                                            ): void => {
                                                setCustomAccountDetails({
                                                    ...customAccountDetails,
                                                    [i + 1]: { values: details || {}, valid },
                                                });
                                            }}
                                            initialDetails={customAccountDetails?.[i + 1]?.values}
                                            onSubmit={
                                                customAccountDetails?.[i + 1]?.valid
                                                    ? /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
                                                      (): void => advancePage(1)
                                                    : undefined
                                            }
                                        />
                                    </View>
                                </KeyboardAwareScrollView>
                            </SafeAreaView>
                        ),
                        canGoForward: customAccountDetails ? customAccountDetails?.[i + 1]?.valid : false,
                        canGoBack: true,
                    };
                })
        )
        .concat([
            {
                name: 'Complete',
                pageTitle: t('pxb:REGISTRATION.STEPS.COMPLETE'),
                pageBody: (
                    <RegistrationCompleteScreen
                        key={'RegistrationCompletePage'}
                        firstName={accountDetails?.firstName ?? ''}
                        lastName={accountDetails?.lastName ?? ''}
                        email={registrationState.inviteRegistration.email ?? t('pxb:REGISTRATION.UNKNOWN_EMAIL')}
                        organization={
                            registrationState.inviteRegistration.organizationName ??
                            t('pxb:REGISTRATION.UNKNOWN_ORGANIZATION')
                        }
                    />
                ),
                canGoForward: true,
                canGoBack: false,
            },
        ]);
    const isLastStep = currentPage === RegistrationPages.length - 1;
    const isFirstStep = currentPage === 0;
    const CompletePage = RegistrationPages.length - 1;
    const EulaPage = RegistrationPages.findIndex((item) => item.name === 'Eula');
    const VerifyEmailPage = RegistrationPages.findIndex((item) => item.name === 'VerifyEmail');
    const CreatePasswordPage = RegistrationPages.findIndex((item) => item.name === 'CreatePassword');

    // If there is a code and it is not confirmed, go to the verify screen
    useEffect((): void => {
        if (verificationCode && !codeRequestSuccess) {
            setCurrentPage(VerifyEmailPage);
        }
    }, [codeRequestSuccess, verificationCode, VerifyEmailPage]);

    useEffect(() => {
        if (currentPage === RegistrationPages.length - 2 && registrationSuccess) {
            setCurrentPage(CompletePage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationSuccess]);

    useEffect(() => {
        if (currentPage === EulaPage && codeRequestSuccess) {
            setCurrentPage(VerifyEmailPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeRequestSuccess]);

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

    useEffect(() => {
        if (currentPage === VerifyEmailPage && validationSuccess) {
            setCurrentPage(CreatePasswordPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validationSuccess]);

    // Spinner - shows if either of registration of code validation are in progress
    const spinner = registrationIsInTransit || isValidationInTransit || codeRequestIsInTransit ? <Spinner /> : <></>;

    // View pager
    useEffect(() => {
        if (currentPage === CompletePage) {
            requestAnimationFrame(() => viewPager.current?.setPageWithoutAnimation(currentPage));
        } else {
            requestAnimationFrame(() => viewPager.current?.setPage(currentPage));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, viewPager]);

    // Network state (loading eula)
    const errorBodyText =
        (hasCodeRequestTransitError && codeRequestTransitErrorMessage) ||
        (hasValidationTransitError && validationTransitErrorMessage) ||
        (hasRegistrationTransitError && registrationTransitErrorMessage) ||
        registrationTransitErrorMessage;
    const errorDialog = (
        <SimpleDialog
            title={t('pxb:MESSAGES.ERROR')}
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

    const attemptRegistration = useCallback(async (): Promise<void> => {
        setHasAcknowledgedError(false);

        let flattenedDetails = {};
        Object.keys(customAccountDetails || {}).forEach((key) => {
            flattenedDetails = { ...flattenedDetails, ...(customAccountDetails || {})[parseInt(key, 10)].values };
        });

        try {
            await registrationActions.actions.completeRegistration(
                {
                    password: password,
                    accountDetails: { ...(accountDetails ?? emptyAccountDetailInformation), ...flattenedDetails },
                },
                verificationCode,
                email
            );
        } catch {
            // do nothing
        }
    }, [
        setHasAcknowledgedError,
        registrationActions,
        password,
        accountDetails,
        customAccountDetails,
        verificationCode,
        email,
    ]);

    // Screen transition logic
    const canProgress = useCallback((): boolean => RegistrationPages[currentPage].canGoForward ?? false, [
        RegistrationPages,
        currentPage,
    ]);
    const canGoBackProgress = useCallback((): boolean => RegistrationPages[currentPage].canGoBack ?? true, [
        RegistrationPages,
        currentPage,
    ]);

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
                if (
                    currentPage === RegistrationPages.length - 2 &&
                    !registrationSuccess &&
                    canProgress() &&
                    delta > 0
                ) {
                    void attemptRegistration();
                } else if (
                    currentPage === EulaPage &&
                    !codeRequestIsInTransit &&
                    canProgress() &&
                    (delta as number) > 0
                ) {
                    void requestCode();
                } else if (
                    currentPage === VerifyEmailPage &&
                    !isValidationInTransit &&
                    canProgress() &&
                    (delta as number) > 0
                ) {
                    void validateCode();
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
            EulaPage,
            RegistrationPages.length,
            VerifyEmailPage,
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

    // Navigate appropriately with the hardware back button on android
    React.useEffect(() => {
        const onBackPress = (): boolean => {
            backLogic();
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return (): void => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const pageTitle = (): string => RegistrationPages[currentPage].pageTitle || '';

    let buttonArea: JSX.Element;
    if (isLastStep) {
        buttonArea = (
            <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                <ToggleButton
                    text={t('pxb:ACTIONS.CONTINUE')}
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
                            text={t('pxb:ACTIONS.BACK')}
                            style={{ width: 100, alignSelf: 'flex-start' }}
                            outlined={true}
                            disabled={!canGoBackProgress()}
                            onPress={(): void => advancePage(-1)}
                        />
                    </View>
                    <PageIndicator currentPage={currentPage} totalPages={RegistrationPages.length} />
                    <View style={{ flex: 1 }}>
                        <ToggleButton
                            text={t('pxb:ACTIONS.NEXT')}
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
            {(!customSuccess || !isLastStep) && (
                <>
                    <CloseHeader title={pageTitle()} backAction={(): void => navigation.navigate('Login')} />
                    <SafeAreaView style={[containerStyles.spaceBetween, { backgroundColor: theme.colors.surface }]}>
                        <ViewPager
                            ref={viewPager}
                            initialPage={0}
                            scrollEnabled={false}
                            transitionStyle="scroll"
                            style={{ flex: 1 }}
                        >
                            {RegistrationPages.map((page) => page.pageBody)}
                        </ViewPager>
                        {buttonArea}
                    </SafeAreaView>
                </>
            )}
            {customSuccess && isLastStep && (
                <>
                    {typeof customSuccess === 'function' &&
                        customSuccess(navigation, { accountDetails: accountDetails, email: email })}
                    {typeof customSuccess !== 'function' && customSuccess}
                </>
            )}
        </View>
    ) : (
        <View style={{ flex: 1 }}>
            {!customAccountAlreadyExists && (
                <>
                    <CloseHeader
                        title={t('pxb:REGISTRATION.STEPS.COMPLETE')}
                        backAction={(): void => navigation.navigate('Login')}
                    />
                    <SafeAreaView style={[containerStyles.safeContainer, { flex: 1 }]}>
                        <View style={{ flex: 1 }}>
                            <ExistingAccountComplete />
                        </View>
                        <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                            <ToggleButton
                                text={t('pxb:ACTIONS.CONTINUE')}
                                style={{ width: '100%', alignSelf: 'flex-end' }}
                                onPress={(): void => navigation.navigate('Login')}
                            />
                        </View>
                    </SafeAreaView>
                </>
            )}
            {customAccountAlreadyExists && (
                <>
                    {typeof customAccountAlreadyExists === 'function' && customAccountAlreadyExists(navigation)}
                    {typeof customAccountAlreadyExists !== 'function' && customAccountAlreadyExists}
                </>
            )}
        </View>
    );
};
