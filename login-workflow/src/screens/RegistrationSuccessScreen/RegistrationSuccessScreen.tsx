import React from 'react';
import { useTranslation } from 'react-i18next';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';
/**
 * Component that renders a success screen for when registration completes.
 *
 * @param icon the icon to be displayed on the screen
 * @param messageTitle title of the success message
 * @param message success message to be displayed on the screen
 * @param onDismiss function to call when user clicks button
 * @param canDismiss function to call when the dismiss button is clicked
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
        message = email
            ? t('bluiRegistration:REGISTRATION.SUCCESS_MESSAGE', {
                  replace: { email, organization },
              })
            : t('bluiRegistration:REGISTRATION.SUCCESS_MESSAGE_WITHOUT_EMAIL_PROVIDED', {
                  replace: { organization },
              }),
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        scrollMainContent = false,
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        ...otherRegistrationSuccessScreenProps
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.COMPLETE'),
        ...WorkflowCardHeaderProps,
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
            icon={icon}
            messageTitle={messageTitle}
            message={message}
            scrollMainContent={scrollMainContent}
            {...otherRegistrationSuccessScreenProps}
        />
    );
};
