import { i18nAuthInstance } from '../contexts/AuthContext/i18nAuthInstance';
import {
    AuthContextProviderProps,
    RegistrationContextProviderProps,
    RegistrationWorkflowContextProps,
    i18nRegistrationInstance,
} from '../contexts';

export const authContextProviderProps: AuthContextProviderProps = {
    language: 'en',
    i18n: i18nAuthInstance,
    navigate: (): void => {},
    routeConfig: {},
    actions: {
        initiateSecurity: jest.fn(),
        logIn: jest.fn(),
        forgotPassword: jest.fn(),
        verifyResetCode: jest.fn(),
        setPassword: jest.fn(),
        changePassword: jest.fn(),
    },
};

export const registrationContextProviderProps: RegistrationContextProviderProps = {
    language: 'en',
    i18n: i18nRegistrationInstance,
    navigate: (): void => {},
    routeConfig: {},
    actions: {
        loadEula: jest.fn(),
        acceptEula: jest.fn(),
        requestRegistrationCode: jest.fn(),
        validateUserRegistrationRequest: jest.fn(),
        createPassword: jest.fn(),
        setAccountDetails: jest.fn(),
        completeRegistration: jest.fn().mockImplementation(() => Promise.resolve()),
    },
};

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
    resetScreenData: function (): void {
        throw new Error('Function not implemented.');
    },
};
