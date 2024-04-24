import React from 'react';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';
import { useTranslation } from 'react-i18next';
import { IconFamily } from '@brightlayer-ui/react-native-components/core/__types__';

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
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        WorkflowCardBodyProps,
        EmptyStateProps,
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
    const icon: IconFamily = { family: 'material', name: 'person' };

    const emptyStatesProps = {
        icon: icon,
        title: t('bluiCommon:MESSAGES.WELCOME'),
        description: t('bluiRegistration:REGISTRATION.SUCCESS_EXISTING'),
        ...EmptyStateProps,
    };

    return (
        <SuccessScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            WorkflowCardBodyProps={workflowCardBodyProps}
            EmptyStateProps={emptyStatesProps}
            {...otherExistingAccountSuccessScreenProps}
        />
    );
};
