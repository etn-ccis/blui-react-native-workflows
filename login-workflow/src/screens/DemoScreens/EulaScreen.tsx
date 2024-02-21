import React, { useCallback, useState } from 'react';
import { useRegistrationWorkflowContext } from '../../contexts';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components';
import { Checkbox, Text } from 'react-native-paper';
import { View, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    const navigation = useNavigation();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens, isInviteRegistration } = regWorkflow;

    const { initialCheckboxValue } = props;

    const [eulaAccepted, setEulaAccepted] = useState(
        initialCheckboxValue ? initialCheckboxValue : screenData.Eula.accepted
    );

    const onNext = useCallback(() => {
        if (isInviteRegistration) {
            //uncomment for account already exists screen
            // updateScreenData({
            //     screenId: 'Eula',
            //     values: { accepted: eulaAccepted },
            //     isAccountExist: true,
            // });
            void nextScreen({
                screenId: 'Eula',
                values: { accepted: eulaAccepted },
                isAccountExist: false,
            });
        } else {
            void nextScreen({
                screenId: 'Eula',
                values: { accepted: eulaAccepted },
                isAccountExist: false,
            });
        }
    }, [eulaAccepted, nextScreen, isInviteRegistration]);

    const onPrevious = useCallback(() => {
        void previousScreen({
            screenId: 'Eula',
            values: { accepted: eulaAccepted },
            isAccountExist: false,
        });
        navigation.navigate('Home');
    }, [eulaAccepted, previousScreen, navigation]);

    return (
        <WorkflowCard>
            <WorkflowCardHeader
                title="Eula Screen"
                onIconPress={(): void => {
                    navigation.navigate('Home');
                }}
            />

            <WorkflowCardBody>
                <View style={styles.row}>
                    {Platform.OS === 'ios' ? (
                        <Checkbox.IOS
                            status={eulaAccepted ? 'checked' : 'unchecked'}
                            onPress={(): void => {
                                setEulaAccepted(!eulaAccepted);
                            }}
                            color="red"
                            background="blue"
                        />
                    ) : (
                        <Checkbox.Android
                            status={eulaAccepted ? 'checked' : 'unchecked'}
                            onPress={(): void => {
                                setEulaAccepted(!eulaAccepted);
                            }}
                            color="red"
                            background="blue"
                        />
                    )}
                    <Text style={{ flex: 1 }}>I have read and agree to the Terms & Conditions</Text>
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
    );
};
