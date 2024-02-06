import React, { useCallback, useState } from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components';
import { Checkbox, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

type EulaScreenProps = {
    /**
     * Used to pre-populate the checked/unchecked checkbox when the screen loads
     * @default false
     */
    initialCheckboxValue?: boolean;
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});
export const EulaScreen: React.FC<EulaScreenProps> = (props) => {
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
    const { initialCheckboxValue } = props;

    const [eulaAccepted, setEulaAccepted] = useState(
        initialCheckboxValue ? initialCheckboxValue : screenData.Eula.accepted
    );
    

    const onNext = useCallback(async () => {
        if(isInviteRegistration) {
            updateScreenData({
                screenId: 'Eula',
                values: { accepted: screenData.Eula.accepted },
                isAccountExist: true,
            });
        } else {
            void nextScreen({
                screenId: 'Eula',
                values: { accepted: eulaAccepted },
                isAccountExist: false,
            });
        }
    }, [eulaAccepted, nextScreen, isInviteRegistration]);

    const onPrevious = useCallback(async () => {
        void previousScreen({
            screenId: 'Eula',
            values: { accepted: eulaAccepted },
            isAccountExist: false,
        });
    }, [eulaAccepted, previousScreen]);


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
                <View style={styles.row}>
                    <Text style={{ flex: 1 }}>I have read and agree to the Terms & Conditions</Text>
                    <Checkbox
                        status={eulaAccepted ? 'checked' : 'unchecked'}
                        onPress={(): void =>
                            eulaAccepted === true
                                ? setEulaAccepted(true)
                                : setEulaAccepted(false)
                        }
                    />
                </View>
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
