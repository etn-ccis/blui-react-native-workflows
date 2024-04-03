import React from 'react';
import { ContactSupportScreenBase } from './ContactSupportScreenBase';
import { ContactSupportScreenProps } from './types';
import { useAuthContext } from '../../contexts';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-paper';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { Linking } from 'react-native';

/**
 * Component renders a screen with contact information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param {ContactSupportScreenProps} props - Props of Create Account Screen
 *
 * @category Component
 */

export const ContactSupportScreen: React.FC<ContactSupportScreenProps> = (props) => {
    const { t } = useTranslation();
    const { navigate } = useAuthContext();
    const theme = useExtendedTheme();
    const { contactEmail = 'something@email.com', contactPhone = '1-800-123-4567' } = props;

    const defaultEmailSupportContent = (): JSX.Element => (
        <Text variant="bodyLarge">
            {`${t('bluiAuth:CONTACT_SUPPORT.SUPPORT_MESSAGE')}`}
            <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary }}
                onPress={(): any => Linking.openURL(`mailto:${contactEmail ?? ''}`)}
            >
                {contactEmail}
            </Text>
            {`.`}
        </Text>
    );

    const defaultPhoneSupportContent = (): JSX.Element => (
        <Text variant="bodyLarge">
            {`${t('bluiAuth:CONTACT_SUPPORT.TECHNICAL_ASSISTANCE')}`}
            <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary }}
                onPress={(): any => Linking.openURL(`tel:${contactPhone ?? ''}`)}
            >
                {contactPhone}
            </Text>
            {`.`}
        </Text>
    );

    const {
        icon = { name: 'chat-bubble-outline' },
        iconSize = 70,
        emailSupportTitle = t('bluiAuth:CONTACT_SUPPORT.GENERAL_QUESTIONS'),
        emailSupportContent = defaultEmailSupportContent,
        phoneSupportTitle = t('bluiAuth:CONTACT_SUPPORT.EMERGENCY_SUPPORT'),
        phoneSupportContent = defaultPhoneSupportContent,
        dismissButtonLabel = t('bluiCommon:ACTIONS.OKAY'),
        onDismiss,
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        ...otherContactSupportProps
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiAuth:USER_MENU.CONTACT_US'),
        onIconPress: (): void => {
            navigate(-1);
        },
        ...WorkflowCardHeaderProps,
    };

    const workflowCardActionsProps = {
        nextLabel: t('bluiCommon:ACTIONS.OKAY'),
        showNext: true,
        canGoNext: true,
        fullWidthButton: true,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            navigate(-1);
            WorkflowCardActionsProps?.onNext?.();
        },
    };

    return (
        <ContactSupportScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            icon={icon}
            iconSize={iconSize}
            emailSupportTitle={emailSupportTitle}
            emailSupportContent={emailSupportContent}
            phoneSupportTitle={phoneSupportTitle}
            phoneSupportContent={phoneSupportContent}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            dismissButtonLabel={dismissButtonLabel}
            onDismiss={onDismiss}
            {...otherContactSupportProps}
        />
    );
};
