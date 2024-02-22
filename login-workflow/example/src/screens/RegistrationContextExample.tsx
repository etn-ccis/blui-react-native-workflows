import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/navigation';
import { useApp } from '../context/AppContextProvider';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';
import {
    RegistrationContextProvider,
    EulaScreen,
    VerifyCode,
    CreateAccount,
    DemoRegistrationWorkflowScreen,
    VerifyCodeScreenBase,
} from '@brightlayer-ui/react-native-auth-workflow';
import { CustomScreen } from '../components/CustomScreen';

type AppProps = {
    navigation: StackNavigationProp<RootStackParamList, 'RegistratonContextExample'>;
};

const RegistrationContextExample: React.FC<AppProps> = (): JSX.Element => {
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
            <DemoRegistrationWorkflowScreen>
                <EulaScreen />
                <CreateAccount />
                <CustomScreen />
                <VerifyCode />
                <VerifyCodeScreenBase
                    WorkflowCardHeaderProps={{ title: 'Verify Code Screen' }}
                    WorkflowCardInstructionProps={{
                        instructions:
                            'A verification code has been sent to the email address you provided. Click the link or enter the code below to continue. This code is valid for 30 minutes.',
                    }}
                    WorkflowCardActionsProps={{
                        showNext: true,
                        showPrevious: true,
                        previousLabel: 'Back',
                        nextLabel: 'Next',
                    }}
                />
            </DemoRegistrationWorkflowScreen>
        </RegistrationContextProvider>
    );
};
export default RegistrationContextExample;
