import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useApp } from '../contexts/AppContextProvider';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';
import {
    RegistrationContextProvider,
    ErrorContextProvider,
    RegistrationWorkflow,
    // AccountDetailsScreen,
    // CreatePasswordScreen,
    // VerifyCodeScreen,
    // WorkflowCard,
    // WorkflowCardHeader,
    // WorkflowCardBody,
    // WorkflowCardActions,
} from '@brightlayer-ui/react-native-auth-workflow';
import { RootStackParamList } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'RegistrationProviderExample'>;
};

const RegistrationProviderExample: React.FC<AppProps> = (): JSX.Element => {
    const app = useApp();
    const nav = useNavigation();
    const { t } = useTranslation();
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
            // errorConfig={{
            //     messageBoxConfig:{
            //         title: t('')
            //     }
            // }}
        >
            <ErrorContextProvider>
                {/* Default Implementation */}
                <RegistrationWorkflow  isInviteRegistration initialRegistrationParams={{
                    code:'d',
                    email: 'Ee@cc.ccc'
                }}/>

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
                {/* <RegistrationWorkflow
                    isInviteRegistration
                    initialRegistrationParams={{ code: '123', email: 'aa@aa.aa' }}
                /> */}
            </ErrorContextProvider>
        </RegistrationContextProvider>
    );
};
export default RegistrationProviderExample;
