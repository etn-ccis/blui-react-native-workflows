/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useState, useEffect, useCallback, ComponentType } from 'react';

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
import { useTheme } from 'react-native-paper';
import ViewPager from 'react-native-pager-view';
import { CloseHeader } from '../components/CloseHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from '../components/Spinner';
import { SimpleDialog } from '../components/SimpleDialog';
import { ErrorState } from '../components/ErrorState';
import { ToggleButton } from '../components/ToggleButton';
import i18n from '../translations/i18n';
import { ThemedDivider as Divider } from '@brightlayer-ui/react-native-components/themed';

// Styles
import * as Colors from '@brightlayer-ui/colors';

// Shared Auth Logic
import {
    // Actions
    RegistrationActions,
    useRegistrationUIState,
    useRegistrationUIActions,
    // Hooks
    useLanguageLocale,
    useInjectedUIContext,
    AccountDetailsFormProps,
    CustomAccountDetails,
    CustomRegistrationForm,
} from '@brightlayer-ui/react-auth-shared';
import { CustomRegistrationDetailsGroup, RegistrationPage } from '../types';
import { Instruction } from '../components/Instruction';
import { MobileStepper, Spacer } from '@brightlayer-ui/react-native-components';
import Color from 'color';

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
            marginHorizontal: 16,
        },
        fullFlex: {
            flex: 1,
            height: '100%',
        },
        divider: {
            height: 1,
            // marginTop: 16,
            backgroundColor: theme.dark
                ? Color(Colors.black[200]).alpha(0.36).toString()
                : Color(Colors.black[500]).alpha(0.12).toString(),
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
            paddingVertical: 8,
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
    theme?: ReactNativePaper.Theme;
};

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

    // Styling
    const containerStyles = makeContainerStyles(theme);
    const styles = makeStyles();

    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [password, setPassword] = useState('');
    const [accountDetails, setAccountDetails] = useState<AccountDetailInformation | null>(null);
    const [customAccountDetails, setCustomAccountDetails] = useState<CustomRegistrationDetailsGroup | null>({});
    const [eulaContent, setEulaContent] = useState<string>();
    const [currentPage, setCurrentPage] = useState(0);
    const [accountAlreadyExists, setAccountAlreadyExists] = React.useState<boolean>(false);

    const viewPager = React.createRef<ViewPager>();

    const route = useRoute();
    const routeParams = route.params as InviteRegistrationPagerParams;
    const validationCode = routeParams?.code ?? 'NoCodeEntered';
    const validationEmail = routeParams?.email;
    const disablePagerAnimations = injectedUIContext.disablePagerAnimation || false;

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
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('blui:MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationState.inviteRegistration.registrationTransit.transitSuccess;

    // Network state (invite code validation)
    const isValidationInTransit = registrationState.inviteRegistration.validationTransit.transitInProgress;
    const validationTransitErrorMessage = registrationState.inviteRegistration.validationTransit.transitErrorMessage;
    const validationSuccess = registrationState.inviteRegistration.validationTransit.transitSuccess;
    const validationComplete = registrationState.inviteRegistration.validationTransit.transitComplete;

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;

    const customSuccess = injectedUIContext.registrationSuccessScreen;
    const customAccountAlreadyExists = injectedUIContext.accountAlreadyExistsScreen;

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

    // Page Definitions
    const customDetails = injectedUIContext.customAccountDetails || [];
    const FirstCustomPage: ComponentType<AccountDetailsFormProps> | null =
        customDetails.length > 0 && customDetails[0] ? customDetails[0].component : null;
    const RegistrationPages: RegistrationPage[] = [
        {
            name: 'Eula',
            pageTitle: t('blui:REGISTRATION.STEPS.LICENSE'),
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
            canGoBack: true,
        },
        {
            name: 'CreatePassword',
            pageTitle: t('blui:REGISTRATION.STEPS.PASSWORD'),
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
            canGoBack: true,
        },
        {
            name: 'AccountDetails',
            pageTitle: t('blui:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
            pageBody: (
                <AccountDetailsScreen
                    key={'AccountDetailsScreen'}
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
                        pageTitle: page.title || t('blui:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
                        pageBody: (
                            <SafeAreaView
                                key={`CustomDetailsPage_${i + 1}`}
                                style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}
                            >
                                <View style={{ width: '100%', maxWidth: 600 }}>
                                    <KeyboardAwareScrollView>
                                        {page.instructions && (
                                            <Instruction text={page.instructions} style={{ marginHorizontal: 16 }} />
                                        )}
                                        <View style={{ flex: 1, marginHorizontal: 16 }}>
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
                                </View>
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
                pageTitle: t('blui:REGISTRATION.STEPS.COMPLETE'),
                pageBody: (
                    <RegistrationComplete
                        key={'CompletePage'}
                        firstName={accountDetails?.firstName ?? ''}
                        lastName={accountDetails?.lastName ?? ''}
                        email={registrationState.inviteRegistration.email ?? t('blui:REGISTRATION.UNKNOWN_EMAIL')}
                        organization={
                            registrationState.inviteRegistration.organizationName ??
                            t('blui:REGISTRATION.UNKNOWN_ORGANIZATION')
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

    useEffect(() => {
        if (currentPage === RegistrationPages.length - 2 && registrationSuccess) {
            setCurrentPage(CompletePage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationSuccess]);

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
            void validateCode();
        }
    }, [registrationState.inviteRegistration.validationTransit, validationCode, validateCode, validationEmail]); // eslint-disable-line react-hooks/exhaustive-deps

    // Spinner - shows if either of registration of code validation are in progress
    const spinner = registrationIsInTransit || isValidationInTransit ? <Spinner /> : <></>;

    // View pager
    useEffect(() => {
        if (viewPager && viewPager.current) {
            if (currentPage === CompletePage || disablePagerAnimations) {
                requestAnimationFrame(() => viewPager.current?.setPageWithoutAnimation(currentPage));
            } else {
                requestAnimationFrame(() => viewPager.current?.setPage(currentPage));
            }
        }
    }, [currentPage, viewPager, CompletePage, disablePagerAnimations]);

    const errorDialog = (
        <SimpleDialog
            title={t('blui:MESSAGES.ERROR')}
            bodyText={t(registrationTransitErrorMessage)}
            visible={hasRegistrationTransitError && !hasAcknowledgedError}
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
                validationCode,
                validationEmail
            );
        } catch {
            // do nothing
        }
    }, [
        registrationActions,
        setHasAcknowledgedError,
        accountDetails,
        customAccountDetails,
        password,
        validationCode,
        validationEmail,
    ]);

    // Screen transition logic
    const canProgress = useCallback(
        (): boolean => RegistrationPages[currentPage].canGoForward ?? false,
        [RegistrationPages, currentPage]
    );
    const canGoBackProgress = useCallback(
        (): boolean => RegistrationPages[currentPage].canGoBack ?? true,
        [RegistrationPages, currentPage]
    );

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
                } else {
                    setCurrentPage(currentPage + (delta as number));
                }
            }
        },
        [
            navigation,
            RegistrationPages,
            currentPage,
            canProgress,
            attemptRegistration,
            setCurrentPage,
            isFirstStep,
            isLastStep,
            registrationSuccess,
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
    }, [navigation, isFirstStep, isLastStep, advancePage, canGoBackProgress]);

    const pageTitle = (): string => {
        if (isValidationInTransit) {
            return t('blui:MESSAGES.LOADING');
        } else if (validationTransitErrorMessage !== null) {
            return t('blui:MESSAGES.ERROR');
        }
        return RegistrationPages[currentPage].pageTitle || '';
    };

    // Navigate appropriately with the hardware back button on android
    useEffect(() => {
        const onBackPress = (): boolean => {
            backLogic();
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return (): void => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [currentPage, isFirstStep, isLastStep, navigation, backLogic]);

    let buttonArea: JSX.Element;
    if (isLastStep) {
        buttonArea = (
            <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                <ToggleButton
                    text={t('blui:ACTIONS.CONTINUE')}
                    style={{ width: '100%', alignSelf: 'flex-end' }}
                    onPress={(): void => advancePage(1)}
                />
            </View>
        );
    } else {
        buttonArea = (
            <>
                <Divider style={containerStyles.divider} />
                <MobileStepper
                    styles={{ root: [containerStyles.topBorder, { flex: 0 }] }}
                    steps={RegistrationPages.length}
                    activeStep={currentPage}
                    activeColor={
                        (theme.dark ? theme.colors.actionPalette.active : theme.colors.primary) || theme.colors.primary
                    }
                    leftButton={
                        isFirstStep ? (
                            <Spacer flex={0} width={100} />
                        ) : (
                            <ToggleButton
                                text={t('blui:ACTIONS.BACK')}
                                style={{ width: 100, alignSelf: 'flex-start' }}
                                outlined={true}
                                disabled={!canGoBackProgress()}
                                onPress={(): void => advancePage(-1)}
                            />
                        )
                    }
                    rightButton={
                        <ToggleButton
                            text={t('blui:ACTIONS.NEXT')}
                            style={{ width: 100, alignSelf: 'flex-end' }}
                            disabled={!canProgress()}
                            onPress={(): void => advancePage(1)}
                        />
                    }
                />
            </>
        );
    }
    return !accountAlreadyExists && validationSuccess && !isValidationInTransit ? (
        <View style={{ flex: 1 }}>
            {spinner}
            {errorDialog}
            {(!customSuccess || !isLastStep) && (
                <>
                    <CloseHeader
                        title={pageTitle()}
                        backAction={(): void => navigation.navigate('Login')}
                        backgroundColor={
                            isLastStep
                                ? (theme.dark ? theme.colors.actionPalette.active : theme.colors.primary) ||
                                  theme.colors.primary
                                : undefined
                        }
                    />

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
                        customSuccess(navigation, { accountDetails: accountDetails, email: validationEmail })}
                    {typeof customSuccess !== 'function' && customSuccess}
                </>
            )}
        </View>
    ) : accountAlreadyExists ? (
        <View style={{ flex: 1 }}>
            {!customAccountAlreadyExists && (
                <>
                    <CloseHeader
                        title={t('blui:REGISTRATION.STEPS.COMPLETE')}
                        backAction={(): void => navigation.navigate('Login')}
                        backgroundColor={
                            (theme.dark ? theme.colors.actionPalette.active : theme.colors.primary) ||
                            theme.colors.primary
                        }
                    />
                    <SafeAreaView style={[containerStyles.safeContainer, { flex: 1 }]}>
                        <View style={{ flex: 1 }}>
                            <ExistingAccountComplete />
                        </View>
                        <View style={[styles.sideBySideButtons, containerStyles.containerMargins]}>
                            <ToggleButton
                                text={t('blui:ACTIONS.CONTINUE')}
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
    ) : !validationComplete ? (
        <View style={{ flex: 1 }}>
            <CloseHeader title={pageTitle()} backAction={(): void => navigation.navigate('Login')} />
            <Spinner />
        </View>
    ) : (
        <View style={{ flex: 1 }}>
            <CloseHeader title={pageTitle()} backAction={(): void => navigation.navigate('Login')} />
            <ErrorState
                title={t('blui:MESSAGES.FAILURE')}
                bodyText={validationTransitErrorMessage}
                onPress={(): void => {
                    navigation.navigate('Login');
                }}
            />
        </View>
    );
};
