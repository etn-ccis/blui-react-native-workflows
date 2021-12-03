/**
 * @packageDocumentation
 * @module Screens
 */

import React, { useEffect } from 'react';

// Nav
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';

// Screens
import { ResetPasswordConfirm } from '../../subScreens/ResetPasswordConfirm';
import { ResetPasswordSuccess } from '../../subScreens/ResetPasswordSuccess';

// Components
import { View, BackHandler } from 'react-native';
import { CloseHeader } from '../../components/CloseHeader';
import { Spinner } from '../../components/Spinner';
import { ErrorState } from '../../components/ErrorState';

// Shared Auth Logic
import {
    // Actions
    AccountActions,
    // Hooks
    useLanguageLocale,
    useAccountUIActions,
    useAccountUIState,
} from '@brightlayer-ui/react-auth-shared';
import { useTheme } from 'react-native-paper';

/**
 * Stack navigator for reset password handle deep link navigation.
 */
const Stack = createStackNavigator();

type ResetPasswordHandleDeepLinkParams = {
    code: string;
    // `?email=addr%40domain.com`
    email?: string;
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
    const theme = useTheme();

    const route = useRoute();
    const routeParams = route.params as ResetPasswordHandleDeepLinkParams;
    const verifyCode = routeParams?.code ?? 'some-long-parsed-email-token-code';
    const verifyEmail = routeParams?.email;

    // Network state (setPassword)
    const setPasswordTransit = accountUIState.setPassword.setPasswordTransit;
    const setPasswordTransitSuccess = setPasswordTransit.transitSuccess;

    // Network state (verifyResetCode)
    const verifyResetCodeTransit = accountUIState.setPassword.verifyResetCodeTransit;
    const verifyIsInTransit = verifyResetCodeTransit.transitInProgress;
    const validationTransitErrorMessage = verifyResetCodeTransit.transitErrorMessage;
    const verifySuccess = verifyResetCodeTransit.transitSuccess;
    const verifyComplete = verifyResetCodeTransit.transitComplete;

    // Navigate appropriately with the hardware back button on android
    useEffect(() => {
        const onBackPress = (): boolean => {
            navigation.navigate('Login');
            return true;
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return (): void => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    // Reset state on dismissal
    useEffect(
        () => (): void => {
            accountUIActions.dispatch(AccountActions.setPasswordReset());
            accountUIActions.dispatch(AccountActions.verifyResetCodeReset());
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(() => {
        if (!verifyIsInTransit && !verifyComplete && verifyCode.length > 0) {
            void accountUIActions.actions.verifyResetCode(verifyCode, verifyEmail);
        }
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [verifyIsInTransit, verifyCode, verifyEmail, verifyComplete, accountUIActions.actions]);

    const resetPassword = (password: string): void => {
        void accountUIActions.actions.setPassword(verifyCode, password, verifyEmail);
    };

    return verifySuccess && !verifyIsInTransit ? (
        <Stack.Navigator
            initialRouteName="ResetPasswordConfirm"
            headerMode={'none'}
            screenOptions={{
                cardStyle: { backgroundColor: theme.colors.surface },
            }}
        >
            {!setPasswordTransitSuccess ? (
                <Stack.Screen
                    name="ResetPasswordConfirm"
                    initialParams={{ onResetPasswordPress: resetPassword }}
                    component={ResetPasswordConfirm}
                />
            ) : (
                <Stack.Screen name="ResetPasswordSuccess" component={ResetPasswordSuccess} />
            )}
        </Stack.Navigator>
    ) : !verifyComplete ? (
        <View style={{ flex: 1 }}>
            <CloseHeader title={t('blui:FORMS.RESET_PASSWORD')} backAction={(): void => navigation.goBack()} />
            <Spinner />
        </View>
    ) : (
        <View style={{ flex: 1 }}>
            <CloseHeader title={t('blui:MESSAGES.ERROR')} backAction={(): void => navigation.goBack()} />
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
