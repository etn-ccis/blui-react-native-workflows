import React, { useCallback, useState } from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components';
import { TextInput } from 'react-native-paper';

type VerifyCodeProps = {
    /**
     * Used to pre-populate the data when the screen loads
     *
     */
    code?: string;
};

export const VerifyCodeScreen: React.FC<VerifyCodeProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens, updateScreenData } = regWorkflow;
    const { code } = props;

    const [verifyCode, setVerifyCode] = useState(code ? code : screenData.VerifyCode.code);

    const onNext = useCallback(() => {
        // change it to true, if account already exists in self registration flow
        const isAccountExist = false;
        if (isAccountExist) {
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
    }, [verifyCode, nextScreen, updateScreenData, screenData]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'VerifyCode',
            values: { code: verifyCode },
            isAccountExist: false,
        });
    }, [verifyCode, previousScreen]);

    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Verify Code Screen" onIconPress={onPrevious} icon={{ name: 'arrow-back' }} />

            <WorkflowCardBody>
                <TextInput label="Code" mode="flat" value={verifyCode} onChangeText={(value) => setVerifyCode(value)} />
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
