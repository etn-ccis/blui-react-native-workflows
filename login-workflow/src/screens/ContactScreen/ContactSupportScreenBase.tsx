import React from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
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
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            {icon && (
                <View style={{ alignItems: 'center', marginVertical: 16 }}>
                    <Icon source={icon} size={iconSize || 24} color={theme.colors.disabled} />
                </View>
            )}
            <WorkflowCardBody>
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
