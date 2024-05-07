import React, { useCallback, useState } from 'react';
import { ForgotPasswordScreenProps } from './types';
import { Trans, useTranslation } from 'react-i18next';
import { useAuthContext, useErrorManager } from '../../contexts';
import { ForgotPasswordScreenBase } from './ForgotPasswordScreenBase';
import { Linking, TextStyle, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';

const makeStyles = (
    theme: ExtendedTheme
): StyleSheet.NamedStyles<{
    boldText: TextStyle;
    textStyles: TextStyle;
}> =>
    StyleSheet.create({
        boldText: {
            fontWeight: 'bold',
        },
        textStyles: {
            color: theme.colors.primary,
        },
    });

/**
 * Component renders a screen with forgot password for support with the application.
 *
 * @param {ForgotPasswordScreenProps} props - props of Forgot Password Screen
 *
 * @category Component
 */
export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
    const { t } = useTranslation();
    const { actions, navigate, routeConfig } = useAuthContext();
    const { triggerError, errorManagerConfig } = useErrorManager();
    const theme = useExtendedTheme();
    const styles = makeStyles(theme);
    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const {
        emailLabel = t('bluiCommon:LABELS.EMAIL'),
        contactPhone = '1-800-123-4567',
        initialEmailValue,
        description,
        responseTime = t('bluiAuth:FORGOT_PASSWORD.RESPONSE_TIME'),
        emailValidator = (email: string): boolean | string =>
            new RegExp(EMAIL_REGEX).test(email) ? true : t('bluiCommon:MESSAGES.EMAIL_ENTRY_ERROR'),
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardBodyProps,
        WorkflowCardActionsProps,
        showSuccessScreen: enableSuccessScreen = true,
        SuccessScreen,
        SuccessScreenProps,
        emailTextInputProps,
    } = props;

    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const [emailInput, setEmailInput] = useState(initialEmailValue ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    const Bold = ({ children }: { children: React.ReactNode }): JSX.Element => (
        <Text style={styles.boldText}>{children}</Text>
    );

    const Link = ({ children }: { children: React.ReactNode }): JSX.Element => (
        <Text style={styles.textStyles} onPress={(): any => Linking.openURL(`tel:${contactPhone ?? ''}`)}>
            {children}
        </Text>
    );

    const handleOnNext = useCallback(
        async (email: string): Promise<void> => {
            try {
                setIsLoading(true);
                await actions.forgotPassword(email);
                if (props.showSuccessScreen === false) {
                    navigate(routeConfig.LOGIN as string);
                } else {
                    setShowSuccessScreen(true);
                }
            } catch (_error) {
                triggerError(_error as Error);
            } finally {
                setIsLoading(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [actions, triggerError]
    );

    const clearEmailInput = (): void => {
        setEmailInput('');
    };

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiAuth:HEADER.FORGOT_PASSWORD'),
        onIconPress: (): void => {
            navigate(-1);
            clearEmailInput();
        },
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: description ? (
            <View> {description(responseTime)} </View>
        ) : (
            <Text variant="bodyLarge">
                <Trans
                    i18nKey={'bluiAuth:FORGOT_PASSWORD.INSTRUCTIONS'}
                    values={{ phone: contactPhone, time: responseTime }}
                    components={{ boldTag: <Bold>{responseTime}</Bold>, tel: <Link>{contactPhone}</Link> }}
                />
            </Text>
        ),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardBodyProps = {
        WorkflowCardInstructionProps: workflowCardInstructionProps,
        ...WorkflowCardBodyProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        showPrevious: true,
        nextLabel: t('bluiCommon:ACTIONS.SUBMIT'),
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoNext: true,
        canGoPrevious: true,
        totalSteps: 0,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void handleOnNext(emailInput);
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            navigate(routeConfig.LOGIN as string);
            WorkflowCardActionsProps?.onPrevious?.();
            clearEmailInput();
        },
    };

    const emailInputProps = {
        ...emailTextInputProps,
        onChangeText: (email: string): void => {
            // eslint-disable-next-line
            emailTextInputProps?.onChangeText && emailTextInputProps?.onChangeText(email);
            setEmailInput(email);
        },
    };

    return (
        <ForgotPasswordScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardBodyProps={workflowCardBodyProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            emailLabel={emailLabel}
            initialEmailValue={emailInput}
            emailValidator={emailValidator}
            emailTextInputProps={emailInputProps}
            showSuccessScreen={enableSuccessScreen && showSuccessScreen}
            SuccessScreen={SuccessScreen}
            SuccessScreenProps={{
                EmptyStateProps: {
                    icon: { name: 'check-circle' },
                    title: t('bluiCommon:MESSAGES.EMAIL_SENT'),
                    description: (
                        <Text variant="bodyLarge">
                            <Trans
                                i18nKey={'bluiAuth:FORGOT_PASSWORD.LINK_SENT'}
                                values={{ email: emailInput }}
                                components={{ boldTag: <Bold>{emailInput}</Bold> }}
                            />
                        </Text>
                    ),
                },
                WorkflowCardHeaderProps: {
                    title: t('bluiAuth:HEADER.FORGOT_PASSWORD'),
                },
                WorkflowCardActionsProps: {
                    showNext: true,
                    nextLabel: t('bluiCommon:ACTIONS.DONE'),
                    canGoNext: true,
                    fullWidthButton: true,
                    onNext: (): void => {
                        clearEmailInput();
                        navigate(routeConfig.LOGIN as string);
                        setShowSuccessScreen(false);
                    },
                },
                ...SuccessScreenProps,
            }}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
