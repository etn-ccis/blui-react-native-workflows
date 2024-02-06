import React, { useCallback, useState } from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components';
import { TextInput } from 'react-native-paper';

type CreatePasswordProps = {
    /**
     * Used to pre-populate the checked/unchecked checkbox when the screen loads
     * 
     */
    code?: string;
};

export const CustomScreen: React.FC<CreatePasswordProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const {
        nextScreen,
        previousScreen,
        screenData,
        currentScreen,
        totalScreens,
        isInviteRegistration,
        updateScreenData,
    } = regWorkflow;
    const { code } = props;

    const [verifyCode, setVerifyCode] = useState(
        code ? code : screenData.VerifyCode.code
    );

    const onNext = useCallback(async () => {
        if(isInviteRegistration) {
            updateScreenData({
                screenId: 'VerifyCode',
                values: { code: screenData.VerifyCode.code },
                isAccountExist: true,
            });
        } else {
            void nextScreen({
                screenId: 'VerifyCode',
                values: { code: verifyCode },
                isAccountExist: false,
            });
        }
    }, [verifyCode, nextScreen, isInviteRegistration]);

    const onPrevious = useCallback(async () => {
        void previousScreen({
            screenId: 'VerifyCode',
            values: { code: verifyCode },
            isAccountExist: false,
        });
    }, [verifyCode, previousScreen]);


    return (
        <WorkflowCard>
            <WorkflowCardHeader
                title="Workflow Example"
                onIconPress={(): void => {
                    // navigation.navigate('Home');
                    console.log('close');
                }}
            />

            <WorkflowCardBody>
                <TextInput
                    label="TextInput"
                    mode="flat"
                    left={<TextInput.Icon icon="email" />}
                    right={<TextInput.Icon icon="menu-down" />}
                    value={verifyCode}
                    onChangeText={(value) => setVerifyCode(value)}
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
    )
};
