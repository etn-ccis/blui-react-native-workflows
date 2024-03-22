import React from 'react';
import { ContactSupportScreenBase } from '@brightlayer-ui/react-native-auth-workflow';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

export const ContactBaseExample: React.FC = () => {
    const navigation = useNavigation();
    const contactEmail = 'something@email.com';
    const contactPhone = '1-800-123-4567';
    const theme = useExtendedTheme();
    const defaultEmailSupportContent = (): JSX.Element => (
        <Text variant="bodyLarge">
            {`Contact Message `}
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
            {`Phone Message `}
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

    const workflowCardHeaderProps = {
        title: 'CONTACT_US',
    };

    const workflowCardActionsProps = {
        nextLabel: 'Okay',
        showNext: true,
        canGoNext: true,
        fullWidthButton: true,
        onNext: (): void => {
            navigation.navigate('Home');
        },
    };
    return (
        <ContactSupportScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            icon={{ name: 'chat-bubble-outline' }}
            iconSize={60}
            emailSupportTitle={'EmailSupportTitle'}
            emailSupportContent={defaultEmailSupportContent}
            phoneSupportTitle={'PhoneSupportTitle'}
            phoneSupportContent={defaultPhoneSupportContent}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            dismissButtonLabel={'Okay'}
        />
    );
};
