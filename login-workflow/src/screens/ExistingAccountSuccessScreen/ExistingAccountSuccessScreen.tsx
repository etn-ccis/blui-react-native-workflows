import React from 'react';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';
import { useTranslation } from 'react-i18next';
/**
 * Full screen component that renders a Success Screen for the accounts that already exists in the records
 *
 * @param {SuccessScreenProps} props - Props of SuccessScreen component
 *
 * @category Component
 */

export const ExistingAccountSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const { t } = useTranslation();
    const { navigate, routeConfig } = useRegistrationContext();
    const { resetScreenData } = useRegistrationWorkflowContext();
    const {
        icon = { family: 'material', name: 'person' },
        messageTitle = t('bluiCommon:MESSAGES.WELCOME'),
        message = t('bluiRegistration:REGISTRATION.SUCCESS_EXISTING'),
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        WorkflowCardBodyProps,
        ...otherExistingAccountSuccessScreenProps
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.COMPLETE'),
        ...WorkflowCardHeaderProps,
        onIconPress: (): void => {
            navigate(routeConfig.LOGIN as string);
            resetScreenData();
        },
    };

    const workflowCardBodyProps = {
        scrollable: false,
        ...WorkflowCardBodyProps,
    };

    const workflowCardActionsProps = {
        nextLabel: t('bluiCommon:ACTIONS.CONTINUE'),
        showNext: true,
        canGoNext: canDismiss,
        fullWidthButton: true,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            onDismiss();
            resetScreenData();
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
            {...otherExistingAccountSuccessScreenProps}
        />
    );
};
