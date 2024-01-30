import React from 'react';
import { ScrollView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import {
    WorkflowCardBody,
    WorkflowCardInstructions,
    WorkflowCardHeader,
} from '@brightlayer-ui/react-native-auth-workflow';
import { HelperText, TextInput } from 'react-native-paper';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'WorkFlowCardExample'>;
};

const WorkFlowCardExample: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useExtendedTheme();
    const [errorFilledText, setErrorFilledText] = React.useState('Hello');
    const [hasError, setHasError] = React.useState(true);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <ScrollView>
                    <WorkflowCardHeader
                        title="Workflow Example"
                        onIconPress={(): void => {
                            navigation.openDrawer();
                        }}
                    />
                    <WorkflowCardInstructions instructions={'Test Instructions'} />
                    <WorkflowCardBody>
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
                    </WorkflowCardBody>
                </ScrollView>
            </View>
        </>
    );
};

export default WorkFlowCardExample;
