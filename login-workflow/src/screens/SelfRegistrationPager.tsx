/**
 * @packageDocumentation
 * @module Screens
 */

import * as React from 'react';

// Nav
import { useNavigation, useRoute } from '@react-navigation/native';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import { useRegistrationUIActions, useRegistrationUIState } from '../contexts/RegistrationUIContext';

// Screens
import Eula from '../subScreens/Eula';
import CreateAccount from '../subScreens/CreateAccount';
import VerifyEmail from '../subScreens/VerifyEmail';
import { CreatePassword } from '../subScreens/CreatePassword';
import { AccountDetails, AccountDetailInformation } from '../subScreens/AccountDetails';
import RegistrationComplete from '../subScreens/RegistrationComplete';

// Components
import { View, StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import CloseHeader from '../components/CloseHeader';
import { PageIndicator } from '../components/PageIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from '../data/translations/i18n';
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
 * Type for the properties of [[SelfRegistrationPager]].
 *
 * @param verificationCode Token from an email deep link for verifying a request to create an account with a specific email.
 */
type SelfRegistrationPagerParams = {
    verificationCode: string;
};

/**
 * Pager controlling the user self registration screen flow.
 *
 * @category Component
 */
function SelfRegistrationPager(): JSX.Element {
    const [email, setEmail] = React.useState('');
    const [eulaAccepted, setEulaAccepted] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [accountDetails, setAccountDetails] = React.useState<AccountDetailInformation | null>(null);
    const [organization] = React.useState<string>('Org Not Set');
    const [eulaContent, setEulaContent] = React.useState<string>();

    enum Pages /* eslint-disable no-shadow */ {
        CreateAccount = 0,
        Eula,
        VerifyEmail,
        CreatePassword,
        AccountDetails,
        Complete,
        __LENGTH,
    }

    const [currentPage, setCurrentPage] = React.useState(0);

    const { t } = useLanguageLocale();
    const navigation = useNavigation();
    const viewPager = React.createRef<ViewPager>();
    const registrationActions = useRegistrationUIActions();
    const registrationState = useRegistrationUIState();

    const route = useRoute();
    const routeParams = route.params as SelfRegistrationPagerParams;
    const [verificationCode, setVerificationCode] = React.useState<string>(routeParams?.verificationCode ?? '');

    React.useEffect(() => viewPager?.current?.setPage(currentPage), [currentPage, viewPager]);

    React.useEffect((): void => {
        if (verificationCode) {
            setCurrentPage(Pages.VerifyEmail);
        }
    }, [Pages.VerifyEmail, verificationCode]);

    const containerStyles = makeContainerStyles();
    const styles = makeStyles();

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;

    const isLastStep = currentPage === Pages.__LENGTH - 1;
    const isFirstStep = currentPage === 0;

    const canProgress = (): boolean => {
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
    };

    const canGoBackProgress = (): boolean => {
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
    };

    function advancePage(delta = 0): void {
        if (delta === 0) {
            return;
        } else if (isFirstStep && delta < 0) {
            navigation.navigate('Login');
        } else if (isLastStep && delta > 0) {
            navigation.navigate('Login');
        } else {
            setCurrentPage(currentPage + delta);
        }
    }

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

    return (
        <View style={{ flex: 1 }}>
            <CloseHeader title={pageTitle()} backAction={(): void => navigation.goBack()} />
            <SafeAreaView style={[containerStyles.spaceBetween, { backgroundColor: 'white' }]}>
                <ViewPager
                    ref={viewPager}
                    initialPage={0}
                    scrollEnabled={false}
                    transitionStyle="scroll"
                    style={{ flex: 1 }}
                >
                    <CreateAccount onEmailChanged={setEmail} />
                    <Eula
                        eulaAccepted={eulaAccepted}
                        onEulaChanged={setEulaAccepted}
                        loadEula={loadAndCacheEula}
                        eulaError={loadEulaTransitErrorMessage}
                        eulaContent={eulaContent}
                    />
                    <VerifyEmail
                        verifyCodeChanged={setVerificationCode}
                        onResendVerificationEmail={(): void => {
                            /* resend verification email */
                        }}
                    />
                    <KeyboardAwareScrollView contentContainerStyle={[containerStyles.fullFlex]}>
                        <CreatePassword onPasswordChanged={setPassword} />
                    </KeyboardAwareScrollView>
                    <AccountDetails onDetailsChanged={setAccountDetails} />
                    <RegistrationComplete
                        firstName={accountDetails?.firstName ?? ''}
                        lastName={accountDetails?.lastName ?? ''}
                        email={email}
                        organization={organization}
                    />
                </ViewPager>
                {buttonArea}
            </SafeAreaView>
        </View>
    );
}

export default SelfRegistrationPager;
