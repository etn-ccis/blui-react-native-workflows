import React, { useCallback, useState } from 'react';
// import { useRegistrationWorkflowContext } from '../../contexts';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    useRegistrationWorkflowContext,
    useRegistrationContext,
} from '@brightlayer-ui/react-native-auth-workflow';
import { TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

type CustomScreenProps = {
    /**
     * Used to pre-populate the data when the screen loads
     *
     */
    organisationName?: any;
};

export const CustomScreen: React.FC<CustomScreenProps> = (props) => {
    const regWorkflow = useRegistrationWorkflowContext();
    const { navigate } = useRegistrationContext();
    const { nextScreen, screenData, currentScreen, totalScreens, resetScreenData, previousScreen } = regWorkflow;
    const { organisationName } = props;
    const { t } = useTranslation();

    const [organisationNameInput, setOrganisationNameInput] = useState(
        organisationName ? organisationName : screenData.Other?.organisationName
    );

    const onNext = useCallback(() => {
        void nextScreen({
            screenId: 'Custom',
            values: { organisationName: organisationNameInput },
            // isAccountExist: true,
        });
    }, [organisationNameInput, nextScreen]);

    const onIconPress = useCallback(() => {
        navigate(-1);
        resetScreenData();
    }, [navigate, resetScreenData]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'Custom',
            values: { organisationName: organisationNameInput },
            // isAccountExist: true,
        });
    }, [organisationNameInput, previousScreen]);

    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Custom Screen" onIconPress={onIconPress} icon={{ name: 'arrow-back' }} />
            <WorkflowCardBody>
                <TextInput
                    label={t('app:ORGANAIZATION_DETAILS.NAME')}
                    mode="flat"
                    value={organisationNameInput}
                    onChangeText={(value) => setOrganisationNameInput(value)}
                />
            </WorkflowCardBody>
            <WorkflowCardActions
                showPrevious
                showNext
                previousLabel={t('bluiCommon:ACTIONS.BACK')}
                nextLabel={t('bluiCommon:ACTIONS.OKAY')}
                currentStep={currentScreen}
                totalSteps={totalScreens}
                onNext={onNext}
                onPrevious={onPrevious}
            />
        </WorkflowCard>
    );
};
