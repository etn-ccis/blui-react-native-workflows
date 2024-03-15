import React, { useCallback } from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    useAuthContext,
} from '@brightlayer-ui/react-native-auth-workflow';
import { Text } from 'react-native-paper';

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
    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Auth Screen" />
            <WorkflowCardBody>
                <Text>Test</Text>
            </WorkflowCardBody>
            <WorkflowCardActions showNext nextLabel={'Press'} onNext={(): void => void handleOnNext()} />
        </WorkflowCard>
    );
};
