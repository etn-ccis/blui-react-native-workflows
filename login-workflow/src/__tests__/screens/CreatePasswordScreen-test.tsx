import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult } from '@testing-library/react-native';
import { CreatePasswordScreen, CreatePasswordScreenProps } from '../../screens';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';
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
jest.useFakeTimers();
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
    });

    it('should call onNext, when Next button clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
                canGoNext: true,
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

        fireEvent.changeText(passwordField, { target: { value: 'Abcd@123' } });
        fireEvent.changeText(confirmPasswordField, { target: { value: 'Abcd@123' } });

        const nextButton = screen.getByText('Next');
        fireEvent.press(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should enable next button, when passwordRequirements prop is empty', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                canGoNext: true,
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

        fireEvent.changeText(passwordField, { target: { value: 'A' } });
        fireEvent.changeText(confirmPasswordField, { target: { value: 'A' } });
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
});
