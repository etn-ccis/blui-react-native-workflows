import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/navigation';
import { useApp } from '../context/AppContextProvider';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';
import {
    RegistrationContextProvider,
    ErrorContextProvider,
    RegistrationWorkflow,
    // Uncomment screens as per example
    // EulaScreen,
    // AccountDetailsScreen,
    // WorkflowCard,
    // WorkflowCardHeader,
    // WorkflowCardBody,
    // WorkflowCardActions,
} from '@brightlayer-ui/react-native-auth-workflow';
// Uncomment below lines as per example
// import { CustomScreen } from './../components/CustomScreen';
// import { Text } from 'react-native-paper';
// import { View } from 'react-native';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'RegistrationProviderExample'>;
};

const RegistrationProviderExample: React.FC<AppProps> = (): JSX.Element => {
    const app = useApp();

    return (
        <RegistrationContextProvider
            language={app.language}
            actions={ProjectRegistrationUIActions()}
            i18n={i18nAppInstance}
            navigate={function (destination: string | number): void {
                throw new Error(`Function not implemented.${destination}`);
            }}
            routeConfig={{
                LOGIN: undefined,
                FORGOT_PASSWORD: undefined,
                RESET_PASSWORD: undefined,
                REGISTER_INVITE: undefined,
                REGISTER_SELF: undefined,
                SUPPORT: undefined,
            }}
        >
            <ErrorContextProvider>
                {/* Default Implementation */}
                <RegistrationWorkflow />

                {/* implementation with custom screens. This custom screen is using app and workflow level translations  */}
                {/* <RegistrationWorkflow>
                    <EulaScreen/>
                    <CustomScreen/>
                    <AccountDetailsScreen/>
                </RegistrationWorkflow> */}

                {/* Show default success screen */}
                {/* <RegistrationWorkflow successScreen={
                    <WorkflowCard>
                        <WorkflowCardHeader title='Test Success Screen' onIconPress={()=>{
                            console.log('close icon pressed')
                        }}></WorkflowCardHeader>
                        <WorkflowCardBody>
                            <View><Text>Success</Text></View>
                        </WorkflowCardBody>
                        <WorkflowCardActions
                            showNext
                            nextLabel="Okay"
                            fullWidthButton
                        />
                    </WorkflowCard>
                }>
                    <EulaScreen/>
                    <CustomScreen/>
                    <AccountDetailsScreen/>
                </RegistrationWorkflow> */}

                {/* Invite Registration Mode */}
                {/* <RegistrationWorkflow isInviteRegistration/> */}
            </ErrorContextProvider>
        </RegistrationContextProvider>
    );
};
export default RegistrationProviderExample;
