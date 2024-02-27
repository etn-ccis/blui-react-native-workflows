import React from 'react';
import { useRegistrationContext } from '../../contexts';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';
import { useTranslation } from 'react-i18next';
/**
 * Full screen component that renders a Success Screen for the accounts that already exists in the records
 *
 * @param {SuccessScreenProps} props - Props of SuccessScreen component
 *
 * @category Component
 */

export const ExistingAccountSuccessScreen: React.FC<SuccessScreenProps> = (props: SuccessScreenProps) => {
    const { t } = useTranslation();
    const { navigate, routeConfig } = useRegistrationContext();
    const {
        icon = { family: 'material', name: 'person' },
        messageTitle = t('bluiCommon:MESSAGES.WELCOME'),
        message = t('bluiRegistration:REGISTRATION.SUCCESS_EXISTING'),
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        ...otherExistingAccountSuccessScreenProps
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.COMPLETE'),
        ...WorkflowCardHeaderProps,
        onIconPress: (): void => {
            navigate(routeConfig.LOGIN as string);
            workflowCardHeaderProps?.onIconPress?.();
        },
    };

    const workflowCardActionsProps = {
        nextLabel: t('bluiCommon:ACTIONS.CONTINUE'),
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
            {...otherExistingAccountSuccessScreenProps}
        />
    );
};
