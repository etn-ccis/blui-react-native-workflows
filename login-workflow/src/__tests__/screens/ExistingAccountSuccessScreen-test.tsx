import React from 'react';
import { RenderResult, cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import { ExistingAccountSuccessScreen, SuccessScreenProps } from '../../screens';
import { registrationContextProviderProps } from '../../testUtils';
import { RegistrationContextProvider, RegistrationWorkflowContextProvider } from '../../contexts';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
    },
    updateScreenData: jest.fn(),
    resetScreenData: jest.fn(),
};

describe('ExistingAccountSuccessScreen', () => {
    let mockOnDismiss: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnDismiss = jest.fn();
    });

    const renderer = (props?: SuccessScreenProps): RenderResult =>
        render(
            <SafeAreaProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflowContextProvider {...registrationWorkflowContextProps}>
                        <ExistingAccountSuccessScreen {...props} />
                    </RegistrationWorkflowContextProvider>
                </RegistrationContextProvider>
            </SafeAreaProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Account Created!')).toBeOnTheScreen();
    });

    it('should call onDismiss, when Dismiss button is pressed', () => {
        renderer({
            WorkflowCardActionsProps: {
                nextLabel: 'Dismiss',
                canGoNext: true,
                showNext: true,
                onNext: () => mockOnDismiss(),
            },
        });

        const dismissButton = screen.getByText('Dismiss');
        expect(dismissButton).toBeOnTheScreen();
        fireEvent.press(dismissButton);
        expect(mockOnDismiss).toHaveBeenCalled();
    });
});
