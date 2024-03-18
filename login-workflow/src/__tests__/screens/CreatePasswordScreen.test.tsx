import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { cleanup, render, screen, fireEvent, RenderResult, waitFor } from '@testing-library/react-native';
import { CreatePasswordScreen, CreatePasswordScreenProps } from '../../screens';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { errorRegistrationContextProviderProps, registrationContextProviderProps } from '../../testUtils';
import { PaperProvider } from 'react-native-paper';

const passwordRequirements = [
    {
        description: 'Check 1',
        regex: /^.{3,5}$/,
    },
    {
        description: 'Check 2',
        regex: /[a-z]+/,
    },
];

afterEach(cleanup);
describe('Create Password Screen', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: CreatePasswordScreenProps): RenderResult =>
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <CreatePasswordScreen {...props} />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Create Password')).toBeOnTheScreen();
    });

    it('should call onNext, when Next button clicked', async () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                passwordRequirements: passwordRequirements,
                onPasswordChange: jest.fn(),
            },
        });

        const passwordField = screen.getByTestId('password');
        const confirmPasswordField = screen.getByTestId('confirm');
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();

        fireEvent.changeText(passwordField, 'ab123');
        fireEvent.changeText(confirmPasswordField, 'ab123');
        expect(nextButton).toBeEnabled();

        fireEvent.press(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
        await waitFor(() => expect(screen.getByTestId('spinner')).toBeOnTheScreen());
    });

    it('should enable next button, when passwordRequirements prop is empty', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                onPasswordChange: jest.fn(),
                passwordRequirements: [],
                onSubmit: jest.fn(),
            },
        });

        const passwordField = screen.getByTestId('password');
        const confirmPasswordField = screen.getByTestId('confirm');

        fireEvent.changeText(passwordField, 'A');
        fireEvent.changeText(confirmPasswordField, 'A');

        expect(passwordField).toHaveDisplayValue('A');
        expect(confirmPasswordField).toHaveDisplayValue('A');
    });

    it('should call onPrevious, when Back button clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockOnPrevious(),
                showPrevious: true,
                previousLabel: 'Back',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                onPasswordChange: jest.fn(),
                passwordRequirements: passwordRequirements,
            },
        });

        const backButton = screen.getByText('Back');
        fireEvent.press(backButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });

    it('should trigger error, when Next button clicked', async () => {
        render(
            <PaperProvider>
                <RegistrationContextProvider {...errorRegistrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <CreatePasswordScreen
                            WorkflowCardActionsProps={{
                                onNext: mockOnNext(),
                                showNext: true,
                                nextLabel: 'Next',
                            }}
                            PasswordProps={{
                                newPasswordLabel: 'Password',
                                confirmPasswordLabel: 'Confirm Password',
                                passwordRequirements: passwordRequirements,
                                onPasswordChange: jest.fn(),
                            }}
                            errorDisplayConfig={{
                                onClose: jest.fn(),
                            }}
                        />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

        const passwordField = screen.getByTestId('password');
        const confirmPasswordField = screen.getByTestId('confirm');
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();

        fireEvent.changeText(passwordField, 'ab123');
        fireEvent.changeText(confirmPasswordField, 'ab123');
        expect(nextButton).toBeEnabled();

        fireEvent.press(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
        await waitFor(() => expect(screen.getByTestId('spinner')).toBeOnTheScreen());
    });
});
