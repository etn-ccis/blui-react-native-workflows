import React from 'react';
// import { Trans, useTranslation } from 'react-i18next';
// import Typography from '@mui/material/Typography';
// import CheckCircle from '@mui/icons-material/CheckCircle';
// import { SuccessScreenBase, SuccessScreenProps } from '..';
import { useRegistrationWorkflowContext } from '../../contexts';
import { useTranslation } from 'react-i18next';
// import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';

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

export const RegistrationSuccessScreen: React.FC = () => {
    const { t } = useTranslation();

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
    const messageTitle = `${t('bluiCommon:MESSAGES.WELCOME')}, ${firstName} ${lastName}!`;
    const message1 = `Your account has successfully been created with the email <b>{email}</b> belonging to the <b>${email}</b> org.`;
    const message2 = `Your account has successfully been created with the email <b>{email}</b> belonging to the <b>${organization}</b> org`;

    return (
        <View>
            <Text>{messageTitle}</Text>
            <Text>{message1}</Text>
            <Text>{message2}</Text>
        </View>
    );
};
