import React, { useCallback } from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    useAuthContext,
} from '@brightlayer-ui/react-native-auth-workflow';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

export const AuthCustomScreen: React.FC = () => {
    const { actions } = useAuthContext();

    const handleOnNext = useCallback(async () => {
        try {
            await actions.forgotPassword('email@email.email');
        } catch (_error) {
            // eslint-disable-next-line no-console
            console.log('Error ::', _error);
        }
    }, [actions]);

    const { t } = useTranslation();

    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Auth Screen" />
            <WorkflowCardBody>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 50,
                        paddingBottom: 50,
                    }}
                >
                    <Text variant="headlineSmall">Auth Translations</Text>
                    <Text variant="bodyMedium">{`Auth Translations: ${t('bluiAuth:FORGOT_PASSWORD.ERROR')}`}</Text>
                    <Text variant="bodyMedium">{`Common Translations: ${t(
                        'bluiCommon:ACTIONS.CHANGE_LANGUAGE'
                    )}`}</Text>
                    <Text variant="bodyMedium">{`App Translations: ${t('app:PAGE_DETAILS.AUTHORISED_MESSAGE')}`}</Text>
                </View>
            </WorkflowCardBody>
            <WorkflowCardActions showNext nextLabel={'Press'} onNext={(): void => void handleOnNext()} />
        </WorkflowCard>
    );
};
