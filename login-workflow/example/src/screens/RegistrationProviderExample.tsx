import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useApp } from '../contexts/AppContextProvider';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';
import {
    RegistrationContextProvider,
    RegistrationWorkflow,
    // EulaScreen,
    // ErrorContextProvider,
    // AccountDetailsScreen,
    // CreatePasswordScreen,
    // VerifyCodeScreen,
    // WorkflowCard,
    // WorkflowCardHeader,
    // WorkflowCardBody,
    // WorkflowCardActions,
    // CreateAccountScreen,
} from '@brightlayer-ui/react-native-auth-workflow';
import { RootStackParamList } from '../navigation';
import { useNavigation } from '@react-navigation/native';
// import { CustomScreen } from '../components/CustomScreen';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'RegistrationProviderExample'>;
};

const RegistrationProviderExample: React.FC<AppProps> = (): JSX.Element => {
    const app = useApp();
    const nav = useNavigation();
    return (
        <RegistrationContextProvider
            language={app.language}
            actions={ProjectRegistrationUIActions()}
            i18n={i18nAppInstance}
            navigate={(destination: -1 | string) => {
                if (typeof destination === 'string') {
                    nav.navigate(destination);
                } else {
                    nav.goBack();
                }
            }}
            routeConfig={{
                LOGIN: 'Home',
                FORGOT_PASSWORD: undefined,
                RESET_PASSWORD: undefined,
                REGISTER_INVITE: undefined,
                REGISTER_SELF: undefined,
                SUPPORT: undefined,
            }}
        >
            {/* <ErrorContextProvider> */}
            {/* Default Implementation */}
            {/* <RegistrationWorkflow /> */}

            {/* implementation with custom screens. This custom screen is using app and workflow level translations  */}
            <RegistrationWorkflow>
                {/* <EulaScreen />
                <CustomScreen />
                <VerifyCodeScreen /> */}
                {/* <CreatePasswordScreen /> */}
                {/* <CreateAccountScreen 
                WorkflowCardBodyProps={{
                    instructions:
                        'implementation with custom screens. This custom screen is using app and workflow level translationsimplementation with custom screens. This custom screen is using app and workflow level translationsimplementation with custom screens. This custom screen is using app and workflow level translationsimplementation with custom screens. This custom screen is using app and workflow level translationsimplementation with custom screens. This custom screen is using app and workflow level translationsimplementation with custom screens. This custom screen is using app and workflow level translationsimplementation with custom screens. This custom screen is using app and workflow level translationsimplementation with custom screens. This custom screen is using app and workflow level translationsimplementation with custom screens. This custom screen is using app and workflow level translations',
                }}
                /> */}
            </RegistrationWorkflow>

            {/* Show default success screen */}
            {/* <RegistrationWorkflow
                successScreen={
                    <WorkflowCard>
                        <WorkflowCardHeader
                            title="Test Success Screen"
                            onIconPress={() => {
                                console.log('close icon pressed');
                            }}
                        ></WorkflowCardHeader>
                        <WorkflowCardBody>
                            <View>
                                <Text>Success</Text>
                            </View>
                        </WorkflowCardBody>
                        <WorkflowCardActions showNext nextLabel="Okay" fullWidthButton />
                    </WorkflowCard>
                }
            > */}
            {/* <EulaScreen />
                <CustomScreen />
                <AccountDetailsScreen />
            </RegistrationWorkflow> */}
        </RegistrationContextProvider>
    );
};
export default RegistrationProviderExample;
