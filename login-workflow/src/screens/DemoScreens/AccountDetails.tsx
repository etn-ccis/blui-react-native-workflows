import React, { useCallback, useState } from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components';
import { TextInput } from 'react-native-paper';

type AccountDetailsProps = {
    /**
     * Used to pre-populate the data when the screen loads
     *
     */
    firstName?: any;
    lastName?: any;
};

export const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens } = regWorkflow;
    const { firstName, lastName } = props;

    const [firstNameInput, setFirstNameInput] = useState(firstName ? firstName : screenData.AccountDetails.firstName);

    const [lastNameInput, setLastNameInput] = useState(lastName ? lastName : screenData.AccountDetails.lastName);

    const onNext = useCallback(() => {
        void nextScreen({
            screenId: 'AccountDetails',
            values: { firstName: firstName, lastName: lastName },
        });
    }, [firstName, lastName, nextScreen]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'AccountDetails',
            values: { firstName: firstName, lastName: lastName },
        });
    }, [lastName, firstName, previousScreen]);

    return (
        <WorkflowCard>
            <WorkflowCardHeader
                title="Account Details"
                onIconPress={(): void => {
                    // eslint-disable-next-line
                    console.log('close');
                }}
            />

            <WorkflowCardBody>
                <TextInput
                    label="First Name"
                    mode="flat"
                    value={firstNameInput}
                    onChangeText={(value) => setFirstNameInput(value)}
                    style={{
                        marginBottom: 16,
                    }}
                />
                <TextInput
                    label="Last Name"
                    mode="flat"
                    value={lastNameInput}
                    onChangeText={(value) => setLastNameInput(value)}
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
