import React, { useCallback, useRef } from 'react';
import {
    WorkflowCard,
    WorkflowCardBody,
    WorkflowCardInstructions,
    WorkflowCardHeader,
    WorkflowCardActions,
    SetPassword,
    ErrorManager,
    useErrorManager,
} from '@brightlayer-ui/react-native-auth-workflow';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

const logIn = (): Promise<void> => {
    throw new Error('My Custom Error');
};

const WorkFlowCardExample: React.FC = () => {
    const theme = useExtendedTheme();
    const [errorFilledText, setErrorFilledText] = React.useState('Hello');
    const [hasError, setHasError] = React.useState(true);
    const confirmRef = useRef(null);
    const { triggerError, errorManagerConfig } = useErrorManager();
    const navigation = useNavigation();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        onClose: (): void => {
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const onNext = useCallback(async (): Promise<void> => {
        try {
            await logIn();
        } catch (_error) {
            triggerError(_error as Error);
        }
    }, [triggerError]);

    return (
        <>
            <WorkflowCard>
                <WorkflowCardHeader
                    title="Workflow Example"
                    subTitle="subtitle"
                    icon={{ name: 'arrow-back' }}
                    onIconPress={(): void => {
                        navigation.navigate('Home');
                    }}
                />
                <WorkflowCardInstructions instructions={'Test Instructions'} />
                <WorkflowCardBody>
                    <ErrorManager {...errorDisplayConfig}>
                        <TextInput
                            label="TextInput"
                            mode="flat"
                            left={<TextInput.Icon icon="email" />}
                            right={<TextInput.Icon icon="menu-down" />}
                            value={errorFilledText}
                            underlineColor={theme.colors.surface}
                            onChangeText={(value: string): void => {
                                setErrorFilledText(value);
                                setHasError(value.length > 4);
                            }}
                            error={hasError}
                        />
                        <HelperText type="error" visible={hasError} style={{ marginBottom: 8 }}>
                            Error Message
                        </HelperText>
                        <Button onPress={(): void => void onNext()}>Click for error</Button>
                    </ErrorManager>
                    <SetPassword
                        onSubmit={() => {
                            // eslint-disable-next-line
                            console.log('submitted');
                        }}
                        confirmRef={confirmRef}
                    />
                </WorkflowCardBody>
                <WorkflowCardActions
                    showPrevious
                    showNext
                    previousLabel="Back"
                    nextLabel="Next"
                    currentStep={2}
                    totalSteps={7}
                    fullWidthButton={false}
                    onPrevious={() => navigation.navigate('Home')}
                />
            </WorkflowCard>
        </>
    );
};

export default WorkFlowCardExample;
