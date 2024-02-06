import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { HelperText, TextInput } from 'react-native-paper';
import {
    WorkflowCard,
    WorkflowCardBody,
    WorkflowCardInstructions,
    WorkflowCardHeader,
    WorkflowCardActions,
    DemoRegistrationWorkflowScreen,
    EulaScreen
} from '@brightlayer-ui/react-native-auth-workflow';
import { useExtendedTheme } from '@brightlayer-ui/react-native-themes';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'RegistrationProviderExample'>;
};

const RegistrationProviderExample: React.FC<AppProps> = ({ navigation }): JSX.Element => {
    const theme = useExtendedTheme();
    const [errorFilledText, setErrorFilledText] = React.useState('Hello');
    const [hasError, setHasError] = React.useState(true);
    return (
        <>
            <DemoRegistrationWorkflowScreen>
                <EulaScreen/>
            </DemoRegistrationWorkflowScreen>
            
        </>
    );
};

export default RegistrationProviderExample;
