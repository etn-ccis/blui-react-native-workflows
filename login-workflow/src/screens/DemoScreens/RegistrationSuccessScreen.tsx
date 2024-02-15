import React from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody } from '../../components/WorkflowCard';
import { useNavigation } from '@react-navigation/native';

export const RegistrationSuccessScreen: React.FC = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
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
        <WorkflowCard>
            <WorkflowCardBody>
                <>
                    <Text>{messageTitle}</Text>
                    <Text>{message1}</Text>
                    <Text>{message2}</Text>
                </>
            </WorkflowCardBody>
            <WorkflowCardActions showNext nextLabel='Okay' fullWidthButton onNext={()=>{
                navigation.navigate('Home');
            }}/>
        </WorkflowCard>
    );
};
