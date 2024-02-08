import React, { useCallback, useState } from 'react';
// import { useRegistrationWorkflowContext } from '../../contexts';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    useRegistrationWorkflowContext,
} from '@brightlayer-ui/react-native-auth-workflow';
import { TextInput } from 'react-native-paper';

type CustomScreenProps = {
    /**
     * Used to pre-populate the data when the screen loads
     *
     */
    organisationName?: any;
};

export const CustomScreen: React.FC<CustomScreenProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens } = regWorkflow;
    const { organisationName } = props;

    const [organisationNameInput, setOrganisationNameInput] = useState(
        organisationName ? organisationName : screenData.Other?.organisationName
    );

    const onNext = useCallback(() => {
        void nextScreen({
            screenId: 'Custom',
            values: { organisationName: organisationName },
        });
    }, [organisationName, nextScreen]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'Custom',
            values: { organisationName: organisationName },
        });
    }, [organisationName, previousScreen]);

    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Custom Screen" onIconPress={onPrevious} icon={{ name: 'arrow-back' }} />

            <WorkflowCardBody>
                <TextInput
                    label="Organisation Name"
                    mode="flat"
                    value={organisationNameInput}
                    onChangeText={(value) => setOrganisationNameInput(value)}
                />
            </WorkflowCardBody>
            <WorkflowCardActions
                showPrevious
                showNext
                previousLabel="Back"
                nextLabel="Next"
                currentStep={currentScreen}
                totalSteps={totalScreens}
                onNext={onNext}
                onPrevious={onPrevious}
            />
        </WorkflowCard>
    );
};
