import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { DemoRegistrationWorkflowScreen } from '@brightlayer-ui/react-native-auth-workflow';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'RegistrationProviderExample'>;
};

const RegistrationProviderExample: React.FC<AppProps> = (): JSX.Element => <DemoRegistrationWorkflowScreen />;

export default RegistrationProviderExample;
