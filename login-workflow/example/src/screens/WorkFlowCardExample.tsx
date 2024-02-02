import React from 'react';
// import { View } from 'react-native';
// import { Header } from '@brightlayer-ui/react-native-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { HelperText, TextInput, Text } from 'react-native-paper';
import {
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardBody,
    WorkflowCardInstructions,
    WorkflowCardActions,
} from '@brightlayer-ui/react-native-auth-workflow';
// import { useThemeContext } from '../context/ThemeContext';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import { useWindowDimensions } from 'react-native';
// import { UserMenuExample } from '../components/UserMenuExample';
// import { toggleRTL } from './home';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'WorkFlowCardExample'>;
};

const WorkFlowCardExample: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useExtendedTheme();
    // const { theme: themeType, setTheme } = useThemeContext();
    const [errorFilledText, setErrorFilledText] = React.useState('Hello');
    const [hasError, setHasError] = React.useState(true);
    const { height, width } = useWindowDimensions();
    return (
        <>
            <WorkflowCard>
                <WorkflowCardHeader />
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
                    <Text>{`height: ${height}, width: ${width}`}</Text>
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
