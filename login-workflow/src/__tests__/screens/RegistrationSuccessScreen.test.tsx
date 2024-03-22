import React from 'react';
import { cleanup, fireEvent, render, RenderResult, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@testing-library/react-native/extend-expect';
import { RegistrationSuccessScreen, SuccessScreenProps } from '../../screens';
import { registrationContextProviderProps } from '../../testUtils';
import { RegistrationContextProvider, RegistrationWorkflowContextProvider } from '../../contexts';

afterEach(cleanup);

const registrationWorkflowContextProps = {
    currentScreen: 0,
    totalScreens: 2,
    nextScreen: jest.fn(),
    previousScreen: jest.fn(),
    screenData: {
        Eula: { accepted: true },
        CreateAccount: { emailAddress: 'emailAddress@emailAddress.emailAddress' },
        VerifyCode: { code: '12345' },
        CreatePassword: { password: 'password', confirmPassword: 'confirmPassword' },
        AccountDetails: { firstName: 'firstName', lastName: 'lastName' },
        Other: { RegistrationSuccessScreen: { organizationName: 'Acme Co.' } },
    },
    updateScreenData: jest.fn(),
    resetScreenData: jest.fn(),
};

describe('RegistrationSuccessScreen', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    const renderer = (props?: SuccessScreenProps): RenderResult =>
        render(
            <SafeAreaProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflowContextProvider {...registrationWorkflowContextProps}>
                        <RegistrationSuccessScreen {...props} />
                    </RegistrationWorkflowContextProvider>
                </RegistrationContextProvider>
            </SafeAreaProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Account Created!')).toBeOnTheScreen();
    });

    it('should display email id and organization name on success screen', () => {
        renderer();

        expect(
            screen.getByText(
                'Your account has been successfully created with the email emailAddress@emailAddress.emailAddress. Your account has already been added to the Acme Co. organization.'
            )
        ).toBeOnTheScreen();
    });

    it('should call onNext, when click on Continue button', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
            },
        });

        const continueButton = screen.getByText('Finish');
        expect(continueButton).toBeOnTheScreen();
        fireEvent.press(continueButton);
        expect(mockOnNext).toHaveBeenCalled();
    });
});
