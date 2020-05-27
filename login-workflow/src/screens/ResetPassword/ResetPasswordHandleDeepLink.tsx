/**
 * @packageDocumentation
 * @module Screens
 */

import * as React from 'react';

// Nav
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';

// Hooks
import { useLanguageLocale } from '../../hooks/language-locale-hooks';
import { useAccountUIActions, useAccountUIState, AccountActions } from '../../contexts/AccountUIContext';

// Screens
import { ResetPasswordConfirm } from '../../subScreens/ResetPasswordConfirm';
import { ResetPasswordSuccess } from '../../subScreens/ResetPasswordSuccess';

// Components
import { View } from 'react-native';
import { CloseHeader } from '../../components/CloseHeader';
import { Spinner } from '../../components/Spinner';
import { ErrorState } from '../../components/ErrorState';

/**
 * Stack navigator for reset password handle deep link navigation.
 */
const Stack = createStackNavigator();

type ResetPasswordHandleDeepLinkParams = {
    verifyCode: string;
};

/**
 * Renders a screen stack which handles the reset password email flow (deep link).
 *
 * @category Component
 */
export const ResetPasswordHandleDeepLink: React.FC = () => {
    const { t } = useLanguageLocale();
    const accountUIState = useAccountUIState();
    const accountUIActions = useAccountUIActions();
    const navigation = useNavigation();

    const route = useRoute();
    const routeParams = route.params as ResetPasswordHandleDeepLinkParams;
    const verifyCode = routeParams?.verifyCode ?? 'some-long-parsed-email-token-code';

    // Network state (setPassword)
    const setPasswordTransit = accountUIState.setPassword.setPasswordTransit;
    const setPasswordTransitSuccess = setPasswordTransit.transitSuccess;

    // Network state (verifyResetCode)
    const verifyResetCodeTransit = accountUIState.setPassword.verifyResetCodeTransit;
    const verifyIsInTransit = verifyResetCodeTransit.transitInProgress;
    const validationTransitErrorMessage = verifyResetCodeTransit.transitErrorMessage;
    const verifySuccess = verifyResetCodeTransit.transitSuccess;
    const verifyComplete = verifyResetCodeTransit.transitComplete;

    // Reset state on dismissal
    // eslint-disable-next-line arrow-body-style
    React.useEffect(() => {
        return (): void => {
            accountUIActions.dispatch(AccountActions.setPasswordReset());
            accountUIActions.dispatch(AccountActions.verifyResetCodeReset());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!verifyIsInTransit && !verifyComplete && verifyCode.length > 0) {
            accountUIActions.actions.verifyResetCode(verifyCode);
        }
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [verifyIsInTransit, verifyCode, verifyComplete, accountUIActions.actions]);

    const resetPassword = (password: string): void => {
        accountUIActions.actions.setPassword(verifyCode, password);
    };

    return verifySuccess && !verifyIsInTransit ? (
        <Stack.Navigator initialRouteName="ResetPasswordConfirm">
            {!setPasswordTransitSuccess ? (
                <Stack.Screen
                    name="ResetPasswordConfirm"
                    initialParams={{ onResetPasswordPress: resetPassword }}
                    component={ResetPasswordConfirm}
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    options={() => ({
                        header: (): JSX.Element | null =>
                            CloseHeader({
                                title: t('FORMS.RESET_PASSWORD'),
                                backAction: () => {
                                    navigation.goBack();
                                },
                            }),
                    })}
                />
            ) : (
                <Stack.Screen
                    name="ResetPasswordSuccess"
                    component={ResetPasswordSuccess}
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    options={() => ({
                        header: (): JSX.Element | null =>
                            CloseHeader({
                                title: t('FORMS.RESET_PASSWORD'),
                                backAction: () => {
                                    navigation.navigate('Login');
                                },
                            }),
                    })}
                />
            )}
        </Stack.Navigator>
    ) : !verifyComplete ? (
        <View style={{ flex: 1 }}>
            <CloseHeader title={t('FORMS.RESET_PASSWORD')} backAction={(): void => navigation.goBack()} />
            <Spinner />
        </View>
    ) : (
        <View style={{ flex: 1 }}>
            <CloseHeader title={t('MESSAGES.ERROR')} backAction={(): void => navigation.goBack()} />
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
