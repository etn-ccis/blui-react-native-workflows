import React, { useCallback, useState } from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components';
import { TextInput } from 'react-native-paper';

type CreateAccountProps = {
    /**
     * Used to pre-populate the data when the screen loads
     *
     */
    email?: any;
};

export const CreateAccount: React.FC<CreateAccountProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens } = regWorkflow;
    const { email } = props;

    const [emailInput, setEmailInput] = useState(email ? email : screenData.CreateAccount.emailAddress);

    const onNext = useCallback(() => {
        void nextScreen({
            screenId: 'CreateAccount',
            values: { emailAddress: email },
        });
    }, [email, nextScreen]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'CreateAccount',
            values: { emailAddress: email },
        });
    }, [email, previousScreen]);

    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Create Account Screen" onIconPress={onPrevious} icon={{ name: 'arrow-back' }} />

            <WorkflowCardBody>
                <TextInput
                    label="Email Address"
                    mode="flat"
                    left={<TextInput.Icon icon="email" />}
                    value={emailInput}
                    onChangeText={(value) => setEmailInput(value)}
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
