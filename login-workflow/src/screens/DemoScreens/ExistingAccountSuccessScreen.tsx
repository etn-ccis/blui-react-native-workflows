import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody } from '../../components/WorkflowCard';
import { useNavigation } from '@react-navigation/native';

export const ExistingAccountSuccessScreen: React.FC = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const messageTitle = t('bluiCommon:MESSAGES.WELCOME');
    const message = t('bluiRegistration:REGISTRATION.SUCCESS_EXISTING');

    return (
        <WorkflowCard>
            <WorkflowCardBody>
                <>
                    <Text>{messageTitle}</Text>
                    <Text>{message}</Text>
                </>
            </WorkflowCardBody>
            <WorkflowCardActions showNext nextLabel='Okay' fullWidthButton onNext={()=>{
                navigation.navigate('Home');
            }}/>
        </WorkflowCard>
    );
};
