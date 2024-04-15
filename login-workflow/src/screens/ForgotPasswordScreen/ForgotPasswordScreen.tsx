import React, { useCallback, useState } from 'react';
import { ForgotPasswordScreenProps } from './types';
import { Trans, useTranslation } from 'react-i18next';
import { useAuthContext, useErrorManager } from '../../contexts';
import { ForgotPasswordScreenBase } from './ForgotPasswordScreenBase';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { Linking, TextStyle, StyleSheet } from 'react-native';

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

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
    const { t } = useTranslation();
    const { actions, navigate, routeConfig } = useAuthContext();
    const { triggerError, errorManagerConfig } = useErrorManager();
    const theme = useExtendedTheme();
    const styles = makeStyles(theme);

    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const [emailInput, setEmailInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const Bold = ({ children }: { children: React.ReactNode }): JSX.Element => (
        <Text style={styles.boldText}>{children}</Text>
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
        WorkflowCardActionsProps,
        showSuccessScreen: enableSuccessScreen = true,
        SuccessScreen,
        SuccessScreenProps,
        emailTextInputProps,
    } = props;

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardInstructionProps = {
        instructions: description ? (
            <View> {description(responseTime)} </View>
        ) : (
            <Text variant="bodyLarge">
                <Trans
                    i18nKey={'bluiAuth:FORGOT_PASSWORD.INSTRUCTIONS'}
                    values={{ phone: contactPhone, time: responseTime }}
                    components={{ boldTag: <Bold>{responseTime}</Bold> }}
                >
                    Please enter your email, we will respond in {responseTime}. For urgent issues please call
                    <Text style={styles.textStyles} onPress={(): any => Linking.openURL(`tel:${contactPhone ?? ''}`)}>
                        {contactPhone}
                    </Text>
                </Trans>
            </Text>
        ),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiAuth:HEADER.FORGOT_PASSWORD'),
        onIconPress: (): void => navigate(-1),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        showPrevious: true,
        nextLabel: t('bluiCommon:ACTIONS.SUBMIT'),
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoNext: true,
        canGoPrevious: true,
        ...WorkflowCardActionsProps,
        onNext: (data: any): void => {
            setEmailInput(data.email);
            void handleOnNext(data.email);
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            navigate(routeConfig.LOGIN as string);
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    return (
        <ForgotPasswordScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            emailLabel={emailLabel}
            initialEmailValue={initialEmailValue}
            emailValidator={emailValidator}
            emailTextInputProps={emailTextInputProps}
            showSuccessScreen={enableSuccessScreen && showSuccessScreen}
            SuccessScreen={SuccessScreen}
            SuccessScreenProps={{
                emptyStateProps: {
                    icon: { name: 'check-circle' },
                    title: t('bluiCommon:MESSAGES.EMAIL_SENT'),
                    description: (
                        <Text variant="bodyLarge">
                            <Trans
                                i18nKey={'bluiAuth:FORGOT_PASSWORD.LINK_SENT'}
                                values={{ email: emailInput }}
                                components={{ boldTag: <Bold>{emailInput}</Bold> }}
                            >
                                A link to reset your password has been sent to {emailInput}.
                            </Trans>
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
                        navigate(routeConfig.LOGIN as string);
                    },
                },
                ...SuccessScreenProps,
            }}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};