import React from 'react';
import { Text } from 'react-native-paper';
import { Trans, useTranslation } from 'react-i18next';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';

/**
 * Component that renders a success screen for when registration completes.
 *
 * @param {SuccessScreenProps} props - Props of SuccessScreen component
 *
 * @category Component
 */

export const RegistrationSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const { t } = useTranslation();
    const { navigate, routeConfig } = useRegistrationContext();
    const {
        screenData: {
            AccountDetails: { firstName, lastName },
            CreateAccount: { emailAddress: email },
            Other: {
                // @ts-ignore
                RegistrationSuccessScreen: { organizationName: organization },
            },
        },
    } = useRegistrationWorkflowContext();

    const {
        icon = { family: 'material', name: 'check-circle' },
        messageTitle = `${t('bluiCommon:MESSAGES.WELCOME')}, ${firstName} ${lastName}!`,
        message = (
            <Text variant={'titleSmall'}>
                <Trans
                    i18nKey={
                        email
                            ? 'bluiRegistration:REGISTRATION.SUCCESS_MESSAGE_ALT'
                            : 'bluiRegistration:REGISTRATION.SUCCESS_MESSAGE_ALT_WITHOUT_EMAIL_PROVIDED'
                    }
                    values={{ email, organization }}
                >
                    <Text>
                        Your account has successfully been created with the email <b>{email}</b> belonging to the
                        <b>{` ${String(organization)}`}</b> org.
                    </Text>
                </Trans>
            </Text>
        ),
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        WorkflowCardBodyProps,
        ...otherRegistrationSuccessScreenProps
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.COMPLETE'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardBodyProps = {
        scrollable: false,
        ...WorkflowCardBodyProps,
    };

    const workflowCardActionsProps = {
        nextLabel: t('bluiCommon:ACTIONS.FINISH'),
        showNext: true,
        canGoNext: canDismiss,
        fullWidthButton: true,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            onDismiss();
            WorkflowCardActionsProps?.onNext?.();
        },
    };

    return (
        <SuccessScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            WorkflowCardBodyProps={workflowCardBodyProps}
            icon={icon}
            messageTitle={messageTitle}
            message={message}
            {...otherRegistrationSuccessScreenProps}
        />
    );
};
