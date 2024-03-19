import React, { useCallback, useRef } from 'react';
import {
    WorkflowCard,
    WorkflowCardBody,
    WorkflowCardInstructions,
    WorkflowCardHeader,
    WorkflowCardActions,
    useErrorManager,
    ErrorManager,
    BasicDialog,
    SetPassword,
    AccountDetailsScreen,
    RegistrationContextProvider,
    ErrorContextProvider,
    RegistrationWorkflow,
    AccountDetailsScreenBase,
    CreateAccountScreenBase,
    CreatePasswordScreenBase,
    EulaScreenBase,
} from '@brightlayer-ui/react-native-auth-workflow';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { useApp } from '../contexts/AppContextProvider';
import { useTranslation } from 'react-i18next';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import i18nAppInstance from '../../translations/i18n';
const logIn = (): Promise<void> => {
    throw new Error('My Custom Error');
};
const SmokeTestExample: React.FC = () => {
    const { triggerError, errorManagerConfig } = useErrorManager();
    const navigation = useNavigation();
    const app = useApp();
    const { t } = useTranslation();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        onClose: (): void => {
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };
    const onNext = useCallback(async (): Promise<void> => {
        console.log('hi');
        try {
            await logIn();
        } catch (_error) {
            triggerError(_error as Error);
        }
    }, [triggerError]);

    const SPECIAL_CHAR_REGEX = /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/;
    const LENGTH_REGEX = /^.{8,16}$/;
    const NUMBERS_REGEX = /[0-9]+/;
    const UPPER_CASE_REGEX = /[A-Z]+/;
    const LOWER_CASE_REGEX = /[a-z]+/;

    const passwordRequirements = [
        {
            regex: LENGTH_REGEX,
            description: 'minimum 8 and maximum 16 characters',
        },
        {
            regex: NUMBERS_REGEX,
            description: 'should include numbers',
        },
        {
            regex: UPPER_CASE_REGEX,
            description: 'should include capital letter',
        },
    ];
    return (
        // WorkflowCard example
        // <WorkflowCard>
        //     <WorkflowCardHeader
        //         title="Workflow Example"
        //         subTitle="subtitle"
        //         icon={{ name: 'arrow-back' }}
        //         iconColor='blue'
        //         backgroundColor='yellow'
        //         textColor='green'
        //         onIconPress={(): void => {
        //             navigation.navigate('Home');
        //         }}
        //     />
        //     <WorkflowCardInstructions
        //         instructions={<Text variant='displayLarge'>Test Instructions</Text>}
        //         // divider={false}
        //     />
        //     <WorkflowCardBody scrollable={true}>
        //         <Text variant='displayLarge'>This is body component</Text>
        //         <Text variant='displayLarge'>This is body component</Text>
        //         <Text variant='displayLarge'>This is body component</Text>
        //         <Text variant='displayLarge'>This is body component</Text>
        //         <Text variant='displayLarge'>This is body component</Text>
        //         <Text variant='displayLarge'>This is body component</Text>
        //     </WorkflowCardBody>
        //     <WorkflowCardActions
        //         divider={false}
        //         showPrevious
        //         canGoPrevious
        //         previousLabel={'Previous'}
        //         onPrevious={()=> {
        //             console.log('clicked on previous button')
        //         }}
        //         showNext
        //         canGoNext={()=>{
        //             return false
        //         }}
        //         nextLabel={'Next'}
        //         onNext={()=> {
        //             console.log('clicked on next button')
        //         }}
        //         currentStep={3}
        //         totalSteps={6}
        //         // fullWidthButton
        //         stepperVariant={'text'}
        //     />
        // </WorkflowCard>

        // BasicDialog component
        // <WorkflowCard>
        //     <WorkflowCardBody>
        //         <BasicDialog
        //             title="Notice!"
        //             body="This is an example notice"
        //             onDismiss={() => console.log('close')}
        //             open={true}
        //         />
        //     </WorkflowCardBody>
        // </WorkflowCard>

        // SetPassword component
        // <WorkflowCard>
        //     <WorkflowCardBody>
        //     <SetPassword
        //         // onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
        //         //     updateFields(passwordData);
        //         // }
        //         onPasswordChange={(passwordData: { password: string; confirm: string })=> {
        //             console.log(passwordData);
        //         }}
        //         newPasswordLabel={'New Pass'}
        //         initialNewPasswordValue={'d@123'}
        //         confirmPasswordLabel={'Confirm pass'}
        //         initialConfirmPasswordValue={'2#cc'}
        //         passwordRequirements={passwordRequirements}
        //         passwordNotMatchError={'Password not match'}
        //         passwordTextFieldProps={{
        //             textColor: 'green',
        //             // disabled:true
        //         }}
        //         onSubmit={()=>{
        //             console.log('submit')
        //         }}
        //     />
        //     </WorkflowCardBody>
        // </WorkflowCard>

        // AccountDetailsScreen full screen
        // <RegistrationContextProvider
        //     language={app.language}
        //     actions={ProjectRegistrationUIActions()}
        //     i18n={i18nAppInstance}
        //     navigate={(destination: -1 | string) => {
        //         if (typeof destination === 'string') {
        //             navigation.navigate(destination);
        //         } else {
        //             navigation.goBack();
        //         }
        //     }}
        //     routeConfig={{
        //         LOGIN: 'Home',
        //         FORGOT_PASSWORD: undefined,
        //         RESET_PASSWORD: undefined,
        //         REGISTER_INVITE: undefined,
        //         REGISTER_SELF: undefined,
        //         SUPPORT: undefined,
        //     }}
        // >
        //     <ErrorContextProvider>
        //         <RegistrationWorkflow><AccountDetailsScreen/></RegistrationWorkflow>

        //     </ErrorContextProvider>
        // </RegistrationContextProvider>
        // <AccountDetailsScreenBase
        //     firstNameLabel='Test First Name'
        //     initialFirstName='Test'
        //     lastNameLabel='Test Last Name'
        //     initialLastName='Test Last'
        //     // firstNameTextInputProps={{
        //     //     disabled: true
        //     // }}
        //     // lastNameValidator={(lastName)=>{
        //     //     return lastName.length > 5 ? 'need' : 'djdjd'
        //     // }}
        //     // firstNameValidator={(firstName)=>{
        //     //     return firstName.length > 2 ? 'jsddjsahdjh' : 'dksakjsadjk'
        //     // }}
        //     // errorDisplayConfig={{
        //     //     messageBoxConfig: {
        //     //         position: 'top',
        //     //         backgroundColor: 'green'
        //     //     }
        //     // }}
        //     WorkflowCardActionsProps={{
        //         onNext: onNext,
        //         showNext: true,
        //         canGoNext: true,
        //         nextLabel:'hi'
        //     }}
        // />

        // CreateAccountScreen
        // <CreateAccountScreenBase
        // emailLabel='ddd'
        // initialValue='dd@c.cc'
        // emailValidator={(email: string): boolean | string => {
        //     if (email?.length > 6) {
        //         return true;
        //     }
        //     return 'Please enter a valid emaileeee' ;
        // }}
        // emailTextFieldProps={{
        //     textColor: 'green'
        // }}
        // errorDisplayConfig={{
        //         messageBoxConfig: {
        //             position: 'top',
        //             backgroundColor: 'green'
        //         }
        //     }}

        // WorkflowCardActionsProps={{
        //             onNext: onNext,
        //             showNext: true,
        //             canGoNext: true,
        //             nextLabel:'hi'
        //         }} />

        // <CreatePasswordScreenBase
        //     PasswordProps={{
        //         newPasswordLabel: 'dd',
        //         initialNewPasswordValue: 'Test@123',
        //         initialConfirmPasswordValue: 'Test@123',
        //         onSubmit: () => {
        //             console.log('jshadjhsj');
        //         },
        //     }}
        //     WorkflowCardActionsProps={{
        //         onNext: onNext,
        //         showNext: true,
        //         canGoNext: true,
        //         nextLabel: 'hi',
        //     }}
        // />
        <EulaScreenBase
            eulaContent={<Text variant='bodyLarge'>Eula Text</Text>}
            WorkflowCardBaseProps={{
                loading: true
            }}
            // checkboxLabel={}
            refreshConfig={{
                showRefreshButton: true,
                onRefresh:()=>{
                    console.log('refresh page')
                },
                refreshButtonLabel: 'Refresh'
            }}
        />
    );
};

export default SmokeTestExample;
