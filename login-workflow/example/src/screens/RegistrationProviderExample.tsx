import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import {
    EulaScreen,
    VerifyCode,
    CreateAccount,
    DemoRegistrationWorkflowScreen,
} from '@brightlayer-ui/react-native-auth-workflow';
import { CustomScreen } from '../components/CustomScreen';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'RegistrationProviderExample'>;
};

const RegistrationProviderExample: React.FC<AppProps> = (): JSX.Element => (
    <DemoRegistrationWorkflowScreen>
        <EulaScreen />
        <CreateAccount />
        <CustomScreen />
        <VerifyCode />
    </DemoRegistrationWorkflowScreen>
);

export default RegistrationProviderExample;
