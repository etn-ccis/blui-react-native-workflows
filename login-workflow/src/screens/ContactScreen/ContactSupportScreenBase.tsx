import React from 'react';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components/WorkflowCard';
import { ContactSupportScreenProps } from './types';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { Icon } from '@brightlayer-ui/react-native-components';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

/**
 * Component renders a screen with contact information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param {ContactSupportScreenProps} props - Props of Create Account Screen
 *
 * @category Component
 */
export const ContactSupportScreenBase: React.FC<ContactSupportScreenProps> = (props) => {
    const {
        icon,
        iconSize,
        emailSupportTitle,
        emailSupportContent,
        phoneSupportTitle,
        phoneSupportContent,
        contactEmail,
        contactPhone,
        dismissButtonLabel,
        onDismiss,
    } = props;
    const theme = useExtendedTheme();
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const cardBodyProps = props.WorkflowCardBodyProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            {icon && (
                <View style={{ alignItems: 'center', marginTop: 48, marginBottom: 16 }}>
                    <Icon source={icon} size={iconSize || 24} color={theme.colors.disabled} />
                </View>
            )}
            <WorkflowCardBody {...cardBodyProps}>
                <Text variant={'bodyLarge'} style={{ marginBottom: 8 }}>
                    {emailSupportTitle}
                </Text>
                <>{emailSupportContent?.(contactEmail ?? '')}</>
                <Text variant={'bodyLarge'} style={{ marginBottom: 8, marginTop: 32 }}>
                    {phoneSupportTitle}
                </Text>
                <>{phoneSupportContent?.(contactPhone ?? '')}</>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                nextLabel={dismissButtonLabel || actionsProps.nextLabel}
                onNext={(): void => {
                    if (onDismiss) onDismiss();
                    if (actionsProps.onNext) actionsProps.onNext();
                }}
            />
        </WorkflowCard>
    );
};
