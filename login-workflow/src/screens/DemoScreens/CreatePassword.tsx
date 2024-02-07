import React, { useCallback, useState } from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components';
import { TextInput } from 'react-native-paper';

type CreatePasswordProps = {
    /**
     * Used to pre-populate the data when the screen loads
     *
     */
    password?: any;
    confirmPassword?: any;
};

export const CreatePassword: React.FC<CreatePasswordProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens } = regWorkflow;
    const { password, confirmPassword } = props;

    const [passwordInput, setPasswordInput] = useState(
        password !== '' ? password : screenData.CreatePassword.password ?? ''
    );
    const [confirmInput, setConfirmInput] = useState(
        confirmPassword !== '' ? confirmPassword : screenData.CreatePassword.confirmPassword ?? ''
    );

    const onNext = useCallback(() => {
        void nextScreen({
            screenId: 'CreatePassword',
            values: { password: passwordInput, confirmPassword: confirmInput },
        });
    }, [passwordInput, confirmInput, nextScreen]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'CreatePassword',
            values: { password: passwordInput, confirmPassword: confirmInput },
        });
    }, [passwordInput, confirmInput, previousScreen]);

    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Create Password" onIconPress={onPrevious} icon={{ name: 'arrow-back' }} />

            <WorkflowCardBody>
                <TextInput
                    label="Password"
                    mode="flat"
                    value={passwordInput}
                    onChangeText={(value) => setPasswordInput(value)}
                    secureTextEntry
                    style={{
                        marginBottom: 16,
                    }}
                />
                <TextInput
                    label="Comfirm Password"
                    mode="flat"
                    value={confirmInput}
                    onChangeText={(value) => setConfirmInput(value)}
                    secureTextEntry
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
