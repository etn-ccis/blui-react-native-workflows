import React from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody } from '../../components/WorkflowCard';

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
    const message1 = `Your account has successfully been created with the email ${email} belonging to the ${email} org.`;
    const message2 = `Your account has successfully been created with the email ${email} belonging to the ${organization} org`;

    return (
        <WorkflowCard>
            <WorkflowCardBody>
                <>
                    <Text>{messageTitle}</Text>
                    <Text>{message1}</Text>
                    <Text>{message2}</Text>
                </>
            </WorkflowCardBody>
            <WorkflowCardActions showNext nextLabel="Okay" fullWidthButton />
        </WorkflowCard>
    );
};
