import { RegistrationWorkflowContextProps } from '../contexts';

export const registrationWorkflowContextProps: RegistrationWorkflowContextProps = {
    currentScreen: 0,
    totalScreens: 5,
    previousScreen: () => {},
    screenData: {
        Eula: { accepted: true },
        CreateAccount: { emailAddress: 'emailAddress@emailAddress.emailAddress' },
        VerifyCode: { code: '12345' },
        CreatePassword: { password: 'password', confirmPassword: 'confirmPassword' },
        AccountDetails: { firstName: 'firstName', lastName: 'lastName' },
    },
    nextScreen: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    updateScreenData: function (): void {
        throw new Error('Function not implemented.');
    },
};
